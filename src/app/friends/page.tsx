"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { HeartDisplay } from "@/components/heart-display";
import { StreakBadge } from "@/components/streak-badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  level: number;
}

const friendsList: Friend[] = [
  { id: "1", name: "Sarah M.", avatar: "👩‍💼", xp: 1250, streak: 12, level: 5 },
  { id: "2", name: "Jessica L.", avatar: "👩‍🎓", xp: 980, streak: 7, level: 4 },
  { id: "3", name: "Emily R.", avatar: "👩‍💻", xp: 750, streak: 5, level: 3 },
  { id: "4", name: "Amanda K.", avatar: "👩‍🔬", xp: 620, streak: 3, level: 3 },
  { id: "5", name: "Michelle P.", avatar: "👩‍🎨", xp: 450, streak: 2, level: 2 },
];

export default function FriendsPage() {
  const [userProgress, setUserProgress] = useState<{
    heartsRemaining: number;
    currentStreak: number;
    currentXp: number;
    currentLevel: number;
  } | null>(null);

  useEffect(() => {
    const progress = localStorage.getItem("userProgress");
    if (progress) {
      setUserProgress(JSON.parse(progress));
    }
  }, []);

  // Sort friends by XP and add user
  const leaderboard = userProgress
    ? [
        ...friendsList,
        {
          id: "you",
          name: "You",
          avatar: "🌟",
          xp: userProgress.currentXp,
          streak: userProgress.currentStreak,
          level: userProgress.currentLevel,
        },
      ].sort((a, b) => b.xp - a.xp)
    : friendsList;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">Friends</h1>
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
            <h1 className="text-3xl font-bold">Friends</h1>
            {userProgress && (
              <div className="flex items-center gap-4">
                <StreakBadge streak={userProgress.currentStreak} />
                <HeartDisplay hearts={userProgress.heartsRemaining} />
              </div>
            )}
          </div>

          {/* Add Friends */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                    ➕
                  </div>
                  <div>
                    <h3 className="font-semibold">Add Friends</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn together and stay motivated
                    </p>
                  </div>
                </div>
                <Button>Invite</Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Leaderboard */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl font-bold">Weekly Leaderboard</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                {leaderboard.map((friend, index) => (
                  <div key={friend.id}>
                    <div
                      className={`
                        flex items-center gap-4 p-4
                        ${friend.id === "you" ? "bg-primary/5" : ""}
                      `}
                    >
                      {/* Rank */}
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                          ${
                            index === 0
                              ? "bg-yellow-400 text-yellow-900"
                              : index === 1
                              ? "bg-gray-300 text-gray-700"
                              : index === 2
                              ? "bg-amber-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {index + 1}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                        {friend.avatar}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-semibold ${
                              friend.id === "you" ? "text-primary" : ""
                            }`}
                          >
                            {friend.name}
                          </h3>
                          {friend.id === "you" && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Level {friend.level} • 🔥 {friend.streak} day streak
                        </p>
                      </div>

                      {/* XP */}
                      <div className="text-right">
                        <p className="font-bold text-primary">{friend.xp} XP</p>
                      </div>
                    </div>
                    {index < leaderboard.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
