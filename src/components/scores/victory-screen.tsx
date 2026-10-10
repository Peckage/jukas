"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Player } from "@/components/scores/storage";

const CONFETTI_COLORS = [
  "#f97316",
  "#fbbf24",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

function makeParticles() {
  return Array.from({ length: 50 }, (_, id) => ({
    id,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 8,
    round: Math.random() > 0.5,
  }));
}

/** One burst, made when the victory screen mounts. Each piece fades out at
    the end of its own fall (`forwards`), so nothing has to remove them. */
function Confetti() {
  const [particles] = useState(makeParticles);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: particle.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export function VictoryScreen({
  winner,
  threshold,
  onClose,
}: {
  winner: Player;
  threshold: number;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
    >
      <Confetti />
      <div className="animate-victory-entrance relative w-full max-w-sm rounded-3xl border border-border-strong p-8 text-center shadow-overlay glass-overlay">
        <span aria-hidden className="animate-trophy text-7xl">
          🏆
        </span>
        <p className="mt-5 text-xs font-semibold tracking-wider text-warning uppercase">
          Victory
        </p>
        <h2
          id="victory-title"
          className="mt-1 font-display text-3xl font-bold tracking-tight break-words"
        >
          {winner.name} wins!
        </h2>
        <p className="mt-4 inline-flex h-9 items-center rounded-full border border-warning/30 bg-warning-surface px-4 font-display text-sm font-semibold text-warning tabular-nums">
          Final score {winner.total}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          The last one under {threshold} points.
        </p>
        <Button autoFocus size="lg" className="mt-7 w-full" onClick={onClose}>
          Continue
        </Button>
      </div>
    </div>
  );
}
