import Link from "next/link";

export default function RulesPage() {
  return (
    <div className="relative min-h-screen bg-[#0b1012] text-white font-sans">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#19c37d]/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-[#0e7c86]/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-60 w-60 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* top nav */}
      <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="font-semibold tracking-wide text-white/90 hover:text-white">
            JUKAS
          </Link>
          <div className="flex gap-4">
            <Link href="/#setup" className="text-white/70 hover:text-white transition">
              Setup Guide
            </Link>
            <Link href="/#scorekeeper" className="text-white/70 hover:text-white transition">
              Score Keeper
            </Link>
            <Link href="/#reference" className="text-white/70 hover:text-white transition">
              Card Reference
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            How to Play Jukas
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A fast-paced memory and strategy card game played over multiple rounds. Last player under 100 points wins!
          </p>
        </div>

        {/* Game Overview */}
        <section className="mb-12">
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#19c37d]">Game Overview</h2>
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
                  <li>• Remember what you've seen</li>
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
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#19c37d]">Setup</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[#19c37d] text-black rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <h3 className="font-semibold mb-2">Deal Cards</h3>
                  <p className="text-white/80">Each player gets <strong>4 cards face-down</strong> arranged in a 2×2 grid in front of them. Don't look at these cards yet!</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[#19c37d] text-black rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <h3 className="font-semibold mb-2">Create Draw and Discard Piles</h3>
                  <p className="text-white/80">Place remaining cards as the <strong>draw pile</strong>. Flip the top card to start the <strong>discard pile</strong>.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[#19c37d] text-black rounded-full flex items-center justify-center font-bold text-sm">3</span>
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
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#19c37d]">How to Play</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">On Your Turn</h3>
              <div className="bg-white/5 rounded-lg p-6 mb-6">
                <p className="text-white/90 text-lg font-medium mb-4">Choose one option:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-blue-500/30 rounded-lg p-4 bg-blue-500/10">
                    <h4 className="font-semibold mb-2 text-blue-300">Option A: Draw from Deck</h4>
                    <ol className="space-y-2 text-sm text-white/80">
                      <li>1. Draw the top card from the deck</li>
                      <li>2. Look at it and use its effect (if any)</li>
                      <li>3. Either discard it OR swap it into your layout</li>
                      <li>4. <strong>Effect only works if you discard it!</strong></li>
                    </ol>
                  </div>
                  <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/10">
                    <h4 className="font-semibold mb-2 text-green-300">Option B: Take from Discard</h4>
                    <ol className="space-y-2 text-sm text-white/80">
                      <li>1. Take the top discard card</li>
                      <li>2. <strong>No effect triggers! Just point value</strong></li>
                      <li>3. Must swap it with one of your face-down cards</li>
                      <li>4. Discard the swapped card face-up</li>
                    </ol>
                  </div>
                </div>
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
                  <p className="text-white/80 text-sm">Look at one opponent's face-down card. You may swap the Jack with that card, or discard the Jack.</p>
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
                  <li>1. At the start of their turn, a player may declare "Jukas!"</li>
                  <li>2. All other players get one final turn</li>
                  <li>3. Everyone reveals their cards and calculates their round score</li>
                  <li>4. Add the round score to each player's total score</li>
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
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#19c37d]">Scoring</h2>
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
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#19c37d]">Strategy Tips</h2>
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
                  <li>• Time your "Jukas!" call carefully</li>
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
              className="px-6 py-3 bg-[#19c37d] hover:bg-[#15a56b] text-black font-semibold rounded-lg transition"
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
              className="px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}