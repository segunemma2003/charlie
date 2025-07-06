import React, { useState } from 'react';

function FlippableCard() {
  return (
    <div className="relative w-16 h-24 sm:w-24 sm:h-36 perspective mx-[-8px]">
      <div className="absolute inset-0 transition-transform duration-500 transform hover:rotate-y-180 rotate-x-180">
        {/* Front (now faces up) */}
        <div className="absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center rotate-x-180">
          {/* Card Front Placeholder */}
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center rotate-y-180 rotate-x-180">
          {/* Card Back Placeholder */}
        </div>
      </div>
      <style>{`
        .perspective { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-x-180 { transform: rotateX(180deg); }
      `}</style>
    </div>
  );
}

function DeckOfCards() {
  const [cards, setCards] = useState([
    { id: 1, image: '/assets/images/unicorn-head-icon.svg' },
    { id: 2, image: null },
    { id: 3, image: null },
  ]);

  function shuffleDeck() {
    setCards(prev => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-24 sm:w-24 sm:h-36 cursor-pointer group"
        onClick={shuffleDeck}
        title="Shuffle Deck"
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="absolute left-0 top-0 w-12 h-18 sm:w-24 sm:h-36 rounded-xl border-2 border-cyan-400 bg-[#232544] flex items-center justify-center transition-transform duration-200 group-active:scale-95"
            style={{
              zIndex: 10 - i,
              transform: `translateX(${i * 6}px) translateY(-${i * 4}px)`,
              boxShadow: '0 2px 8px #23263a44',
            }}
          >
            {card.image && (
              <img src={card.image} alt="Character One" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BattleGroundLower() {
  return (
    <div className="fixed bottom-12 left-0 w-full max-w-screen flex flex-col bg-transparent z-50" style={{ minHeight: 120 }}>
      {/* Top Section - Mirror of BattleGroundUpper (facing upward) */}
      <div className="relative w-full flex items-center justify-center pb-4" style={{ height: 80 }}>
        {/* Full-width SVG Bar with V Notch (inverted, now flush with bottom) */}
        <svg className="absolute left-0 bottom-0 w-full h-16" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="0,48 120,48 200,8 280,48 400,48" stroke="#6ee7b7" strokeWidth="3" fill="none" />
        </svg>
        {/* Glowing Score Ball in Notch */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full z-10">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 animate-pulse-glow"
            style={{
              backgroundImage: 'url(/assets/images/ball-two-bg.svg)',
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
        <div className="absolute left-1 -bottom-20 flex flex-col items-center z-20">
          <div className="hexagon-glow">
            <div className="hexagon bg-gray-800 flex items-center justify-center shadow-xl ">
              {/* Character Image */}
              <img 
                src="/assets/images/character-one.png" 
                alt="Character" 
                className="w-80 h-40  object-contain"
                style={{ filter: 'brightness(0.8) contrast(1.2)' }}
              />
            </div>
          </div>
        </div>
        {/* Right: Deck of Cards */}
        <div className="absolute right-3 -bottom-24 flex flex-col items-center z-0">
          <DeckOfCards />
        </div>
      </div>
      {/* Fanned Cards above the score ball (single grouped image, behind the ball) */}
      <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 z-1" style={{ marginBottom: 40 }}>
        <img 
          src="/assets/images/three-visible-card.svg" 
          alt="Card Deck" 
          style={{ maxWidth: 180, width: '100%', height: 'auto' }}
        />
      </div>
      {/* Middle section cleared for now */}
      {/* (All previous content between top and bottom is removed for clarity) */}
      {/* Hexagon CSS */}
      <style>{`
        .hexagon {
          width: 70px;
          height: 70px;
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