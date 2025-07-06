import React from 'react';

export default function BattleGroundUpper() {
  return (
    <div className="relative w-full flex flex-col items-center pt-2 pb-4" style={{ zIndex: 2 }}>
      {/* Horizontal Bar with Arrow Notch */}
      <div className="relative w-full flex items-center justify-between px-2 sm:px-6">
        {/* Left: Pentagon with Card */}
        <div className="flex flex-col items-center">
          {/* Pentagon with Card */}
          <div className="pentagon-box flex items-center justify-center mb-1">
            {/* Card Placeholder */}
            <div className="w-10 h-14 sm:w-14 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-md shadow-lg" />
          </div>
        </div>
        {/* Center: Horizontal Bar with Arrow Notch */}
        <div className="relative flex-1 flex flex-col items-center">
          {/* SVG Bar with Arrow Notch */}
          <svg width="100%" height="48" viewBox="0 0 400 48" className="block" style={{ minWidth: 220, maxWidth: 480 }}>
            <polygon points="0,0 400,0 400,32 210,32 200,48 190,32 0,32" fill="#23263a" stroke="#6ee7b7" strokeWidth="2" />
          </svg>
          {/* Glowing Score Ball on Notch */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-purple-700 flex items-center justify-center shadow-2xl border-4 border-white/30 animate-pulse-glow">
              <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">0</span>
            </div>
          </div>
        </div>
        {/* Right: Pentagon with Settings Icon */}
        <div className="flex flex-col items-center">
          <div className="pentagon-box flex items-center justify-center mb-1">
            {/* Settings Icon Placeholder */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,8 18,22 6,22 2,8" fill="#23263a" stroke="#6ee7b7" strokeWidth="2"/><g><circle cx="12" cy="12" r="4" fill="#6ee7b7"/></g></svg>
          </div>
        </div>
      </div>
      {/* Below Bar: Left - Stack of Cards (reshuffle placeholder) */}
      <div className="absolute left-4 top-16 flex flex-col items-center">
        <div className="flex flex-col items-center space-y-[-16px] cursor-pointer">
          {/* Stack of Cards */}
          {[0,1,2].map(i => (
            <div key={i} className="w-10 h-14 sm:w-14 sm:h-20 bg-gray-700 rounded-md border-2 border-blue-400/40 shadow-md" style={{ marginTop: i === 0 ? 0 : -12, zIndex: 3-i }} />
          ))}
        </div>
        <div className="mt-1 text-xs text-blue-300">(Reshuffle)</div>
      </div>
      {/* Below Bar: Right - Placeholder for image/design */}
      <div className="absolute right-4 top-16 flex flex-col items-center">
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-800/60 rounded-lg border-2 border-dashed border-blue-400 flex items-center justify-center">
          {/* Placeholder for right-side image/design */}
        </div>
      </div>
      {/* Pentagon CSS */}
      <style>{`
        .pentagon-box {
          width: 48px;
          height: 48px;
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          background: #23263a;
          border: 2px solid #6ee7b7;
        }
        @media (min-width: 640px) {
          .pentagon-box { width: 64px; height: 64px; }
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