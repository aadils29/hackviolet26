# FinFemme

> A Duolingo-style gamified financial literacy platform designed to empower women through bite-sized, interactive lessons.

FinFemme makes learning personal finance fun and accessible, focusing on budgeting, investing, retirement, credit, and loans. Built for [HackViolet 2026](https://hackviolet.org/).

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)

## Features

### Gamified Learning

- **XP System** - Earn experience points for completing lessons
- **Streak Tracking** - Maintain daily streaks to stay motivated
- **Hearts System** - 5 hearts that refill daily, lose hearts on wrong answers
- **Levels** - Progress through levels as you gain XP

### Interactive Lessons

- Multiple-choice and true/false questions
- Immediate feedback with explanations
- Courses covering:
  - Budgeting Basics
  - Investing Fundamentals
  - Retirement Planning
  - Credit Management
  - Loans & Debt

### Progress Tracking

- Visual learning path with course progression
- Dashboard with XP, level, streak, and hearts display
- Lesson completion tracking with accuracy metrics

### User Experience

- **Authentication** - Secure sign-up/sign-in with Google OAuth or email/password
- **Responsive Design** - Mobile-first experience with beautiful UI components
- **Smooth Animations** - Delightful transitions powered by Framer Motion

## Tech Stack

### Frontend

| Technology                                      | Version | Purpose                            |
| ----------------------------------------------- | ------- | ---------------------------------- |
| [Next.js](https://nextjs.org/)                  | 16.1.6  | React framework with App Router    |
| [React](https://react.dev/)                     | 19.2.3  | UI library                         |
| [TypeScript](https://www.typescriptlang.org/)   | 5.x     | Type-safe JavaScript               |
| [Tailwind CSS](https://tailwindcss.com/)        | 4.x     | Utility-first CSS framework        |
| [Shadcn UI](https://ui.shadcn.com/)             | -       | Beautiful UI components (Radix UI) |
| [Framer Motion](https://www.framer.com/motion/) | 12.x    | Animation library                  |
| [Lucide React](https://lucide.dev/)             | 0.563.0 | Icon library                       |

### Backend

| Technology                                         | Version | Purpose                                     |
| -------------------------------------------------- | ------- | ------------------------------------------- |
| [NextAuth.js](https://next-auth.js.org/)           | 4.24.13 | Authentication (Google OAuth + Credentials) |
| [Prisma](https://www.prisma.io/)                   | 5.22.0  | Type-safe ORM                               |
| [SQLite](https://www.sqlite.org/)                  | -       | Database (easily scalable to PostgreSQL)    |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | 3.x     | Password hashing                            |

### Deployment

| Service                       | Purpose              |
| ----------------------------- | -------------------- |
| [Vercel](https://vercel.com/) | Hosting & deployment |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js routes
│   │   └── progress/      # Progress tracking endpoints
│   ├── dashboard/         # Main dashboard
│   ├── lesson/[id]/       # Dynamic lesson pages
│   ├── budgeting/         # Course: Budgeting
│   ├── investing/         # Course: Investing
│   ├── retirement/        # Course: Retirement
│   ├── credit/            # Course: Credit
│   ├── loans/             # Course: Loans
│   ├── quests/            # Daily quests
│   ├── friends/           # Social features
│   └── onboarding/        # User onboarding flow
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── course-card.tsx   # Course display card
│   ├── lesson-card.tsx   # Lesson display card
│   ├── learning-path.tsx # Visual progress path
│   ├── xp-progress.tsx   # XP progress bar
│   ├── heart-display.tsx # Hearts UI
│   └── streak-badge.tsx  # Streak display
├── data/                 # Static lesson data
│   └── lessons.ts        # Course & lesson definitions
├── lib/                  # Utility functions
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Helper functions
└── types/               # TypeScript definitions
    └── next-auth.d.ts   # NextAuth type extensions

prisma/
├── schema.prisma        # Database schema
├── dev.db              # SQLite database (local)
└── migrations/         # Database migrations
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aadils29/hackviolet26.git
   cd hackviolet26
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run start`          | Start production server  |
| `npm run lint`           | Run ESLint               |
| `npx prisma studio`      | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations  |

## Database Schema

The app uses Prisma with SQLite for data persistence:

- **User** - User accounts with NextAuth.js integration
- **UserProgress** - XP, level, streak, and hearts tracking
- **LessonProgress** - Individual lesson completion and accuracy
- **Account** - OAuth provider accounts
- **Session** - User sessions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built for HackViolet 2026
