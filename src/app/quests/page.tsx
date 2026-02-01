"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sidebar } from "@/components/sidebar";
import { HeartDisplay } from "@/components/heart-display";
import { StreakBadge } from "@/components/streak-badge";
import { useEffect, useState } from "react";
import { Trophy, BookOpen, Target, Zap, Calendar, Award } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

const dailyQuests: Quest[] = [
  {
    id: "complete-lesson",
    title: "Complete a Lesson",
    description: "Finish any lesson today",
    icon: BookOpen,
    progress: 0,
    target: 1,
    xpReward: 20,
    completed: false,
  },
  {
    id: "perfect-lesson",
    title: "Perfect Score",
    description: "Get 100% on a lesson",
    icon: Target,
    progress: 0,
    target: 1,
    xpReward: 50,
    completed: false,
  },
  {
    id: "answer-questions",
    title: "Answer 10 Questions",
    description: "Answer any 10 questions",
    icon: Zap,
    progress: 0,
    target: 10,
    xpReward: 30,
    completed: false,
  },
];

const weeklyQuests: Quest[] = [
  {
    id: "weekly-streak",
    title: "7-Day Streak",
    description: "Learn for 7 days in a row",
    icon: Calendar,
    progress: 0,
    target: 7,
    xpReward: 100,
    completed: false,
  },
  {
    id: "complete-course",
    title: "Course Master",
    description: "Complete all lessons in a course",
    icon: Trophy,
    progress: 0,
    target: 5,
    xpReward: 200,
    completed: false,
  },
];

export default function QuestsPage() {
  const [userProgress, setUserProgress] = useState<{
    heartsRemaining: number;
    currentStreak: number;
  } | null>(null);

  useEffect(() => {
    const progress = localStorage.getItem("userProgress");
    if (progress) {
      setUserProgress(JSON.parse(progress));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">Quests</h1>
              <div className="flex items-center gap-3">
                {userProgress && (
                  <>
                    <StreakBadge streak={userProgress.currentStreak} />
                    <HeartDisplay hearts={userProgress.heartsRemaining} />
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-2xl pb-24 md:pb-8">
          {/* Page Header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Quests</h1>
            {userProgress && (
              <div className="flex items-center gap-4">
                <StreakBadge streak={userProgress.currentStreak} />
                <HeartDisplay hearts={userProgress.heartsRemaining} />
              </div>
            )}
          </div>

          {/* Daily Quests */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold">Daily Quests</h2>
              <span className="text-sm text-muted-foreground ml-auto">
                Resets in 12h
              </span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </section>

          {/* Weekly Quests */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Weekly Quests</h2>
              <span className="text-sm text-muted-foreground ml-auto">
                Resets in 5d
              </span>
            </div>

            <div className="space-y-3">
              {weeklyQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  const progressPercent = (quest.progress / quest.target) * 100;
  const IconComponent = quest.icon;

  return (
    <Card
      className={`transition-all ${
        quest.completed ? "bg-success/5 border-success/30" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              ${quest.completed ? "bg-success/20" : "bg-primary/10"}
            `}
          >
            {quest.completed ? (
              <Award className="w-6 h-6 text-success" />
            ) : (
              <IconComponent className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold">{quest.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {quest.description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-primary">
                  +{quest.xpReward} XP
                </span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>
                  {quest.progress}/{quest.target}
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
