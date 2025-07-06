import React from 'react';

export default function BattleGroundMiddle() {
  return (
    <div className="relative w-full max-w-screen overflow-hidden flex items-center justify-center py-4" style={{ minHeight: 320 }}>
      {/* Left Controls and Card Slot */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        {/* Card Slot */}
        <div className="w-14 h-24 bg-slate-800/80 border-2 border-cyan-400/40 rounded-lg mb-4" />
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 border-2 border-cyan-400/40 rounded-full flex items-center justify-center">
            {/* Crossed Swords Icon Placeholder */}
            <span className="text-cyan-400">⚔️</span>
          </div>
          <div className="w-10 h-10 border-2 border-cyan-400/40 rounded-full flex items-center justify-center">
            {/* Shield Icon Placeholder */}
            <span className="text-cyan-400">🛡️</span>
          </div>
        </div>
      </div>

      {/* Center Hexagon Board */}
      <div className="relative mx-auto flex flex-col items-center justify-center">
        <svg width="320" height="200" viewBox="0 0 320 200" className="drop-shadow-2xl" style={{ maxWidth: '90vw' }}>
          <polygon points="160,10 310,60 310,160 160,210 10,160 10,60" fill="#4f539e" stroke="#23263a" strokeWidth="8" />
          <polygon points="160,30 290,70 290,150 160,190 30,150 30,70" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
        </svg>
      </div>

      {/* Right Controls, Score, and Turn Badge */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        {/* Red Score Box */}
        <div className="w-10 h-10 bg-red-600 text-white font-bold flex items-center justify-center rounded-lg mb-2 shadow-lg">6</div>
        {/* Your Turn Badge */}
        <div className="bg-slate-800 border-2 border-cyan-400/40 px-4 py-2 rounded-xl text-white font-semibold shadow-md mb-2">Your Turn</div>
        {/* Blue Score Box */}
        <div className="w-10 h-10 bg-blue-600 text-white font-bold flex items-center justify-center rounded-lg mt-2 shadow-lg">6</div>
      </div>

      {/* Right Card Slot */}
      <div className="absolute right-2 bottom-8 flex flex-col items-center">
        <div className="w-14 h-24 bg-slate-800/80 border-2 border-cyan-400/40 rounded-lg" />
      </div>
    </div>
  );
}