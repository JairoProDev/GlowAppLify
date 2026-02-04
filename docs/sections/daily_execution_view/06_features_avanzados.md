## 🎯 PARTE 6: FEATURES AVANZADOS

### 6.1 DEEP WORK TIMER

**Features:**
- Countdown timer (visual)
- Focus music integration (Spotify/YouTube)
- DND mode suggestion (mobile)
- Pomodoro breaks (optional: 25min work, 5min break)
- Background tracking (continues if app closed)

**Implementation:**
```typescript
const DeepWorkTimer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPaused]);
  
  return (
    <div className="timer">
      <h1>{formatTime(timeLeft)}</h1>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};
```

---

### 6.2 SMART RESCHEDULING

**Scenario:** User skips their ONE Thing

**AI Response:**
```
⚠️ You skipped your ONE Thing today.

No problem! Life happens. 

Options:
1. [Do it now] (You still have 2h before bed)
2. [Move to tomorrow morning] (7-9am slot)
3. [Skip and adjust plan] (I'll rebalance your week)

What works best?
```

**Implementation:**
- Detects if ONE Thing incomplete by 8pm
- Offers 3 options
- If option 3: AI regenerates Week plan (extends timeline or removes less critical actions)

---

### 6.3 ENERGY TRACKING & LEARNING

**Feature:** AI learns when you actually DO tasks (not just when you say)

```typescript
// Track actual completion times
const trackActualTiming = async (action, completedAt) => {
  // Record: User completed creative work at 8pm
  // vs
  // Scheduled: 7pm
  
  // AI learns: "User tends to start 1h late"
  // or
  // "User does creative work better 8-10pm than 7-9pm"
  
  // Update energy profile over time
  await updateEnergyProfile(user.id, {
    observedPattern: {
      taskType: action.type,
      completedAt: completedAt.getHours(),
      performance: action.qualityScore // Self-reported or inferred
    }
  });
};
```

**Result:** After 2-3 weeks, AI timing suggestions become hyper-personalized

---