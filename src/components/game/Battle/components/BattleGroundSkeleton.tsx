import { useEffect } from 'react';
import BattleGroundUpper from './BattleGroundUpper'
// import BattleGroundMiddle from './BattleGroundMiddle'
import BattleGroundLower from './BattleGroundLower'

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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/battle-ground-bg.svg)' }}>
      {/* Upper 3D Section - absolutely at the top */}
      <div className="absolute top-0 left-0 w-full z-40">
        <BattleGroundUpper />
      </div>
      {/* Lower Section */}
      <div className="h-[32vh] flex flex-col justify-start">
        <BattleGroundLower />
      </div>
      {/* Top Section */}
      
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