"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
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
import MobileNav from "@/components/mobile-nav";

interface Player {
  name: string;
  rounds: number[];
  total: number;
}

interface GameSettings {
  eliminationThreshold: number;
  maxPlayers: number | null; // null = unlimited
}

interface GameSession {
  id: string;
  date: string;
  players: Player[];
  completed: boolean;
  currentRound: number;
  settings?: GameSettings;
}

const ACTIVE_GAME_KEY = "jukasActiveGame";
const HISTORY_KEY = "jukasScoreHistory";
const PLAYER_NAMES_KEY = "jukasPlayerNames";
const SETTINGS_KEY = "jukasGameSettings";

const DEFAULT_SETTINGS: GameSettings = {
  eliminationThreshold: 100,
  maxPlayers: null, // Unlimited by default
};

// Confetti component for victory celebration
function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
      color: string;
      size: number;
    }>
  >([]);

  useEffect(() => {
    if (active) {
      const colors = [
        "#f97316",
        "#fbbf24",
        "#10b981",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
      ];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
      }));
      setParticles(newParticles);

      // Clean up after animation
      const timer = setTimeout(() => setParticles([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
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
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

// Victory screen component
function VictoryScreen({
  winner,
  onClose,
  settings,
}: {
  winner: Player;
  onClose: () => void;
  settings: GameSettings;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Confetti active={true} />
      <div className="animate-victory-entrance text-center p-8 max-w-md mx-4">
        <div className="mb-6">
          <span className="animate-trophy text-8xl">🏆</span>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
          Victory!
        </h1>
        <p className="text-2xl font-semibold text-foreground mb-4">
          {winner.name} Wins!
        </p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span
            className="animate-sparkle text-2xl"
            style={{ animationDelay: "0s" }}
          >
            ✨
          </span>
          <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black">
            Final Score: {winner.total} points
          </Badge>
          <span
            className="animate-sparkle text-2xl"
            style={{ animationDelay: "0.5s" }}
          >
            ✨
          </span>
        </div>
        <p className="text-muted-foreground mb-6">
          Survived under {settings.eliminationThreshold} points!
        </p>
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default function ScoresPage() {
  const [gameActive, setGameActive] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<string[]>([
    "Player 1",
    "Player 2",
  ]);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Game settings
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  // Animation states
  const [justEliminated, setJustEliminated] = useState<Set<number>>(new Set());
  const [showVictory, setShowVictory] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const prevPlayersRef = useRef<Player[]>([]);

  // Track pending scores for each player (not yet confirmed)
  const [pendingScores, setPendingScores] = useState<Record<number, number>>(
    {}
  );

  // Confirm a pending score for a player
  const confirmScore = (playerIndex: number) => {
    if (pendingScores[playerIndex] !== undefined) {
      addRoundScore(playerIndex, pendingScores[playerIndex]);
      setPendingScores((prev) => {
        const newState = { ...prev };
        delete newState[playerIndex];
        return newState;
      });
    }
  };

  // Update pending score (doesn't save until confirmed)
  const updatePendingScore = (playerIndex: number, value: number) => {
    setPendingScores((prev) => ({ ...prev, [playerIndex]: value }));
  };

  // Get the display value for a player's current round
  const getDisplayScore = (playerIndex: number, player: Player) => {
    if (pendingScores[playerIndex] !== undefined) {
      return pendingScores[playerIndex];
    }
    return player.rounds[currentRound - 1] ?? 0;
  };

  // Load all data from localStorage on mount
  useEffect(() => {
    // Load saved player names
    const savedNames = localStorage.getItem(PLAYER_NAMES_KEY);
    if (savedNames) {
      try {
        setPlayerNames(JSON.parse(savedNames));
      } catch (e) {
        console.error("Failed to load player names:", e);
      }
    }

    // Load saved settings
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }

    // Load game history
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        setGameHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load game history:", e);
      }
    }

    // Load active game (most important for persistence)
    const savedGame = localStorage.getItem(ACTIVE_GAME_KEY);
    if (savedGame) {
      try {
        const game = JSON.parse(savedGame);
        setPlayers(game.players);
        setCurrentRound(game.currentRound);
        if (game.settings) {
          setSettings(game.settings);
        }
        setGameActive(true);
      } catch (e) {
        console.error("Failed to load active game:", e);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save active game whenever it changes
  const saveActiveGame = useCallback(() => {
    if (gameActive && players.length > 0) {
      const gameData = {
        players,
        currentRound,
        settings,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(ACTIVE_GAME_KEY, JSON.stringify(gameData));
    }
  }, [gameActive, players, currentRound, settings]);

  useEffect(() => {
    if (isLoaded) {
      saveActiveGame();
    }
  }, [isLoaded, saveActiveGame]);

  // Save settings when they change
  useEffect(() => {
    if (isLoaded && !gameActive) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded, gameActive]);

  // Save player names when they change
  useEffect(() => {
    if (isLoaded && !gameActive) {
      localStorage.setItem(PLAYER_NAMES_KEY, JSON.stringify(playerNames));
    }
  }, [playerNames, isLoaded, gameActive]);

  // Check for eliminations and winner
  useEffect(() => {
    if (!gameActive || players.length === 0) return;

    const prevPlayers = prevPlayersRef.current;

    // Find newly eliminated players
    const newlyEliminated = new Set<number>();
    players.forEach((player, index) => {
      const wasActive =
        prevPlayers[index]?.total < settings.eliminationThreshold;
      const isNowEliminated = player.total >= settings.eliminationThreshold;
      if (wasActive && isNowEliminated) {
        newlyEliminated.add(index);
      }
    });

    if (newlyEliminated.size > 0) {
      setJustEliminated(newlyEliminated);
      // Clear animation after it plays
      setTimeout(() => setJustEliminated(new Set()), 1500);
    }

    // Check for winner (only 1 player remaining)
    const activePlayers = players.filter(
      (p) => p.total < settings.eliminationThreshold
    );
    if (activePlayers.length === 1 && players.length > 1) {
      // Make sure there were eliminated players (game actually happened)
      const eliminatedCount = players.filter(
        (p) => p.total >= settings.eliminationThreshold
      ).length;
      if (eliminatedCount > 0) {
        setWinner(activePlayers[0]);
        setShowVictory(true);
      }
    }

    prevPlayersRef.current = [...players];
  }, [players, gameActive, settings.eliminationThreshold]);

  const saveGameHistory = (updatedHistory: GameSession[]) => {
    setGameHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const addPlayer = () => {
    // Check max players limit if set
    if (
      settings.maxPlayers === null ||
      playerNames.length < settings.maxPlayers
    ) {
      setPlayerNames([...playerNames, `Player ${playerNames.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
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
    prevPlayersRef.current = initialPlayers;
    setGameActive(true);
    setCurrentRound(1);
    setShowVictory(false);
    setWinner(null);
    setJustEliminated(new Set());
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

  const endGame = (saveToHistory: boolean = true) => {
    if (saveToHistory) {
      const gameSession: GameSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        players: [...players],
        completed: true,
        currentRound,
        settings,
      };
      const updatedHistory = [gameSession, ...gameHistory];
      saveGameHistory(updatedHistory);
    }

    // Clear active game from localStorage
    localStorage.removeItem(ACTIVE_GAME_KEY);

    setGameActive(false);
    setPlayers([]);
    setCurrentRound(1);
    setShowVictory(false);
    setWinner(null);
    setJustEliminated(new Set());
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

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Setup View
  if (!gameActive) {
    return (
      <div className="min-h-screen bg-background">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-600/15 via-red-600/10 to-transparent blur-3xl animate-pulse" />
          <div className="absolute top-1/4 -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-amber-600/10 via-orange-700/8 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-border/50">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-bold text-lg tracking-tight">JUKAS</span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
            </Button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <MobileNav />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-16 pb-24">
          {/* Page Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">
              Interactive
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Score Keeper
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Track scores for your physical Jukas games. Customize settings to
              match your playstyle!
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            {/* New Game Card */}
            <Card className="glass border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  New Game
                </CardTitle>
                <CardDescription>
                  Add players and customize settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Players Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Players</Label>
                    <span className="text-xs text-muted-foreground">
                      {playerNames.length}{" "}
                      {settings.maxPlayers
                        ? `/ ${settings.maxPlayers}`
                        : "(unlimited)"}
                    </span>
                  </div>
                  {playerNames.map((name, index) => (
                    <div
                      key={index}
                      className="flex gap-2 animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
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

                  <Button
                    variant="outline"
                    onClick={addPlayer}
                    className="w-full border-dashed"
                    disabled={
                      settings.maxPlayers !== null &&
                      playerNames.length >= settings.maxPlayers
                    }
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

                  {playerNames.length > 6 && (
                    <p className="text-xs text-amber-400/80 text-center">
                      💡 Recommended: 2-6 players for optimal gameplay
                    </p>
                  )}
                </div>

                <Separator className="bg-border/50" />

                {/* Game Settings */}
                <div className="space-y-4">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <Label className="text-sm font-medium cursor-pointer flex items-center gap-2">
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Game Settings
                    </Label>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showSettings ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showSettings && (
                    <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50 animate-slide-up">
                      {/* Elimination Threshold */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Elimination Threshold
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={settings.eliminationThreshold}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                eliminationThreshold: Math.max(
                                  10,
                                  parseInt(e.target.value) || 100
                                ),
                              })
                            }
                            min={10}
                            className="bg-muted/50 border-border/50"
                          />
                          <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                            points
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Players are eliminated when reaching this score.
                          Default: 100
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {[50, 100, 150, 200].map((val) => (
                            <Button
                              key={val}
                              variant={
                                settings.eliminationThreshold === val
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setSettings({
                                  ...settings,
                                  eliminationThreshold: val,
                                })
                              }
                              className="text-xs"
                            >
                              {val}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Max Players */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Max Players
                        </Label>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant={
                              settings.maxPlayers === null
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setSettings({ ...settings, maxPlayers: null })
                            }
                            className="text-xs"
                          >
                            Unlimited
                          </Button>
                          {[4, 6, 8, 10].map((val) => (
                            <Button
                              key={val}
                              variant={
                                settings.maxPlayers === val
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setSettings({ ...settings, maxPlayers: val })
                              }
                              className="text-xs"
                            >
                              {val}
                            </Button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Limit how many players can join. Recommended: 2-6
                        </p>
                      </div>
                    </div>
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
                  Start Game ({playerNames.length} players,{" "}
                  {settings.eliminationThreshold}pt limit)
                </Button>
              </CardContent>
            </Card>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <Card className="glass border-border/50">
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
                                {game.players.length} players •{" "}
                                {game.currentRound} rounds
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
                        <AlertDialogContent className="glass">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Clear all history?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete all your game
                              history. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={clearHistory}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete All
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            )}

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/cards">Card Reference</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/setup">Setup Guide</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/rules">Full Rules</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Game View
  const lowestScore = Math.min(
    ...players
      .filter((p) => p.total < settings.eliminationThreshold)
      .map((p) => p.total)
  );
  const activePlayers = players.filter(
    (p) => p.total < settings.eliminationThreshold
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Victory Screen */}
      {showVictory && winner && (
        <VictoryScreen
          winner={winner}
          onClose={() => setShowVictory(false)}
          settings={settings}
        />
      )}

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-600/15 via-red-600/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-amber-600/10 via-orange-700/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Compact game controls bar */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="mx-auto max-w-6xl px-2 sm:px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            {/* Round info */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={previousRound}
                disabled={currentRound === 1}
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <span className="font-bold text-sm sm:text-base whitespace-nowrap">
                Round {currentRound}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={nextRound}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>

            {/* Player count */}
            <Badge variant="outline" className="text-xs">
              {activePlayers.length}/{players.length} alive
            </Badge>

            {/* End game */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 text-xs px-3"
                >
                  End
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass">
                <AlertDialogHeader>
                  <AlertDialogTitle>End this game?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Would you like to save the results to your history?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                  <AlertDialogCancel>Keep Playing</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => endGame(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    End Without Saving
                  </AlertDialogAction>
                  <AlertDialogAction
                    onClick={() => endGame(true)}
                    className="bg-gradient-to-r from-orange-600 to-red-600"
                  >
                    Save & End
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 pb-24">
        {/* Compact Score Table */}
        <div className="space-y-2">
          {players
            .map((player, originalIndex) => ({ player, originalIndex }))
            .sort((a, b) => a.player.total - b.player.total)
            .map(({ player, originalIndex: playerIndex }, sortedIndex) => {
              const isEliminated =
                player.total >= settings.eliminationThreshold;
              const isLeading = player.total === lowestScore && !isEliminated;
              const isJustEliminated = justEliminated.has(playerIndex);
              const isWinner =
                winner?.name === player.name && activePlayers.length === 1;

              return (
                <div
                  key={playerIndex}
                  className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl glass transition-all ${
                    isJustEliminated
                      ? "animate-eliminated animate-flash-red"
                      : isEliminated
                      ? "opacity-50 bg-destructive/5"
                      : isWinner
                      ? "animate-winner border-amber-400/70 bg-amber-500/10 ring-2 ring-amber-400/50"
                      : isLeading
                      ? "border-amber-500/50 bg-amber-500/5 ring-1 ring-amber-500/30"
                      : "border-border/50"
                  }`}
                >
                  {/* Rank */}
                  <div className="w-6 sm:w-8 text-center shrink-0">
                    {isWinner ? (
                      <span className="animate-crown text-lg sm:text-xl">
                        👑
                      </span>
                    ) : isLeading ? (
                      <span className="text-lg sm:text-xl">👑</span>
                    ) : isEliminated ? (
                      <span className="text-lg sm:text-xl">💀</span>
                    ) : (
                      <span className="text-sm text-muted-foreground font-medium">
                        #{sortedIndex + 1}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold truncate text-sm sm:text-base ${
                          isEliminated
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {player.name}
                      </span>
                      {isJustEliminated && (
                        <Badge
                          variant="destructive"
                          className="text-[10px] animate-pulse shrink-0"
                        >
                          OUT!
                        </Badge>
                      )}
                    </div>
                    {/* Compact round history */}
                    <div className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {player.rounds.map((s, i) => s || 0).join(" → ")}
                    </div>
                  </div>

                  {/* Current Round Input with Quick Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Quick subtract */}
                    <button
                      type="button"
                      onClick={() => {
                        const current = getDisplayScore(playerIndex, player);
                        updatePendingScore(playerIndex, current - 1);
                      }}
                      disabled={isEliminated}
                      className="w-7 h-9 sm:h-10 rounded bg-red-500/20 hover:bg-red-500/40 text-red-400 font-bold text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      −1
                    </button>

                    <Input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={
                        pendingScores[playerIndex] !== undefined
                          ? pendingScores[playerIndex]
                          : player.rounds[currentRound - 1] ?? ""
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty, minus sign, or valid number
                        if (
                          value === "" ||
                          value === "-" ||
                          /^-?\d+$/.test(value)
                        ) {
                          if (value === "" || value === "-") {
                            updatePendingScore(playerIndex, 0);
                          } else {
                            updatePendingScore(
                              playerIndex,
                              parseInt(value, 10)
                            );
                          }
                        }
                      }}
                      placeholder="0"
                      className={`w-12 sm:w-14 text-center font-bold h-9 sm:h-10 ${
                        pendingScores[playerIndex] !== undefined
                          ? "bg-amber-500/20 border-amber-500/50"
                          : "bg-muted/50"
                      }`}
                      disabled={isEliminated}
                    />

                    {/* Quick add buttons */}
                    <div className="flex gap-0.5">
                      {[1, 2, 5, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            const current = getDisplayScore(
                              playerIndex,
                              player
                            );
                            updatePendingScore(playerIndex, current + num);
                          }}
                          disabled={isEliminated}
                          className="w-7 sm:w-8 h-9 sm:h-10 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 font-bold text-xs sm:text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          +{num}
                        </button>
                      ))}
                    </div>

                    {/* Confirm button */}
                    <button
                      type="button"
                      onClick={() => confirmScore(playerIndex)}
                      disabled={
                        isEliminated || pendingScores[playerIndex] === undefined
                      }
                      className={`w-9 sm:w-10 h-9 sm:h-10 rounded font-bold text-lg transition-all ${
                        pendingScores[playerIndex] !== undefined
                          ? "bg-amber-500 hover:bg-amber-400 text-black animate-pulse"
                          : "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
                      } disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                      ✓
                    </button>
                  </div>

                  {/* Total */}
                  <div
                    className={`w-12 sm:w-16 text-right font-bold text-lg sm:text-xl shrink-0 ${
                      isEliminated
                        ? "text-destructive"
                        : isLeading
                        ? "text-amber-400"
                        : "text-foreground"
                    }`}
                  >
                    {player.total}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Quick legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            🔴 Eliminated at{" "}
            <span className="text-destructive font-medium">
              {settings.eliminationThreshold}
            </span>
          </span>
          <span>♦️♥️ K = -1</span>
          <span>♠️♣️ K = +13</span>
        </div>
      </div>
    </div>
  );
}
