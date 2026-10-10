/**
 * The score keeper's state in localStorage. The key names and shapes are
 * what browsers already hold, so they do not change.
 */

export interface Player {
  name: string;
  /** Sparse: a round nobody entered a score for is a hole, read as 0. */
  rounds: number[];
  total: number;
}

export interface GameSettings {
  eliminationThreshold: number;
  maxPlayers: number | null;
}

export interface GameSession {
  id: string;
  date: string;
  players: Player[];
  completed: boolean;
  currentRound: number;
  settings?: GameSettings;
}

interface ActiveGame {
  players: Player[];
  currentRound: number;
  settings?: GameSettings;
  lastUpdated: string;
}

export const ACTIVE_GAME_KEY = "jukasActiveGame";
export const HISTORY_KEY = "jukasScoreHistory";
export const PLAYER_NAMES_KEY = "jukasPlayerNames";
export const SETTINGS_KEY = "jukasGameSettings";

export const DEFAULT_SETTINGS: GameSettings = {
  eliminationThreshold: 100,
  maxPlayers: null,
};

function read<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Failed to load ${key}:`, e);
    return null;
  }
}

export function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Everything the score keeper restores on open. Client only. */
export function loadSavedState() {
  const savedSettings = read<Partial<GameSettings>>(SETTINGS_KEY);
  const activeGame = read<ActiveGame>(ACTIVE_GAME_KEY);
  return {
    playerNames: read<string[]>(PLAYER_NAMES_KEY) ?? ["Player 1", "Player 2"],
    settings:
      activeGame?.settings ?? { ...DEFAULT_SETTINGS, ...savedSettings },
    history: read<GameSession[]>(HISTORY_KEY) ?? [],
    activeGame,
  };
}

/** The sum of a player's rounds, holes counted as 0. */
export function totalOf(rounds: number[]) {
  return rounds.reduce((sum, score) => sum + (score || 0), 0);
}
