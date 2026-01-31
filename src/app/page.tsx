import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="font-bold text-xl text-primary">FinEmpowerHer</span>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Master Your Money,{" "}
            <span className="text-primary">One Lesson at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn personal finance through fun, bite-sized lessons. Build confidence 
            with money and take control of your financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free →
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 5 minutes a day
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-lg mb-2">Simple</h3>
              <p className="text-muted-foreground">
                Bite-sized lessons that fit your busy schedule. Learn in just 5 minutes a day.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="font-semibold text-lg mb-2">Fun</h3>
              <p className="text-muted-foreground">
                Gamified learning with XP, streaks, and achievements to keep you motivated.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-lg mb-2">Effective</h3>
              <p className="text-muted-foreground">
                Research-backed curriculum designed to build real financial skills.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span>FinEmpowerHer © 2026</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">About</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
