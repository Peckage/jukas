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
import UniqueCardsTable from "@/components/card-matrix-unique";
import MobileNav from "@/components/mobile-nav";

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-600/15 via-red-600/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-amber-600/10 via-orange-700/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-lg tracking-tight">JUKAS</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-16 pb-24">
        {/* Page Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4">
            Quick Reference
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
            <span className="text-4xl">🃏</span>
            Card Reference
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All card values and effects at a glance. Suits only matter for
            Kings!
          </p>
        </div>

        {/* Card Table */}
        <Card className="glass border-border/50 shadow-xl mb-8">
          <CardHeader className="border-b border-border/50">
            <CardTitle>Card Values & Effects</CardTitle>
            <CardDescription>
              Effects only work when drawn from deck and immediately used
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <UniqueCardsTable />
          </CardContent>
        </Card>

        {/* Quick Scoring Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="glass border-green-500/30 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                <span>👑</span> Best Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-400">♥ ♦ Red Kings</span>
                <span className="font-bold text-green-400">-1 point</span>
              </div>
              <div className="flex justify-between">
                <span>Aces</span>
                <span className="font-bold text-green-400">1 point</span>
              </div>
              <div className="flex justify-between">
                <span>2s</span>
                <span className="font-bold text-green-400">2 points</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-red-500/30 bg-red-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                <span>💀</span> Worst Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">♠ ♣ Black Kings</span>
                <span className="font-bold text-red-400">+13 points</span>
              </div>
              <div className="flex justify-between">
                <span>Queens</span>
                <span className="font-bold text-red-400">12 points</span>
              </div>
              <div className="flex justify-between">
                <span>Jacks</span>
                <span className="font-bold text-red-400">11 points</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
