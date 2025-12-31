import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function RulesPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            How to Play Jukas
          </h1>
          <p className="text-sm text-muted-foreground">
            A fast-paced memory and strategy card game
          </p>
        </div>

        {/* Game Overview */}
        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🎯</span>
              Game Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Quick Facts</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="shrink-0">
                      👥
                    </Badge>
                    <span>2-6 players</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="shrink-0">
                      ⏱️
                    </Badge>
                    <span>5-10 minutes per round</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="shrink-0">
                      🎯
                    </Badge>
                    <span>Stay under 100 points to win</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="shrink-0">
                      🃏
                    </Badge>
                    <span>Standard 52-card deck</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Key Concepts</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Multiple rounds with cumulative scoring</li>
                  <li>• Remember what you&apos;ve seen</li>
                  <li>• Cards have point values and effects</li>
                  <li>• Effects only work from the deck</li>
                  <li>• Strategic swapping is crucial</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">⚙️</span>
              Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                step: 1,
                title: "Deal Cards",
                desc: "Each player gets 4 cards face-down arranged in a 2×2 grid. Don't look at these cards yet!",
              },
              {
                step: 2,
                title: "Create Draw and Discard Piles",
                desc: "Place remaining cards as the draw pile. Flip the top card to start the discard pile.",
              },
              {
                step: 3,
                title: "Initial Peek",
                desc: "Each player may look at any 2 of their 4 cards, then put them back face-down. Remember what you saw!",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* How to Play */}
        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🎮</span>
              How to Play
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <h4 className="font-semibold text-blue-300 mb-3">
                📥 On Your Turn
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
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>
                      • <strong>Use its effect</strong> (if any) and discard it
                    </li>
                    <li>
                      • <strong>OR swap it</strong> into your layout (replaces
                      one of your face-down cards)
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <Separator />

            <div className="p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <h4 className="font-semibold text-cyan-300 mb-3">
                📋 Deck Card Matching
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                If the top deck card matches one of your layout cards that you
                remember, you may play it immediately!
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Once you pick up the deck card, you must commit to playing
                  it
                </li>
                <li>
                  • If anyone saw the card you picked up, you must keep it and
                  make your move
                </li>
              </ul>
            </div>

            <Separator />

            <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/30">
              <h4 className="font-semibold text-violet-300 mb-3">
                🧠 Card Snatching
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                When you see a card being played that matches what you know
                someone has:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  •{" "}
                  <strong>
                    Grab the card and play it for them immediately!
                  </strong>
                </li>
                <li>
                  • <strong>If you&apos;re right:</strong> They must draw 2
                  extra cards
                </li>
                <li>
                  • <strong>If you&apos;re wrong:</strong> You must draw 2 extra
                  cards
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Card Effects */}
        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">✨</span>
              Card Effects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-destructive">⚠️ IMPORTANT:</strong>{" "}
                Effects ONLY work when you draw from the deck and immediately
                play the card. Once any card enters your layout, it&apos;s just
                a point value!
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <h4 className="font-semibold text-purple-300 mb-2">7-8</h4>
                <p className="text-sm text-muted-foreground">
                  Peek at one of your own face-down cards
                </p>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <h4 className="font-semibold text-orange-300 mb-2">9-10</h4>
                <p className="text-sm text-muted-foreground">
                  Blindly swap one of your cards with an opponent&apos;s
                </p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 sm:col-span-2 lg:col-span-1">
                <h4 className="font-semibold text-red-300 mb-2">Jack</h4>
                <p className="text-sm text-muted-foreground">
                  Look at one opponent&apos;s face-down card
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scoring */}
        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">📊</span>
              Scoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Card Values</h4>
                <div className="space-y-2">
                  {[
                    { card: "Ace", value: "1 point" },
                    { card: "2-10", value: "Face value" },
                    { card: "Jack", value: "11 points" },
                    { card: "Queen", value: "12 points" },
                  ].map((item) => (
                    <div
                      key={item.card}
                      className="flex justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <span>{item.card}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Kings (Special)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-red-400">♥ ♦ Red Kings</span>
                    <span className="font-bold text-green-400">-1 point</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <span className="text-muted-foreground">
                      ♠ ♣ Black Kings
                    </span>
                    <span className="font-bold text-red-400">+13 points</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Red Kings are your best friend! Black Kings are deadly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Round End */}
        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">🏁</span>
              Round End & Winning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <h4 className="font-semibold text-amber-300 mb-3">
                Calling &quot;Jukas!&quot;
              </h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li>
                  <strong>1.</strong> At any point, declare &quot;Jukas!&quot;
                  if you think you have the lowest score
                </li>
                <li>
                  <strong>2.</strong> Everyone reveals their cards and
                  calculates their round score
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

            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <h4 className="font-semibold text-emerald-300 mb-2">
                🏆 Winning
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
        <Card className="glass border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <span className="text-2xl">💡</span>
              Strategy Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Memory is Key</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Remember your initial 2 cards</li>
                  <li>• Track what opponents have seen</li>
                  <li>• Remember discarded cards</li>
                  <li>• Note what cards were swapped</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Strategic Play</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use 7s/8s to check your cards</li>
                  <li>• Red Kings are your best friends</li>
                  <li>• Avoid Black Kings at all costs</li>
                  <li>• Time your &quot;Jukas!&quot; call carefully</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
