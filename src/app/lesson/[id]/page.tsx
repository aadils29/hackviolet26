"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeartDisplayCompact } from "@/components/heart-display";
import { getLessonById, Question } from "@/data/lessons";

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

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const lessonId = params.id as string;

  const [lesson, setLesson] = useState(getLessonById(lessonId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const [showLessonComplete, setShowLessonComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (status === "loading") return;

      if (session?.user) {
        // Fetch progress from API for authenticated users
        try {
          const res = await fetch("/api/progress");
          if (res.ok) {
            const data = await res.json();
            setUserProgress({
              currentXp: data.currentXp,
              currentLevel: data.currentLevel,
              currentStreak: data.currentStreak,
              heartsRemaining: data.heartsRemaining,
              lastHeartLoss: data.lastHeartLoss,
              lastCompletedLesson: data.lastCompletedLesson,
            });
            if (data.heartsRemaining === 0) {
              setShowOutOfHearts(true);
            }
          }
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      } else {
        // Fallback to localStorage for unauthenticated users
        const progress = localStorage.getItem("userProgress");
        if (progress) {
          const parsed = JSON.parse(progress);
          setUserProgress(parsed);
          if (parsed.heartsRemaining === 0) {
            setShowOutOfHearts(true);
          }
        }
      }
      setIsLoading(false);
    };

    loadProgress();
  }, [session, status]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

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

  const currentQuestion: Question = lesson.questions[currentQuestionIndex];
  const progressPercent =
    ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
      setXpEarned((prev) => prev + 10);
    } else {
      // Lose a heart
      const newHearts = userProgress.heartsRemaining - 1;
      const updatedProgress = {
        ...userProgress,
        heartsRemaining: newHearts,
        lastHeartLoss: new Date().toISOString(),
      };
      setUserProgress(updatedProgress);

      // Save to API or localStorage
      if (session?.user) {
        fetch("/api/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            heartsRemaining: newHearts,
            lastHeartLoss: new Date().toISOString(),
          }),
        });
      } else {
        localStorage.setItem("userProgress", JSON.stringify(updatedProgress));
      }

      if (newHearts === 0) {
        setShowOutOfHearts(true);
      }
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Lesson complete
      completeLessonHandler();
    }
  };

  const completeLessonHandler = async () => {
    const totalXp = xpEarned + 50; // Bonus XP for completing
    const accuracy = Math.round(
      (correctAnswers / lesson.questions.length) * 100,
    );

    // Update user progress
    const newXp = userProgress.currentXp + totalXp;
    const newLevel = Math.floor(newXp / 100) + 1;
    const updatedUserProgress = {
      ...userProgress,
      currentXp: newXp,
      currentLevel: newLevel,
      currentStreak: userProgress.currentStreak + 1,
      lastCompletedLesson: new Date().toISOString(),
    };

    if (session?.user) {
      // Save to API for authenticated users
      try {
        await fetch("/api/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentXp: newXp,
            currentLevel: newLevel,
            currentStreak: userProgress.currentStreak + 1,
            lastCompletedLesson: new Date().toISOString(),
          }),
        });

        await fetch("/api/progress/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: lesson.id,
            completed: true,
            accuracy,
            xpEarned: totalXp,
          }),
        });
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    } else {
      // Fallback to localStorage for unauthenticated users
      localStorage.setItem("userProgress", JSON.stringify(updatedUserProgress));

      const existingLessons = localStorage.getItem("lessonProgress");
      const lessonProgressArray: LessonProgress[] = existingLessons
        ? JSON.parse(existingLessons)
        : [];

      const newLessonProgress: LessonProgress = {
        lessonId: lesson.id,
        completed: true,
        accuracy,
        xpEarned: totalXp,
        completedAt: new Date().toISOString(),
      };

      const updatedLessons = [
        ...lessonProgressArray.filter((lp) => lp.lessonId !== lesson.id),
        newLessonProgress,
      ];
      localStorage.setItem("lessonProgress", JSON.stringify(updatedLessons));
    }

    setXpEarned(totalXp);
    setShowLessonComplete(true);
  };

  const getAnswerStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? "ring-2 ring-primary bg-primary/5"
        : "hover:bg-gray-50";
    }

    if (index === currentQuestion.correctAnswer) {
      return "ring-2 ring-success bg-success/10";
    }

    if (index === selectedAnswer && !isCorrect) {
      return "ring-2 ring-destructive bg-destructive/10";
    }

    return "opacity-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              ✕
            </Button>
            <div className="flex-1">
              <Progress value={progressPercent} className="h-3" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                {currentQuestionIndex + 1}/{lesson.questions.length}
              </span>
              <HeartDisplayCompact hearts={userProgress.heartsRemaining} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.type === "true-false" && (
                  <p className="text-sm text-muted-foreground">
                    True or False?
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${getAnswerStyle(
                    index,
                  )}`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        selectedAnswer === index
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showFeedback &&
                      index === currentQuestion.correctAnswer && (
                        <span className="text-success text-xl">✓</span>
                      )}
                    {showFeedback && index === selectedAnswer && !isCorrect && (
                      <span className="text-destructive text-xl">✗</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Button */}
            {!showFeedback ? (
              <Button
                size="lg"
                className="w-full py-6 text-lg"
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Feedback Card */}
                <Card
                  className={
                    isCorrect
                      ? "border-success bg-success/5"
                      : "border-destructive bg-destructive/5"
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{isCorrect ? "✓" : "✗"}</span>
                      <div>
                        <h3
                          className={`font-semibold ${
                            isCorrect ? "text-success" : "text-destructive"
                          }`}
                        >
                          {isCorrect ? "Correct!" : "Not quite"}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentQuestion.explanation}
                        </p>
                        {isCorrect && (
                          <p className="text-sm text-success font-medium mt-2">
                            +10 XP
                          </p>
                        )}
                        {!isCorrect && (
                          <p className="text-sm text-destructive font-medium mt-2">
                            -1 Heart ❤️→💔
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  size="lg"
                  className="w-full py-6 text-lg"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Out of Hearts Dialog */}
      <Dialog open={showOutOfHearts} onOpenChange={setShowOutOfHearts}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="text-6xl mb-4">💔</div>
            <DialogTitle className="text-2xl">Out of Hearts!</DialogTitle>
            <DialogDescription className="text-base">
              Your hearts will refill tomorrow. Come back then to continue
              learning!
            </DialogDescription>
          </DialogHeader>
          <Button
            size="lg"
            className="w-full mt-4"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </DialogContent>
      </Dialog>

      {/* Lesson Complete Dialog */}
      <Dialog open={showLessonComplete} onOpenChange={setShowLessonComplete}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="text-6xl mb-4">🎉</div>
            <DialogTitle className="text-2xl">Lesson Complete!</DialogTitle>
            <DialogDescription asChild>
              <div className="text-base space-y-2">
                <p className="text-xl font-semibold text-foreground">
                  You earned {xpEarned} XP
                </p>
                <p>
                  Accuracy: {correctAnswers}/{lesson.questions.length} (
                  {Math.round((correctAnswers / lesson.questions.length) * 100)}
                  %)
                </p>
                <p className="flex items-center justify-center gap-2 text-orange-600">
                  <span>🔥</span> Streak maintained!
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Continue Learning
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
