import Link from "next/link";
import UniqueCardsTable from "@/components/card-matrix-unique";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0b1012] text-white font-sans overflow-x-hidden">
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

        </div>
      </nav>

      {/* hero */}
      <header className="mx-auto grid max-w-6xl place-items-center px-6 pt-14 pb-12 text-center sm:pt-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Jukas — The Card Game
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70">
          Low score wins. Remember what you’ve seen. A fast-paced, memory-driven game of
          risk, deduction, and sabotage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#reference"
            className="rounded-lg bg-[#19c37d] px-5 py-3 font-semibold text-black hover:bg-[#15a56b] transition"
          >
            Card Reference
          </Link>
          <Link
            href="/rules"
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Read Full Rules
          </Link>
        </div>
        <div className="mt-6 flex gap-2 text-xs text-white/60">
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">2–6 players</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">~15 min rounds</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">High replayability</span>
        </div>
      </header>

      {/* unique cards table in a glass panel */}
      <main id="reference" className="mx-auto w-full max-w-6xl px-6 pb-16">
        <section className="rounded-2xl border border-white/10 bg-white/[.04] shadow-2xl backdrop-blur-md">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
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

      {/* features */}
      <section className="border-t border-white/10 bg-black/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[.04] p-6">
            <h3 className="text-lg font-bold">2–6 Players</h3>
            <p className="mt-2 text-white/70">
              Perfect for quick sessions or full game nights.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.04] p-6">
            <h3 className="text-lg font-bold">Quick Rounds</h3>
            <p className="mt-2 text-white/70">
              Learn in minutes, finish a round in about 15.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.04] p-6">
            <h3 className="text-lg font-bold">Replayable</h3>
            <p className="mt-2 text-white/70">
              Memory, bluffing, and luck keep every game fresh.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Jukas.</span>
        </div>
      </footer>
    </div>
  );
}
