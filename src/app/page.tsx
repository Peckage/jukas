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
import { Separator } from "@/components/ui/separator";
import MobileNav from "@/components/mobile-nav";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Animated background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-600/15 via-red-600/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-amber-600/10 via-orange-700/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-t from-orange-800/10 via-red-800/8 to-transparent blur-3xl" />
        <div className="absolute top-2/3 -right-16 h-80 w-80 rounded-full bg-emerald-800/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-40 hidden md:block glass border-b border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-lg tracking-tight">JUKAS</span>
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/setup">Setup</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/scores">Scores</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cards">Cards</Link>
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/rules">Full Rules</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Hero Section */}
      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-10 md:pt-16 md:pb-14">
        <div className="text-center space-y-6">
          {/* Logo for mobile */}
          <div className="md:hidden flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg glow-orange">
              <span className="text-white font-bold text-3xl">J</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Jukas — The Card Game
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
              className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-lg glow-orange text-base"
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
              className="w-full sm:w-auto border-accent/50 hover:bg-accent/10 text-base"
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
            <Card className="card-hover glass border-orange-500/30 bg-gradient-to-br from-orange-950/30 to-transparent h-full">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
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
                <CardTitle className="text-xl text-orange-300 group-hover:text-orange-200 transition-colors">
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
                  className="border-orange-500/50 text-orange-300"
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
            <Card className="card-hover glass border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-transparent h-full">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
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
                <CardTitle className="text-xl text-amber-300 group-hover:text-amber-200 transition-colors">
                  Card Reference
                </CardTitle>
                <CardDescription className="text-base">
                  Complete card values and special abilities at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className="border-amber-500/50 text-amber-300"
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
            <Card className="card-hover glass border-orange-500/20 bg-gradient-to-br from-orange-950/20 to-transparent">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-3 shadow-lg">
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
                <CardTitle className="text-orange-300">2–6 Players</CardTitle>
                <CardDescription>
                  Perfect for quick sessions or full game nights with friends
                  and family.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover glass border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-transparent">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
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

            <Card className="card-hover glass border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-transparent sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3 shadow-lg">
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
                <CardTitle className="text-amber-300">
                  Memory & Strategy
                </CardTitle>
                <CardDescription>
                  Remember cards, bluff opponents, and survive the longest to
                  win.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - hidden on mobile since it's integrated into the nav bar */}
      <footer className="hidden md:block border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">J</span>
              </div>
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Jukas
              </span>
            </div>
            <a
              href="https://github.com/mirkodandrea"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Spacer for mobile nav */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
