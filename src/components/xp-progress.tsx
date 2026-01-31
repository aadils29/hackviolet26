"use client";

import { Progress } from "@/components/ui/progress";

interface XpProgressProps {
  currentXp: number;
  currentLevel: number;
  xpPerLevel?: number;
}

export function XpProgress({ currentXp, currentLevel, xpPerLevel = 100 }: XpProgressProps) {
  const xpInCurrentLevel = currentXp % xpPerLevel;
  const progressPercent = (xpInCurrentLevel / xpPerLevel) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">Level {currentLevel}</span>
        <span className="text-muted-foreground">{currentXp} XP</span>
      </div>
      <Progress value={progressPercent} className="h-3" />
      <p className="text-xs text-muted-foreground text-right">
        {xpPerLevel - xpInCurrentLevel} XP to Level {currentLevel + 1}
      </p>
    </div>
  );
}
