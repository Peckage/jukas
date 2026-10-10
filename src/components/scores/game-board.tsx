"use client";

import { Check, ChevronLeft, ChevronRight, Crown, Minus, Skull } from "lucide-react";
import type { Player } from "@/components/scores/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const QUICK_ADD = [1, 2, 5, 10];

/** The score entry controls share one size: a thumb on a phone. */
const STEP = "h-11 rounded-md sm:h-10";

/** How close a player is to going out, as a verdict colour. */
function dangerOf(total: number, threshold: number) {
  const share = total / threshold;
  if (share >= 0.85) return "bg-destructive";
  if (share >= 0.6) return "bg-warning";
  return "bg-primary";
}

function PlayerCard({
  player,
  seat,
  threshold,
  isLeading,
  isWinner,
  isJustEliminated,
  pending,
  roundScore,
  onStep,
  onType,
  onConfirm,
}: {
  player: Player;
  /** The player's place at the table, as numbered on the setup screen. */
  seat: number;
  threshold: number;
  isLeading: boolean;
  isWinner: boolean;
  isJustEliminated: boolean;
  pending: number | undefined;
  roundScore: number | undefined;
  onStep: (delta: number) => void;
  onType: (value: number) => void;
  onConfirm: () => void;
}) {
  const isEliminated = player.total >= threshold;
  const hasPending = pending !== undefined;

  return (
    <li
      className={cn(
        "rounded-xl border p-3.5 shadow-card glass-panel transition-[opacity,border-color] sm:p-4",
        isJustEliminated
          ? "animate-eliminated border-destructive/60"
          : isEliminated
            ? "border-border opacity-50"
            : isWinner
              ? "animate-winner border-warning/50"
              : isLeading
                ? "border-primary/45"
                : "border-border"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums",
            isWinner
              ? "border-warning/40 bg-warning-surface"
              : isLeading
                ? "border-primary/40 bg-primary-surface text-primary"
                : isEliminated
                  ? "border-destructive/35 bg-destructive-surface text-destructive"
                  : "border-border text-muted-foreground glass-control"
          )}
        >
          {isWinner ? (
            <span className="animate-crown" aria-label="Winner">
              👑
            </span>
          ) : isLeading ? (
            <Crown className="size-4" aria-label="Leading" />
          ) : isEliminated ? (
            <Skull className="size-4" aria-label="Out" />
          ) : (
            seat
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "truncate font-semibold",
                isEliminated && "text-muted-foreground line-through"
              )}
            >
              {player.name}
            </p>
            {isJustEliminated && (
              <span className="shrink-0 rounded-full border border-destructive-edge bg-destructive px-1.5 text-3xs font-bold text-destructive-foreground uppercase">
                Out!
              </span>
            )}
          </div>
          <p className="truncate font-mono text-2xs text-muted-foreground">
            {player.rounds.length > 0
              ? Array.from(player.rounds, (score) => score || 0).join(" → ")
              : "No rounds yet"}
          </p>
        </div>

        <p className="shrink-0 text-right leading-none">
          <span
            className={cn(
              "font-display text-2xl font-bold tabular-nums",
              isEliminated
                ? "text-destructive"
                : isLeading
                  ? "text-primary"
                  : "text-foreground"
            )}
          >
            {player.total}
          </span>
          <span className="ml-0.5 text-xs text-muted-foreground tabular-nums">
            /{threshold}
          </span>
        </p>
      </div>

      {!isEliminated && (
        <>
          <Progress
            value={Math.min((player.total / threshold) * 100, 100)}
            aria-label={`${player.name}: ${player.total} of ${threshold}`}
            className="mt-3 h-1.5"
            indicatorClassName={dangerOf(player.total, threshold)}
          />

          <div className="mt-3 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Subtract 1"
              className={cn(
                buttonVariants({ variant: "outline" }),
                STEP,
                "w-10 shrink-0 px-0"
              )}
            >
              <Minus />
            </button>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              aria-label={`${player.name}: score this round`}
              value={hasPending ? pending : (roundScore ?? "")}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || value === "-") onType(0);
                else if (/^-?\d+$/.test(value)) onType(parseInt(value, 10));
              }}
              placeholder="0"
              className={cn(
                STEP,
                "w-12 min-w-0 shrink-0 border text-center font-display text-base font-bold tabular-nums shadow-control outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                hasPending
                  ? "border-primary bg-primary-surface text-primary"
                  : "border-input glass-control"
              )}
            />

            {QUICK_ADD.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => onStep(amount)}
                aria-label={`Add ${amount}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  STEP,
                  "min-w-0 flex-1 px-0 font-display font-semibold tabular-nums"
                )}
              >
                +{amount}
              </button>
            ))}

            <button
              type="button"
              onClick={onConfirm}
              disabled={!hasPending}
              aria-label="Save score"
              className={cn(
                buttonVariants({ variant: hasPending ? "default" : "outline" }),
                STEP,
                "w-11 shrink-0 px-0 disabled:opacity-35"
              )}
            >
              <Check className="size-5" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export function GameBoard({
  players,
  currentRound,
  threshold,
  winnerIndex,
  justEliminated,
  pendingScores,
  onPreviousRound,
  onNextRound,
  onStep,
  onType,
  onConfirm,
  onEnd,
}: {
  players: Player[];
  currentRound: number;
  threshold: number;
  winnerIndex: number;
  justEliminated: Set<number>;
  pendingScores: Record<number, number>;
  onPreviousRound: () => void;
  onNextRound: () => void;
  onStep: (playerIndex: number, delta: number) => void;
  onType: (playerIndex: number, value: number) => void;
  onConfirm: (playerIndex: number) => void;
  onEnd: (save: boolean) => void;
}) {
  const alive = players.filter((p) => p.total < threshold);
  const lowest = Math.min(...alive.map((p) => p.total));

  return (
    <div className="mx-auto w-full max-w-2xl px-3 pt-3 pb-6 sm:px-6 sm:pt-6">
      {/* The game bar: floats at the top of a phone, under the header above. */}
      <div className="sticky top-[max(0.5rem,env(safe-area-inset-top,0px))] z-30 mb-3 md:top-[4.75rem]">
        <div className="flex h-14 items-center justify-between gap-2 rounded-2xl border border-border px-1.5 shadow-card glass-chrome">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={onPreviousRound}
              disabled={currentRound === 1}
              aria-label="Previous round"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <p className="min-w-20 text-center leading-tight">
              <span className="block text-3xs font-semibold tracking-wider text-muted-foreground uppercase">
                Round
              </span>
              <span className="font-display text-lg font-bold tabular-nums">
                {currentRound}
              </span>
            </p>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={onNextRound}
              aria-label="Next round"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <span className="hidden h-8 items-center rounded-full border border-border px-3 text-xs font-medium text-muted-foreground tabular-nums glass-control min-[380px]:flex">
            {alive.length}/{players.length} in
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="mr-1 hover:text-destructive">
                End
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>End this game?</AlertDialogTitle>
                <AlertDialogDescription>
                  Save the result to your history, or throw it away.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="h-11 sm:h-10">
                  Keep playing
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onEnd(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 hover:text-destructive sm:h-10"
                  )}
                >
                  Don’t save
                </AlertDialogAction>
                <AlertDialogAction
                  onClick={() => onEnd(true)}
                  className="h-11 sm:h-10"
                >
                  Save and end
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <ul className="space-y-2.5">
        {/* Table order, never re-sorted by score: a player's card stays where
            everyone expects it. The crown marks who is leading. */}
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            player={player}
            seat={index + 1}
            threshold={threshold}
            isLeading={player.total < threshold && player.total === lowest}
            isWinner={index === winnerIndex}
            isJustEliminated={justEliminated.has(index)}
            pending={pendingScores[index]}
            roundScore={player.rounds[currentRound - 1]}
            onStep={(delta) => onStep(index, delta)}
            onType={(value) => onType(index, value)}
            onConfirm={() => onConfirm(index)}
          />
        ))}
      </ul>

      <p className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>
          Out at <span className="font-medium text-destructive">{threshold}</span>
        </span>
        <span>
          <span className="text-suit-red">♥ ♦</span> K = −1
        </span>
        <span>♠ ♣ K = +13</span>
      </p>
    </div>
  );
}
