import Link from "next/link";
import UniqueCardsTable from "@/components/card-matrix-unique";
import ScoreKeeper from "@/components/score-keeper";
import GameSetupGuide from "@/components/game-setup-guide";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white font-sans overflow-x-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-purple-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-cyan-400/20 blur-2xl" />
      </div>

      {/* top nav */}
      <nav className="sticky top-0 z-20 backdrop-blur-md supports-[backdrop-filter]:bg-slate-800/80 border-b border-slate-600/50 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="font-semibold tracking-wide text-white/90 hover:text-white">
            JUKAS
          </Link>
          <div className="flex gap-4">
            <Link href="#setup" className="text-white/70 hover:text-white transition">
              Setup Guide
            </Link>
            <Link href="#scorekeeper" className="text-white/70 hover:text-white transition">
              Score Keeper
            </Link>
            <Link href="#reference" className="text-white/70 hover:text-white transition">
              Card Reference
            </Link>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className="mx-auto grid max-w-6xl place-items-center px-6 pt-14 pb-12 text-center sm:pt-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Jukas — The Card Game
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70">
          Stay under 100 points to survive. Remember what you&apos;ve seen. A fast-paced, memory-driven elimination game of risk, deduction, and sabotage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#setup"
            className="rounded-lg bg-[#19c37d] px-5 py-3 font-semibold text-black hover:bg-[#15a56b] transition"
          >
            Quick Setup
          </Link>
          <Link
            href="/rules"
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Full Rules
          </Link>
          <Link
            href="#reference"
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Card Reference
          </Link>
        </div>
        <div className="mt-6 flex gap-2 text-xs text-white/60">
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">2–6 players</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">~5-10 min rounds</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">Elimination format</span>
        </div>
      </header>

      {/* unique cards table in a glass panel */}
      <main id="reference" className="mx-auto w-full max-w-6xl px-6 pb-16">
        <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl backdrop-blur-md">
          <header className="flex items-center justify-between border-b border-slate-600/50 px-5 py-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <div>
              <h2 className="text-xl font-bold">Card Reference (Unique Types)</h2>
              <p className="text-sm text-white/60">
                Only ranks with unique values/effects are shown. Suits matter only for Kings.
              </p>
            </div>
          </header>
          <div className="p-4 sm:p-6">
            <UniqueCardsTable />
          </div>
        </section>
      </main>

      {/* Game Setup Guide */}
      <GameSetupGuide />

      {/* Score Keeper */}
      <ScoreKeeper />

      {/* features */}
      <section className="border-t border-slate-600/50 bg-gradient-to-br from-slate-800/60 to-slate-900/80">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-600/50 bg-gradient-to-br from-emerald-800/20 to-emerald-900/30 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-emerald-300">2–6 Players</h3>
            <p className="mt-2 text-slate-300">
              Perfect for quick sessions or full game nights.
            </p>
          </div>
          <div className="rounded-xl border border-slate-600/50 bg-gradient-to-br from-blue-800/20 to-blue-900/30 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-blue-300">Multi-Round Format</h3>
            <p className="mt-2 text-slate-300">
              Play rounds until only one survivor remains under 100 points.
            </p>
          </div>
          <div className="rounded-xl border border-slate-600/50 bg-gradient-to-br from-purple-800/20 to-purple-900/30 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-purple-300">Memory & Strategy</h3>
            <p className="mt-2 text-slate-300">
              Remember cards, bluff opponents, and survive the longest.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-slate-600/50 bg-slate-800/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} Jukas.</span>
        </div>
      </footer>
    </div>
  );
}