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
import { Progress } from "@/components/ui/progress";
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
import {
  BarChart3,
  Play,
  Plus,
  X,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  BookOpen,
  Zap,
  Skull,
  Crown,
  Check,
  Minus,
  Trophy,
  Trash2,
  History,
} from "lucide-react";

interface Player {
  name: string;
  rounds: number[];
  total: number;
}

interface GameSettings {
  eliminationThreshold: number;
  maxPlayers: number | null;
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
  maxPlayers: null,
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md">
      <Confetti active={true} />
      <div className="animate-victory-entrance text-center p-8 max-w-sm mx-4">
        <div className="mb-6">
          <span className="animate-trophy text-7xl">🏆</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Victory!
        </h1>
        <p className="text-xl font-semibold text-foreground mb-4">
          {winner.name} Wins!
        </p>
        <div className="flex items-center justify-center gap-2 mb-5">
          <span
            className="animate-sparkle text-xl"
            style={{ animationDelay: "0s" }}
          >
            ✨
          </span>
          <Badge className="text-base px-4 py-1.5 bg-linear-to-r from-primary to-accent text-white">
            Final Score: {winner.total}
          </Badge>
          <span
            className="animate-sparkle text-xl"
            style={{ animationDelay: "0.5s" }}
          >
            ✨
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Survived under {settings.eliminationThreshold} points!
        </p>
        <Button
          onClick={onClose}
          className="bg-primary hover:bg-primary/90 h-11 px-8 press-effect"
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
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [justEliminated, setJustEliminated] = useState<Set<number>>(new Set());
  const [showVictory, setShowVictory] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const prevPlayersRef = useRef<Player[]>([]);
  const [pendingScores, setPendingScores] = useState<Record<number, number>>(
    {}
  );

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

  const updatePendingScore = (playerIndex: number, value: number) => {
    setPendingScores((prev) => ({ ...prev, [playerIndex]: value }));
  };

  const getDisplayScore = (playerIndex: number, player: Player) => {
    if (pendingScores[playerIndex] !== undefined) {
      return pendingScores[playerIndex];
    }
    return player.rounds[currentRound - 1] ?? 0;
  };

  useEffect(() => {
    const savedNames = localStorage.getItem(PLAYER_NAMES_KEY);
    if (savedNames) {
      try {
        setPlayerNames(JSON.parse(savedNames));
      } catch (e) {
        console.error("Failed to load player names:", e);
      }
    }
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        setGameHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load game history:", e);
      }
    }
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
    if (isLoaded) saveActiveGame();
  }, [isLoaded, saveActiveGame]);

  useEffect(() => {
    if (isLoaded && !gameActive) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded, gameActive]);

  useEffect(() => {
    if (isLoaded && !gameActive) {
      localStorage.setItem(PLAYER_NAMES_KEY, JSON.stringify(playerNames));
    }
  }, [playerNames, isLoaded, gameActive]);

  useEffect(() => {
    if (!gameActive || players.length === 0) return;
    const prevPlayers = prevPlayersRef.current;
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
      setTimeout(() => setJustEliminated(new Set()), 1500);
    }
    const activePlayers = players.filter(
      (p) => p.total < settings.eliminationThreshold
    );
    if (activePlayers.length === 1 && players.length > 1) {
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

  const nextRound = () => setCurrentRound(currentRound + 1);
  const previousRound = () => {
    if (currentRound > 1) setCurrentRound(currentRound - 1);
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
    localStorage.removeItem(ACTIVE_GAME_KEY);
    setGameActive(false);
    setPlayers([]);
    setCurrentRound(1);
    setShowVictory(false);
    setWinner(null);
    setJustEliminated(new Set());
  };

  const clearHistory = () => saveGameHistory([]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading...
        </div>
      </div>
    );
  }

  // ===== Setup View =====
  if (!gameActive) {
    return (
      <div className="pb-24 md:pb-0">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 py-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/15 mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Score Keeper
            </h1>
            <p className="text-sm text-muted-foreground">
              Track scores for your Jukas games
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-5">
            {/* New Game Card */}
            <Card className="glass border-border/30 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2.5 text-base">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  New Game
                </CardTitle>
                <CardDescription className="text-sm">
                  Add players and customize settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Players Section */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Players</Label>
                    <span className="text-xs text-muted-foreground">
                      {playerNames.length}{" "}
                      {settings.maxPlayers
                        ? `/ ${settings.maxPlayers}`
                        : ""}
                    </span>
                  </div>
                  {playerNames.map((name, index) => (
                    <div
                      key={index}
                      className="flex gap-2 animate-slide-up"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          updatePlayerName(index, e.target.value)
                        }
                        placeholder={`Player ${index + 1}`}
                        className="flex-1 bg-muted/30 border-border/30 h-11 text-sm"
                      />
                      {playerNames.length > 2 && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removePlayer(index)}
                          className="shrink-0 h-11 w-11 press-effect"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addPlayer}
                    className="w-full border-dashed border-border/40 h-11 text-sm press-effect"
                    disabled={
                      settings.maxPlayers !== null &&
                      playerNames.length >= settings.maxPlayers
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Player
                  </Button>

                  {playerNames.length > 6 && (
                    <p className="text-xs text-primary/70 text-center">
                      Recommended: 2-6 players for optimal gameplay
                    </p>
                  )}
                </div>

                <Separator className="bg-border/20" />

                {/* Game Settings */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <SettingsIcon className="w-4 h-4 text-muted-foreground" />
                      Game Settings
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        showSettings ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSettings && (
                    <div className="space-y-4 p-4 rounded-xl bg-muted/15 border border-border/20 animate-slide-up">
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
                            className="bg-muted/30 border-border/30 h-10"
                          />
                          <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                            pts
                          </span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
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
                              className="text-xs h-8 press-effect"
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
                        <div className="flex gap-1.5 flex-wrap">
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
                            className="text-xs h-8 press-effect"
                          >
                            No Limit
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
                              className="text-xs h-8 press-effect"
                            >
                              {val}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={startNewGame}
                  className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 text-base font-semibold press-effect"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
              </CardContent>
            </Card>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <Card className="glass border-border/30">
                <Accordion type="single" collapsible>
                  <AccordionItem value="history" className="border-none">
                    <AccordionTrigger className="px-5 py-4 hover:no-underline">
                      <div className="flex items-center gap-2.5">
                        <History className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">
                          Game History
                        </span>
                        <Badge
                          variant="secondary"
                          className="ml-1 h-5 text-[10px]"
                        >
                          {gameHistory.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="space-y-2.5 max-h-64 overflow-y-auto">
                        {gameHistory.map((game) => (
                          <div
                            key={game.id}
                            className="p-3.5 rounded-xl bg-muted/15 border border-border/20"
                          >
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(game.date)}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-[10px] h-5 border-border/30"
                              >
                                {game.players.length}p · {game.currentRound}r
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {game.players
                                .sort((a, b) => a.total - b.total)
                                .map((player, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between text-xs"
                                  >
                                    <span
                                      className={
                                        idx === 0
                                          ? "text-primary font-medium"
                                          : "text-muted-foreground"
                                      }
                                    >
                                      {idx === 0 && (
                                        <Trophy className="w-3 h-3 inline mr-1" />
                                      )}
                                      {player.name}
                                    </span>
                                    <span
                                      className={
                                        idx === 0
                                          ? "text-primary font-medium"
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
                      <Separator className="my-3 bg-border/20" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full h-9 text-xs press-effect"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                            Clear History
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass-strong border-border/30 mx-4 max-w-sm">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-base">
                              Clear all history?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm">
                              This will permanently delete all your game history.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="h-10">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={clearHistory}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10"
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
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 text-xs border-border/30 press-effect"
              >
                <Link href="/cards">
                  <Layers className="w-3.5 h-3.5 mr-1.5" />
                  Cards
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 text-xs border-border/30 press-effect"
              >
                <Link href="/setup">
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Setup
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 text-xs border-border/30 press-effect"
              >
                <Link href="/rules">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  Rules
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== Active Game View =====
  const lowestScore = Math.min(
    ...players
      .filter((p) => p.total < settings.eliminationThreshold)
      .map((p) => p.total)
  );
  const activePlayers = players.filter(
    (p) => p.total < settings.eliminationThreshold
  );

  return (
    <div className="pb-24 md:pb-0">
      {showVictory && winner && (
        <VictoryScreen
          winner={winner}
          onClose={() => setShowVictory(false)}
          settings={settings}
        />
      )}

      {/* Compact game controls bar */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/30">
        <div className="mx-auto max-w-6xl px-3 sm:px-5 py-2.5">
          <div className="flex items-center justify-between gap-2">
            {/* Round navigation */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 press-effect"
                onClick={previousRound}
                disabled={currentRound === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-bold text-sm whitespace-nowrap min-w-[70px] text-center">
                Round {currentRound}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 press-effect"
                onClick={nextRound}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Player count */}
            <Badge
              variant="outline"
              className="text-[10px] h-6 border-border/30"
            >
              {activePlayers.length}/{players.length} alive
            </Badge>

            {/* End game */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 text-xs px-3 press-effect"
                >
                  End
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-strong border-border/30 mx-4 max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-base">
                    End this game?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm">
                    Save results to your history?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className="h-10">
                    Keep Playing
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => endGame(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/80 h-10"
                  >
                    End Without Saving
                  </AlertDialogAction>
                  <AlertDialogAction
                    onClick={() => endGame(true)}
                    className="bg-primary hover:bg-primary/90 h-10"
                  >
                    Save & End
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-3 sm:px-5 py-3">
        {/* Score Cards */}
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
              const progressPercent = Math.min(
                (player.total / settings.eliminationThreshold) * 100,
                100
              );

              return (
                <div
                  key={playerIndex}
                  className={`p-3 rounded-xl glass transition-all duration-200 ${
                    isJustEliminated
                      ? "animate-eliminated animate-flash-red"
                      : isEliminated
                        ? "opacity-40"
                        : isWinner
                          ? "animate-winner border-primary/50 ring-2 ring-primary/30"
                          : isLeading
                            ? "border-primary/30 ring-1 ring-primary/20"
                            : "border-border/20"
                  }`}
                >
                  {/* Top row: Rank, Name, Total */}
                  <div className="flex items-center gap-2 mb-2">
                    {/* Rank indicator */}
                    <div className="w-7 text-center shrink-0">
                      {isWinner ? (
                        <span className="animate-crown text-lg">👑</span>
                      ) : isLeading ? (
                        <Crown className="w-4 h-4 text-primary mx-auto" />
                      ) : isEliminated ? (
                        <Skull className="w-4 h-4 text-destructive mx-auto" />
                      ) : (
                        <span className="text-xs text-muted-foreground font-medium">
                          #{sortedIndex + 1}
                        </span>
                      )}
                    </div>

                    {/* Name & round history */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-semibold truncate text-sm ${
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
                            className="text-[9px] h-4 px-1.5 animate-pulse shrink-0"
                          >
                            OUT!
                          </Badge>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {player.rounds.map((s) => s || 0).join(" → ")}
                      </div>
                    </div>

                    {/* Total score */}
                    <div
                      className={`text-right font-bold text-xl tabular-nums shrink-0 ${
                        isEliminated
                          ? "text-destructive"
                          : isLeading
                            ? "text-primary"
                            : "text-foreground"
                      }`}
                    >
                      {player.total}
                    </div>
                  </div>

                  {/* Progress bar */}
                  {!isEliminated && (
                    <div className="mb-2.5">
                      <Progress
                        value={progressPercent}
                        className="h-1.5 bg-muted/30"
                      />
                    </div>
                  )}

                  {/* Score input row */}
                  <div className="flex items-center gap-1">
                    {/* Quick subtract */}
                    <button
                      type="button"
                      onClick={() => {
                        const current = getDisplayScore(playerIndex, player);
                        updatePendingScore(playerIndex, current - 1);
                      }}
                      disabled={isEliminated}
                      className="w-8 h-9 rounded-lg bg-red-500/15 hover:bg-red-500/25 active:bg-red-500/35 text-red-400 font-bold text-xs transition-colors disabled:opacity-20 disabled:cursor-not-allowed press-effect flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
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
                      className={`w-12 text-center font-bold text-sm h-9 border-border/20 ${
                        pendingScores[playerIndex] !== undefined
                          ? "bg-primary/15 border-primary/30"
                          : "bg-muted/20"
                      }`}
                      disabled={isEliminated}
                    />

                    {/* Quick add buttons */}
                    {[1, 2, 5, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          const current = getDisplayScore(playerIndex, player);
                          updatePendingScore(playerIndex, current + num);
                        }}
                        disabled={isEliminated}
                        className="flex-1 h-9 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/35 text-emerald-400 font-bold text-xs transition-colors disabled:opacity-20 disabled:cursor-not-allowed press-effect"
                      >
                        +{num}
                      </button>
                    ))}

                    {/* Confirm button */}
                    <button
                      type="button"
                      onClick={() => confirmScore(playerIndex)}
                      disabled={
                        isEliminated || pendingScores[playerIndex] === undefined
                      }
                      className={`w-10 h-9 rounded-lg font-bold transition-all press-effect flex items-center justify-center ${
                        pendingScores[playerIndex] !== undefined
                          ? "bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/20 animate-pulse"
                          : "bg-muted/20 text-muted-foreground/20 cursor-not-allowed"
                      } disabled:opacity-20 disabled:cursor-not-allowed`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Quick legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
          <span>
            Eliminated at{" "}
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
