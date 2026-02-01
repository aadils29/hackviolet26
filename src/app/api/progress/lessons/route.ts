import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET all lesson progress for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { completedAt: "desc" },
    });

    return NextResponse.json(lessonProgress);
  } catch (error) {
    console.error("Error fetching lesson progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson progress" },
      { status: 500 }
    );
  }
}

// POST mark lesson as complete
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, completed, accuracy, xpEarned } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: "lessonId is required" },
        { status: 400 }
      );
    }

    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId,
        },
      },
      update: {
        completed: completed ?? true,
        accuracy: accuracy ?? 0,
        xpEarned: xpEarned ?? 0,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        lessonId: lessonId,
        completed: completed ?? true,
        accuracy: accuracy ?? 0,
        xpEarned: xpEarned ?? 0,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json(lessonProgress);
  } catch (error) {
    console.error("Error saving lesson progress:", error);
    return NextResponse.json(
      { error: "Failed to save lesson progress" },
      { status: 500 }
    );
  }
}
