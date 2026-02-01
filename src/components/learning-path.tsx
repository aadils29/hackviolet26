"use client";

import Link from "next/link";
import { Lock, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Lesson } from "@/data/lessons";

interface LessonNodeProps {
  lesson: Lesson;
  index: number;
  status: "completed" | "current" | "locked";
  totalLessons: number;
}

function LessonNode({ lesson, index, status, totalLessons }: LessonNodeProps) {
  // Determine position - zigzag pattern
  const isEven = index % 2 === 0;
  const offset = isEven ? -40 : 40;

  const nodeContent = (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center"
      style={{ marginLeft: offset }}
    >
      {/* The Circle Node */}
      <div
        className={`
          relative w-20 h-20 rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${
            status === "completed"
              ? "bg-gradient-to-br from-success to-emerald-600 text-white shadow-lg shadow-success/30"
              : status === "current"
                ? "bg-gradient-to-br from-primary to-purple-700 text-white shadow-lg shadow-primary/40 ring-4 ring-primary/30 ring-offset-2"
                : "bg-gray-200 text-gray-400"
          }
          ${status === "current" ? "scale-110" : ""}
          ${status !== "locked" ? "hover:scale-105" : ""}
        `}
      >
        {/* Icon/Number inside circle */}
        {status === "completed" ? (
          <span className="text-3xl">✓</span>
        ) : status === "locked" ? (
          <Lock className="w-8 h-8" />
        ) : (
          <span className="text-2xl font-bold">{index + 1}</span>
        )}

        {/* Pulse animation for current lesson */}
        {status === "current" && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        )}
      </div>

      {/* Lesson Title */}
      <div
        className={`
          mt-3 text-center max-w-[120px]
          ${status === "locked" ? "opacity-50" : ""}
        `}
      >
        <p
          className={`
            text-sm font-semibold leading-tight
            ${status === "current" ? "text-primary" : "text-foreground"}
          `}
        >
          {lesson.title}
        </p>
        {status === "completed" && (
          <p className="text-xs text-success mt-1">+50 XP</p>
        )}
        {status === "current" && (
          <p className="text-xs text-primary mt-1">Start →</p>
        )}
      </div>
    </motion.div>
  );

  // Wrap with link if not locked
  if (status !== "locked") {
    return (
      <Link href={`/lesson/${lesson.id}`} className="block">
        {nodeContent}
      </Link>
    );
  }

  return nodeContent;
}

interface LearningPathProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  currentLessonIndex: number;
}

export function LearningPath({
  lessons,
  completedLessonIds,
  currentLessonIndex,
}: LearningPathProps) {
  const getLessonStatus = (lessonId: string, index: number) => {
    if (completedLessonIds.includes(lessonId)) return "completed";
    if (index === currentLessonIndex) return "current";
    return "locked";
  };

  return (
    <div className="relative py-8">
      {/* Background decorative path */}
      <svg
        className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
            <stop
              offset="100%"
              stopColor="rgb(236, 72, 153)"
              stopOpacity="0.3"
            />
          </linearGradient>
        </defs>
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#pathGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="12 8"
        />
      </svg>

      {/* Lesson Nodes */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="relative">
            {/* Connecting line segment to next node */}
            {index < lessons.length - 1 && (
              <svg
                className="absolute left-1/2 top-full w-24 h-12 -translate-x-1/2"
                style={{ zIndex: -1 }}
              >
                <path
                  d={
                    index % 2 === 0
                      ? "M 48 0 Q 80 24 48 48"
                      : "M 48 0 Q 16 24 48 48"
                  }
                  fill="none"
                  stroke={
                    completedLessonIds.includes(lesson.id)
                      ? "rgb(16, 185, 129)"
                      : "rgb(229, 231, 235)"
                  }
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}

            <LessonNode
              lesson={lesson}
              index={index}
              status={getLessonStatus(lesson.id, index)}
              totalLessons={lessons.length}
            />
          </div>
        ))}

        {/* Trophy at the end */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: lessons.length * 0.1 }}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center
            ${
              completedLessonIds.length === lessons.length
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-500/30"
                : "bg-gray-100"
            }
          `}
        >
          <Trophy className="w-10 h-10" />
        </motion.div>
        <p
          className={`text-sm font-medium ${
            completedLessonIds.length === lessons.length
              ? "text-amber-600"
              : "text-muted-foreground"
          }`}
        >
          {completedLessonIds.length === lessons.length
            ? "Course Complete!"
            : "Finish to earn trophy"}
        </p>
      </div>
    </div>
  );
}
