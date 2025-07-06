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
  const [pulse, setPulse] = useState(false);
  const [showGo, setShowGo] = useState(false);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 350);
        setTimer(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setShowGo(true);
      setTimeout(() => setShowGo(false), 1800);
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
      <div
        className={`absolute left-1/2 -bottom-10 bg-[#232544] transform -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none focus:ring-2 focus:ring-cyan-400`}
        tabIndex={0}
        aria-label={timer > 0 ? `${timer} seconds remaining` : 'Time up!'}
      >
        <svg
          width="110" height="100" viewBox="0 0 90 80"
          className={`transition-all duration-300 ${pulse ? 'animate-timer-pulse' : ''} group-hover:scale-110 group-hover:drop-shadow-xl`}
          style={{ filter: showGo ? 'drop-shadow(0 0 32px #facc15)' : undefined }}
        >
          <defs>
            <linearGradient id="hexGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="hexGradient2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Animated border */}
          <polygon
            points="25,10 65,10 80,35 65,60 25,60 10,35"
            fill="url(#hexGradient)"
            stroke="url(#hexGradient2)"
            strokeWidth="5"
            filter="url(#glow)"
            opacity="0.98"
            className="animate-hex-border"
          />
          {/* Flash burst when GO! */}
          {showGo && (
            <g>
              <circle cx="45" cy="35" r="32" fill="#facc15" opacity="0.25">
                <animate attributeName="r" from="32" to="50" dur="0.7s" fill="freeze" />
                <animate attributeName="opacity" from="0.25" to="0" dur="0.7s" fill="freeze" />
              </circle>
            </g>
          )}
        </svg>
        <div
          className={`absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 text-white font-extrabold text-2xl drop-shadow-lg select-none whitespace-nowrap transition-all duration-300 ${pulse ? 'scale-125 opacity-80' : 'scale-100 opacity-100'} ${showGo ? 'text-yellow-300 animate-go-bounce' : ''}`}
        >
          {showGo ? 'GO!' : `${timer} Sec`}
        </div>
        <style>{`
          .animate-pulse-glow {
            animation: pulseGlowHex 2s infinite alternate;
          }
          @keyframes pulseGlowHex {
            0% { filter: drop-shadow(0 0 12px #38bdf8cc) drop-shadow(0 0 24px #a5b4fccc); }
            100% { filter: drop-shadow(0 0 32px #38bdf8cc) drop-shadow(0 0 48px #a5b4fccc); }
          }
          .animate-timer-pulse {
            animation: timerPulse 0.35s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes timerPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.25); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-hex-border {
            animation: hexBorderRotate 3s linear infinite;
            transform-origin: 45px 35px;
          }
          @keyframes hexBorderRotate {
            0% { stroke-dasharray: 0 200; }
            50% { stroke-dasharray: 100 100; }
            100% { stroke-dasharray: 0 200; }
          }
          .animate-go-bounce {
            animation: goBounce 1.2s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes goBounce {
            0% { transform: scale(1); color: #fff; }
            30% { transform: scale(1.5); color: #facc15; }
            60% { transform: scale(1.2); color: #facc15; }
            100% { transform: scale(1); color: #fff; }
          }
        `}</style>
      </div>
    </div>
  );
}