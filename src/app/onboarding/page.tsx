"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const goals = [
  { id: "budget", emoji: "📊", label: "Learn to budget" },
  { id: "save", emoji: "💰", label: "Start saving" },
  { id: "invest", emoji: "📈", label: "Understand investing" },
  { id: "debt", emoji: "💳", label: "Manage debt" },
];

const timeCommitments = [
  { minutes: 5, label: "5 min/day", description: "Casual learner" },
  { minutes: 10, label: "10 min/day", description: "Regular practice" },
  { minutes: 15, label: "15 min/day", description: "Serious commitment" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleStart = () => {
    // Store preferences in localStorage for MVP
    localStorage.setItem(
      "userPreferences",
      JSON.stringify({
        goal: selectedGoal,
        dailyMinutes: selectedTime,
        onboardingCompleted: true,
      })
    );
    // Initialize user progress
    localStorage.setItem(
      "userProgress",
      JSON.stringify({
        currentXp: 0,
        currentLevel: 1,
        currentStreak: 0,
        heartsRemaining: 5,
        lastHeartLoss: null,
        lastCompletedLesson: null,
      })
    );
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === step
                  ? "bg-primary"
                  : i < step
                  ? "bg-primary/50"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">💰</div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Welcome to FinEmpowerHer!
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Learn personal finance through fun, bite-sized lessons. Build
                confidence with money, one lesson at a time.
              </p>
              <Button size="lg" className="w-full py-6 text-lg" onClick={handleNext}>
                Let&apos;s Get Started →
              </Button>
            </motion.div>
          )}

          {/* Step 2: Goal Selection */}
          {step === 2 && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
                What&apos;s your main goal?
              </h1>
              <p className="text-muted-foreground mb-6 text-center">
                We&apos;ll personalize your learning path
              </p>

              <div className="space-y-3 mb-8">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedGoal === goal.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedGoal(goal.id)}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <span className="text-3xl">{goal.emoji}</span>
                      <span className="font-medium text-lg">{goal.label}</span>
                      {selectedGoal === goal.id && (
                        <span className="ml-auto text-primary">✓</span>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full py-6 text-lg"
                onClick={handleNext}
                disabled={!selectedGoal}
              >
                Continue →
              </Button>
            </motion.div>
          )}

          {/* Step 3: Daily Commitment */}
          {step === 3 && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
                Set your daily goal
              </h1>
              <p className="text-muted-foreground mb-6 text-center">
                How much time can you commit each day?
              </p>

              <div className="space-y-3 mb-8">
                {timeCommitments.map((time) => (
                  <Card
                    key={time.minutes}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTime === time.minutes
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTime(time.minutes)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-semibold text-lg">{time.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {time.description}
                        </div>
                      </div>
                      {selectedTime === time.minutes && (
                        <span className="text-primary text-xl">✓</span>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full py-6 text-lg"
                onClick={handleStart}
                disabled={!selectedTime}
              >
                Start Learning 🚀
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
