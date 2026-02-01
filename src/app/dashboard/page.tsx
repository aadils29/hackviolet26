"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { HeartDisplay } from "@/components/heart-display";
import { StreakBadge } from "@/components/streak-badge";
import { LearningPath } from "@/components/learning-path";
import { Sidebar } from "@/components/sidebar";
import { budgetingCourse } from "@/data/lessons";

interface UserProgress {
  currentXp: number;
  currentLevel: number;
  currentStreak: number;
  heartsRemaining: number;
  lastHeartLoss: string | null;
  lastCompletedLesson: string | null;
}

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  accuracy: number;
  xpEarned: number;
  completedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Check if user has completed onboarding
      const prefs = localStorage.getItem("userPreferences");
      if (!prefs) {
        router.push("/onboarding");
        return;
      }

      if (status === "loading") return;

      if (session?.user) {
        // Fetch from API for authenticated users
        try {
          const [progressRes, lessonsRes] = await Promise.all([
            fetch("/api/progress"),
            fetch("/api/progress/lessons"),
          ]);

          if (progressRes.ok) {
            const progressData = await progressRes.json();
            setUserProgress({
              currentXp: progressData.currentXp,
              currentLevel: progressData.currentLevel,
              currentStreak: progressData.currentStreak,
              heartsRemaining: progressData.heartsRemaining,
              lastHeartLoss: progressData.lastHeartLoss,
              lastCompletedLesson: progressData.lastCompletedLesson,
            });
          }

          if (lessonsRes.ok) {
            const lessonsData = await lessonsRes.json();
            setLessonProgress(lessonsData);
          }
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      } else {
        // Fallback to localStorage for unauthenticated users
        const progress = localStorage.getItem("userProgress");
        if (progress) {
          setUserProgress(JSON.parse(progress));
        } else {
          // Initialize default progress
          const defaultProgress: UserProgress = {
            currentXp: 0,
            currentLevel: 1,
            currentStreak: 0,
            heartsRemaining: 5,
            lastHeartLoss: null,
            lastCompletedLesson: null,
          };
          localStorage.setItem("userProgress", JSON.stringify(defaultProgress));
          setUserProgress(defaultProgress);
        }

        // Load lesson progress from localStorage
        const lessons = localStorage.getItem("lessonProgress");
        if (lessons) {
          setLessonProgress(JSON.parse(lessons));
        }
      }

      setIsLoading(false);
    };

    loadData();
  }, [router, session, status]);

  if (isLoading || !userProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💰</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate current lesson
  const completedLessonIds = lessonProgress
    .filter((lp) => lp.completed)
    .map((lp) => lp.lessonId);

  const currentLessonIndex = completedLessonIds.length;
  const totalLessons = budgetingCourse.lessons.length;
  const courseProgress = (completedLessonIds.length / totalLessons) * 100;

  const allLessonsCompleted = currentLessonIndex >= totalLessons;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/logo-only.png"
                  alt="FinFemme Logo"
                  className="h-8 w-8"
                />
                <img src="/F.png" alt="FinFemme" className="h-6" />
              </div>
              <div className="flex items-center gap-3">
                <StreakBadge streak={userProgress.currentStreak} />
                <HeartDisplay hearts={userProgress.heartsRemaining} />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-lg pb-24 md:pb-8">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Learn</h1>
            <div className="flex items-center gap-4">
              <StreakBadge streak={userProgress.currentStreak} />
              <HeartDisplay hearts={userProgress.heartsRemaining} />
            </div>
          </div>

          {/* Stats Bar */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {userProgress.currentXp}
                  </p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-500">
                    {userProgress.currentStreak}
                  </p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">
                    {completedLessonIds.length}/{totalLessons}
                  </p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Out of Hearts Warning */}
          {userProgress.heartsRemaining === 0 && (
            <Card className="mb-6 border-destructive bg-destructive/5">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">💔</div>
                <h2 className="text-xl font-bold text-destructive mb-2">
                  Out of Hearts!
                </h2>
                <p className="text-muted-foreground">
                  Your hearts will refill tomorrow. Come back then to continue
                  learning!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Course Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">{budgetingCourse.title}</h2>
            <p className="text-muted-foreground">
              {budgetingCourse.description}
            </p>
          </div>

          {/* Learning Path */}
          <LearningPath
            lessons={budgetingCourse.lessons}
            completedLessonIds={completedLessonIds}
            currentLessonIndex={currentLessonIndex}
          />
        </main>
      </div>
    </div>
  );
}
