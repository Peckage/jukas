"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DealScene,
  DrawScene,
  JukasScene,
  PeekScene,
  PowersScene,
  SnatchScene,
  StartScene,
  SwapScene,
  WinScene,
} from "@/components/walkthrough/scenes";
import { cn } from "@/lib/utils";

const STEPS: { title: string; body: string; Scene: () => React.ReactNode }[] = [
  {
    title: "Everyone starts with 100 lives",
    body: "Jukas is played in rounds. When a round ends, the cards in front of you cost lives: a card’s points are the lives it takes. Run out and you’re out.",
    Scene: StartScene,
  },
  {
    title: "Deal four cards, face down",
    body: "Each player gets four cards in a 2×2 grid, face down. The rest is the draw pile; turn its top card over to start the discard pile.",
    Scene: DealScene,
  },
  {
    title: "Peek at two, then remember",
    body: "Look at any two of your own cards and put them back. From here on it’s memory: your cards stay hidden until the round ends.",
    Scene: PeekScene,
  },
  {
    title: "On your turn, draw a card",
    body: "Take the top card of the draw pile and look at it. Or take the face-up card from the discard pile, and swap it in.",
    Scene: DrawScene,
  },
  {
    title: "Keep it, or let it go",
    body: "Swap the card into your grid (the card it replaces goes to the discard pile) or discard it. Low cards are worth keeping: they cost fewer lives.",
    Scene: SwapScene,
  },
  {
    title: "Some cards have a power",
    body: "Drawn from the deck and played straight away, these do something. Swapped into your grid, they only cost their lives.",
    Scene: PowersScene,
  },
  {
    title: "Snatch!",
    body: "See a card played that matches one you know someone holds? Slap it down for them at once. Right: they draw two extra cards. Wrong: you do.",
    Scene: SnatchScene,
  },
  {
    title: "Call “Jukas!”",
    body: "Think you hold the least? Call it. Everyone turns their cards over and loses that many lives. A red King gives one back.",
    Scene: JukasScene,
  },
  {
    title: "Last one standing wins",
    body: "Rounds go on until only one player has lives left. The score keeper counts them for you, round by round.",
    Scene: WinScene,
  },
];

/** How far a swipe has to travel to turn the page, in pixels. */
const SWIPE = 48;

/**
 * The game in nine steps, each a small animated table. Swipe the table,
 * use the buttons, the progress bar or the arrow keys; a step's animation
 * replays every time it is shown.
 */
export function Walkthrough() {
  const [step, setStep] = useState(0);
  const swipeFrom = useRef<number | null>(null);
  const last = STEPS.length - 1;
  const go = (next: number) => setStep(Math.max(0, Math.min(last, next)));
  const { title, body, Scene } = STEPS[step];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="How to play, step by step"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(step + 1);
        if (e.key === "ArrowLeft") go(step - 1);
      }}
      className="overflow-hidden rounded-2xl border border-border shadow-card glass-panel"
    >
      <ol className="flex gap-1 px-4 pt-4 sm:px-5">
        {STEPS.map((s, index) => (
          <li key={s.title} className="flex-1">
            <button
              type="button"
              onClick={() => go(index)}
              aria-label={`Step ${index + 1}: ${s.title}`}
              aria-current={index === step ? "step" : undefined}
              className="group flex h-6 w-full items-center outline-none"
            >
              <span
                className={cn(
                  "h-1.5 w-full rounded-full transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring",
                  index <= step ? "bg-primary" : "bg-foreground/15 group-hover:bg-foreground/25"
                )}
              />
            </button>
          </li>
        ))}
      </ol>

      {/* Keyed by the step, so the scene's animations start over. */}
      <div
        key={step}
        aria-hidden
        onPointerDown={(e) => {
          swipeFrom.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeFrom.current === null) return;
          const dx = e.clientX - swipeFrom.current;
          swipeFrom.current = null;
          if (dx <= -SWIPE) go(step + 1);
          if (dx >= SWIPE) go(step - 1);
        }}
        className="table-glow flex h-64 touch-pan-y items-center justify-center overflow-hidden px-4 select-none sm:h-72"
      >
        <Scene />
      </div>

      <div className="border-t border-border p-4 sm:p-5" aria-live="polite">
        <p className="text-xs font-semibold tracking-wider text-primary uppercase">
          Step {step + 1} of {STEPS.length}
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      </div>

      <div className="flex gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
        <Button
          variant="outline"
          size="lg"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          aria-label="Previous step"
          className="px-4"
        >
          <ArrowLeft />
        </Button>
        {step < last ? (
          <Button size="lg" className="flex-1" onClick={() => go(step + 1)}>
            Next
            <ArrowRight />
          </Button>
        ) : (
          <>
            <Button asChild size="lg" variant="outline" className="flex-1">
              <Link href="/rules">
                <BookOpen />
                Full rules
              </Link>
            </Button>
            <Button asChild size="lg" className="flex-1">
              <Link href="/scores">
                <Play />
                Play
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
