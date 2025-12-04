# Stress Detection Testing Guide

## 🎯 Overview

Real mobile sensor-based stress detection for high-value transfers using device accelerometer and touch pattern analysis.

## 📱 Features Implemented

✅ **Real Device Sensors:**
- DeviceMotionEvent API (accelerometer/gyroscope)
- Touch Events API (tap pattern analysis)
- iOS permission handling
- Android auto-activation

✅ **Stress Detection Algorithm:**
- Tremor intensity (40% weight) - 8-12 Hz frequency detection
- Rapid movements (30% weight) - >15 m/s² acceleration spikes
- Tap patterns (20% weight) - repeated touches <2s apart
- Time pressure (10% weight) - session duration

✅ **3-Step Modal Flow:**
1. **Analyzing** - Live sensor visualization (5s collection)
2. **Results** - Stress score breakdown (0-100 scale)
3. **Recommendation** - Freeze (15 min) or Continue options

## 🧪 How to Test

### Step 1: Navigate to Chioma's Persona

```
http://localhost:3000/?user=user_chioma_7h4m
```

**Chioma Adebayo** - Business Executive
- Balance: ₦2,850,000
- Stress Detection: **Enabled by default**

### Step 2: Enable Stress Detection (Optional - Already On)

1. Go to **Settings** tab
2. Find "Stress Detection During Transfers" toggle
3. Toggle ON (will request permission on iOS)
4. **iOS**: Permission dialog will appear
5. **Android**: Works automatically, no permission needed

### Step 3: Make a High-Value Transfer

1. Click **"Send Money"** button
2. Enter amount: **₦850,000** (≥₦500k triggers detection)
3. Click **Continue**
4. Select any beneficiary (e.g., Chidi Okafor)
5. Select category (any)
6. Proceed to **PIN screen**

### Step 4: Sensors Start Monitoring

When you reach the PIN screen:
- ✅ Device motion sensors activate
- ✅ Touch pattern tracking begins
- ✅ Real-time metrics calculated every 500ms

### Step 5: Enter PIN & Observe

Enter any 4-digit PIN (e.g., **1234**)

**What Happens Next:**

**If Stress Score > 70:**
- 🚨 Stress detection modal appears
- Shows live metrics during 5s analysis
- Displays stress breakdown
- Offers two options:
  - **Freeze Account (15 min)** - Cancels transfer
  - **Continue Transfer** - Proceeds with acknowledgment

**If Stress Score ≤ 70:**
- ✅ Transfer proceeds normally
- No interruption

## 📊 Testing Different Scenarios

### Scenario 1: Normal Transfer (Low Stress)
- Amount: ₦850,000
- Action: Enter PIN calmly on stable surface
- Expected: Transfer completes normally

### Scenario 2: Simulated High Stress
- Amount: ₦850,000
- Action: Shake phone while entering PIN
- Expected: Stress modal appears

### Scenario 3: Below Threshold (No Detection)
- Amount: ₦400,000 (below ₦500k)
- Action: Any movement
- Expected: No stress detection activated

### Scenario 4: Feature Disabled
- Go to Settings → Disable stress detection
- Amount: ₦850,000
- Action: Any movement
- Expected: No detection (feature off)

## 🔍 What the Sensors Detect

### Tremors (8-12 Hz oscillations):
- Hand shaking from nervousness
- Fine motor instability
- Measured via accelerometer variance

### Rapid Movements:
- Jerky hand motions
- Sudden acceleration >15 m/s²
- Counted as stress indicators

### Tap Patterns:
- Repeated touches in same area
- Taps <2 seconds apart
- Hesitation indicators

### Time Pressure:
- How long on PIN screen
- Correlates with uncertainty

## 📱 Device Compatibility

### ✅ Full Support (Real Sensors):
- **iOS Safari** - After permission granted
- **Chrome Android** - Works immediately
- **Samsung Internet** - Works immediately
- **Firefox Android** - Works immediately

### ⚠️ Limited Support (No Sensors):
- **Desktop Chrome/Firefox** - No accelerometer
- **Desktop Safari** - No accelerometer
- **Emulators** - No real sensor data

## 🎨 UI Features

### Analyzing Step:
- Pulsing activity icon
- Real-time progress bar (0-100%)
- Live metrics display:
  - Hand Tremors (bar chart)
  - Rapid Movements (count)
  - Tap Patterns (count)
  - Session Time (seconds)

### Results Step:
- Large stress score (0-100)
- Color-coded gauge:
  - 🟢 Green: 0-39 (Low)
  - 🟡 Amber: 40-69 (Medium)
  - 🔴 Red: 70-100 (High)
- Detected indicators list

### Recommendation Step:
- Amber warning card
- Transfer details (amount, recipient)
- Two action buttons:
  - **Freeze** (blue, shield icon)
  - **Continue** (gray, checkmark icon)
- Confidence score + MEMS badge

## 🔧 Technical Details

### Sensor Permissions:

**iOS (Safari 13+):**
```javascript
DeviceMotionEvent.requestPermission()
  .then(response => {
    if (response === 'granted') {
      // Sensors available
    }
  });
```

**Android (All browsers):**
```javascript
// No permission needed - sensors work directly
window.addEventListener('devicemotion', handler);
```

### Stress Score Calculation:
```
overallScore = (tremors × 0.4) + 
               (movements × 0.3) + 
               (taps × 0.2) + 
               (time × 0.1)
```

### Detection Threshold:
- **Activated**: Amount ≥ ₦500,000
- **Triggered**: Stress score > 70
- **Sample Rate**: 60 Hz (accelerometer)
- **Collection**: 500ms intervals

## 🚀 Production Considerations

### Privacy:
- ✅ User opt-in required (settings toggle)
- ✅ Clear explanation of sensor usage
- ✅ Permission request only when enabling
- ✅ Data never leaves device

### Security:
- ✅ Detects coercion indicators
- ✅ Temporary freeze option
- ✅ High-value transfer focus
- ✅ Manual override always available

### Performance:
- ✅ Sensors only active during PIN entry
- ✅ Automatic cleanup on completion
- ✅ Minimal battery impact
- ✅ Graceful fallback if unavailable

## 🐛 Troubleshooting

### "Permission Denied" on iOS:
1. Go to Settings → Safari → Motion & Orientation Access
2. Enable for your site
3. Reload page and try again

### "Sensors Not Available":
- Check device has accelerometer (mobile only)
- Try refreshing the page
- Ensure HTTPS connection (required for sensors)

### "No Detection Triggered":
- Verify amount ≥ ₦500,000
- Check persona has `stressDetection: true`
- Ensure you're on PIN screen (not earlier steps)
- Try more exaggerated movements

### Modal Not Showing:
- Check browser console for errors
- Verify stress score > 70 threshold
- Ensure modal state is updating

## 📝 Notes

- **Desktop Demo**: Use Chioma's account but note sensors won't work (no accelerometer on laptops)
- **Mobile Demo**: Best experience - real sensor data
- **Confidence Score**: Based on data quality (more samples = higher confidence)
- **15-Min Freeze**: Currently shows alert (in production would be server-side account freeze)

## 🎯 Demo Script

**For Client/Stakeholder Demo:**

> "I'm going to demonstrate our stress detection feature using real device sensors. I'll navigate to Chioma's account - she's a business executive with a ₦2.85M balance.
>
> I'll initiate a large transfer of ₦850,000. Notice when I reach the PIN screen, the app starts monitoring my device's accelerometer and touch patterns in real-time.
>
> [Shake phone while entering PIN]
>
> See how the system detected unusual hand tremors and rapid movements? It calculated a stress score of 85 out of 100 - indicating high stress.
>
> The app now offers two options: temporarily freeze my account for 15 minutes to give me time to think, or continue if I'm certain. This protects users from making transfers under duress or coercion.
>
> This uses the same MEMS sensors found in fitness trackers, but applied to financial security."

---

**Built with Real Mobile Sensors | Ready for Production**
