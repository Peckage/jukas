"use client";

import { useEffect } from "react";
import { Play, Skull, Trophy } from "lucide-react";
import { LivesChart, seriesColor } from "@/components/scores/lives-chart";
import { livesLeft, livesTimeline } from "@/components/scores/lives";
import { DEFAULT_SETTINGS, type GameSession } from "@/components/scores/storage";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * How a finished game went: who won, every player's lives round by round,
 * and the final standings. Shown when a game is saved and ended, and when a
 * game is opened from the history.
 */
export function GameSummary({
  game,
  onDone,
}: {
  game: GameSession;
  onDone: () => void;
}) {
  // It replaces the board or the history in place: start at its top.
  useEffect(() => window.scrollTo({ top: 0 }), []);

  const threshold =
    game.settings?.eliminationThreshold ?? DEFAULT_SETTINGS.eliminationThreshold;
  const rounds = Math.max(0, ...game.players.map((p) => p.rounds.length));

  // Still in first, most lives first; then the rest, the last to go out first.
  const standings = game.players
    .map((player, seat) => {
      const timeline = livesTimeline(player, threshold);
      const out = player.total >= threshold;
      return {
        player,
        seat,
        out,
        lives: out ? 0 : livesLeft(player.total, threshold),
        outRound: out ? timeline.length - 1 : null,
      };
    })
    .sort((a, b) =>
      a.out !== b.out
        ? Number(a.out) - Number(b.out)
        : a.out
          ? (b.outRound ?? 0) - (a.outRound ?? 0)
          : b.lives - a.lives
    );
  const alive = standings.filter((s) => !s.out);
  const winner = alive.length === 1 && game.players.length > 1 ? alive[0] : null;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        icon={Trophy}
        title="How it went"
        description={`${formatDate(game.date)} · ${rounds} ${rounds === 1 ? "round" : "rounds"}`}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-xl border border-warning/30 bg-warning-surface p-4">
          <span aria-hidden className="text-4xl">
            {winner ? "🏆" : "🏁"}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wider text-warning uppercase">
              {winner ? "Winner" : "Ended early"}
            </p>
            <p className="truncate font-display text-xl font-bold">
              {winner
                ? `${winner.player.name}`
                : alive.length > 0
                  ? `${alive[0].player.name} was leading`
                  : "Nobody survived"}
            </p>
            {alive.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {alive[0].lives} {alive[0].lives === 1 ? "life" : "lives"} left
                of {threshold}
              </p>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lives per round</CardTitle>
          </CardHeader>
          <CardContent>
            <LivesChart players={game.players} threshold={threshold} />
          </CardContent>
        </Card>

        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border py-4 [.border-b]:pb-4">
            <CardTitle>Final standings</CardTitle>
          </CardHeader>
          <ol className="divide-y divide-border">
            {standings.map((s, place) => (
              <li key={s.seat} className="flex items-center gap-3 px-5 py-3">
                <span className="w-5 text-right text-xs font-semibold text-muted-foreground tabular-nums">
                  {place + 1}
                </span>
                <span
                  aria-hidden
                  className="h-0.5 w-3.5 shrink-0 rounded-full"
                  style={{ backgroundColor: seriesColor(s.seat) }}
                />
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate font-medium",
                    s.out && "text-muted-foreground"
                  )}
                >
                  {s.player.name}
                </span>
                {s.out ? (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Skull className="size-3.5 text-destructive" aria-hidden />
                    Out in round {s.outRound}
                  </span>
                ) : (
                  <span className="font-display text-sm font-semibold tabular-nums">
                    {s.lives} {s.lives === 1 ? "life" : "lives"}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Card>

        <Button size="lg" className="w-full" onClick={onDone}>
          <Play />
          New game
        </Button>
      </div>
    </div>
  );
}
