"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Course } from "@/data/lessons";
import {
  Wallet,
  Landmark,
  TrendingUp,
  CreditCard,
  Home,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

interface CourseCardProps {
  course: Course;
  completedLessons: number;
  totalLessons: number;
  route: string;
  isActive?: boolean;
}

const courseIcons: Record<string, React.ReactNode> = {
  "budgeting-basics": <Wallet className="w-6 h-6" />,
  "retirement-savings": <Landmark className="w-6 h-6" />,
  "investing-basics": <TrendingUp className="w-6 h-6" />,
  "credit-debit": <CreditCard className="w-6 h-6" />,
  "loans-mortgages": <Home className="w-6 h-6" />,
};

const courseColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "budgeting-basics": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/30",
  },
  "retirement-savings": {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/30",
  },
  "investing-basics": {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-500/30",
  },
  "credit-debit": {
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    border: "border-orange-500/30",
  },
  "loans-mortgages": {
    bg: "bg-rose-500/10",
    text: "text-rose-600",
    border: "border-rose-500/30",
  },
};

export function CourseCard({
  course,
  completedLessons,
  totalLessons,
  route,
  isActive = false,
}: CourseCardProps) {
  const progress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isCompleted = completedLessons === totalLessons && totalLessons > 0;
  const isStarted = completedLessons > 0;

  const colors = courseColors[course.id] || {
    bg: "bg-gray-500/10",
    text: "text-gray-600",
    border: "border-gray-500/30",
  };

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        isActive ? `ring-2 ring-primary/20 ${colors.border}` : "border-border"
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
            {courseIcons[course.id] || <Wallet className="w-6 h-6" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{course.title}</h3>
              {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {course.description}
            </p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {completedLessons} of {totalLessons} lessons
                </span>
                <span className={`font-medium ${colors.text}`}>
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-4 flex justify-end">
          <Link href={route}>
            <Button
              variant={isStarted && !isCompleted ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              {isCompleted ? (
                "Review"
              ) : isStarted ? (
                <>
                  <PlayCircle className="w-4 h-4" />
                  Continue
                </>
              ) : (
                "Start Course"
              )}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
