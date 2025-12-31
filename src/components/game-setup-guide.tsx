"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function GameSetupGuide() {
  return (
    <section id="setup" className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <Badge variant="outline" className="mb-4">
            Visual Guide
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Quick Setup Guide
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get your game started in under a minute with this visual guide
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1.5 bg-muted/50">
            <TabsTrigger
              value="setup"
              className="py-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <span className="hidden sm:inline">Initial </span>Setup
            </TabsTrigger>
            <TabsTrigger
              value="layout"
              className="py-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <span className="hidden sm:inline">Card </span>Layout
            </TabsTrigger>
            <TabsTrigger
              value="turn"
              className="py-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <span className="hidden sm:inline">Turn </span>Example
            </TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="mt-0">
            <Card className="glass border-border/50">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                        1
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Deal 4 Cards</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Each player gets 4 cards face-down arranged in a 2×2 grid
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                        2
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Create Piles</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Remaining cards = draw pile, flip top card for discard
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center md:col-span-1 col-span-full">
                    <div className="relative mb-4">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-linear-to-br from-accent to-accent/70 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                        3
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Peek at 2</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Each player looks at any 2 of their 4 cards, then puts
                      them back
                    </p>
                  </div>
                </div>

                {/* Tip Card */}
                <div className="mt-8 p-4 sm:p-5 rounded-xl bg-linear-to-r from-accent/10 to-primary/10 border border-accent/30">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">💡</span>
                    <div>
                      <h5 className="font-semibold text-accent mb-1">
                        Remember Your Cards!
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The key to Jukas is remembering which cards you peeked
                        at initially. This memory will guide your strategy
                        throughout the game.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="mt-0">
            <Card className="glass border-border/50">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-8 md:grid-cols-3 items-start">
                  {/* Your Cards */}
                  <div className="flex flex-col items-center text-center">
                    <h4 className="font-semibold mb-4">
                      Your Cards (2×2 Grid)
                    </h4>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400 flex items-center justify-center shadow-md"
                          >
                            <span className="text-white font-bold text-lg">
                              ?
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Face-down cards
                    </p>
                  </div>

                  {/* Center Piles */}
                  <div className="flex flex-col items-center text-center">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Draw Pile</h4>
                        <div className="w-14 h-18 sm:w-16 sm:h-20 mx-auto rounded-lg bg-gradient-to-br from-blue-700 to-blue-800 border-2 border-blue-500 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">
                            ?
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Discard Pile</h4>
                        <div className="w-14 h-18 sm:w-16 sm:h-20 mx-auto rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg">
                          <span className="text-red-500 font-bold text-lg">
                            K♥
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Face-up
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Opponent Cards */}
                  <div className="flex flex-col items-center text-center">
                    <h4 className="font-semibold mb-4">Opponent Cards</h4>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-400 flex items-center justify-center shadow-md"
                          >
                            <span className="text-white font-bold text-lg">
                              ?
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Also face-down
                    </p>
                  </div>
                </div>

                {/* Layout Tip */}
                <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">📐</span>
                    <div>
                      <h5 className="font-semibold text-emerald-300 mb-1">
                        Layout Tip
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Keep your cards arranged consistently in the same 2×2
                        pattern throughout the game. This helps with memory and
                        prevents confusion.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Turn Example Tab */}
          <TabsContent value="turn" className="mt-0">
            <Card className="glass border-border/50">
              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Option A */}
                <div className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-border/50">
                  <h4 className="font-semibold text-lg mb-5">
                    Option A: Draw from Deck
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-br from-blue-700 to-blue-800 border-2 border-blue-500 flex items-center justify-center shadow-md mb-2">
                        <span className="text-white font-bold">?</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        1. Draw
                      </span>
                    </div>

                    <svg
                      className="w-5 h-5 text-muted-foreground shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>

                    <div className="flex flex-col items-center">
                      <div className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center shadow-md mb-2">
                        <span className="text-red-500 font-bold text-sm">
                          7♥
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground text-center">
                        2. Look & Use
                      </span>
                    </div>

                    <svg
                      className="w-5 h-5 text-muted-foreground shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>

                    <div className="flex flex-col items-center">
                      <div className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gray-300 border-2 border-gray-400 flex items-center justify-center shadow-md mb-2">
                        <span className="text-gray-600 font-bold text-sm">
                          7♥
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        3. Discard
                      </span>
                    </div>
                  </div>
                </div>

                {/* Option B */}
                <div className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-border/50">
                  <h4 className="font-semibold text-lg mb-5">
                    Option B: Take from Discard
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gray-300 border-2 border-gray-400 flex items-center justify-center shadow-md mb-2">
                        <span className="text-red-500 font-bold text-sm">
                          K♥
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground text-center">
                        1. Take Card
                      </span>
                    </div>

                    <svg
                      className="w-5 h-5 text-muted-foreground shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>

                    <div className="flex flex-col items-center">
                      <div className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400 flex items-center justify-center shadow-md mb-2">
                        <span className="text-white font-bold">?</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-center">
                        2. Swap
                      </span>
                    </div>

                    <svg
                      className="w-5 h-5 text-muted-foreground shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>

                    <div className="flex flex-col items-center">
                      <div className="w-11 h-14 sm:w-14 sm:h-18 rounded-lg bg-gray-300 border-2 border-gray-400 flex items-center justify-center shadow-md mb-2">
                        <span className="text-gray-800 font-bold text-sm">
                          Q♠
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        3. Discard
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strategy Tip */}
                <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">🎯</span>
                    <div>
                      <h5 className="font-semibold text-emerald-300 mb-1">
                        Strategy Tip
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Taking the Red King (K♥ = -1 point) from discard is
                        usually better than drawing unknown cards, especially if
                        you can swap it with a high-value card you remember.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
