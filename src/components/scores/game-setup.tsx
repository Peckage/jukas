"use client";

import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  History,
  Play,
  Plus,
  Settings as SettingsIcon,
  Trash2,
  Trophy,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Segmented } from "@/components/scores/segmented";
import { livesLeft } from "@/components/scores/lives";
import {
  DEFAULT_SETTINGS,
  type GameSession,
  type GameSettings,
} from "@/components/scores/storage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const THRESHOLDS = [50, 100, 150, 200];
const MAX_PLAYERS: { value: number | null; label: string }[] = [
  { value: null, label: "No limit" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
  { value: 10, label: "10" },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoryGame({
  game,
  onOpen,
}: {
  game: GameSession;
  onOpen: () => void;
}) {
  const threshold =
    game.settings?.eliminationThreshold ?? DEFAULT_SETTINGS.eliminationThreshold;
  const rounds = Math.max(0, ...game.players.map((p) => p.rounds.length));
  const standings = [...game.players].sort((a, b) => a.total - b.total);
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="press w-full rounded-xl border border-border p-3.5 text-left glass-control outline-none hover:border-border-strong focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDate(game.date)}
          </span>
          <span className="flex items-center gap-1 text-2xs text-muted-foreground tabular-nums">
            {game.players.length} players · {rounds} rounds
            <ChevronRight className="size-3.5" aria-hidden />
          </span>
        </div>
        <ol className="grid grid-cols-2 gap-x-4 gap-y-1">
          {standings.map((player, place) => (
            <li
              key={place}
              className={cn(
                "flex items-center justify-between gap-2 text-sm",
                place === 0 ? "font-medium text-warning" : "text-muted-foreground"
              )}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                {place === 0 && <Trophy className="size-3.5 shrink-0" aria-hidden />}
                <span className="truncate">{player.name}</span>
              </span>
              <span className="tabular-nums">
                {player.total >= threshold
                  ? "Out"
                  : livesLeft(player.total, threshold)}
              </span>
            </li>
          ))}
        </ol>
      </button>
    </li>
  );
}

export function GameSetup({
  playerNames,
  settings,
  history,
  onAddPlayer,
  onRemovePlayer,
  onRenamePlayer,
  onChangeSettings,
  onStart,
  onClearHistory,
  onOpenGame,
}: {
  playerNames: string[];
  settings: GameSettings;
  history: GameSession[];
  onAddPlayer: () => void;
  onRemovePlayer: (index: number) => void;
  onRenamePlayer: (index: number, name: string) => void;
  onChangeSettings: (settings: GameSettings) => void;
  onStart: () => void;
  onClearHistory: () => void;
  onOpenGame: (game: GameSession) => void;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const atMax =
    settings.maxPlayers !== null && playerNames.length >= settings.maxPlayers;

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        icon={BarChart3}
        title="Score keeper"
        description="Track every round of your game."
      />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>New game</CardTitle>
            <CardDescription>Name the players and go.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <fieldset className="space-y-2.5">
              <div className="flex items-center justify-between">
                <legend className="text-sm font-medium">Players</legend>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {playerNames.length}
                  {settings.maxPlayers ? ` / ${settings.maxPlayers}` : ""}
                </span>
              </div>

              <ol className="space-y-2">
                {playerNames.map((name, index) => (
                  <li
                    key={index}
                    className="animate-slide-up flex items-center gap-2"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <span
                      aria-hidden
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground tabular-nums glass-control"
                    >
                      {index + 1}
                    </span>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => onRenamePlayer(index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                      aria-label={`Player ${index + 1} name`}
                      className="h-11"
                    />
                    {playerNames.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon-lg"
                        onClick={() => onRemovePlayer(index)}
                        aria-label={`Remove ${name || `player ${index + 1}`}`}
                        className="shrink-0 hover:text-destructive"
                      >
                        <X />
                      </Button>
                    )}
                  </li>
                ))}
              </ol>

              <Button
                variant="outline"
                onClick={onAddPlayer}
                disabled={atMax}
                className="h-11 w-full border-dashed"
              >
                <Plus />
                Add player
              </Button>

              {playerNames.length > 6 && (
                <p className="text-center text-xs text-muted-foreground">
                  2 to 6 players plays best.
                </p>
              )}
            </fieldset>

            <div className="rounded-xl border border-border glass-control">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                aria-expanded={showSettings}
                className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3.5 text-left text-sm font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <span className="flex items-center gap-2">
                  <SettingsIcon className="size-4 text-muted-foreground" aria-hidden />
                  Game settings
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {settings.eliminationThreshold} lives
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-4 transition-transform duration-200",
                      showSettings && "rotate-180"
                    )}
                  />
                </span>
              </button>

              {showSettings && (
                <div className="animate-slide-up space-y-4 border-t border-border p-3.5">
                  <div className="space-y-2">
                    <Label htmlFor="threshold" className="text-xs text-muted-foreground">
                      Starting lives
                    </Label>
                    <Input
                      id="threshold"
                      type="number"
                      inputMode="numeric"
                      value={settings.eliminationThreshold}
                      onChange={(e) =>
                        onChangeSettings({
                          ...settings,
                          eliminationThreshold: Math.max(
                            10,
                            parseInt(e.target.value) || 100
                          ),
                        })
                      }
                      min={10}
                    />
                    <Segmented
                      label="Common starting lives"
                      options={THRESHOLDS.map((value) => ({
                        value,
                        label: String(value),
                      }))}
                      value={settings.eliminationThreshold}
                      onChange={(eliminationThreshold) =>
                        onChangeSettings({ ...settings, eliminationThreshold })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Max players
                    </p>
                    <Segmented
                      label="Max players"
                      options={MAX_PLAYERS}
                      value={settings.maxPlayers}
                      onChange={(maxPlayers) =>
                        onChangeSettings({ ...settings, maxPlayers })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <Button size="lg" onClick={onStart} className="w-full">
              <Play />
              Start game
            </Button>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <Card className="py-0">
            <Accordion type="single" collapsible>
              <AccordionItem value="history">
                <AccordionTrigger className="min-h-14 px-5">
                  <span className="flex items-center gap-2.5">
                    <History className="size-4 text-muted-foreground" aria-hidden />
                    <span className="font-display text-base font-semibold">
                      Game history
                    </span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-2xs font-semibold tabular-nums glass-control">
                      {history.length}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <ul className="max-h-80 space-y-2 overflow-y-auto">
                    {history.map((game) => (
                      <HistoryGame
                        key={game.id}
                        game={game}
                        onOpen={() => onOpenGame(game)}
                      />
                    ))}
                  </ul>
                  <div className="mt-3 flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-destructive"
                        >
                          <Trash2 />
                          Clear history
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Clear all history?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Every saved game is deleted for good.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="h-11 sm:h-10">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={onClearHistory}
                            className={cn(
                              buttonVariants({ variant: "destructive" }),
                              "h-11 sm:h-10"
                            )}
                          >
                            Delete all
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        )}
      </div>
    </div>
  );
}
