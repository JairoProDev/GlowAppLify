# MVP Roadmap: 30-Day Execution Plan

## 1. MVP Definition & Scope

### 1.1 What is the MVP?

**The Minimum Viable Product is**:
A web app where a user can:
1. Complete a 3-5 minute conversational onboarding
2. Receive an AI-generated Execution Board in 30 seconds
3. See their personalized daily actions every morning
4. Check off completed actions
5. Do an evening check-in
6. View basic progress metrics

**The MVP is NOT**:
- A mobile app (web-first, mobile-responsive)
- A social network (no sharing, no friends, no feed)
- A full productivity suite (no calendar, no integrations)
- A freemium business (everyone gets full access)

### 1.2 The One Thing the MVP Must Nail

**Success Criterion**: A user goes from "I want to achieve X" to completing their first action in less than 10 minutes.

**Why This Matters**: Time-to-value. If users don't see immediate utility, they bounce.

---

## 2. Feature Breakdown: Must-Have vs Nice-to-Have

### 2.1 MUST HAVE (MVP Core)

**Onboarding**:
- ✅ 4-step conversational flow
- ✅ Text input + category selection
- ✅ Skip options (generates generic board)
- ✅ Progress bar (1/4, 2/4, 3/4, 4/4)

**AI Generation**:
- ✅ Claude API integration
- ✅ Board generation (all 5 layers)
- ✅ 30-second generation with loading state
- ✅ Fallback to GPT-4 if Claude fails

**Execution Board View**:
- ✅ All 5 layers visible (scroll view)
- ✅ Vision layer (Future Self text + mantra)
- ✅ Goal layer (SMART goal + KPIs + deadline)
- ✅ Execution layer (5 daily actions)
- ✅ Obstacle layer (if-then plans)
- ✅ Habits layer (morning/evening rituals)

**Daily Execution View**:
- ✅ "Your ONE Thing" highlighted
- ✅ 4 other actions listed
- ✅ Check/uncheck functionality
- ✅ Streak counter (basic)

**Evening Check-in**:
- ✅ Review completed actions
- ✅ Mood selection (3 options: Great/OK/Struggled)
- ✅ Optional 1-sentence reflection

**User Account**:
- ✅ Email/password OR Google OAuth signup
- ✅ Login/logout
- ✅ Profile page (basic)

**Data Persistence**:
- ✅ Save board to database
- ✅ Save daily logs
- ✅ Retrieve board on re-login

### 2.2 NICE TO HAVE (V2+)

**Not in MVP**:
- ❌ Multiple boards
- ❌ Board regeneration (users can edit manually)
- ❌ Weekly AI review/adjustments
- ❌ Push notifications
- ❌ Calendar integration
- ❌ Wearable sync (Apple Health, Oura, etc.)
- ❌ Social features (sharing, friends, cohorts)
- ❌ Native mobile apps (iOS, Android)
- ❌ Dark mode (default: light mode only)
- ❌ Advanced analytics (just % completion)
- ❌ Export (PDF, CSV)
- ❌ AI chat (proactive coaching)
- ❌ Habit streak recovery
- ❌ Payment/billing (no monetization in MVP)

---

## 3. 30-Day Build Plan

### 3.1 Week 1: Foundation (Days 1-7)

**Day 1-2: Project Setup**
- ✅ Initialize Next.js 14 project
- ✅ Set up Tailwind CSS + Shadcn/UI
- ✅ Configure TypeScript
- ✅ Set up Git + GitHub repo
- ✅ Deploy to Vercel (hello world)

**Day 3-4: Database + Auth**
- ✅ Set up Supabase project
- ✅ Create database schema (tables: users, execution_boards, daily_logs)
- ✅ Implement Supabase Auth (email + Google OAuth)
- ✅ Test signup/login flow

**Day 5-7: AI Integration**
- ✅ Set up Claude API account
- ✅ Create board generation prompt
- ✅ Test prompt manually (10+ variations)
- ✅ Build API route: `/api/board/generate`
- ✅ Test end-to-end generation

**Deliverable**: Working auth + AI board generation backend

---

### 3.2 Week 2: Onboarding (Days 8-14)

**Day 8-9: Onboarding UI**
- ✅ Design 4-step flow (Figma or direct code)
- ✅ Build Step 1: Goal input (text + categories)
- ✅ Build Step 2: Context selection (dropdown)
- ✅ Build Step 3: Obstacle checkboxes
- ✅ Build Step 4: Future Self textarea

**Day 10-11: Onboarding Logic**
- ✅ Form state management (React Hook Form or Zustand)
- ✅ Validation (require at least goal)
- ✅ Submit onboarding data to `/api/board/generate`
- ✅ Loading state (30-sec animation + tips)

**Day 12-14: Board Presentation**
- ✅ Build Execution Board UI (all 5 layers)
- ✅ Render AI-generated content
- ✅ Add "Edit" button (manual text editing)
- ✅ Save edited board to database

**Deliverable**: Complete onboarding → board generation → board view

---

### 3.3 Week 3: Daily Execution (Days 15-21)

**Day 15-16: Daily View UI**
- ✅ Morning view: "Your ONE Thing" + 4 other actions
- ✅ Action cards with checkbox
- ✅ Streak display (days counter)

**Day 17-18: Action Tracking Logic**
- ✅ API route: `/api/daily/:boardId/:date/action/:actionId/complete`
- ✅ Optimistic UI updates (instant feedback)
- ✅ Save to `daily_logs` table
- ✅ Calculate streak (consecutive days with ≥1 action)

**Day 19-21: Evening Check-in**
- ✅ Evening view UI
- ✅ Show completed vs pending actions
- ✅ Mood selector (3 buttons: 😊/😐/😕)
- ✅ Optional reflection input
- ✅ Save check-in to database
- ✅ Generate "tomorrow's plan" preview

**Deliverable**: Full daily execution loop (morning → actions → evening)

---

### 3.4 Week 4: Polish & Test (Days 22-30)

**Day 22-24: UI/UX Polish**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states everywhere (skeletons)
- ✅ Error states (API failures, validation errors)
- ✅ Empty states (no board yet, no actions today)
- ✅ Micro-animations (check mark, progress bar)

**Day 25-26: Testing**
- ✅ Manual testing (10+ onboarding flows)
- ✅ Edge cases (special characters in goals, very long text, etc.)
- ✅ Cross-browser testing (Chrome, Safari, Firefox)
- ✅ Mobile testing (iOS Safari, Android Chrome)

**Day 27-28: Analytics Setup**
- ✅ PostHog integration
- ✅ Track events: signup, onboarding_complete, action_complete, check-in
- ✅ Set up dashboard for key metrics

**Day 29: Beta Prep**
- ✅ Write onboarding email sequence
- ✅ Create feedback form (Google Form or Typeform)
- ✅ Prepare demo video (Loom, 2-3 min)

**Day 30: Launch to 20 Beta Users**
- ✅ Send invites to personal network
- ✅ Monitor first sessions (PostHog)
- ✅ Collect feedback (interviews + form)

**Deliverable**: MVP live, 20 users testing

---

## 4. Success Metrics (MVP)

### 4.1 North Star Metric

**Weekly Active Execution Users (WAEU)**

Definition: Users who completed ≥3 actions in the last 7 days

**Target (Month 1)**: 40% of signups

**Why**: Indicates the board is useful and users are executing.

### 4.2 Supporting Metrics

| Metric | MVP Target | Measurement Method |
|--------|-----------|-------------------|
| **Onboarding Completion Rate** | >75% | % who finish Step 4 / % who start |
| **Time to First Action** | <24 hours | Avg time from signup to 1st checked action |
| **D7 Retention** | >40% | % who return Day 7 / % who signed up |
| **D30 Retention** | >20% | % who return Day 30 / % who signed up |
| **Actions Completion Rate** | >50% | Avg % of daily actions completed |
| **Evening Check-in Rate** | >60% | % of days with check-in / total days |
| **NPS (Net Promoter Score)** | >40 | Survey: "How likely to recommend?" (0-10) |

### 4.3 Qualitative Metrics

**Weekly User Interviews**: 3-5 users/week

**Key Questions**:
1. Did the AI-generated board feel relevant?
2. Were daily actions realistic?
3. What caused you to skip actions?
4. Would you pay for this? How much?
5. What's missing?

---

## 5. Go-to-Market (MVP Launch)

### 5.1 Phase 1: Friends & Family (Week 1)

**Target**: 20 users

**Channels**:
- Personal network
- Direct messages (WhatsApp, LinkedIn, Email)

**Goal**: Test onboarding flow, gather initial feedback

### 5.2 Phase 2: Expanded Beta (Week 2-4)

**Target**: 100 users

**Channels**:
- Twitter/X (founder's account)
- Reddit (r/productivity, r/getdisciplined)
- Indie Hackers
- ProductHunt "Coming Soon" page

**Content**:
- Tweet: "I'm building an AI that converts any goal into a daily action plan. Want early access?"
- Reddit post: "Tried every productivity app. They all failed me. Here's what I'm building instead."

**Assets Needed**:
- Demo video (2 min)
- Landing page with signup form
- Email sequence (welcome, tips, ask for feedback)

### 5.3 Phase 3: ProductHunt Launch (Month 2-3)

**Preparation**:
- Build hunter relationships (DM top 10 hunters)
- Prepare assets: Logo, screenshots, demo video, maker comments
- Activate beta users as "supporters"

**Launch Day Strategy**:
- Post at 12:01am PST (max visibility)
- Respond to ALL comments in first 6 hours
- Ask beta users to upvote + comment

**Goal**: Top 5 Product of the Day

---

## 6. Risk Mitigation

### 6.1 Top Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **AI generates irrelevant boards** | Medium | Critical | Extensive prompt testing (100+ variations), feedback loop after every generation |
| **Users abandon after onboarding** | High | High | Quick wins (first action <15 min), evening check-in reminder, "How's it going?" email Day 3 |
| **API costs explode** | Medium | High | Cache responses, limit free tier regenerations, monitor spend daily |
| **Users don't understand value prop** | Medium | Medium | Clear landing page copy, demo video, onboarding tooltips |
| **Technical bugs on launch** | Low | High | Thorough testing, staged rollout, feature flags (PostHog) |

### 6.2 Contingency Plans

**If onboarding completion <50%**:
- A/B test shorter onboarding (2 steps instead of 4)
- Add "Skip all" option (generates generic board)

**If D7 retention <30%**:
- Implement daily email reminder
- Add "quick add" action feature (don't wait for AI)

**If AI quality is poor**:
- Manually review first 50 boards
- Refine prompts based on failure patterns
- Add human-in-the-loop approval (temporary)

---

## 7. Post-MVP Roadmap (Months 2-6)

### 7.1 Month 2: Iteration

**Focus**: Fix what's broken

**Activities**:
- Weekly user interviews (5/week)
- Ship bug fixes daily
- A/B test onboarding variants
- Improve AI prompts based on feedback

**Metrics Goal**:
- D7 retention >50%
- WAEU >60%

### 7.2 Month 3: Feature Expansion

**New Features**:
- ✅ Weekly AI review (auto-adjusts actions)
- ✅ Board regeneration (max 1/week)
- ✅ Push notifications (morning + evening)
- ✅ Dark mode

**Metrics Goal**:
- 500 total users
- 100 paying users (if introduce Pro tier)

### 7.3 Month 4-6: Social Layer (V2)

**New Features**:
- ✅ Accountability circles (invite 3-12 friends)
- ✅ Cohort challenges (7/14/30 day challenges)
- ✅ Progress sharing (shareable recap card)

**Metrics Goal**:
- 2,000 total users
- 30% have ≥1 friend in app

---

## 8. Team & Roles (Solo Founder MVP)

### 8.1 Jairo's Responsibilities (Everything 😅)

**Week 1-2**: Full-stack development (Next.js + Supabase + AI)
**Week 3**: Frontend UI polish
**Week 4**: Testing + beta prep

**Time Allocation**:
- Coding: 70%
- Design: 15%
- User research: 10%
- Marketing prep: 5%

### 8.2 When to Hire (Post-MVP)

**Month 3-4**: Consider contractor for:
- UI/UX design (Figma mockups)
- Content writing (landing page, emails)
- Video editing (demo videos)

**Month 6+**: Consider full-time hire for:
- Frontend engineer (if scaling fast)
- Growth marketer (if PMF confirmed)

---

## 9. Budget (MVP)

### 9.1 Essential Costs

| Item | Cost/Month | Notes |
|------|-----------|-------|
| **Vercel** | $0 | Hobby plan sufficient for MVP |
| **Supabase** | $0 | Free tier: 50K users, 500MB DB |
| **Claude API** | $50-200 | Depends on usage (~500 boards/month = $100) |
| **Domain** | $12/year | .com domain |
| **PostHog** | $0 | Free tier: 1M events/month |
| **Total** | **~$100/month** | Scales with usage |

### 9.2 Optional Costs

| Item | Cost | ROI |
|------|------|-----|
| **Paid ads** (Google/Facebook) | $500 | Risky for MVP, defer to Month 3+ |
| **ProductHunt promoted post** | $500 | Medium ROI, consider if organic traction low |
| **Logo design** (Fiverr) | $50 | Low priority, use AI-generated initially |

**Total MVP Budget**: <$200

---

## 10. Launch Checklist

### 10.1 Pre-Launch (Day 29)

- [ ] All core features working (test 10+ times)
- [ ] Mobile responsive (test on 3 devices)
- [ ] Error tracking (Sentry) installed
- [ ] Analytics (PostHog) working
- [ ] Landing page live
- [ ] Demo video uploaded
- [ ] Beta user list ready (20 emails)
- [ ] Onboarding email sequence written
- [ ] Feedback form created

### 10.2 Launch Day (Day 30)

- [ ] Send beta invites (9am)
- [ ] Monitor first sessions (every hour)
- [ ] Respond to feedback (within 2 hours)
- [ ] Fix critical bugs (if any) immediately
- [ ] Tweet about launch
- [ ] Post in Indie Hackers

### 10.3 Post-Launch (Days 31-37)

- [ ] User interviews (3-5 users)
- [ ] Analyze metrics (PostHog)
- [ ] Prioritize bug fixes
- [ ] Ship improvements daily
- [ ] Send "Day 7" feedback request email

---

## 11. Definition of Success (MVP)

### 11.1 Minimum Viable Success

**After 30 days**:
- ✅ 20 users signed up
- ✅ 10 users completed onboarding
- ✅ 5 users returned Day 7
- ✅ 3 users would "definitely recommend" (NPS 9-10)

**If this happens**: MVP validated, continue to Phase 2.

### 11.2 Failure Criteria

**After 30 days**:
- ❌ <10 users signed up → Marketing problem
- ❌ <50% onboarding completion → UX problem
- ❌ <20% D7 retention → Product-market fit problem
- ❌ NPS <30 → Core value prop missing

**If this happens**: Pivot or iterate aggressively.

### 11.3 Exceptional Success

**After 30 days**:
- 🚀 100+ users signed up
- 🚀 >70% onboarding completion
- 🚀 >50% D7 retention
- 🚀 Organic referrals (users inviting friends)

**If this happens**: Scale marketing, prepare for ProductHunt launch ASAP.

---

## Conclusion: The 30-Day Mission

**The goal is not to build a perfect product.**

**The goal is to validate one hypothesis**:

> "Can AI + behavioral science convert a vague goal into a daily action system that users actually execute?"

**If YES** → We have a unicorn.

**If NO** → We learn what's missing and iterate.

**Either way, we ship in 30 days. No excuses.** 🚀
