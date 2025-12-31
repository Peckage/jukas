"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

interface Player {
  name: string;
  rounds: number[];
  total: number;
}

interface GameSession {
  id: string;
  date: string;
  players: Player[];
  completed: boolean;
}

export default function ScoreKeeper() {
  const [gameActive, setGameActive] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<string[]>([
    "Player 1",
    "Player 2",
  ]);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameSession[]>([]);

  // Load game history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("jukasScoreHistory");
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load game history:", e);
      }
    }
  }, []);

  // Save game history to localStorage
  const saveGameHistory = (updatedHistory: GameSession[]) => {
    setGameHistory(updatedHistory);
    localStorage.setItem("jukasScoreHistory", JSON.stringify(updatedHistory));
  };

  const addPlayer = () => {
    if (playerNames.length < 6) {
      setPlayerNames([...playerNames, `Player ${playerNames.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      const newNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newNames);
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const startNewGame = () => {
    const initialPlayers = playerNames.map((name) => ({
      name: name.trim() || "Player",
      rounds: [],
      total: 0,
    }));
    setPlayers(initialPlayers);
    setGameActive(true);
    setCurrentRound(1);
  };

  const addRoundScore = (playerIndex: number, score: number) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].rounds[currentRound - 1] = score;
    newPlayers[playerIndex].total = newPlayers[playerIndex].rounds.reduce(
      (sum, roundScore) => sum + (roundScore || 0),
      0
    );
    setPlayers(newPlayers);
  };

  const nextRound = () => {
    setCurrentRound(currentRound + 1);
  };

  const previousRound = () => {
    if (currentRound > 1) {
      setCurrentRound(currentRound - 1);
    }
  };

  const endGame = () => {
    const gameSession: GameSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      players: [...players],
      completed: true,
    };

    const updatedHistory = [gameSession, ...gameHistory];
    saveGameHistory(updatedHistory);

    setGameActive(false);
    setPlayers([]);
    setCurrentRound(1);
  };

  const clearHistory = () => {
    saveGameHistory([]);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Setup View
  if (!gameActive) {
    return (
      <section id="scorekeeper" className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            <Badge variant="outline" className="mb-4">
              Interactive
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Score Keeper
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Track scores for your physical Jukas games. Players are eliminated
              at 100 points!
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="glass border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  New Game
                </CardTitle>
                <CardDescription>
                  Add 2-6 players to start tracking scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Player Names */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Players</Label>
                  {playerNames.map((name, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          updatePlayerName(index, e.target.value)
                        }
                        placeholder={`Player ${index + 1}`}
                        className="flex-1 bg-muted/50 border-border/50"
                      />
                      {playerNames.length > 2 && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removePlayer(index)}
                          className="shrink-0"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}

                  {playerNames.length < 6 && (
                    <Button
                      variant="outline"
                      onClick={addPlayer}
                      className="w-full border-dashed"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Player
                    </Button>
                  )}
                </div>

                <Button
                  onClick={startNewGame}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-lg"
                  size="lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Start Game
                </Button>
              </CardContent>
            </Card>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <Card className="glass border-border/50 mt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="history" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📊</span>
                        <span className="font-semibold">Game History</span>
                        <Badge variant="secondary" className="ml-2">
                          {gameHistory.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {gameHistory.map((game) => (
                          <div
                            key={game.id}
                            className="p-4 rounded-xl bg-muted/30 border border-border/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-muted-foreground">
                                {formatDate(game.date)}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {game.players.length} players
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {game.players
                                .sort((a, b) => a.total - b.total)
                                .map((player, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between text-sm"
                                  >
                                    <span
                                      className={
                                        idx === 0
                                          ? "text-amber-400 font-medium"
                                          : "text-muted-foreground"
                                      }
                                    >
                                      {idx === 0 && "🏆 "}
                                      {player.name}
                                    </span>
                                    <span
                                      className={
                                        idx === 0
                                          ? "text-amber-400 font-medium"
                                          : "text-muted-foreground"
                                      }
                                    >
                                      {player.total}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                          >
                            Clear History
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass border-border/50">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Clear all history?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete all saved game
                              records. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={clearHistory}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Clear History
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Active Game View
  const lowestScore = Math.min(
    ...players.filter((p) => p.total < 100).map((p) => p.total)
  );

  return (
    <section id="scorekeeper" className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Badge variant="outline" className="mb-2">
              Live Game
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Round {currentRound}
            </h2>
            <p className="text-muted-foreground mt-1">
              Enter scores for this round
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousRound}
              disabled={currentRound === 1}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Prev
            </Button>
            <Button variant="outline" size="sm" onClick={nextRound}>
              Next
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  End Game
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass border-border/50">
                <AlertDialogHeader>
                  <AlertDialogTitle>End this game?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The current scores will be saved to your game history. You
                    can start a new game afterward.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue Playing</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={endGame}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    End Game
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Score Cards - Mobile Optimized */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player, playerIndex) => {
            const isEliminated = player.total >= 100;
            const isLeading = player.total === lowestScore && !isEliminated;

            return (
              <Card
                key={playerIndex}
                className={`glass transition-all ${
                  isEliminated
                    ? "opacity-60 border-destructive/30 bg-destructive/5"
                    : isLeading
                    ? "border-amber-500/50 bg-amber-500/5 glow-orange"
                    : "border-border/50"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isLeading && <span className="text-xl">👑</span>}
                      <CardTitle
                        className={`text-lg ${
                          isEliminated ? "line-through" : ""
                        }`}
                      >
                        {player.name}
                      </CardTitle>
                    </div>
                    {isEliminated && (
                      <Badge variant="destructive" className="text-xs">
                        OUT
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Round Input */}
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">
                      Round {currentRound} Score
                    </Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={player.rounds[currentRound - 1] ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          value === "-" ||
                          /^-?\d+$/.test(value)
                        ) {
                          addRoundScore(
                            playerIndex,
                            value === "" || value === "-"
                              ? 0
                              : parseInt(value, 10)
                          );
                        }
                      }}
                      placeholder="0"
                      className="text-center text-xl font-bold h-14 bg-muted/50"
                      disabled={isEliminated}
                    />
                  </div>

                  {/* Total Score */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span
                      className={`text-2xl font-bold ${
                        isEliminated
                          ? "text-destructive"
                          : isLeading
                          ? "text-amber-400"
                          : "text-foreground"
                      }`}
                    >
                      {player.total}
                    </span>
                  </div>

                  {/* Round History */}
                  {player.rounds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {player.rounds.map((score, roundIdx) => (
                        <Badge
                          key={roundIdx}
                          variant="secondary"
                          className={`text-xs ${
                            roundIdx === currentRound - 1
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          R{roundIdx + 1}: {score || 0}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-medium">Tip:</span> Players are eliminated
            at <span className="text-destructive font-medium">100 points</span>.
            Red Kings = -1, Black Kings = +13
          </p>
        </div>
      </div>
    </section>
  );
}
