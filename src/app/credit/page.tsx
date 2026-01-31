"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { HeartDisplay } from "@/components/heart-display";
import { StreakBadge } from "@/components/streak-badge";
import { LearningPath } from "@/components/learning-path";
import { Sidebar } from "@/components/sidebar";
import { creditCourse } from "@/data/lessons";

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

export default function CreditPage() {
  const router = useRouter();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const prefs = localStorage.getItem("userPreferences");
    if (!prefs) {
      router.push("/onboarding");
      return;
    }

    // Load user progress
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
      setUserProgress(defaultProgress);
      localStorage.setItem("userProgress", JSON.stringify(defaultProgress));
    }

    // Load lesson progress
    const lessonProg = localStorage.getItem("lessonProgress");
    if (lessonProg) {
      setLessonProgress(JSON.parse(lessonProg));
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (!userProgress) return null;

  const courseLessonIds = creditCourse.lessons.map((l) => l.id);
  const completedLessonIds = lessonProgress
    .filter((lp) => lp.completed && courseLessonIds.includes(lp.lessonId))
    .map((lp) => lp.lessonId);
  const currentLessonIndex = completedLessonIds.length;

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

        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Credit & Debit Cards 💳
              </h1>
              <p className="text-xl text-muted-foreground">
                Master the use of credit and debit cards
              </p>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {userProgress.currentXp}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      Level {userProgress.currentLevel}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current Level
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {userProgress.currentStreak}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Day Streak
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <LearningPath
              lessons={creditCourse.lessons}
              completedLessonIds={completedLessonIds}
              currentLessonIndex={currentLessonIndex}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
