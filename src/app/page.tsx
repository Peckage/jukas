import Link from "next/link";
import UniqueCardsTable from "@/components/card-matrix-unique";
import ScoreKeeper from "@/components/score-keeper";
import GameSetupGuide from "@/components/game-setup-guide";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
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
      <nav className="sticky top-0 z-20 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/90 border-b border-orange-900/20 shadow-lg shadow-orange-900/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="font-semibold tracking-wide text-white/90 hover:text-orange-200 transition">
            JUKAS
          </Link>
          <div className="flex gap-4">
            <Link href="#setup" className="text-white/70 hover:text-orange-200 transition">
              Setup Guide
            </Link>
            <Link href="#scorekeeper" className="text-white/70 hover:text-orange-200 transition">
              Score Keeper
            </Link>
            <Link href="#reference" className="text-white/70 hover:text-orange-200 transition">
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
            className="rounded-lg bg-gradient-to-r from-orange-700 to-red-700 px-5 py-3 font-semibold text-white hover:from-orange-600 hover:to-red-600 transition shadow-lg shadow-orange-900/40"
          >
            Quick Setup
          </Link>
          <Link
            href="/rules"
            className="rounded-lg border border-emerald-800/40 bg-emerald-900/20 px-5 py-3 font-semibold text-white hover:bg-emerald-900/40 transition"
          >
            Full Rules
          </Link>
          <Link
            href="#reference"
            className="rounded-lg border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
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
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-md">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/5">
            <div>
              <h2 className="text-xl font-bold text-white">Card Reference (Unique Types)</h2>
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
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          <div className="rounded-xl border border-orange-800/30 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-orange-300">2–6 Players</h3>
            <p className="mt-2 text-white/70">
              Perfect for quick sessions or full game nights.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-800/30 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-emerald-300">Multi-Round Format</h3>
            <p className="mt-2 text-white/70">
              Play rounds until only one survivor remains under 100 points.
            </p>
          </div>
          <div className="rounded-xl border border-amber-800/30 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-amber-300">Memory & Strategy</h3>
            <p className="mt-2 text-white/70">
              Remember cards, bluff opponents, and survive the longest.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/10 bg-slate-950/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Jukas.</span>
        </div>
      </footer>
    </div>
  );
}