"use client";

import { useEffect, useState } from "react";
import { GameBoard } from "@/components/scores/game-board";
import { GameSetup } from "@/components/scores/game-setup";
import { GameSummary } from "@/components/scores/game-summary";
import {
  ACTIVE_GAME_KEY,
  type GameSession,
  type GameSettings,
  HISTORY_KEY,
  loadSavedState,
  PLAYER_NAMES_KEY,
  type Player,
  SETTINGS_KEY,
  totalOf,
  write,
} from "@/components/scores/storage";
import { VictoryScreen } from "@/components/scores/victory-screen";

/**
 * The score keeper's state and rules. Rendered on the client only (see the
 * page), so the saved game is read in the first render.
 */
export default function ScoreKeeper() {
  const [saved] = useState(loadSavedState);
  const [gameActive, setGameActive] = useState(saved.activeGame !== null);
  const [players, setPlayers] = useState<Player[]>(
    saved.activeGame?.players ?? []
  );
  const [playerNames, setPlayerNames] = useState<string[]>(saved.playerNames);
  const [currentRound, setCurrentRound] = useState(
    saved.activeGame?.currentRound ?? 1
  );
  const [gameHistory, setGameHistory] = useState<GameSession[]>(saved.history);
  const [settings, setSettings] = useState<GameSettings>(saved.settings);
  const [justEliminated, setJustEliminated] = useState<Set<number>>(new Set());
  const [showVictory, setShowVictory] = useState(false);
  /** A finished game on screen: the one just ended, or one from the history. */
  const [summary, setSummary] = useState<GameSession | null>(null);
  const [pendingScores, setPendingScores] = useState<Record<number, number>>(
    {}
  );

  useEffect(() => {
    if (gameActive && players.length > 0) {
      write(ACTIVE_GAME_KEY, {
        players,
        currentRound,
        settings,
        lastUpdated: new Date().toISOString(),
      });
    }
  }, [gameActive, players, currentRound, settings]);

  useEffect(() => {
    if (!gameActive) write(SETTINGS_KEY, settings);
  }, [settings, gameActive]);

  useEffect(() => {
    if (!gameActive) write(PLAYER_NAMES_KEY, playerNames);
  }, [playerNames, gameActive]);

  const threshold = settings.eliminationThreshold;

  const saveGameHistory = (updatedHistory: GameSession[]) => {
    setGameHistory(updatedHistory);
    write(HISTORY_KEY, updatedHistory);
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

  const renamePlayer = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const startNewGame = () => {
    setPlayers(
      playerNames.map((name) => ({
        name: name.trim() || "Player",
        rounds: [],
        total: 0,
      }))
    );
    setGameActive(true);
    setCurrentRound(1);
    setShowVictory(false);
    setJustEliminated(new Set());
  };

  /** The furthest round anyone has a score in; 0 before the first save. */
  const roundsPlayed = Math.max(0, ...players.map((p) => p.rounds.length));
  // From the last saved round onwards, saving moves the game on; before it,
  // saving corrects that round. You can look back, never skip ahead.
  const isLatestRound = currentRound >= roundsPlayed;
  const canGoForward = currentRound <= roundsPlayed;

  /** Moving between rounds drops what was typed and not saved. */
  const goToRound = (round: number) => {
    setPendingScores({});
    setCurrentRound(round);
  };

  /**
   * Saves the round: every player still in gets what was typed, else what
   * the round already held, else 0. New player objects, never edits of the
   * old ones: the old totals are what tells us who just went out. On the
   * latest round it then moves on to an empty next one; on a past round it
   * is a correction and stays.
   */
  const submitRound = () => {
    const next = players.map((player, index) => {
      if (player.total >= threshold) return player;
      const rounds = [...player.rounds];
      rounds[currentRound - 1] =
        pendingScores[index] ?? player.rounds[currentRound - 1] ?? 0;
      return { ...player, rounds, total: totalOf(rounds) };
    });
    setPlayers(next);
    setPendingScores({});

    const wentOut = new Set(
      next.flatMap((player, index) =>
        players[index].total < threshold && player.total >= threshold
          ? [index]
          : []
      )
    );
    if (wentOut.size > 0) {
      setJustEliminated(wentOut);
      setTimeout(() => setJustEliminated(new Set()), 1500);
    }

    const aliveBefore = players.filter((p) => p.total < threshold).length;
    const aliveAfter = next.filter((p) => p.total < threshold).length;
    if (aliveBefore > 1 && aliveAfter === 1) setShowVictory(true);

    if (isLatestRound && aliveAfter > 1) {
      setCurrentRound(currentRound + 1);
      // The next round starts at the first player.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const displayScore = (playerIndex: number) =>
    pendingScores[playerIndex] ??
    players[playerIndex].rounds[currentRound - 1] ??
    0;

  const setPending = (playerIndex: number, value: number) => {
    setPendingScores((prev) => ({ ...prev, [playerIndex]: value }));
  };

  /** Ends the game; a saved game with a round played opens its summary. */
  const endGame = (saveToHistory: boolean) => {
    if (saveToHistory) {
      const session: GameSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        players: [...players],
        completed: true,
        currentRound,
        settings,
      };
      saveGameHistory([session, ...gameHistory]);
      if (players.some((p) => p.rounds.length > 0)) setSummary(session);
    }
    localStorage.removeItem(ACTIVE_GAME_KEY);
    setGameActive(false);
    setPlayers([]);
    setCurrentRound(1);
    setShowVictory(false);
    setJustEliminated(new Set());
  };

  if (summary) {
    return <GameSummary game={summary} onDone={() => setSummary(null)} />;
  }

  if (!gameActive) {
    return (
      <GameSetup
        playerNames={playerNames}
        settings={settings}
        history={gameHistory}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onRenamePlayer={renamePlayer}
        onChangeSettings={setSettings}
        onStart={startNewGame}
        onClearHistory={() => saveGameHistory([])}
        onOpenGame={setSummary}
      />
    );
  }

  const alive = players.filter((p) => p.total < threshold);
  const winnerIndex =
    players.length > 1 && alive.length === 1
      ? players.findIndex((p) => p.total < threshold)
      : -1;

  return (
    <>
      {showVictory && winnerIndex !== -1 && (
        <VictoryScreen
          winner={players[winnerIndex]}
          threshold={threshold}
          onShowSummary={() => endGame(true)}
          onClose={() => setShowVictory(false)}
        />
      )}
      <GameBoard
        players={players}
        currentRound={currentRound}
        threshold={threshold}
        winnerIndex={winnerIndex}
        justEliminated={justEliminated}
        pendingScores={pendingScores}
        isLatestRound={isLatestRound}
        canGoForward={canGoForward}
        onPreviousRound={() => goToRound(Math.max(1, currentRound - 1))}
        onNextRound={() => goToRound(currentRound + 1)}
        onStep={(index, delta) => setPending(index, displayScore(index) + delta)}
        onType={setPending}
        onSubmitRound={submitRound}
        onEnd={endGame}
      />
    </>
  );
}
