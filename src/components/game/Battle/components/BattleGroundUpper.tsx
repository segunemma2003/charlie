import React from 'react';

export default function BattleGroundUpper() {
  return (
    <div className="relative w-full max-w-screen overflow-hidden flex flex-col items-center pt-8 pb-4" style={{ zIndex: 2 }}>
      {/* SVG Bar with V Notch */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 80 }}>
        {/* Full-width SVG Bar */}
        <svg className="absolute left-0 top-6 w-full h-16" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="0,16 120,16 200,56 280,16 400,16" stroke="#6ee7b7" strokeWidth="3" fill="none" />
        </svg>
        {/* Glowing Score Ball in Notch */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 animate-pulse-glow"
            style={{
              backgroundImage: 'url(/assets/images/score-ball-bg.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            {/* Glowing overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              background: 'radial-gradient(circle, rgba(34,197,94,0.3) 40%, rgba(168,139,250,0.2) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />
            <span className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg relative z-10">0</span>
          </div>
        </div>
        {/* Left Hexagon (no character) */}
        <div className="absolute left-4 top-[-18px] flex flex-col items-center z-20">
          <div className="hexagon-glow">
            <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl" />
          </div>
          {/* Deck Info Badge, rotated and overlapping */}
          <div className="flex items-center mt-[-10px] bg-blue-600 rounded-lg px-2 py-1 shadow-md text-white text-xs sm:text-base font-bold gap-1 rotate-[-15deg] -ml-4 z-30">
            <span>36</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" fill="#fff" opacity="0.2" rx="3"/><rect x="3" y="3" width="12" height="12" rx="2" fill="#3b82f6"/></svg>
            <span>45</span>
          </div>
        </div>
        {/* Right Hexagon with Settings (no character) */}
        <div className="absolute right-4 top-[-18px] flex flex-col items-center z-20">
          <div className="hexagon-glow">
            <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl">
              {/* Settings Icon Placeholder */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3b82f6" opacity="0.2"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="#fff"/><path d="M19.4 15a1.65 1.65 0 01-.33 1.82l-1.43 1.43a1.65 1.65 0 01-1.82.33 1.65 1.65 0 01-1-1.51V17a1.65 1.65 0 01-1.65-1.65h-.7A1.65 1.65 0 017 17v.07a1.65 1.65 0 01-1 1.51 1.65 1.65 0 01-1.82-.33l-1.43-1.43a1.65 1.65 0 01-.33-1.82 1.65 1.65 0 011.51-1H7a1.65 1.65 0 011.65-1.65v-.7A1.65 1.65 0 017 7H6.93a1.65 1.65 0 01-1.51-1A1.65 1.65 0 015.75 4.2l1.43-1.43a1.65 1.65 0 011.82-.33 1.65 1.65 0 011 1.51V7a1.65 1.65 0 011.65 1.65h.7A1.65 1.65 0 0117 7V6.93a1.65 1.65 0 011-1.51 1.65 1.65 0 011.82.33l1.43 1.43a1.65 1.65 0 01.33 1.82 1.65 1.65 0 01-1.51 1H17a1.65 1.65 0 01-1.65 1.65v.7A1.65 1.65 0 0117 17h.07a1.65 1.65 0 011.51 1z" fill="#fff"/></svg>
            </div>
          </div>
        </div>
      </div>
      {/* Fanned Cards below the score ball (single grouped image, behind the ball) */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-0" style={{ marginTop: 40 }}>
        <img 
          src="/assets/images/three-card.svg" 
          alt="Card Deck" 
          style={{ maxWidth: 180, width: '100%', height: 'auto' }}
        />
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