"use client";

import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
      <Flame className="w-5 h-5" />
      <span className="font-semibold">
        {streak} day{streak !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
