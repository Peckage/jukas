import Link from "next/link";

export default function RulesPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans scroll-smooth">
      {/* Single unified warm cozy background - fixed position so it stays throughout scroll */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

        {/* Warm fireplace glow - top right corner */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-600/12 via-red-700/8 to-transparent blur-3xl animate-pulse" />

        {/* Warm ambient side glow - left */}
        <div className="absolute top-1/3 -left-40 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-amber-700/10 via-orange-800/6 to-transparent blur-3xl" />

        {/* Bottom center warm glow */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-t from-orange-900/10 via-red-900/6 to-transparent blur-3xl" />

        {/* Soft emerald accent for balance - right side */}
        <div className="absolute top-2/3 -right-20 h-96 w-96 rounded-full bg-emerald-900/6 blur-3xl" />

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.008),transparent_70%)] opacity-60" />
      </div>

      {/* top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/90 border-b border-orange-900/20 shadow-lg shadow-orange-900/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="font-semibold tracking-wide text-white/90 hover:text-orange-200 transition">
            JUKAS
          </Link>
          <div className="flex gap-4">
            <Link href="/#home" className="text-white/70 hover:text-orange-200 transition">
              Home
            </Link>
            <Link href="/#setup" className="text-white/70 hover:text-orange-200 transition">
              Setup
            </Link>
            <Link href="/#scorekeeper" className="text-white/70 hover:text-orange-200 transition">
              Scorekeeper
            </Link>
            <Link href="/#reference" className="text-white/70 hover:text-orange-200 transition">
              Reference
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-20 pt-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            How to Play Jukas
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A fast-paced memory and strategy card game played over multiple rounds. Last player under 100 points wins!
          </p>
        </div>

        {/* Game Overview */}
        <section className="mb-12">
          <div className="bg-slate-900/70 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">Game Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Quick Facts</h3>
                <ul className="space-y-2 text-white/80">
                  <li>• <strong>Players:</strong> 2-6</li>
                  <li>• <strong>Time:</strong> 5-10 minutes per round</li>
                  <li>• <strong>Goal:</strong> Last player under 100 points wins</li>
                  <li>• <strong>Deck:</strong> Standard 52-card deck</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-lg">Key Concepts</h3>
                <ul className="space-y-2 text-white/80">
                  <li>• Multiple rounds with cumulative scoring</li>
                  <li>• Remember what you&apos;ve seen</li>
                  <li>• Cards have point values and effects</li>
                  <li>• Effects only work from the deck</li>
                  <li>• Strategic swapping is crucial</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Setup */}
        <section className="mb-12">
          <div className="bg-slate-900/70 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">Setup</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-900/40">1</span>
                <div>
                  <h3 className="font-semibold mb-2">Deal Cards</h3>
                  <p className="text-white/80">Each player gets <strong>4 cards face-down</strong> arranged in a 2×2 grid in front of them. Don&apos;t look at these cards yet!</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-900/40">2</span>
                <div>
                  <h3 className="font-semibold mb-2">Create Draw and Discard Piles</h3>
                  <p className="text-white/80">Place remaining cards as the <strong>draw pile</strong>. Flip the top card to start the <strong>discard pile</strong>.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-900/40">3</span>
                <div>
                  <h3 className="font-semibold mb-2">Initial Peek</h3>
                  <p className="text-white/80">Each player may look at <strong>any 2 of their 4 cards</strong>, then put them back face-down. Remember what you saw!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gameplay */}
        <section className="mb-12">
          <div className="bg-slate-900/70 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">How to Play</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">On Your Turn</h3>
              <div className="bg-white/5 rounded-lg p-6 mb-6">
                <p className="text-white/90 text-lg font-medium mb-4">Each turn:</p>
                <div className="border border-blue-500/30 rounded-lg p-6 bg-blue-500/10">
                  <h4 className="font-semibold mb-4 text-blue-300">📥 Draw and Decide</h4>
                  <ol className="space-y-3 text-sm text-white/80">
                    <li><strong>1. Draw the top card from the deck</strong></li>
                    <li><strong>2. Look at the card</strong> - you now know what it is</li>
                    <li><strong>3. Choose one:</strong>
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>• <strong>Use its effect</strong> (if any) and discard it to the discard pile</li>
                        <li>• <strong>OR swap it</strong> into your layout (replaces one of your face-down cards)</li>
                      </ul>
                    </li>
                    <li><strong>4. Important:</strong> Card effects only work if you play them directly from the deck!</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Special Rule: Deck Card Matching</h3>
              <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <h4 className="font-semibold text-cyan-300 mb-2">📋 Memory Advantage Rule</h4>
                <p className="text-white/80 text-sm mb-3">
                  If the top deck card matches one of your layout cards that you remember, you may play it immediately! However:
                </p>
                <ul className="text-white/80 text-sm space-y-1 ml-4">
                  <li>• <strong>Once you pick up the deck card, you must commit to playing it</strong></li>
                  <li>• If you accidentally pick up the wrong card, you can only put it back if <strong>no one else saw it (Including yourself)</strong></li>
                  <li>• If anyone saw the card you picked up, you must keep it and make your move</li>
                  <li>• This applies to both using the card effect OR swapping it into your layout</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Special Rule: Card Snatching</h3>
              <div className="mb-6 p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                <h4 className="font-semibold text-violet-300 mb-2">🧠 Knowledge Advantage Rule</h4>
                <p className="text-white/80 text-sm mb-3">
                  When you see a card being played that matches what you know someone has in their layout:
                </p>
                <ul className="text-white/80 text-sm space-y-1 ml-4 mb-3">
                  <li>• <strong>Grab the card and play it for them immediately</strong></li>
                  <li>• Example: You see a 5 being played and you know they have a 5 - snatch it!</li>
                  <li>• <strong>If you&apos;re right:</strong> They must draw 2 extra cards from the deck into their layout</li>
                  <li>• <strong>If you&apos;re wrong:</strong> You must draw 2 extra cards from the deck into your layout</li>
                </ul>
                <p className="text-white/70 text-xs">
                  <strong>Timing:</strong> Anytime a card is being played - doesn&apos;t matter whose turn it is. Act fast when you spot a match!
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Card Effects (ONLY When Drawn from Deck!)</h3>
              
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">⚠️ IMPORTANT: Effects Only Work Once!</h4>
                <p className="text-white/80 text-sm">
                  Card effects ONLY activate when you <strong>draw from the deck and immediately play the card</strong>. 
                  Once any card enters your hand layout (through swapping, discard pickup, etc.), it becomes just a point value. 
                  No more effects!
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">7-8: Peek at Your Own Card</h4>
                  <p className="text-white/80 text-sm">Look at one of your face-down cards. You may then swap the 7/8 into that position, or discard it.</p>
                </div>
                
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-300 mb-2">9-10: Blind Swap</h4>
                  <p className="text-white/80 text-sm">Blindly swap one of your face-down cards with one face-down card from any opponent. Neither player looks at the cards!</p>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Jack: Peek and Swap</h4>
                  <p className="text-white/80 text-sm">Look at one opponent&apos;s face-down card. You may swap the Jack with that card, or discard the Jack.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Round End & Scoring</h3>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-white/90 mb-3">
                  <strong>Each round ends when any player thinks they have the lowest score.</strong>
                </p>
                <ol className="space-y-2 text-sm text-white/80">
                  <li>1. At any point during the game, a player may declare &quot;Jukas!&quot;</li>
                  <li>2. If declared while another player is taking their turn, that player must finish their turn before resolving the declaration.</li>
                  <li>3. Everyone reveals their cards and calculates their round score</li>
                  <li>4. Add the round score to each player&apos;s total score</li>
                  <li>5. Players with 100+ points are eliminated</li>
                  <li>6. Continue with new rounds until only one player remains</li>
                </ol>
              </div>
              
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">🏆 Winning</h4>
                <p className="text-sm text-white/80">
                  The <strong>last player to stay under 100 points wins</strong> the entire game! This creates tension as players must balance risk-taking with survival.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-12">
          <div className="bg-slate-900/70 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">Scoring</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 text-lg">Card Values</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded">
                    <span>Ace</span>
                    <span className="font-bold">1 point</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded">
                    <span>2-10</span>
                    <span className="font-bold">Face value</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded">
                    <span>Jack</span>
                    <span className="font-bold">11 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded">
                    <span>Queen</span>
                    <span className="font-bold">12 points</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-lg">Kings (Special)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 px-3 bg-red-500/10 border border-red-500/30 rounded">
                    <span className="text-red-300">♥ ♦ Red Kings</span>
                    <span className="font-bold text-red-300">-1 point</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-gray-500/10 border border-gray-500/30 rounded">
                    <span className="text-gray-300">♠ ♣ Black Kings</span>
                    <span className="font-bold text-gray-300">+13 points</span>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-4">
                  <strong>Remember:</strong> Red Kings are great (subtract points), Black Kings are terrible (add lots of points)!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Tips */}
        <section className="mb-12">
          <div className="bg-slate-900/70 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">Strategy Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Memory is Key</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Remember your initial 2 cards</li>
                  <li>• Track what opponents have seen</li>
                  <li>• Remember discarded cards</li>
                  <li>• Note what cards were swapped</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-lg">Strategic Play</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Use 7s/8s to check your cards</li>
                  <li>• Red Kings are your best friends</li>
                  <li>• Avoid Black Kings at all costs</li>
                  <li>• Time your &quot;Jukas!&quot; call carefully</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#setup"
              className="px-6 py-3 bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition shadow-lg shadow-orange-900/40"
            >
              View Setup Guide
            </Link>
            <Link
              href="/#reference"
              className="px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition"
            >
              Card Reference
            </Link>
            <Link
              href="/#scorekeeper"
              className="px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition"
            >
              Use Score Keeper
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-emerald-800/40 bg-emerald-900/20 hover:bg-emerald-900/40 text-white font-semibold rounded-lg transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}