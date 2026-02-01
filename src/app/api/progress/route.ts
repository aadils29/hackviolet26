import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Helper function to calculate streak based on last completion date
function calculateStreak(
  currentStreak: number,
  lastCompletedLesson: Date | null,
  isCompletingLesson: boolean,
): number {
  if (!isCompletingLesson) {
    return currentStreak;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!lastCompletedLesson) {
    // First lesson ever completed
    return 1;
  }

  const lastCompletion = new Date(lastCompletedLesson);
  const lastCompletionDay = new Date(
    lastCompletion.getFullYear(),
    lastCompletion.getMonth(),
    lastCompletion.getDate(),
  );

  const diffTime = today.getTime() - lastCompletionDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already completed a lesson today - don't increment
    return currentStreak;
  } else if (diffDays === 1) {
    // Completed yesterday - increment streak
    return currentStreak + 1;
  } else {
    // Missed one or more days - reset to 1
    return 1;
  }
}

// GET user progress
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find or create user progress
    let userProgress = await prisma.userProgress.findUnique({
      where: { userId: session.user.id },
    });

    // If no progress exists, create default progress
    if (!userProgress) {
      userProgress = await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          currentXp: 0,
          currentLevel: 1,
          currentStreak: 0,
          heartsRemaining: 5,
        },
      });
    }

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 },
    );
  }
}

// PUT update user progress
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      currentXp,
      currentLevel,
      heartsRemaining,
      lastHeartLoss,
      lastCompletedLesson,
    } = body;

    // Check if this is a lesson completion (lastCompletedLesson is being updated)
    const isCompletingLesson = lastCompletedLesson !== undefined;

    // Fetch existing progress to calculate streak properly
    const existingProgress = await prisma.userProgress.findUnique({
      where: { userId: session.user.id },
    });

    // Calculate streak server-side based on last completion date
    const newStreak = calculateStreak(
      existingProgress?.currentStreak ?? 0,
      existingProgress?.lastCompletedLesson ?? null,
      isCompletingLesson,
    );

    const userProgress = await prisma.userProgress.upsert({
      where: { userId: session.user.id },
      update: {
        ...(currentXp !== undefined && { currentXp }),
        ...(currentLevel !== undefined && { currentLevel }),
        ...(isCompletingLesson && { currentStreak: newStreak }),
        ...(heartsRemaining !== undefined && { heartsRemaining }),
        ...(lastHeartLoss !== undefined && {
          lastHeartLoss: lastHeartLoss ? new Date(lastHeartLoss) : null,
        }),
        ...(lastCompletedLesson !== undefined && {
          lastCompletedLesson: lastCompletedLesson
            ? new Date(lastCompletedLesson)
            : null,
        }),
      },
      create: {
        userId: session.user.id,
        currentXp: currentXp ?? 0,
        currentLevel: currentLevel ?? 1,
        currentStreak: isCompletingLesson ? 1 : 0,
        heartsRemaining: heartsRemaining ?? 5,
        lastHeartLoss: lastHeartLoss ? new Date(lastHeartLoss) : null,
        lastCompletedLesson: lastCompletedLesson
          ? new Date(lastCompletedLesson)
          : null,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("Error updating user progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 },
    );
  }
}
