# Visual Flow Guide

## Transfer UI - Modern OPay/PalmPay Style

### Step 1: Amount Entry

```
┌─────────────────────────────────┐
│  ← Transfer Money            ✕  │
├─────────────────────────────────┤
│                                 │
│         Amount                  │
│        ₦50000|                  │
│  Balance: ₦520,000              │
│                                 │
│  [₦1000] [₦5000] [₦10000]       │
│                                 │
│   [1]    [2]    [3]             │
│   [4]    [5]    [6]             │
│   [7]    [8]    [9]             │
│   [.]    [0]    [⌫]             │
│                                 │
│      [   Continue   ]           │
└─────────────────────────────────┘
```

### Step 2: Recipient & Purpose

```
┌─────────────────────────────────┐
│  ← Select Recipient          ✕  │
├─────────────────────────────────┤
│  Transfer Amount: ₦50,000       │
│                                 │
│  Purpose (Optional)             │
│  [💰] [🎫] [🎵] [🎉]           │
│  [🎊] [🍽️] [📱] [👨‍👩‍👦]         │
│                                 │
│  Add Note (Optional)            │
│  [e.g., Ticket payment      ]   │
│                                 │
│  Recent Beneficiaries           │
│  ┌─────────────────────────┐   │
│  │ 👤 Chidi Okafor        →│   │
│  │    GTBank • 0123456789  │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 👤 Amara Nwosu         →│   │
│  │    Access Bank • 023... │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Step 3: PIN Entry

```
┌─────────────────────────────────┐
│  ← Enter PIN                 ✕  │
├─────────────────────────────────┤
│  ┌─────────────────────────┐   │
│  │ 👤 Chidi Okafor         │   │
│  │    GTBank               │   │
│  │ ─────────────────────── │   │
│  │ You're sending          │   │
│  │ ₦50,000                 │   │
│  └─────────────────────────┘   │
│                                 │
│  Enter your transaction PIN     │
│                                 │
│       [●] [●] [●] [●]           │
│                                 │
│       ⟳ Processing...           │
└─────────────────────────────────┘
```

### Step 4: Success

```
┌─────────────────────────────────┐
│        Transfer Successful    ✕  │
├─────────────────────────────────┤
│                                 │
│          ⭕ ✓                   │
│         (animated)              │
│                                 │
│   Transfer Successful!          │
│   ₦50,000 sent to Chidi Okafor  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Recipient: Chidi Okafor │   │
│  │ Bank: GTBank            │   │
│  │ Amount: ₦50,000         │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## Detty December Modal Trigger

### Condition Flow:

```
User makes transfer
    ↓
Is user Raymond? ──NO──→ End
    ↓ YES
Is month December? ──NO──→ End
    ↓ YES
Is purpose fun-related? ──NO──→ End
    ↓ YES
    (🎫 🎵 🎉 🎊)
    ↓
Wait 500ms
    ↓
Show Detty December Modal!
```

### Detty December Modal Appears:

```
┌─────────────────────────────────┐
│  Detty December Tracker      ✕  │
├─────────────────────────────────┤
│                                 │
│  Before the duties take over,   │
│  choose a tracker to balance    │
│  enjoyment and savings this     │
│  December.                      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🎉 Entertainment vs.    │   │
│  │    Savings Tracker      │   │
│  │ ━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │ 35% ▓▓▓▓░░░░░░░░░░░░   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🍾 Food & Drinks        │   │
│  │    Tracker              │   │
│  │ ━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │ 52% ▓▓▓▓▓▓▓▓░░░░░░░░   │   │
│  └─────────────────────────┘   │
│                                 │
│  [Ignore] [Activate tracker]    │
└─────────────────────────────────┘
```

## Key UI Patterns

### Number Pad Style (Like OPay/PalmPay):

- Large, tappable buttons
- Bottom-sheet modal
- Clear visual hierarchy
- Amount displayed prominently
- Quick preset amounts

### Beneficiary Cards:

- Avatar on the left
- Name prominently displayed
- Bank and account number as secondary info
- Chevron right indicating clickable
- Hover/active states

### Purpose Categories:

- Grid layout (4 columns)
- Icon + label
- Selected state with blue border
- Visual feedback on selection

### PIN Entry:

- 4 separate input boxes
- Password masking (•)
- Auto-focus next input
- Auto-submit on completion
- Summary card above showing transaction

## Color Scheme

### Primary Colors:

- Background: `#0a0a0a` (very dark)
- Cards: `#18181b` (zinc-900)
- Borders: `#27272a` (zinc-800)
- Text: `#fafafa` (zinc-50)
- Secondary text: `#a1a1aa` (zinc-400)

### Accent Colors:

- Primary action: `#2563eb` (blue-600)
- Success: `#22c55e` (green-500)
- Fun categories: Purple, pink, red, orange

### Transfer Purpose Colors:

- 💰 General: zinc
- 🎫 Event Ticket: purple ⭐
- 🎵 Concert: pink ⭐
- 🎉 Entertainment: red ⭐
- 🎊 Fun & Leisure: orange ⭐
- 🍽️ Food: yellow
- 📱 Bills: blue
- 👨‍👩‍👦 Family: green

## Animation Patterns

### Transitions:

- Modal slides up from bottom
- Steps transition with fade
- PIN inputs focus with subtle scale
- Success checkmark scales in

### Loading States:

- Spinning border animation
- Subtle pulse on processing

### Interactive Feedback:

- Buttons scale down slightly on press (active:scale-95)
- Hover states change background
- Selected items have colored border
