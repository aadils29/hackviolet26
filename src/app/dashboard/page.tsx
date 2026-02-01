"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartDisplay } from "@/components/heart-display";
import { StreakBadge } from "@/components/streak-badge";
import { CourseCard } from "@/components/course-card";
import { Sidebar } from "@/components/sidebar";
import { PlayCircle } from "lucide-react";
import {
  budgetingCourse,
  retirementCourse,
  investingCourse,
  creditCourse,
  loansCourse,
  Course,
} from "@/data/lessons";

// All available courses with their routes
const allCourses: { course: Course; route: string }[] = [
  { course: budgetingCourse, route: "/budgeting" },
  { course: retirementCourse, route: "/retirement" },
  { course: investingCourse, route: "/investing" },
  { course: creditCourse, route: "/credit" },
  { course: loansCourse, route: "/loans" },
];

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

  // Calculate progress for each course
  const completedLessonIds = lessonProgress
    .filter((lp) => lp.completed)
    .map((lp) => lp.lessonId);

  // Calculate per-course progress
  const getCourseProgress = (course: Course) => {
    const courseLessonIds = course.lessons.map((l) => l.id);
    const completed = courseLessonIds.filter((id) =>
      completedLessonIds.includes(id),
    ).length;
    return { completed, total: course.lessons.length };
  };

  // Find the most recently active course (one with progress but not complete)
  const getActiveCourse = () => {
    for (const { course, route } of allCourses) {
      const progress = getCourseProgress(course);
      if (progress.completed > 0 && progress.completed < progress.total) {
        // Find the next lesson in this course
        const nextLessonIndex = course.lessons.findIndex(
          (l) => !completedLessonIds.includes(l.id),
        );
        return {
          course,
          route,
          nextLesson: course.lessons[nextLessonIndex],
          lessonNumber: nextLessonIndex + 1,
        };
      }
    }
    // Default to first course if none in progress
    const firstCourse = allCourses[0];
    const progress = getCourseProgress(firstCourse.course);
    if (progress.completed < progress.total) {
      const nextLessonIndex = firstCourse.course.lessons.findIndex(
        (l) => !completedLessonIds.includes(l.id),
      );
      return {
        course: firstCourse.course,
        route: firstCourse.route,
        nextLesson: firstCourse.course.lessons[nextLessonIndex],
        lessonNumber: nextLessonIndex + 1,
      };
    }
    return null;
  };

  const activeCourse = getActiveCourse();

  // Calculate total stats across all courses
  const totalLessons = allCourses.reduce(
    (sum, { course }) => sum + course.lessons.length,
    0,
  );
  const totalCompletedLessons = completedLessonIds.length;

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

        <main className="container mx-auto px-4 py-8 max-w-2xl pb-24 md:pb-8">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
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
                    {totalCompletedLessons}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lessons Complete
                  </p>
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

          {/* Continue Learning Card */}
          {activeCourse && userProgress.heartsRemaining > 0 && (
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Continue Learning
                    </p>
                    <h3 className="font-semibold text-lg">
                      {activeCourse.course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Lesson {activeCourse.lessonNumber}:{" "}
                      {activeCourse.nextLesson?.title}
                    </p>
                  </div>
                  <Link
                    href={
                      activeCourse.nextLesson
                        ? `/lesson/${activeCourse.nextLesson.id}`
                        : activeCourse.route
                    }
                  >
                    <Button className="gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Continue
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Courses Section */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">Your Courses</h2>
            <p className="text-sm text-muted-foreground">
              Master financial literacy one topic at a time
            </p>
          </div>

          <div className="space-y-4">
            {allCourses.map(({ course, route }) => {
              const progress = getCourseProgress(course);
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  completedLessons={progress.completed}
                  totalLessons={progress.total}
                  route={route}
                  isActive={activeCourse?.course.id === course.id}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
