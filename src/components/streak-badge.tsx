"use client";

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
      <span className="text-lg">🔥</span>
      <span className="font-semibold">{streak} day{streak !== 1 ? "s" : ""}</span>
    </div>
  );
}
