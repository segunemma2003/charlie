import React from 'react';

export default function BattleGroundUpper() {
  return (
    <div className="relative w-full max-w-screen overflow-hidden flex flex-col items-center pt-6 pb-8" style={{ zIndex: 2 }}>
      {/* SVG Bar with V Notch */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 80 }}>
        {/* Full-width SVG Bar */}
        <svg className="absolute left-0 top-12 w-full h-16" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="0,16 120,16 200,56 280,16 400,16" stroke="#6ee7b7" strokeWidth="3" fill="none" />
        </svg>
        {/* Glowing Score Ball in Notch */}
        <div className="absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 z-10">
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
        {/* Left Hexagon with Character Image */}
        <div className="absolute left-1 top-[-18px] flex flex-col items-center z-20">
          <div className="hexagon-glow">
            <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl overflow-hidden">
              {/* Character Image */}
              <img 
                src="/assets/images/unicorn-head-icon.svg" 
                alt="Character" 
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                style={{ filter: 'brightness(0.8) contrast(1.2)' }}
              />
            </div>
          </div>
         
        </div>
        {/* Right Hexagon with Settings */}
        <div className="absolute right-1 top-[-18px] flex flex-col items-center z-20">
          <div className="hexagon-glow">
            <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl">
              {/* Settings Icon */}
              <img src="/assets/images/settings_icon.svg" alt="Settings" className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
          </div>
        </div>
      </div>
      {/* Fanned Cards below the score ball (single grouped image, behind the ball) */}
      <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-1" style={{ marginTop: 10 }}>
        <img 
          src="/assets/images/three-card.svg" 
          alt="Card Deck" 
          style={{ maxWidth: 150, width: '100%', height: 'auto' }}
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