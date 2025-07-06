import React, { useState, useRef, useEffect } from 'react';

function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sound, setSound] = useState(7);
  const [music, setMusic] = useState(7);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !(modalRef.current as any).contains(e.target)) onClose();
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-[340px] sm:w-[400px] rounded-xl border-2 border-cyan-300/80 bg-gradient-to-br from-[#232544ee] to-[#232544cc] shadow-2xl p-6 pt-4"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[2.5px] border-cyan-300/60 rounded-xl" />
        <h2 className="text-xl font-bold text-white mb-6 z-10 relative">SOUND VOLUME</h2>
        <div className="mb-6 z-10 relative">
          <label className="block text-white text-sm mb-2">SOUND VOLUME</label>
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={10}
              value={sound}
              onChange={e => setSound(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-300 rounded-full appearance-none outline-none slider-thumb-custom"
              style={{ accentColor: '#7dd3fc' }}
            />
          </div>
        </div>
        <div className="mb-8 z-10 relative">
          <label className="block text-white text-sm mb-2">MUSIC VOLUME</label>
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={10}
              value={music}
              onChange={e => setMusic(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-300 rounded-full appearance-none outline-none slider-thumb-custom"
              style={{ accentColor: '#a78bfa' }}
            />
          </div>
        </div>
        <button
          className="w-full py-3 mt-2 text-lg font-bold rounded-lg border-2 border-cyan-300 bg-gradient-to-br from-[#232544] to-[#232544] text-white hover:bg-gradient-to-br hover:from-cyan-400 hover:to-purple-400 transition-all outline-none focus:ring-2 focus:ring-cyan-400"
          style={{ boxShadow: 'none', borderImage: 'linear-gradient(90deg, #a5b4fc 0%, #38bdf8 100%) 1' }}
        >
          RESIGN
        </button>
      </div>
      <style>{`
        .slider-thumb-custom::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a5b4fc 40%, #38bdf8 100%);
          border: 2px solid #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
        }
        .slider-thumb-custom::-webkit-slider-thumb::after {
          content: attr(value);
          display: block;
        }
        .slider-thumb-custom::-moz-range-thumb {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a5b4fc 40%, #38bdf8 100%);
          border: 2px solid #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
        }
        .slider-thumb-custom::-ms-thumb {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a5b4fc 40%, #38bdf8 100%);
          border: 2px solid #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

export default function BattleGroundUpper() {
  const [showSettings, setShowSettings] = useState(false);
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
            <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl cursor-pointer" onClick={() => setShowSettings(true)}>
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
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
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