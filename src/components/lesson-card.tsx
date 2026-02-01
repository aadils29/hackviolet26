"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/data/lessons";
import { Lock } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
  status: "completed" | "current" | "locked";
  lessonNumber: number;
  xpEarned?: number;
}

export function LessonCard({
  lesson,
  status,
  lessonNumber,
  xpEarned,
}: LessonCardProps) {
  const statusStyles = {
    completed: "border-success/30 bg-success/5",
    current: "border-primary ring-2 ring-primary/20 bg-primary/5",
    locked: "border-gray-200 bg-gray-50 opacity-60",
  };

  const statusColors = {
    completed: "text-success",
    current: "text-primary",
    locked: "text-gray-400",
  };

  const getStatusIcon = (status: "completed" | "current" | "locked") => {
    if (status === "completed") return "✓";
    if (status === "current") return "→";
    return <Lock className="w-4 h-4" />;
  };

  return (
    <Card className={`transition-all ${statusStyles[status]}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold ${statusColors[status]}`}>
                {getStatusIcon(status)}
              </span>
              <span className="text-sm text-muted-foreground">
                Lesson {lessonNumber}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground">
              {lesson.description}
            </p>

            {status === "completed" && xpEarned && (
              <p className="text-sm text-success mt-2">+{xpEarned} XP earned</p>
            )}
          </div>

          {status === "current" && (
            <Link href={`/lesson/${lesson.id}`}>
              <Button size="sm">Start</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
