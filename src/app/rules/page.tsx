import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Target,
  Settings,
  Gamepad2,
  Sparkles,
  BarChart3,
  Flag,
  Lightbulb,
  Users,
  Clock,
  Layers,
  AlertTriangle,
  Eye,
  Shuffle,
  Search,
  Trophy,
} from "lucide-react";

export default function RulesPage() {
  return (
    <div className="pb-24 md:pb-0">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/15 mb-4">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            How to Play Jukas
          </h1>
          <p className="text-sm text-muted-foreground">
            A fast-paced memory and strategy card game
          </p>
        </div>

        {/* Game Overview */}
        <Card className="glass border-border/30 mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              Game Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h3 className="font-semibold mb-3 text-sm">Quick Facts</h3>
                <ul className="space-y-2.5">
                  {[
                    { icon: Users, text: "2-6 players" },
                    { icon: Clock, text: "5-10 minutes per round" },
                    { icon: Target, text: "Stay under 100 points to win" },
                    { icon: Layers, text: "Standard 52-card deck" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">Key Concepts</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[8px]">●</span>
                    Multiple rounds with cumulative scoring
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[8px]">●</span>
                    Remember what you&apos;ve seen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[8px]">●</span>
                    Cards have point values and effects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[8px]">●</span>
                    Effects only work from the deck
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[8px]">●</span>
                    Strategic swapping is crucial
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card className="glass border-border/30 mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                step: 1,
                title: "Deal Cards",
                desc: "Each player gets 4 cards face-down arranged in a 2×2 grid. Don't look at these cards yet!",
                color: "from-orange-500 to-red-600",
              },
              {
                step: 2,
                title: "Create Draw and Discard Piles",
                desc: "Place remaining cards as the draw pile. Flip the top card to start the discard pile.",
                color: "from-emerald-500 to-teal-600",
              },
              {
                step: 3,
                title: "Initial Peek",
                desc: "Each player may look at any 2 of their 4 cards, then put them back face-down. Remember what you saw!",
                color: "from-amber-500 to-orange-600",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div
                  className={`shrink-0 h-9 w-9 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                >
                  {item.step}
                </div>
                <div className="pt-0.5">
                  <h4 className="font-semibold text-sm mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* How to Play */}
        <Card className="glass border-border/30 mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-primary" />
              </div>
              How to Play
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-500/8 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 text-sm mb-2.5 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                On Your Turn
              </h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">1.</strong> Draw the top
                  card from the deck
                </li>
                <li>
                  <strong className="text-foreground">2.</strong> Look at the
                  card - you now know what it is
                </li>
                <li>
                  <strong className="text-foreground">3.</strong> Choose one:
                  <ul className="ml-4 mt-1.5 space-y-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
                      <strong>Use its effect</strong> (if any) and discard it
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
                      <strong>OR swap it</strong> into your layout (replaces one of your face-down cards)
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <Separator className="bg-border/20" />

            <div className="p-4 rounded-xl bg-cyan-500/8 border border-cyan-500/20">
              <h4 className="font-semibold text-cyan-400 text-sm mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Deck Card Matching
              </h4>
              <p className="text-sm text-muted-foreground mb-2.5 leading-relaxed">
                If the top deck card matches one of your layout cards that you
                remember, you may play it immediately!
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400 mt-1.5 text-[6px]">●</span>
                  Once you pick up the deck card, you must commit to playing it
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400 mt-1.5 text-[6px]">●</span>
                  If anyone saw the card you picked up, you must keep it and make your move
                </li>
              </ul>
            </div>

            <Separator className="bg-border/20" />

            <div className="p-4 rounded-xl bg-violet-500/8 border border-violet-500/20">
              <h4 className="font-semibold text-violet-400 text-sm mb-2.5 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Card Snatching
              </h4>
              <p className="text-sm text-muted-foreground mb-2.5 leading-relaxed">
                When you see a card being played that matches what you know
                someone has:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-violet-400 mt-1.5 text-[6px]">●</span>
                  <strong>Grab the card and play it for them immediately!</strong>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-1.5 text-[6px]">●</span>
                  <strong>If you&apos;re right:</strong> They must draw 2 extra cards
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-400 mt-1.5 text-[6px]">●</span>
                  <strong>If you&apos;re wrong:</strong> You must draw 2 extra cards
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Card Effects */}
        <Card className="glass border-border/30 mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              Card Effects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3.5 rounded-xl bg-destructive/8 border border-destructive/20">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-destructive">IMPORTANT:</strong>{" "}
                  Effects ONLY work when you draw from the deck and immediately
                  play the card. Once any card enters your layout, it&apos;s just
                  a point value!
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-3.5 rounded-xl bg-purple-500/8 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <h4 className="font-semibold text-purple-400 text-sm">7-8</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Peek at one of your own face-down cards
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-orange-500/8 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shuffle className="w-4 h-4 text-orange-400" />
                  <h4 className="font-semibold text-orange-400 text-sm">
                    9-10
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Blindly swap one of your cards with an opponent&apos;s
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-500/8 border border-cyan-500/20 sm:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-semibold text-cyan-400 text-sm">Jack</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Look at one opponent&apos;s face-down card
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scoring */}
        <Card className="glass border-border/30 mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              Scoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h4 className="font-semibold mb-3 text-sm">Card Values</h4>
                <div className="space-y-1.5">
                  {[
                    { card: "Ace", value: "1 point" },
                    { card: "2-10", value: "Face value" },
                    { card: "Jack", value: "11 points" },
                    { card: "Queen", value: "12 points" },
                  ].map((item) => (
                    <div
                      key={item.card}
                      className="flex justify-between p-2.5 rounded-lg bg-muted/20 text-sm"
                    >
                      <span>{item.card}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm">Kings (Special)</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15 text-sm">
                    <span className="text-red-400">♥ ♦ Red Kings</span>
                    <span className="font-bold text-emerald-400">-1 point</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-red-500/8 border border-red-500/15 text-sm">
                    <span className="text-muted-foreground">
                      ♠ ♣ Black Kings
                    </span>
                    <span className="font-bold text-red-400">+13 points</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Red Kings are your best friend! Black Kings are deadly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Round End */}
        <Card className="glass border-border/30 mb-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Flag className="w-4 h-4 text-primary" />
              </div>
              Round End & Winning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
              <h4 className="font-semibold text-amber-400 text-sm mb-2.5 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Calling &quot;Jukas!&quot;
              </h4>
              <ol className="text-sm text-muted-foreground space-y-1.5">
                <li>
                  <strong>1.</strong> Declare &quot;Jukas!&quot; if you think you
                  have the lowest score
                </li>
                <li>
                  <strong>2.</strong> Everyone reveals their cards and calculates
                  their round score
                </li>
                <li>
                  <strong>3.</strong> Add the round score to each player&apos;s
                  total
                </li>
                <li>
                  <strong>4.</strong> Players with 100+ points are eliminated
                </li>
                <li>
                  <strong>5.</strong> Continue with new rounds until only one
                  player remains
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
              <h4 className="font-semibold text-emerald-400 text-sm mb-1.5 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Winning
              </h4>
              <p className="text-sm text-muted-foreground">
                The{" "}
                <strong className="text-foreground">
                  last player to stay under 100 points wins
                </strong>{" "}
                the entire game!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Tips */}
        <Card className="glass border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-primary text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              Strategy Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h4 className="font-semibold mb-2.5 text-sm">Memory is Key</h4>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[6px]">●</span>
                    Remember your initial 2 cards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[6px]">●</span>
                    Track what opponents have seen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[6px]">●</span>
                    Remember discarded cards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[6px]">●</span>
                    Note what cards were swapped
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2.5 text-sm">Strategic Play</h4>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1.5 text-[6px]">●</span>
                    Use 7s/8s to check your cards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1.5 text-[6px]">●</span>
                    Red Kings are your best friends
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1.5 text-[6px]">●</span>
                    Avoid Black Kings at all costs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1.5 text-[6px]">●</span>
                    Time your &quot;Jukas!&quot; call carefully
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
