import { useEffect } from 'react';

interface BattleGroundSkeletonProps {
  onEnterBattle?: () => void;
}

export default function BattleGroundSkeleton({ onEnterBattle }: BattleGroundSkeletonProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnterBattle?.();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onEnterBattle]);

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/battle-ground-bg.svg)' }}>
      {/* Top Section */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-2 sm:p-4">
        {/* Left Avatar */}
        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center">
          {/* Avatar Image Placeholder */}
        </div>
        {/* Score Points */}
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-gray-900 flex items-center justify-center text-2xl sm:text-4xl text-white font-bold">
            {/* Score Image Placeholder */}
            0
          </div>
          {/* Cards above score */}
          <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
            {/* 3 Card Placeholders */}
            <div className="w-6 h-10 sm:w-10 sm:h-16 bg-gray-700 rounded-lg" />
            <div className="w-6 h-10 sm:w-10 sm:h-16 bg-gray-700 rounded-lg" />
            <div className="w-6 h-10 sm:w-10 sm:h-16 bg-gray-700 rounded-lg" />
          </div>
        </div>
        {/* Right Settings Icon */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center">
          {/* Settings Icon Placeholder */}
        </div>
      </div>

      {/* Left Deck and Card Stack */}
      <div className="absolute left-2 sm:left-4 top-1/4 flex flex-col items-center space-y-2 sm:space-y-4">
        <div className="w-10 h-16 sm:w-16 sm:h-24 bg-gray-700 rounded-lg" />
        <div className="w-10 h-16 sm:w-16 sm:h-24 bg-gray-700 rounded-lg" />
      </div>

      {/* Right Booster */}
      <div className="absolute right-2 sm:right-4 bottom-1/3 flex flex-col items-center">
        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-green-700 rounded-full flex items-center justify-center">
          {/* Booster Image Placeholder */}
        </div>
        <div className="mt-1 sm:mt-2 text-xs sm:text-base text-white">5 Booster</div>
      </div>

      {/* Center Hexagon Board */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-56 h-36 sm:w-[400px] sm:h-[250px] bg-indigo-800 rounded-2xl" style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)' }}>
          {/* Hexagon Placeholder */}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-base">
          Your Turn
        </div>
      </div>

      {/* Bottom Hand (Flippable Cards) */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
        {[1, 2, 3].map((_, i) => (
          <FlippableCard key={i} />
        ))}
      </div>

      {/* Bottom Score */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 sm:mb-4">
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gray-900 flex items-center justify-center text-2xl sm:text-4xl text-white font-bold">
          0
        </div>
      </div>
    </div>
  );
}

// Flippable card skeleton
function FlippableCard() {
  return (
    <div className="relative w-16 h-24 sm:w-24 sm:h-36 perspective">
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