import React, { useState, useEffect } from 'react';
import { polygon } from 'viem/chains';

const CARD_BACK = '/assets/images/card-back.svg'; // Placeholder for card back
const TOOLS_IMG = '/assets/images/tools.svg';
const BOOSTER_IMG = '/assets/images/booster.svg';
const SETTINGS_IMG = '/assets/images/settings2.svg';

function DeckOfCards10() {
  const [cards, setCards] = useState(Array.from({ length: 5 }, (_, i) => ({ id: i + 1 })));
  const [isShuffling, setIsShuffling] = useState(false);

  function shuffleDeck() {
    setIsShuffling(true);
    setTimeout(() => {
      setCards(prev => {
        const arr = [...prev];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      });
      setIsShuffling(false);
    }, 400);
  }

  return (
    <div className="relative w-6 h-12 sm:w-16 sm:h-32 cursor-pointer select-none" onClick={shuffleDeck} title="Shuffle Deck">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`absolute left-0 top-0 w-12 h-20 sm:w-16 sm:h-28 rounded-lg border-2 border-cyan-400 bg-[#232544] flex items-center justify-center transition-transform duration-300 ${isShuffling ? 'animate-pulse' : ''}`}
          style={{
            zIndex: 20 - i,
            transform: `translateX(${i * 2}px) translateY(-${i * 2}px)`,
            boxShadow: '0 2px 8px #23263a44',
          }}
        >
          <img src={CARD_BACK} alt="Card Back" className="w-8 h-12 sm:w-12 sm:h-20 object-contain" />
        </div>
      ))}
    </div>
  );
}

export default function BattleGroundMiddle() {
  // Timer state
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center" style={{ minHeight: 320 }}>
      {/* Top Left: Deck and Card Slot */}
      <div className="absolute left-0 top-4 flex flex-col items-center gap-12">
        <DeckOfCards10 />
        {/* Empty card slot */}
        <div className="w-12 h-20 sm:w-20 sm:h-28 border-cyan-400 bg-[#232544] border-2 border-cyan-400 rounded-lg" />
      </div>
      {/* Top Right: Tools Image */}
      <div className="absolute right-4 top-4">
        <img src={TOOLS_IMG} alt="Tools" className="w-20 h-20 sm:w-20 sm:h-20 object-contain" />
      </div>
      {/* Center: 3D Hexagon Table (SVG) */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img src="/assets/images/hexagon.svg" alt="Hexagon Table" className="w-[420px] h-[200px] max-w-[90vw] object-contain drop-shadow-2xl" />
      </div>
      {/* Bottom Right of Hexagon: Card Slot and Booster */}
      <div className="absolute right-[1%] top-1/2 flex flex-col items-center" style={{ transform: 'translateY(80px)' }}>
        <div className="w-12 h-20 sm:w-20 sm:h-28 bg-[#232544] border-2 border-cyan-400 rounded-lg mb-2" />
        <img src={BOOSTER_IMG} alt="Booster" className="w-14 h-20 sm:w-16 sm:h-16 object-contain mt-2" />
      </div>
      {/* Top Left of Hexagon: (Booster image moved to bottom right as per new instruction) */}
      {/* Bottom Left: Settings2 Image */}
      <div className="absolute left-4 bottom-4">
        <img src={SETTINGS_IMG} alt="Settings" className="w-22 h-22 sm:w-20 sm:h-20 object-contain" />
      </div>
      {/* Bottom Center: Beautiful Animated Hexagon Timer */}
      <div className="absolute left-1/2 -bottom-10 bg-[#232544] transform -translate-x-1/2 -translate-y-1/2 z-20">
        <svg width="90" height="80" viewBox="0 0 90 80" className="animate-pulse-glow">
          <defs>
            <linearGradient id="hexGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon
            points="25,10 65,10 80,35 65,60 25,60 10,35"
            fill="url(#232544)"
            stroke="#fff"
            strokeWidth="4"
            filter="url(#glow)"
            opacity="0.95"
          />
        </svg>
        <div className="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm drop-shadow-lg select-none whitespace-nowrap">
          {timer} Sec
        </div>
        <style>{`
          .animate-pulse-glow {
            animation: pulseGlowHex 2s infinite alternate;
          }
          @keyframes pulseGlowHex {
            0% { filter: drop-shadow(0 0 12px #38bdf8cc) drop-shadow(0 0 24px #a5b4fccc); }
            100% { filter: drop-shadow(0 0 32px #38bdf8cc) drop-shadow(0 0 48px #a5b4fccc); }
          }
        `}</style>
      </div>
    </div>
  );
}