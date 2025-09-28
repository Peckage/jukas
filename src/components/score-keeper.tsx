"use client";

import { useState, useEffect } from 'react';

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
  const [playerNames, setPlayerNames] = useState<string[]>(['Player 1', 'Player 2']);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load game history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jukasScoreHistory');
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load game history:', e);
      }
    }
  }, []);

  // Save game history to localStorage
  const saveGameHistory = (updatedHistory: GameSession[]) => {
    setGameHistory(updatedHistory);
    localStorage.setItem('jukasScoreHistory', JSON.stringify(updatedHistory));
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
    const initialPlayers = playerNames.map(name => ({
      name: name.trim() || 'Player',
      rounds: [],
      total: 0
    }));
    setPlayers(initialPlayers);
    setGameActive(true);
    setCurrentRound(1);
  };

  const addRoundScore = (playerIndex: number, score: number) => {
    const newPlayers = [...players];
    if (!newPlayers[playerIndex].rounds[currentRound - 1]) {
      newPlayers[playerIndex].rounds[currentRound - 1] = score;
    } else {
      newPlayers[playerIndex].rounds[currentRound - 1] = score;
    }
    
    // Recalculate total
    newPlayers[playerIndex].total = newPlayers[playerIndex].rounds.reduce((sum, roundScore) => sum + (roundScore || 0), 0);
    
    setPlayers(newPlayers);
  };

  const nextRound = () => {
    setCurrentRound(currentRound + 1);
  };

  const endGame = () => {
    const gameSession: GameSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      players: [...players],
      completed: true
    };
    
    const updatedHistory = [gameSession, ...gameHistory];
    saveGameHistory(updatedHistory);
    
    setGameActive(false);
    setPlayers([]);
    setCurrentRound(1);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all score history?')) {
      saveGameHistory([]);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!gameActive) {
    return (
      <section id="scorekeeper" className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Score Keeper</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Track scores for your physical Jukas games across multiple rounds. Players are eliminated when they reach 100 points. Last survivor wins!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Setup New Game</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-white/90">
                    Players (2-6)
                  </label>
                  <div className="space-y-3">
                    {playerNames.map((name, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => updatePlayerName(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#19c37d]"
                          placeholder={`Player ${index + 1} name`}
                        />
                        {playerNames.length > 2 && (
                          <button
                            onClick={() => removePlayer(index)}
                            className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 transition"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {playerNames.length < 6 && (
                    <button
                      onClick={addPlayer}
                      className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition"
                    >
                      + Add Player
                    </button>
                  )}
                </div>

                <button
                  onClick={startNewGame}
                  className="w-full px-6 py-3 bg-[#19c37d] hover:bg-[#15a56b] text-black font-semibold rounded-lg transition text-lg"
                >
                  Start Score Tracking
                </button>
              </div>
            </div>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <div className="mt-8 bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Game History</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition text-sm"
                    >
                      {showHistory ? 'Hide' : `Show (${gameHistory.length})`}
                    </button>
                    <button
                      onClick={clearHistory}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg transition text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {showHistory && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {gameHistory.map((game) => (
                      <div key={game.id} className="bg-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-300">{formatDate(game.date)}</span>
                          <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                            {game.players.length} players
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {game.players
                            .sort((a, b) => a.total - b.total)
                            .map((player, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className={index === 0 ? 'text-yellow-400 font-semibold' : 'text-gray-300'}>
                                  {index === 0 && '🏆 '}{player.name}
                                </span>
                                <span className={index === 0 ? 'text-yellow-400 font-semibold' : 'text-gray-400'}>
                                  {player.total}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="scorekeeper" className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Round {currentRound}</h2>
            <p className="text-white/70">Enter scores for this round (lower is better)</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={nextRound}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              Next Round
            </button>
            <button
              onClick={endGame}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
            >
              End Game
            </button>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="text-left p-4 font-semibold">Player</th>
                  {Array.from({ length: Math.max(currentRound, 1) }, (_, i) => (
                    <th key={i} className="text-center p-4 font-semibold w-20">
                      R{i + 1}
                    </th>
                  ))}
                  <th className="text-center p-4 font-semibold w-24 bg-white/10">Total</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, playerIndex) => (
                  <tr key={playerIndex} className={`border-t border-white/10 ${player.total >= 100 ? 'opacity-50 bg-red-500/10' : ''}`}>
                    <td className="p-4 font-medium">
                      {player.name}
                      {player.total >= 100 && <span className="ml-2 text-red-400 text-xs">ELIMINATED</span>}
                    </td>
                    {Array.from({ length: Math.max(currentRound, 1) }, (_, roundIndex) => (
                      <td key={roundIndex} className="p-4 text-center">
                        {roundIndex < currentRound - 1 ? (
                          <span className="text-white/80">{player.rounds[roundIndex] || 0}</span>
                        ) : roundIndex === currentRound - 1 ? (
                          <input
                            type="number"
                            value={player.rounds[roundIndex] || ''}
                            onChange={(e) => addRoundScore(playerIndex, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-center text-white focus:outline-none focus:border-[#19c37d]"
                            placeholder="0"
                          />
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </td>
                    ))}
                    <td className="p-4 text-center font-bold text-lg bg-white/5">
                      <span className={
                        player.total >= 100 ? 'text-red-400' :
                        player.total === Math.min(...players.filter(p => p.total < 100).map(p => p.total)) ? 'text-yellow-400' : 'text-white'
                      }>
                        {player.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            💡 Tip: Players are <strong>eliminated at 100 points</strong>. Last survivor wins! Red Kings = -1, Black Kings = +13
          </p>
        </div>
      </div>
    </section>
  );
}