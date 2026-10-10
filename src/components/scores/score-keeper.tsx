"use client";

import { useEffect, useState } from "react";
import { GameBoard } from "@/components/scores/game-board";
import { GameSetup } from "@/components/scores/game-setup";
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

  /**
   * Records a player's score for the current round. A new player object, never
   * an edit of the old one: the old totals are what tells us who just went out.
   */
  const addRoundScore = (playerIndex: number, score: number) => {
    const next = players.map((player, index) => {
      if (index !== playerIndex) return player;
      const rounds = [...player.rounds];
      rounds[currentRound - 1] = score;
      return { ...player, rounds, total: totalOf(rounds) };
    });
    setPlayers(next);

    if (
      players[playerIndex].total < threshold &&
      next[playerIndex].total >= threshold
    ) {
      setJustEliminated(new Set([playerIndex]));
      setTimeout(() => setJustEliminated(new Set()), 1500);
    }

    const aliveBefore = players.filter((p) => p.total < threshold).length;
    const aliveAfter = next.filter((p) => p.total < threshold).length;
    if (aliveBefore > 1 && aliveAfter === 1) setShowVictory(true);
  };

  const displayScore = (playerIndex: number) =>
    pendingScores[playerIndex] ??
    players[playerIndex].rounds[currentRound - 1] ??
    0;

  const setPending = (playerIndex: number, value: number) => {
    setPendingScores((prev) => ({ ...prev, [playerIndex]: value }));
  };

  const confirmScore = (playerIndex: number) => {
    if (pendingScores[playerIndex] === undefined) return;
    addRoundScore(playerIndex, pendingScores[playerIndex]);
    setPendingScores((prev) => {
      const next = { ...prev };
      delete next[playerIndex];
      return next;
    });
  };

  const endGame = (saveToHistory: boolean) => {
    if (saveToHistory) {
      saveGameHistory([
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          players: [...players],
          completed: true,
          currentRound,
          settings,
        },
        ...gameHistory,
      ]);
    }
    localStorage.removeItem(ACTIVE_GAME_KEY);
    setGameActive(false);
    setPlayers([]);
    setCurrentRound(1);
    setShowVictory(false);
    setJustEliminated(new Set());
  };

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
        onPreviousRound={() => setCurrentRound(Math.max(1, currentRound - 1))}
        onNextRound={() => setCurrentRound(currentRound + 1)}
        onStep={(index, delta) => setPending(index, displayScore(index) + delta)}
        onType={setPending}
        onConfirm={confirmScore}
        onEnd={endGame}
      />
    </>
  );
}
