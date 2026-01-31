# Product Requirements Document (PRD)

## FinEmpowerHer - MVP

---

## 1. Product Overview

**Vision:** A Duolingo-style app that makes financial literacy fun and accessible for women through bite-sized, gamified lessons.

**MVP Goal:** Validate that women will engage with gamified financial education by building the core learning loop.

---

## 2. Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI:** Shadcn UI + Tailwind CSS
- **Database:** SQLite with Prisma ORM
- **Auth:** NextAuth.js with Prisma Adapter (Google OAuth + Credentials with bcrypt password hashing)
- **Animations:** Framer Motion (minimal)
- **Deployment:** Vercel

### Database Architecture

```
prisma/
├── schema.prisma    # Database schema definition
├── dev.db           # SQLite database file (local dev)
└── migrations/      # Database migration history
```

**Why SQLite + Prisma?**

- Zero external dependencies (database is a local file)
- Type-safe database queries with Prisma Client
- Easy migration to PostgreSQL/MySQL for production
- Built-in NextAuth.js adapter support

---

## 3. Core Features (MVP Only)

### 3.1 Essential Features

1. **User Authentication** (NextAuth.js)
2. **Learning Path** (1 course with 5 lessons)
3. **Lesson Interface** (questions + immediate feedback)
4. **Hearts System** (5 hearts, refill daily)
5. **Basic Progress Tracking** (XP, streak)

### 3.2 Out of Scope for MVP

- ❌ AI Chatbot
- ❌ Premium/Stripe integration
- ❌ Practice mode
- ❌ Multiple courses
- ❌ Admin dashboard
- ❌ Achievements/badges
- ❌ Leaderboards

---

## 4. User Flow

```
1. Landing Page → Sign Up (NextAuth.js)
2. Quick Onboarding (3 screens max)
3. Dashboard → Shows learning path
4. Click Lesson → Complete questions
5. See Results → Return to dashboard
```

---

## 5. Screen Specifications

### 5.1 Landing Page

**Components:**

- Hero section with value prop
- "Get Started Free" CTA
- 3 benefit cards (simple, fun, effective)
- Footer with links

**Design:** Clean, feminine color palette (purple/pink accents), welcoming imagery

---

### 5.2 Onboarding (3 screens)

**Screen 1: Welcome**

- Illustration
- "Welcome to FinEmpowerHer!"
- Brief description
- Next button

**Screen 2: Set Your Goal**

- Select one:
  - 📊 Learn to budget
  - 💰 Start saving
  - 📈 Understand investing
  - 💳 Manage debt
- Next button

**Screen 3: Daily Commitment**

- "How much time can you commit daily?"
- Options: 5 min / 10 min / 15 min
- Start Learning button

---

### 5.3 Dashboard

**Layout:**

```
┌─────────────────────────────┐
│ Header                      │
│ [Avatar] [Hearts: ❤️❤️❤️❤️❤️]│
│ Streak: 🔥 3 days          │
└─────────────────────────────┘
│                             │
│ Your Progress               │
│ ━━━━━━━━━━░░░░ 40%         │
│ Level 2 | 180 XP           │
│                             │
│ Continue Learning           │
│ ┌─────────────────────┐    │
│ │ Budgeting Basics    │    │
│ │ Lesson 3 of 5       │    │
│ │ [Continue →]        │    │
│ └─────────────────────┘    │
│                             │
│ Learning Path               │
│ ○ ━━━ ○ ━━━ ○ (Unit 1)   │
│ ✓ ━━━ ✓ ━━━ → (Lessons)  │
│                             │
└─────────────────────────────┘
```

**Key Elements:**

- Hearts counter (top right)
- Streak flame icon + number
- Progress bar showing course completion
- Current XP and level
- "Continue" card for next lesson
- Simple visual learning path

---

### 5.4 Learning Path Screen

**Layout:**

```
Budgeting Basics Course
━━━━━━━━━━━━━━━━━━━

Lesson 1: What is a Budget? ✓
[25 XP earned]

Lesson 2: Income vs Expenses ✓
[25 XP earned]

Lesson 3: The 50/30/20 Rule →
[Not started]

Lesson 4: Tracking Your Spending 🔒

Lesson 5: Adjusting Your Budget 🔒
```

**States:**

- ✓ Completed (green)
- → Current (purple, clickable)
- 🔒 Locked (gray)

---

### 5.5 Lesson Screen

**Layout:**

```
┌─────────────────────────────┐
│ ━━━━━━━━░░░░░░░░░ 6/12    │ ← Progress
│                    ❤️❤️❤️❤️❤️ │ ← Hearts
├─────────────────────────────┤
│                             │
│  [Question Card]            │
│                             │
│  What does the 50 in the    │
│  50/30/20 rule represent?   │
│                             │
│  ┌─────────────────────┐   │
│  │ A) Needs            │   │ ← Answer options
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ B) Wants            │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ C) Savings          │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ D) Debt payments    │   │
│  └─────────────────────┘   │
│                             │
│      [Check Answer]         │ ← Primary button
└─────────────────────────────┘
```

**Question Types (MVP):**

1. **Multiple Choice** (70%)
2. **True/False** (30%)

**Interaction Flow:**

1. User selects answer
2. "Check Answer" button activates
3. Click check → Immediate feedback
4. Correct: Green animation, +XP
5. Incorrect: Red animation, -1 heart, show correct answer
6. "Continue" button appears
7. Next question loads

---

### 5.6 Feedback States

**Correct Answer:**

```
┌─────────────────────────────┐
│   ✓ Correct!                │
│                             │
│   Great job! The 50 in      │
│   50/30/20 represents your  │
│   needs - essentials like   │
│   rent and groceries.       │
│                             │
│   +10 XP                    │
│                             │
│   [Continue]                │
└─────────────────────────────┘
```

**Incorrect Answer:**

```
┌─────────────────────────────┐
│   ✗ Not quite               │
│                             │
│   The correct answer is A.  │
│   The 50 represents needs.  │
│                             │
│   You lost 1 heart ❤️→💔    │
│                             │
│   [Continue]                │
└─────────────────────────────┘
```

**Out of Hearts:**

```
┌─────────────────────────────┐
│   💔 Out of Hearts!         │
│                             │
│   Your hearts will refill   │
│   in 3 hours.               │
│                             │
│   Come back tomorrow to     │
│   continue learning!        │
│                             │
│   [Back to Dashboard]       │
└─────────────────────────────┘
```

---

### 5.7 Lesson Complete Screen

```
┌─────────────────────────────┐
│         🎉                  │
│                             │
│   Lesson Complete!          │
│                             │
│   You earned 50 XP          │
│   Accuracy: 10/12 (83%)     │
│                             │
│   🔥 Streak maintained!     │
│                             │
│   [Continue Learning]       │
│   [Back to Dashboard]       │
└─────────────────────────────┘
```

---

## 6. MVP Content Structure

### Course: Budgeting Basics

**Lesson 1: What is a Budget?** (12 questions)

- Definition of budgeting
- Why budgets matter
- Common budgeting myths

**Lesson 2: Income vs Expenses** (12 questions)

- Types of income
- Fixed vs variable expenses
- Calculating net income

**Lesson 3: The 50/30/20 Rule** (12 questions)

- What each category means
- How to apply it
- Examples

**Lesson 4: Tracking Your Spending** (12 questions)

- Why tracking matters
- Methods for tracking
- Common spending leaks

**Lesson 5: Adjusting Your Budget** (12 questions)

- When to adjust
- How to make changes
- Staying flexible

**Total:** 60 questions for MVP

---

## 7. Design System (Simplified)

### 7.1 Colors

```css
--primary: #8b5cf6 /* Purple */ --secondary: #ec4899 /* Pink */
  --success: #10b981 /* Green */ --error: #ef4444 /* Red */
  --background: #ffffff --card: #f9fafb --text: #111827;
```

### 7.2 Components Needed

**Shadcn Components:**

- Button
- Card
- Progress
- Avatar
- Dialog (for modals)
- Separator

**Custom Components:**

- LessonCard
- QuestionCard
- AnswerOption
- FeedbackModal
- ProgressBar
- HeartDisplay
- StreakBadge

---

## 8. Gamification (MVP Simplified)

### 8.1 Hearts System

- Start with 5 hearts
- Lose 1 heart per wrong answer
- Refill to 5 at midnight (user's timezone)
- Block lesson if 0 hearts
- Show countdown timer for refill

### 8.2 XP System

- +10 XP per correct answer
- +0 XP for incorrect
- +50 XP bonus for completing lesson
- Level up every 100 XP
- Show level on dashboard

### 8.3 Streak System

- Increment by 1 for any lesson completed today
- Reset to 0 if miss a day
- Display flame emoji + number
- Show on dashboard and header

---

## 9. Data Models (Database Schema)

### Prisma Schema

The database is managed via Prisma ORM with SQLite. Schema defined in `prisma/schema.prisma`.

### Authentication Models (NextAuth.js)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed with bcrypt for credentials auth
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Future: User Progress Models (To Be Added)

```prisma
model UserProgress {
  id                  String   @id @default(cuid())
  userId              String   @unique
  currentXp           Int      @default(0)
  currentLevel        Int      @default(1)
  currentStreak       Int      @default(0)
  heartsRemaining     Int      @default(5)
  lastHeartLoss       DateTime?
  lastCompletedLesson DateTime?
  dailyGoalMinutes    Int      @default(5)
  primaryGoal         String?
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model LessonProgress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  completed   Boolean  @default(false)
  accuracy    Float    @default(0)
  xpEarned    Int      @default(0)
  completedAt DateTime?
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
}
```

### Database Commands

```bash
# View database in browser GUI
npx prisma studio

# Run migrations after schema changes
npx prisma migrate dev --name <migration_name>

# Generate Prisma Client after schema changes
npx prisma generate

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

---

## 10. Mobile Responsiveness

### Breakpoints

- **Mobile:** < 640px (primary)
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-First Design

- All screens designed for 375px width first
- Large touch targets (min 44px)
- Bottom spacing for thumb navigation
- Single column layouts
- Swipe for "Continue" (future enhancement)

---

## 11. Development Phases

### Week 1: Foundation

- [x] Set up Next.js project
- [x] Implement NextAuth.js authentication
- [x] Build landing page
- [x] Create onboarding flow
- [x] Set up basic routing

### Week 2: Core Learning Experience

- [x] Build dashboard layout
- [x] Create learning path screen
- [x] Implement lesson interface
- [x] Add question/answer components
- [x] Build feedback modals

### Week 3: Gamification & Data

- [x] Implement hearts system
- [x] Add XP and leveling
- [x] Build streak tracking
- [x] Create progress persistence
- [x] Add lesson completion flow

### Week 4: Polish & Testing

- [ ] Mobile responsiveness audit
- [ ] Add animations
- [x] Content population (60 questions)
- [ ] User testing
- [ ] Bug fixes and optimization
- [ ] Deploy to Vercel

---

## 12. Success Metrics (MVP)

### Primary Metrics

- **Activation:** 70% complete onboarding
- **Engagement:** 50% complete Lesson 1
- **Retention:** 30% return next day
- **Completion:** 20% finish all 5 lessons

### Tracking Events

- Sign up completed
- Onboarding completed
- Lesson started
- Lesson completed
- Daily return (streak maintained)
- Heart refill triggered

---

## 13. Out of Scope (Post-MVP)

**Phase 2 Candidates:**

- AI Chatbot for Q&A
- Premium tier (unlimited hearts)
- Additional courses
- Practice mode
- Achievements and badges
- Social features
- Admin dashboard

---

**Document Version:** 1.0 (MVP)  
**Timeline:** 4 weeks  
**Focus:** Validate core learning loop with minimal viable gamification  
**Next Steps:** Begin Week 1 development
