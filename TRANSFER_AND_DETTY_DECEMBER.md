# Transfer Feature & Detty December Flow

## Overview

This document explains how the transfer functionality works and how the Detty December banner is triggered for the Raymond persona.

## Transfer Flow

### Complete Banking Transfer Process

The transfer feature follows a proper digital banking flow with the following steps:

1. **Recipient Details** - Step 1

   - Select bank from dropdown list
   - Enter 10-digit account number
   - System automatically resolves account name (simulated with 1s delay)
   - Visual confirmation when account is found

2. **Amount & Category** - Step 2

   - Enter transfer amount with Nigerian Naira (₦) prefix
   - Balance validation (can't exceed available balance)
   - Select transfer category from 9 options:
     - General 💰
     - Event Ticket 🎫
     - Concert 🎵
     - Entertainment 🎉
     - Fun & Leisure 🎊
     - Food & Drinks 🍽️
     - Shopping 🛍️
     - Bills & Utilities 📱
     - Family & Friends 👨‍👩‍👦
   - Optional narration field (max 50 characters)

3. **Review** - Step 3

   - Summary of all transfer details
   - Recipient name, bank, and account
   - Amount prominently displayed
   - Category and narration
   - Warning about transaction being irreversible

4. **PIN Entry** - Step 4

   - 4-digit PIN input (masked)
   - Auto-focus to next input box
   - PIN validation (accepts any 4-digit PIN for demo)
   - Error handling with visual feedback

5. **Success** - Step 5
   - Success animation with checkmark
   - Confirmation message
   - Auto-closes after 2 seconds
   - Transaction added to history

## Detty December Trigger

### How It Works for Raymond (user_raymond_9q3r)

The Detty December banner is **conditionally triggered** based on three criteria:

#### 1. User Must Be Raymond

```typescript
currentPersona.id === "user_raymond_9q3r";
```

#### 2. Month Must Be December

```typescript
currentPersona.month === 12;
```

#### 3. Must Make a Fun-Related Transfer

The user must complete a transfer with one of these categories:

- `ticketing` - Event Ticket 🎫
- `concert` - Concert 🎵
- `entertainment` - Entertainment 🎉
- `fun` - Fun & Leisure 🎊

### Visual Indicators

#### December Mode Indicator (Always Visible for Raymond in December)

At the top of the dashboard, Raymond sees:

```
🎇 Detty December Mode 🎉
Tracking enabled for this demo persona
```

This helps viewers understand that:

- It's December in the demo context
- The Detty December feature is active for this persona

#### Detty December Banner (Appears After Fun Transfer)

Once Raymond makes a qualifying transfer, the Quanto insight banner appears with:

- Title: "Detty December Tracker"
- Message: "It's Detty December 🎉 Before the duties take over, want a mini tracker to balance enjoyment and savings?"
- Action: "Activate tracker"

### Implementation Details

#### State Management

```typescript
hasDettyDecemberTrigger: boolean  // Tracks if condition is met
recentFunTransfers: string[]      // Array of fun-related categories
```

#### Transfer Handler Logic

```typescript
// Check if transfer is fun-related
const funCategories = ["ticketing", "concert", "entertainment", "fun"];
const isFunTransfer = funCategories.includes(transferData.category);

// Update trigger if conditions are met
hasDettyDecemberTrigger: currentPersona.id === "user_raymond_9q3r" &&
  currentPersona.month === 12 &&
  isFunTransfer;
```

## Testing the Flow

### To Test Transfer:

1. Navigate to Raymond's persona: `/?user=user_raymond_9q3r`
2. You'll see the "Detty December Mode" indicator at the top
3. Click "Send Money" button in the balance card
4. Follow through all transfer steps
5. **Important**: Select a fun category (Event Ticket, Concert, Entertainment, or Fun & Leisure)
6. Complete the transfer with any 4-digit PIN
7. The Detty December banner will now appear in the Quanto insights section

### To Test Other Personas:

- Access via URL: `/?user=user_ada_f4k9` (or other user IDs)
- Transfer works the same but Detty December won't trigger
- No December indicator shown for other users

## Other Personas

The 5 personas in the system are:

1. **user_ada_f4k9** - Ada Okonkwo (Salaried Employee) - Salary delay flow
2. **user_malik_2p7j** - Malik Hassan (Student) - Subscription warning flow
3. **user_ngozi_8m5n** - Ngozi Adeyemi (New Mother) - Reward offer flow
4. **user_tolu_6x2k** - Tolu Okafor (Freelancer) - Cool-off flow
5. **user_raymond_9q3r** - Raymond Ejiofor (Small Business Owner) - Detty December flow

## Key Features

### Transfer Modal

- Fully responsive design
- Step-by-step progress indicator
- Real-time validation
- Error handling
- Loading states
- Success animation

### Detty December Tracker Modal

- Two tracker options:
  1. Entertainment vs. Savings Tracker
  2. Food & Drinks Tracker
- Progress visualization
- One-time activation
- Success confirmation

### State Persistence

- Balance updates immediately
- Transaction history updates in real-time
- Quanto insights update based on triggers
- All changes reflected across dashboard

## Technical Architecture

### Components Created/Modified:

1. **transfer-modal.tsx** - New full transfer flow component
2. **dashboard.tsx** - Updated with transfer integration and December indicator
3. **types.ts** - Added transfer-related fields to Persona type
4. **mock-data.ts** - Added trigger fields to Raymond's persona

### Data Flow:

```
User clicks "Send Money"
→ Transfer Modal Opens
→ User completes transfer flow
→ handleTransferComplete() called
→ Check if fun-related transfer
→ Update persona state with new balance, transaction, and trigger
→ Dashboard re-renders with updated data
→ Detty December banner appears (if triggered)
```

## Future Enhancements

- API integration for real bank account resolution
- Actual PIN verification against user profile
- Transaction receipts
- Transfer history filtering
- Scheduled transfers
- Beneficiary management
