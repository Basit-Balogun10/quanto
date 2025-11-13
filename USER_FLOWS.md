# Quanto: 5 Persona User Flows Summary

## Overview

Quanto is an emotionally intelligent banking companion that detects life moments and responds with context-aware insights. Each persona demonstrates a different AI response category.

---

## 👩‍💼 **Persona 1: Ada Okonkwo** (Salaried Employee)

**Category:** Empathetic Support

### Scenario

Ada's salary is delayed by 12 days (expected Nov 1, today is Nov 13). She's worried about transaction fees eating into her remaining balance.

### User Flow

1. **Detection:** Quanto notices salary hasn't arrived on expected date
2. **Dashboard Card:** "Salary Delayed? We noticed your salary hasn't arrived yet. You'll enjoy free transactions for the next 24 hours."
3. **User Clicks Card** → Opens 3-step modal:
   - **Step 1 (Problem):** Visual timeline showing expected date vs actual delay (12 days late)
   - **Step 2 (Solution):** Lists all eligible fee waivers:
     - Transfers: ₦50 → FREE
     - ATM: ₦35 → FREE
     - Bills: ₦25 → FREE
     - POS: ₦100 → FREE
     - Airtime: ₦10 → FREE
     - Estimated savings: ₦220
   - **Step 3 (Activation):** Success confirmation with 24-hour expiry countdown
4. **Outcome:** Ada feels supported during financial stress, fees waived automatically

---

## 👨‍🎓 **Persona 2: Malik Hassan** (Student)

**Category:** Proactive Prevention

### Scenario

Malik has 3 subscriptions (Netflix, Apple Music, Canva Pro) totaling ₦7,100 renewing this weekend. His balance is ₦32,000, which would drop to ₦24,900.

### User Flow

1. **Detection:** Quanto identifies multiple subscriptions renewing within 48 hours
2. **Dashboard Card:** "Subscription Renewals - Heads up, 3 of your subscriptions renew this weekend. Total ₦7,100. Want to pause any for this month?"
3. **User Clicks Card** → Opens 3-step modal:
   - **Step 1 (Warning):**
     - Countdown timer: 5 days away
     - Breakdown of all subscriptions with amounts
     - Balance impact visualization (₦32K → ₦24.9K)
     - Low balance warning if applicable
   - **Step 2 (Manage):**
     - Interactive toggles for each subscription
     - Tap to pause (shows "Pausing" state with auto-resume date)
     - Real-time savings calculator
   - **Step 3 (Confirmation):** "Subscriptions Paused! You're saving ₦X this month"
4. **Outcome:** Malik pauses Netflix (₦2,400), saves money, subscriptions auto-resume next month

---

## 👨‍💼 **Persona 3: Tolu Adeyemi** (Freelancer)

**Category:** Educational Advisory

### Scenario

Tolu receives ₦150,000 salary and spends 60% (₦88,500) in just 3 days through rapid purchases.

### User Flow

1. **Detection:** Quanto notices spending velocity threshold breached (>50% in <3 days)
2. **Dashboard Card:** "Spending Alert - You've used 60% of your monthly income in 3 days. Want to activate a 24-hour cool-off?"
3. **User Clicks Card** → Opens 3-step modal:
   - **Step 1 (Overview):**
     - Big visual: "60% spent in 3 days"
     - "This pace means you'll run out by Day 5"
   - **Step 2 (Timeline):**
     - Day-by-day spending breakdown with progress bars
     - Day 1: ₦28,000 (Shopping at Jumia)
     - Day 2: ₦35,500 (Largest purchase: Electronics ₦30K)
     - Day 3: ₦25,000 (Dining + Entertainment)
     - Projection: "At this rate, ₦0 by Nov 16"
   - **Step 3 (Activation):** Cool-off period activated, encouragement message
4. **Outcome:** Tolu gains awareness, pauses impulsive spending, budget lasts longer

---

## 👩‍💼 **Persona 4: Ngozi Eze** (Business Owner - Travel Enthusiast)

**Category:** Reward-Driven Growth

### Scenario

Ngozi purchases an Air Peace flight ticket (₦45,000) for a business trip to Abuja.

### User Flow

1. **Detection:** Quanto identifies travel-related transaction (airline merchant)
2. **Celebration Modal Auto-Pops:**
   - Gradient background with plane emoji ✈️
   - "You just booked a flight!"
   - "Here's something special for your journey..."
3. **Reward Reveal:**
   - Partner: Air Peace Airlines
   - Offer: 15% OFF on your next booking
   - Promo Code: AIRPEACE15 (copyable)
   - Expiry: Valid for 30 days
4. **Dashboard Card Added:** "Travel Reward Unlocked" with details
5. **Outcome:** Ngozi feels valued, more likely to book next flight through same bank card

---

## 👨 **Persona 5: Raymond Okeke** (Young Professional)

**Category:** Context-Aware Ambient Banking

### Scenario

It's December, and Raymond starts making "fun" transactions (clubs, concerts, restaurants). Quanto detects the cultural moment: Detty December.

### User Flow

1. **Detection:** Multiple entertainment/dining transactions + December timeframe
2. **Celebration Modal Auto-Pops:**
   - Festive gradient background with 🎉 confetti
   - "Detty December is here!"
   - "The season of fun has officially started"
3. **Tracker Selection:**
   - **Option 1:** Fun Fund Tracker
     - Set budget for entertainment (₦50,000)
     - Track concerts, clubs, dining out
     - Progress bar with emoji milestones
   - **Option 2:** Gift List Tracker
     - Set budget for holiday gifts (₦30,000)
     - Check off recipients as you shop
     - Spending breakdown by person
   - **Option 3:** Owambe Season Tracker
     - Budget for parties/events (₦40,000)
     - Track aso-ebi, gifts, contributions
     - Event-by-event breakdown
4. **Dashboard Card Added:** Selected tracker shows live progress
5. **Outcome:** Raymond enjoys Detty December responsibly, stays within budget while having fun

---

## Key Differentiators Across All Flows

| Persona | Trigger           | Emotion Detected | AI Response          | Outcome           |
| ------- | ----------------- | ---------------- | -------------------- | ----------------- |
| Ada     | Salary delay      | Stress/Anxiety   | Fee waiver           | Relief & loyalty  |
| Malik   | Multiple renewals | Caution/Concern  | Subscription control | Empowerment       |
| Tolu    | Rapid spending    | Impulsiveness    | Educational nudge    | Awareness         |
| Ngozi   | Travel purchase   | Joy/Ambition     | Reward offer         | Delight           |
| Raymond | Festive season    | Celebration      | Fun tracker          | Engaged enjoyment |

---

## Technical Flow Pattern (All Personas)

```
1. SENSE → Behavioral pattern detected via transaction analysis
2. UNDERSTAND → Generative Insight Engine interprets emotional context
3. ACT → Predict next best action based on persona + moment
4. PRESENT → Show insight card on dashboard
5. ENGAGE → User clicks, sees detailed 3-step modal
6. ACTIVATE → Feature confirmed, added to dashboard
7. TRACK → Ongoing monitoring and updates
```

---

## Demo Presentation Tips

1. **Start with the problem:** "Banks have data but no empathy"
2. **Show Ada's flow:** Empathetic support in action
3. **Show Malik's flow:** Proactive prevention saves money
4. **Show Raymond's flow:** Context-aware fun (crowd favorite)
5. **Show Tolu's flow:** Educational without being preachy
6. **Show Ngozi's flow:** Rewards that actually matter
7. **End with impact:** "5 different moments, 5 perfect responses, 1 AI engine"

---

**Tagline for Demo:**
"Quanto doesn't just process transactions. It understands life."
