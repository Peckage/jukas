"use client";

import { useState } from 'react';

export default function GameSetupGuide() {
  const [activeTab, setActiveTab] = useState<'setup' | 'layout' | 'turn'>('setup');

  return (
    <section id="setup" className="border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Quick Setup Guide</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Visual guide to get your game started quickly
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('setup')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === 'setup' 
                  ? 'bg-[#19c37d] text-black' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Initial Setup
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === 'layout' 
                  ? 'bg-[#19c37d] text-black' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Card Layout
            </button>
            <button
              onClick={() => setActiveTab('turn')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === 'turn' 
                  ? 'bg-[#19c37d] text-black' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Turn Example
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
          {activeTab === 'setup' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-center text-[#19c37d] mb-6">Game Setup</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#19c37d] rounded-full flex items-center justify-center text-black text-2xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Deal 4 Cards</h4>
                  <p className="text-sm text-white/70">Each player gets 4 cards face-down in a 2×2 grid</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#19c37d] rounded-full flex items-center justify-center text-black text-2xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Create Piles</h4>
                  <p className="text-sm text-white/70">Remaining cards = draw pile, flip top card for discard</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#19c37d] rounded-full flex items-center justify-center text-black text-2xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Peek at 2</h4>
                  <p className="text-sm text-white/70">Each player looks at any 2 of their 4 cards, then puts them back</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Remember Your Cards!</h4>
                <p className="text-sm text-white/80">
                  The key to Jukas is remembering which cards you peeked at initially. This memory will guide your strategy throughout the game.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-center text-[#19c37d] mb-6">Table Layout</h3>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Player Cards */}
                  <div className="text-center">
                    <h4 className="font-semibold mb-4">Your Cards (2×2 Grid)</h4>
                    <div className="inline-block p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="grid grid-cols-2 gap-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-12 h-16 bg-blue-600 rounded border-2 border-blue-400 flex items-center justify-center text-white text-xs font-bold">
                            ?
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-2">Face-down cards</p>
                  </div>

                  {/* Center Piles */}
                  <div className="text-center space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Draw Pile</h4>
                      <div className="w-16 h-20 mx-auto bg-blue-800 rounded border-2 border-blue-600 flex items-center justify-center text-white font-bold">
                        ?
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Discard Pile</h4>
                      <div className="w-16 h-20 mx-auto bg-white rounded border-2 border-gray-300 flex items-center justify-center text-red-600 font-bold text-lg">
                        K♥
                      </div>
                      <p className="text-xs text-white/60 mt-1">Face-up</p>
                    </div>
                  </div>

                  {/* Opponent Cards */}
                  <div className="text-center">
                    <h4 className="font-semibold mb-4">Opponent Cards</h4>
                    <div className="inline-block p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="grid grid-cols-2 gap-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-12 h-16 bg-gray-600 rounded border-2 border-gray-400 flex items-center justify-center text-white text-xs font-bold">
                            ?
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-2">Also face-down</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2">💡 Layout Tip</h4>
                <p className="text-sm text-white/80">
                  Keep your cards arranged consistently in the same 2×2 pattern throughout the game. This helps with memory and prevents confusion.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'turn' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-center text-[#19c37d] mb-6">Turn Example</h3>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="font-semibold mb-4 text-lg">Option A: Draw from Deck</h4>
                  <div className="grid md:grid-cols-4 gap-4 items-center text-center">
                    <div>
                      <div className="w-12 h-16 mx-auto bg-blue-800 rounded border-2 border-blue-600 flex items-center justify-center text-white font-bold text-xs mb-2">
                        ?
                      </div>
                      <p className="text-xs">1. Draw</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div>
                      <div className="w-12 h-16 mx-auto bg-white rounded border-2 border-gray-300 flex items-center justify-center text-red-600 font-bold text-sm mb-2">
                        7♥
                      </div>
                      <p className="text-xs">2. Look & Use Effect</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div>
                      <div className="w-12 h-16 mx-auto bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center text-gray-600 font-bold text-sm mb-2">
                        7♥
                      </div>
                      <p className="text-xs">3. Discard</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="font-semibold mb-4 text-lg">Option B: Take from Discard</h4>
                  <div className="grid md:grid-cols-4 gap-4 items-center text-center">
                    <div>
                      <div className="w-12 h-16 mx-auto bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center text-red-600 font-bold text-sm mb-2">
                        K♥
                      </div>
                      <p className="text-xs">1. Take Top Card</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div>
                      <div className="w-12 h-16 mx-auto bg-blue-600 rounded border-2 border-blue-400 flex items-center justify-center text-white font-bold text-xs mb-2">
                        ?
                      </div>
                      <p className="text-xs">2. Swap with Your Card</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div>
                      <div className="w-12 h-16 mx-auto bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center text-gray-800 font-bold text-sm mb-2">
                        Q♠
                      </div>
                      <p className="text-xs">3. Discard Swapped Card</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-300 mb-2">🎯 Strategy Tip</h4>
                <p className="text-sm text-white/80">
                  In this example, taking the Red King (K♥ = -1 point) from discard is usually better than drawing unknown cards from the deck, especially if you can swap it with a high-value card you remember.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}