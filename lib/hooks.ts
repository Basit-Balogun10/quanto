"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { personas, quantoResponses, defaultAdminControls } from "./mock-data"
import type { QuantoInsight, AdminControls, StressMetrics } from "./types"

export function usePersona(personaId: string) {
  const persona = personas.find((p) => p.id === personaId)
  return persona || personas[0]
}

export function useTriggerResponse(category: string) {
  const responseMap: Record<string, string> = {
    empathetic: "salary_delay",
    preventive: "overspending_alert",
    reward: "savings_milestone",
    educational: "first_salary",
    ambient: "coffee_reminder",
  }
  return quantoResponses[responseMap[category]] || null
}

export function useAdminControls() {
  const [controls, setControls] = useState<AdminControls>(defaultAdminControls)

  const toggleCategory = useCallback((category: string) => {
    setControls((prev) => ({
      ...prev,
      enabledCategories: {
        ...prev.enabledCategories,
        [category]: !prev.enabledCategories[category as keyof typeof prev.enabledCategories],
      },
    }))
  }, [])

  const toggleSubcontrol = useCallback((subcontrol: string) => {
    setControls((prev) => ({
      ...prev,
      enabledSubcontrols: {
        ...prev.enabledSubcontrols,
        [subcontrol]: !prev.enabledSubcontrols[subcontrol],
      },
    }))
  }, [])

  return { controls, toggleCategory, toggleSubcontrol }
}

export function useQuantoMessages(personaId: string) {
  const [messages, setMessages] = useState<QuantoInsight[]>([])
  const persona = usePersona(personaId)
  const empatheticResponse = useTriggerResponse("empathetic")
  const preventiveResponse = useTriggerResponse("preventive")
  const rewardResponse = useTriggerResponse("reward")
  const educationalResponse = useTriggerResponse("educational")
  const ambientResponse = useTriggerResponse("ambient")

  useEffect(() => {
    const triggered: QuantoInsight[] = []

    if (personaId === "ada" && empatheticResponse) {
      triggered.push(empatheticResponse as QuantoInsight)
    }

    if (personaId === "malik" && persona.currentSpend > persona.usualMonthlySpend * 1.15 && preventiveResponse) {
      triggered.push(preventiveResponse as QuantoInsight)
    }

    if (persona.savingsStreak && persona.savingsStreak >= 3 && rewardResponse) {
      triggered.push(rewardResponse as QuantoInsight)
    }

    if (personaId === "ngozi" && educationalResponse) {
      triggered.push(educationalResponse as QuantoInsight)
    }

    if (personaId === "tolu" && ambientResponse) {
      triggered.push(ambientResponse as QuantoInsight)
    }

    setMessages(triggered)
  }, [personaId, persona, empatheticResponse, preventiveResponse, rewardResponse, educationalResponse, ambientResponse])

  return { messages }
}

// Request DeviceMotion permission (iOS only)
export async function requestMotionPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  
  console.log("Requesting motion permission...");
  
  // Check if we need permission (iOS 13+)
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof (DeviceMotionEvent as any).requestPermission === "function"
  ) {
    try {
      console.log("iOS detected - requesting permission");
      const permission = await (DeviceMotionEvent as any).requestPermission();
      console.log("Permission response:", permission);
      return permission === "granted";
    } catch (error) {
      console.error("Motion permission error:", error);
      return false;
    }
  }
  
  // Android and other browsers - no permission needed
  console.log("No permission needed - Android or desktop");
  return typeof DeviceMotionEvent !== "undefined";
}

// Check if motion sensors are available
export function checkMotionSupport(): {
  available: boolean;
  needsPermission: boolean;
  isSecureContext: boolean;
} {
  if (typeof window === "undefined") {
    return { available: false, needsPermission: false, isSecureContext: false };
  }

  const available = typeof DeviceMotionEvent !== "undefined";
  const needsPermission =
    available &&
    typeof (DeviceMotionEvent as any).requestPermission === "function";

  // Determine whether we're in a secure context. Most browsers require HTTPS or localhost
  const isSecureContext = (window.isSecureContext === true) ||
    location.protocol === "https:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1";

  console.log("Motion support check:", { available, needsPermission, isSecureContext, protocol: location.protocol, host: location.hostname });

  return { available, needsPermission, isSecureContext };
}

// Stress Detection Hook with Real Sensors
export function useStressDetection(isActive: boolean) {
  const [metrics, setMetrics] = useState<StressMetrics>({
    tremorIntensity: 0,
    rapidMovements: 0,
    tapPatterns: {
      repeatedTaps: 0,
      averageInterval: 0,
    },
    sessionDuration: 0,
    overallScore: 0,
    timestamp: new Date().toISOString(),
    confidence: 0,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const startTimeRef = useRef<number>(0);
  const accelerationDataRef = useRef<number[]>([]);
  const touchDataRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const rapidMovementCountRef = useRef(0);
  const shakeTimestampsRef = useRef<number[]>([]);
  const [shakeDetected, setShakeDetected] = useState(false);
  // Pin edit / aborted-attempt detection
  const pinEventsRef = useRef<Array<{ type: string; length: number; t: number }>>([]);
  const abortedTimestampsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setIsMonitoring(false);
      return;
    }

    let motionHandler: ((event: DeviceMotionEvent) => void) | null = null;
    let touchHandler: ((event: TouchEvent) => void) | null = null;
    let intervalId: NodeJS.Timeout;

    const startMonitoring = () => {
      startTimeRef.current = Date.now();
      accelerationDataRef.current = [];
      touchDataRef.current = [];
      rapidMovementCountRef.current = 0;
      setIsMonitoring(true);

      // Motion sensor handler
      motionHandler = (event: DeviceMotionEvent) => {
        const accel = event.accelerationIncludingGravity;
        if (accel && accel.x !== null && accel.y !== null && accel.z !== null) {
          // Calculate acceleration magnitude
          const magnitude = Math.sqrt(
            accel.x * accel.x + accel.y * accel.y + accel.z * accel.z
          );
          
          accelerationDataRef.current.push(magnitude);
          
          // Keep only last 120 samples (~2 seconds at 60Hz)
          if (accelerationDataRef.current.length > 120) {
            accelerationDataRef.current.shift();
          }

          // Detect rapid movements (spikes > 15 m/s²)
          if (magnitude > 15) {
            rapidMovementCountRef.current++;
            // record timestamp for shake detection
            shakeTimestampsRef.current.push(Date.now());
            // keep only last 2 seconds of timestamps
            const cutoff = Date.now() - 2000;
            shakeTimestampsRef.current = shakeTimestampsRef.current.filter((t) => t >= cutoff);
          }

          // If we see a strong movement, proactively blur the active element to
          // avoid iOS's 'Shake to Undo' popup appearing while a text input is focused.
          // This runs only while monitoring is active and is a lightweight mitigation.
          try {
            if (magnitude > 12 && typeof document !== "undefined") {
              const active = document.activeElement as HTMLElement | null;
              if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
                active.blur();
                console.log("Blurring active element due to high motion:", magnitude);
              }
            }
          } catch (err) {
            // don't break motion handling on errors
            console.warn("Error blurring active element on motion:", err);
          }
        }
      };

      // Touch pattern handler
      touchHandler = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (touch) {
          touchDataRef.current.push({
            x: touch.clientX,
            y: touch.clientY,
            timestamp: Date.now(),
          });

          // Keep only last 20 touches
          if (touchDataRef.current.length > 20) {
            touchDataRef.current.shift();
          }
        }
      };

      // Add event listeners
      window.addEventListener("devicemotion", motionHandler);
      window.addEventListener("touchstart", touchHandler, { passive: true });

      // Calculate metrics every 500ms
      intervalId = setInterval(() => {
        const sessionDuration = (Date.now() - startTimeRef.current) / 1000;
        
        // Calculate tremor intensity using FFT approximation
        const tremorIntensity = calculateTremorIntensity(accelerationDataRef.current);
        
        // Analyze tap patterns
        const tapAnalysis = analyzeTapPatterns(touchDataRef.current);
        
        // Calculate overall stress score
        const overallScore = calculateStressScore(
          tremorIntensity,
          rapidMovementCountRef.current,
          tapAnalysis.repeatedTaps,
          sessionDuration
        );

        // Calculate confidence based on data quality
        const confidence = Math.min(
          100,
          (accelerationDataRef.current.length / 60) * 50 +
          (touchDataRef.current.length / 10) * 50
        );

        setMetrics({
          tremorIntensity,
          rapidMovements: rapidMovementCountRef.current,
          tapPatterns: tapAnalysis,
          sessionDuration,
          overallScore,
          timestamp: new Date().toISOString(),
          confidence,
        });

        // Enhanced shake detection combining spikes, tremor intensity and rapid taps
        try {
          const now = Date.now();
          const last1s = shakeTimestampsRef.current.filter((t) => t >= now - 1000);

          // Count rapid taps in last 1s
          const recentTouches = touchDataRef.current.filter((t) => t.timestamp >= now - 1000);
          const rapidTaps = recentTouches.length;

          const tremorIntensity = calculateTremorIntensity(accelerationDataRef.current);

          const isSpikeShake = last1s.length >= 3; // 3 spikes within 1s
          const isTremorShake = tremorIntensity > 30 && rapidMovementCountRef.current >= 2;
          const isTapShake = rapidTaps >= 4;

          if (isSpikeShake || isTremorShake || isTapShake) {
            setShakeDetected(true);
            // clear timestamps to avoid repeated triggers
            shakeTimestampsRef.current = [];
            // also clear touch buffer to avoid retrigger
            touchDataRef.current = [];
          }
        } catch (err) {
          console.warn("shake detection error", err);
        }
      }, 500);
    };

    startMonitoring();

    return () => {
      setIsMonitoring(false);
      if (motionHandler) {
        window.removeEventListener("devicemotion", motionHandler);
      }
      if (touchHandler) {
        window.removeEventListener("touchstart", touchHandler);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
      // reset shake state
      setShakeDetected(false);
    };
  }, [isActive]);

  // Report PIN editing events from the UI so we can detect unusual tapping
  // patterns like typing then quickly deleting and retyping several times.
  const reportPinEvent = (eventType: "change" | "delete" | "submit", currentLength: number) => {
    try {
      const now = Date.now();
      pinEventsRef.current.push({ type: eventType, length: currentLength, t: now });

      // keep only last 10s
      const cutoff = now - 10000;
      pinEventsRef.current = pinEventsRef.current.filter((p) => p.t >= cutoff);

      // If we see a delete event shortly after change events, count as aborted attempt
      if (eventType === "delete") {
        const recentChange = pinEventsRef.current.find((p) => p.type === "change" && p.t >= now - 3000 && p.length >= 1);
        if (recentChange) {
          // Debounce pushes so rapid repeated backspaces in the same keystroke
          // do not count as multiple aborted attempts.
          const lastAbort = abortedTimestampsRef.current[abortedTimestampsRef.current.length - 1] || 0;
          if (now - lastAbort > 800) {
            abortedTimestampsRef.current.push(now);
          }

          // prune older than 10s
          const abortCutoff = now - 10000;
          abortedTimestampsRef.current = abortedTimestampsRef.current.filter((t) => t >= abortCutoff);

          // If we have 5 or more aborted attempts within window, treat as anomalous tapping
          const ABORT_THRESHOLD = 3;
          if (abortedTimestampsRef.current.length >= ABORT_THRESHOLD) {
            console.log("Detected rapid aborted PIN edit cycles -> marking shakeDetected");
            setShakeDetected(true);
            // clear to avoid immediate retrigger
            abortedTimestampsRef.current = [];
            pinEventsRef.current = [];
          }
        }
      }

      // On submit, we can also clear older pin events
      if (eventType === "submit") {
        pinEventsRef.current = [];
        abortedTimestampsRef.current = [];
      }
    } catch (err) {
      console.warn("reportPinEvent error", err);
    }
  };

  return { metrics, isMonitoring, shakeDetected, reportPinEvent };
}

// Calculate tremor intensity from acceleration data (8-12 Hz detection)
function calculateTremorIntensity(data: number[]): number {
  if (data.length < 30) return 0;

  // Simple variance-based tremor detection
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);

  // Normalize to 0-100 scale (empirical threshold)
  return Math.min(100, stdDev * 10);
}

// Analyze tap patterns for stress indicators
function analyzeTapPatterns(touches: Array<{ x: number; y: number; timestamp: number }>) {
  if (touches.length < 2) {
    return { repeatedTaps: 0, averageInterval: 0 };
  }

  let repeatedTaps = 0;
  let intervals: number[] = [];

  for (let i = 1; i < touches.length; i++) {
    const prev = touches[i - 1];
    const curr = touches[i];

    // Calculate distance between touches
    const distance = Math.sqrt(
      Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
    );

    // Calculate time interval
    const interval = curr.timestamp - prev.timestamp;
    intervals.push(interval);

    // Repeated tap: same area (<50px) within 2 seconds
    if (distance < 50 && interval < 2000) {
      repeatedTaps++;
    }
  }

  const averageInterval =
    intervals.length > 0
      ? intervals.reduce((sum, val) => sum + val, 0) / intervals.length
      : 0;

  return { repeatedTaps, averageInterval };
}

// Calculate composite stress score
function calculateStressScore(
  tremorIntensity: number,
  rapidMovements: number,
  repeatedTaps: number,
  sessionDuration: number
): number {
  // Weighting: tremors 40%, movements 30%, taps 20%, time 10%
  const tremorScore = tremorIntensity * 0.4;
  const movementScore = Math.min(100, rapidMovements * 10) * 0.3;
  const tapScore = Math.min(100, repeatedTaps * 20) * 0.2;
  const timeScore = Math.min(100, sessionDuration * 5) * 0.1;

  return Math.min(100, Math.round(tremorScore + movementScore + tapScore + timeScore));
}

