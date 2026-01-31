"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HeartDisplay } from "@/components/heart-display";
import { StreakBadge } from "@/components/streak-badge";
import { XpProgress } from "@/components/xp-progress";
import { LessonCard } from "@/components/lesson-card";
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
      localStorage.setItem("userProgress", JSON.stringify(defaultProgress));
      setUserProgress(defaultProgress);
    }

    // Load lesson progress
    const lessons = localStorage.getItem("lessonProgress");
    if (lessons) {
      setLessonProgress(JSON.parse(lessons));
    }

    setIsLoading(false);
  }, [router]);

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
  
  const currentLesson = budgetingCourse.lessons[currentLessonIndex];
  const allLessonsCompleted = currentLessonIndex >= totalLessons;

  const getLessonStatus = (lessonId: string, index: number) => {
    if (completedLessonIds.includes(lessonId)) return "completed";
    if (index === currentLessonIndex) return "current";
    return "locked";
  };

  const getLessonXp = (lessonId: string) => {
    const lp = lessonProgress.find((p) => p.lessonId === lessonId);
    return lp?.xpEarned || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-xl text-primary">FinEmpowerHer</span>
            </div>
            <div className="flex items-center gap-4">
              <StreakBadge streak={userProgress.currentStreak} />
              <HeartDisplay hearts={userProgress.heartsRemaining} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Course Progress</span>
                  <span className="font-medium">{Math.round(courseProgress)}%</span>
                </div>
                <Progress value={courseProgress} className="h-3" />
              </div>
              <XpProgress
                currentXp={userProgress.currentXp}
                currentLevel={userProgress.currentLevel}
              />
            </div>
          </CardContent>
        </Card>

        {/* Continue Learning Card */}
        {!allLessonsCompleted && currentLesson && userProgress.heartsRemaining > 0 && (
          <Card className="mb-6 border-primary bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Continue Learning</p>
                  <h2 className="text-xl font-bold">{currentLesson.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Lesson {currentLessonIndex + 1} of {totalLessons}
                  </p>
                </div>
                <Link href={`/lesson/${currentLesson.id}`}>
                  <Button size="lg">Continue →</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Out of Hearts Warning */}
        {userProgress.heartsRemaining === 0 && (
          <Card className="mb-6 border-destructive bg-destructive/5">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">💔</div>
              <h2 className="text-xl font-bold text-destructive mb-2">Out of Hearts!</h2>
              <p className="text-muted-foreground">
                Your hearts will refill tomorrow. Come back then to continue learning!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Course Completed */}
        {allLessonsCompleted && (
          <Card className="mb-6 border-success bg-success/5">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-xl font-bold text-success mb-2">Course Completed!</h2>
              <p className="text-muted-foreground">
                Congratulations! You&apos;ve mastered Budgeting Basics.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Learning Path */}
        <div>
          <h2 className="text-xl font-bold mb-4">{budgetingCourse.title}</h2>
          <div className="space-y-3">
            {budgetingCourse.lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                lessonNumber={index + 1}
                status={getLessonStatus(lesson.id, index)}
                xpEarned={getLessonXp(lesson.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
