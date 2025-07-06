import React from 'react';

function FlippableCard() {
  return (
    <div className="relative w-16 h-24 sm:w-24 sm:h-36 perspective mx-[-8px]">
      <div className="absolute inset-0 transition-transform duration-500 transform hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
          {/* Card Front Placeholder */}
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center rotate-y-180">
          {/* Card Back Placeholder */}
        </div>
      </div>
      <style>{`
        .perspective { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

export default function BattleGroundLower() {
  return (
    <div className="relative w-full max-w-screen overflow-hidden flex items-end justify-between pb-4 pt-8" style={{ minHeight: 120 }}>
      {/* Left: Hexagon Avatar (no character) */}
      <div className="flex flex-col items-center ml-4">
        <div className="hexagon-glow">
          <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl" />
        </div>
      </div>
      {/* Center: Fanned Flippable Cards and Score Ball */}
      <div className="relative flex flex-col items-center justify-end flex-1">
        <div className="flex items-end justify-center mb-2">
          {[0,1,2].map((i) => (
            <FlippableCard key={i} />
          ))}
        </div>
        {/* Glowing Score Ball */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center shadow-2xl border-4 border-white/30 animate-pulse-glow">
            <span className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">0</span>
          </div>
        </div>
      </div>
      {/* Right: Booster and Deck Stack */}
      <div className="flex flex-col items-center mr-4 gap-2">
        {/* Booster */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-700 rounded-full flex items-center justify-center shadow-lg mb-1">
          {/* Booster Icon Placeholder */}
        </div>
        <div className="text-xs sm:text-base text-white mb-2">5 Booster</div>
        {/* Deck Stack */}
        <div className="w-10 h-16 sm:w-14 sm:h-20 bg-gray-700 rounded-lg border-2 border-blue-400/40 shadow-lg" />
      </div>
      {/* Hexagon CSS */}
      <style>{`
        .hexagon {
          width: 48px;
          height: 48px;
          clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%);
        }
        @media (min-width: 640px) {
          .hexagon { width: 72px; height: 72px; }
        }
        .hexagon-glow {
          filter: drop-shadow(0 0 12px #60a5fa88) drop-shadow(0 0 24px #a78bfa44);
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 24px 8px #a78bfa44, 0 0 0 #fff0; }
          100% { box-shadow: 0 0 48px 16px #60a5fa88, 0 0 0 #fff0; }
        }
      `}</style>
    </div>
  );
} 