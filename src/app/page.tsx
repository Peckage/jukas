import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="pb-24 md:pb-0">
      {/* Hero Section */}
      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="text-center space-y-6">
          {/* Logo for mobile */}
          <div className="md:hidden flex justify-center mb-4">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-2xl">
                J
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Jukas - The Card Game
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            Stay under 100 points to survive. Remember what you&apos;ve seen. A
            fast-paced, memory-driven elimination game of risk, deduction, and
            sabotage.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg text-base"
              asChild
            >
              <Link href="/scores">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Start Playing
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base"
              asChild
            >
              <Link href="/setup">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Quick Setup
              </Link>
            </Button>
          </div>

          {/* Game badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              2–6 players
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              5-10 min rounds
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Elimination
            </Badge>
          </div>
        </div>
      </header>

      {/* Quick Navigation Cards */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {/* Score Keeper Card */}
          <Link href="/scores" className="block group">
            <Card className="card-hover glass border-primary/30 bg-linear-to-br from-primary/10 to-transparent h-full">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl text-primary group-hover:text-primary/80 transition-colors">
                  Score Keeper
                </CardTitle>
                <CardDescription className="text-base">
                  Track scores across multiple rounds with persistent game
                  sessions. Resume anytime!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  Most Popular
                </Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Setup Guide Card */}
          <Link href="/setup" className="block group">
            <Card className="card-hover glass border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-transparent h-full">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl text-emerald-300 group-hover:text-emerald-200 transition-colors">
                  Quick Setup
                </CardTitle>
                <CardDescription className="text-base">
                  Visual step-by-step guide to set up your game in under a
                  minute.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-300"
                >
                  Visual Guide
                </Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Card Reference Card */}
          <Link href="/cards" className="block group">
            <Card className="card-hover glass border-accent/30 bg-linear-to-br from-accent/10 to-transparent h-full">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-accent to-accent/70 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl text-accent group-hover:text-accent/80 transition-colors">
                  Card Reference
                </CardTitle>
                <CardDescription className="text-base">
                  Complete card values and special abilities at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className="border-accent/50 text-accent"
                >
                  Quick Lookup
                </Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Full Rules Card */}
          <Link href="/rules" className="block group">
            <Card className="card-hover glass border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-transparent h-full">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl text-blue-300 group-hover:text-blue-200 transition-colors">
                  Full Rules
                </CardTitle>
                <CardDescription className="text-base">
                  Complete game rules, special abilities, and winning
                  conditions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className="border-blue-500/50 text-blue-300"
                >
                  Complete Guide
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Why Play Jukas?
            </h2>
            <p className="text-muted-foreground">
              The perfect blend of luck, memory, and strategy
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover glass border-primary/20 bg-linear-to-br from-primary/10 to-transparent">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-primary">2–6 Players</CardTitle>
                <CardDescription>
                  Perfect for quick sessions or full game nights with friends
                  and family.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover glass border-emerald-500/20 bg-linear-to-br from-emerald-950/20 to-transparent">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <CardTitle className="text-emerald-300">
                  Multi-Round Format
                </CardTitle>
                <CardDescription>
                  Play rounds until only one survivor remains under 100 points.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover glass border-accent/20 bg-linear-to-br from-accent/10 to-transparent sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-accent to-accent/70 flex items-center justify-center mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-accent">Memory & Strategy</CardTitle>
                <CardDescription>
                  Remember cards, bluff opponents, and survive the longest to
                  win.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
