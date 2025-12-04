"use client"

import type { Persona } from "@/lib/types"
import { useState, useEffect } from "react"
import { requestMotionPermission, checkMotionSupport } from "@/lib/hooks"
import { Shield, CheckCircle, AlertCircle } from "lucide-react"

interface SettingsScreenProps {
  persona: Persona
}

export function SettingsScreen({ persona }: SettingsScreenProps) {
  const [controls, setControls] = useState({
    empathetic: true,
    preventive: true,
    reward: true,
    educational: true,
    ambient: true,
  })

  const [stressDetectionEnabled, setStressDetectionEnabled] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<
    "checking" | "granted" | "denied" | "not-needed"
  >("checking")
  const [isRequestingPermission, setIsRequestingPermission] = useState(false)
  const [motionDebugInfo, setMotionDebugInfo] = useState<{
    available: boolean
    needsPermission: boolean
    isSecureContext?: boolean
    protocol?: string
    host?: string
  } | null>(null)

  // Check motion sensor support on mount
  useEffect(() => {
    const debug = checkMotionSupport()
    const { available, needsPermission } = debug
    setMotionDebugInfo(debug)
    if (!available) {
      setPermissionStatus("denied")
    } else if (!needsPermission) {
      setPermissionStatus("not-needed")
    } else {
      setPermissionStatus("checking")
    }
    
    // Set initial state based on persona
    if (persona.activatedFeatures?.stressDetection) {
      setStressDetectionEnabled(true)
      if (needsPermission) {
        setPermissionStatus("granted")
      }
    }
  }, [])

  const toggleCategory = (category: keyof typeof controls) => {
    setControls((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const handleStressDetectionToggle = async () => {
    if (!stressDetectionEnabled) {
      // Enabling - request permission if needed
      setIsRequestingPermission(true)
      const debug = checkMotionSupport()
      const { needsPermission, available } = debug
      setMotionDebugInfo(debug)
      console.log("Toggle ON - motion support:", { available, needsPermission, debug })
      
      if (!available) {
        // No motion sensors available
        alert(
          "Motion Sensors Not Available\n\n" +
          "On iOS, motion sensors only work in Safari browser.\n\n" +
          "If you're in Safari and seeing this:\n" +
          "- Make sure you're on iOS 13 or later\n" +
          "- Try opening in a fresh Safari tab\n\n" +
          "Or use an Android device with Chrome."
        )
        setIsRequestingPermission(false)
        return
      }
      
      if (needsPermission) {
        console.log("Requesting permission...")
        try {
          const granted = await requestMotionPermission()
          console.log("Permission granted:", granted)
          
          if (granted) {
            setPermissionStatus("granted")
            setStressDetectionEnabled(true)
            alert("✅ Motion sensors enabled! You can now test stress detection on transfers ≥₦500,000.")
          } else {
            setPermissionStatus("denied")
            // Show better instructions for iOS Safari
            alert(
              "Permission Denied\n\n" +
              "Motion sensors were blocked.\n\n" +
              "To enable in Safari:\n" +
              "1. Tap 'aA' in the address bar\n" +
              "2. Tap 'Website Settings'\n" +
              "3. Set 'Motion & Orientation Access' to 'Allow'\n" +
              "4. Reload the page\n" +
              "5. Try toggling again"
            )
          }
        } catch (error) {
          console.error("Permission error:", error)
          alert("Error requesting permission: " + error)
          setPermissionStatus("denied")
        }
      } else {
        // Android or supported browser - no permission needed
        console.log("No permission needed - enabling directly")
        setPermissionStatus("not-needed")
        setStressDetectionEnabled(true)
        alert("✅ Motion sensors enabled! (No permission required on Android)")
      }
      setIsRequestingPermission(false)
    } else {
      // Disabling
      console.log("Toggle OFF")
      setStressDetectionEnabled(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-2">Privacy & Controls</h2>
        <p className="text-sm text-zinc-400">Manage what Quanto can access and do</p>
      </div>

      {/* Quanto Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold text-zinc-50">Quanto Response Categories</h3>

        <div className="space-y-3">
          {[
            {
              id: "empathetic",
              name: "Empathetic Support",
              description: "Detect salary delays and offer financial support",
            },
            {
              id: "preventive",
              name: "Preventive Alerts",
              description: "Alert when overspending or unusual patterns detected",
            },
            {
              id: "reward",
              name: "Rewards & Achievements",
              description: "Celebrate milestones and savings achievements",
            },
            {
              id: "educational",
              name: "Educational Tips",
              description: "Provide financial literacy and best practices",
            },
            {
              id: "ambient",
              name: "Ambient Insights",
              description: "Context-aware spending reminders and suggestions",
            },
          ].map((cat) => (
            <div
              key={cat.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-50">{cat.name}</p>
                <p className="text-xs text-zinc-400 mt-1">{cat.description}</p>
              </div>
              <button
                onClick={() => toggleCategory(cat.id as keyof typeof controls)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  controls[cat.id as keyof typeof controls] ? "bg-blue-600" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    controls[cat.id as keyof typeof controls] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stress Detection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-zinc-50">Security Features</h3>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-zinc-50">
                  Stress Detection During Transfers
                </h4>
                <button
                  onClick={handleStressDetectionToggle}
                  disabled={isRequestingPermission}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    stressDetectionEnabled ? "bg-blue-600" : "bg-zinc-700"
                  } ${isRequestingPermission ? "opacity-50" : ""}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      stressDetectionEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Monitor hand movements for unusual stress patterns during large transfers
                (≥₦500,000) using your device's motion sensors.
              </p>
            </div>
          </div>

          {/* Permission Status */}
          {stressDetectionEnabled && (
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex items-start gap-3">
                {permissionStatus === "granted" || permissionStatus === "not-needed" ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-400 font-medium">Active</p>
                      <p className="text-xs text-zinc-400 mt-1">
                        {permissionStatus === "granted"
                          ? "Motion sensor permission granted"
                          : "Motion sensors available (no permission required)"}
                      </p>
                    </div>
                  </>
                ) : permissionStatus === "denied" ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-400 font-medium">
                        Permission Required
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Motion sensors not available or permission denied. This feature
                        requires device motion access.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-600 border-t-blue-500 rounded-full animate-spin flex-shrink-0" />
                    <div>
                      <p className="text-sm text-zinc-400 font-medium">
                        Checking availability...
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Debug information to help diagnose permission/secure-context issues */}
          {motionDebugInfo && (
            <div className="mt-3 pt-3 border-t border-zinc-800">
              <p className="text-xs text-zinc-500">
                <span className="font-medium">Debug:</span>
                &nbsp;Secure context: {motionDebugInfo.isSecureContext ? "Yes" : "No"} •
                API available: {motionDebugInfo.available ? "Yes" : "No"} • Needs permission: {motionDebugInfo.needsPermission ? "Yes" : "No"}
              </p>
              <p className="text-xs text-zinc-400 mt-1">Protocol: {motionDebugInfo.protocol ?? "—"} • Host: {motionDebugInfo.host ?? "—"}</p>
              {!motionDebugInfo.isSecureContext && (
                <p className="text-xs text-amber-400 mt-2">
                  Not served over HTTPS/localhost — try an HTTPS tunnel (ngrok/localtunnel) or open in Safari on iOS.
                </p>
              )}
            </div>
          )}

          {stressDetectionEnabled && (
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <span className="font-semibold">How it works:</span> When you make a
                large transfer, we analyze accelerometer data to detect hand tremors,
                rapid movements, and tap patterns that may indicate stress or coercion.
                If detected, we'll offer a temporary account freeze for your safety.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Usage */}
      <div>
        <h3 className="font-semibold text-zinc-50 mb-3">Data Usage</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-sm text-zinc-300">Spending Patterns</p>
            <p className="text-xs text-zinc-400 mt-1">Used for preventive and educational insights</p>
          </div>
          <div>
            <p className="text-sm text-zinc-300">Income & Savings</p>
            <p className="text-xs text-zinc-400 mt-1">Used for reward and ambient insights</p>
          </div>
          <div>
            <p className="text-sm text-zinc-300">Transaction History</p>
            <p className="text-xs text-zinc-400 mt-1">Used for all Quanto analysis</p>
          </div>
        </div>
      </div>

      {/* About Quanto */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <h3 className="font-semibold text-zinc-50 mb-2">About Quanto</h3>
        <p className="text-sm text-zinc-400">
          Quanto is a privacy-first AI companion designed to provide empathetic, explainable financial guidance based on
          your explicit consent.
        </p>
      </div>
    </div>
  )
}
