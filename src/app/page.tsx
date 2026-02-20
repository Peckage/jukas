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
import { JukasLogo } from "@/components/jukas-logo";
import {
  Zap,
  BarChart3,
  Layers,
  BookOpen,
  Users,
  Clock,
  Shield,
  Brain,
  RefreshCw,
  Play,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="pb-24 md:pb-0">
      {/* Hero Section */}
      <header className="mx-auto max-w-6xl px-5 sm:px-6 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="animate-float">
              <JukasLogo size={80} className="drop-shadow-xl" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Jukas
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              The Card Game
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed px-2">
            A fast-paced memory-driven elimination game of risk, deduction, and
            sabotage. Stay under 100 points to survive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 text-base font-semibold press-effect"
              asChild
            >
              <Link href="/scores">
                <Play className="w-5 h-5 mr-2" />
                Start Playing
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 text-base font-medium press-effect border-border/50"
              asChild
            >
              <Link href="/setup">
                <Zap className="w-5 h-5 mr-2" />
                Quick Setup
              </Link>
            </Button>
          </div>

          {/* Game Info pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm bg-secondary/80 border border-border/30"
            >
              <Users className="w-3.5 h-3.5 mr-1.5" />
              2–6 players
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm bg-secondary/80 border border-border/30"
            >
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              5–10 min
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm bg-secondary/80 border border-border/30"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Elimination
            </Badge>
          </div>
        </div>
      </header>

      {/* Quick Navigation Cards */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 pb-12">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {/* Score Keeper Card */}
          <Link href="/scores" className="block group">
            <Card className="card-hover glass border-primary/20 hover:border-primary/40 h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <CardHeader className="relative">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center mb-3 shadow-lg shadow-primary/15 group-hover:scale-110 transition-transform duration-200">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-primary group-hover:text-primary/80 transition-colors flex items-center gap-2">
                  Score Keeper
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Track scores across rounds with persistent game sessions.
                  Resume anytime!
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary text-xs"
                >
                  Most Popular
                </Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Setup Guide Card */}
          <Link href="/setup" className="block group">
            <Card className="card-hover glass border-emerald-500/20 hover:border-emerald-500/40 h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full" />
              <CardHeader className="relative">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/15 group-hover:scale-110 transition-transform duration-200">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-emerald-400 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  Quick Setup
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Visual step-by-step guide to set up your game in under a
                  minute.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 text-xs"
                >
                  Visual Guide
                </Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Card Reference Card */}
          <Link href="/cards" className="block group">
            <Card className="card-hover glass border-accent/20 hover:border-accent/40 h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
              <CardHeader className="relative">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-accent to-accent/60 flex items-center justify-center mb-3 shadow-lg shadow-accent/15 group-hover:scale-110 transition-transform duration-200">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-accent group-hover:text-accent/80 transition-colors flex items-center gap-2">
                  Card Reference
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Complete card values and special abilities at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge
                  variant="outline"
                  className="border-accent/30 text-accent text-xs"
                >
                  Quick Lookup
                </Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Full Rules Card */}
          <Link href="/rules" className="block group">
            <Card className="card-hover glass border-blue-500/20 hover:border-blue-500/40 h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full" />
              <CardHeader className="relative">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/15 group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                  Full Rules
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Complete game rules, special abilities, and winning conditions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 text-xs"
                >
                  Complete Guide
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Why Play Section */}
      <section className="border-t border-border/30">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Why Play Jukas?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              The perfect blend of luck, memory, and strategy
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="glass border-border/20 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-11 w-11 rounded-xl bg-primary/15 flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base text-primary">
                  2–6 Players
                </CardTitle>
                <CardDescription className="text-sm">
                  Perfect for quick sessions or full game nights with friends and
                  family.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/20 hover:border-emerald-500/20 transition-colors">
              <CardHeader>
                <div className="h-11 w-11 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-2">
                  <RefreshCw className="w-5 h-5 text-emerald-400" />
                </div>
                <CardTitle className="text-base text-emerald-400">
                  Multi-Round Format
                </CardTitle>
                <CardDescription className="text-sm">
                  Play rounds until only one survivor remains under 100 points.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/20 hover:border-accent/20 transition-colors sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-11 w-11 rounded-xl bg-accent/15 flex items-center justify-center mb-2">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-base text-accent">
                  Memory & Strategy
                </CardTitle>
                <CardDescription className="text-sm">
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
