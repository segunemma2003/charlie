import React from 'react';

interface CharacterCardProps {
  name: string;
  image: string;
  bgGradient: string;
  labelGradient: string;
  entrance: 'top' | 'bottom';
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name, image, bgGradient, labelGradient, entrance
}) => (
  <div
    className={
      `absolute w-full h-1/2 flex items-center justify-center ` +
      (entrance === 'top' ? 'top-0 animate-slideDown' : 'bottom-0 animate-slideUp')
    }
    style={{
      background: bgGradient,
      clipPath: entrance === 'top'
        ? 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
        : 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)'
    }}
  >
    <div className="relative flex flex-col items-center">
      <img src={image} alt={name} className="w-40 h-40 drop-shadow-2xl" />
      <div
        className="mt-4 px-8 py-2 rounded"
        style={{ background: labelGradient }}
      >
        <span className="text-white font-bold text-2xl">{name}</span>
      </div>
    </div>
    <style>{`
      @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .animate-slideDown { animation: slideDown 1s cubic-bezier(.68,-0.55,.27,1.55) forwards; }
      .animate-slideUp { animation: slideUp 1s cubic-bezier(.68,-0.55,.27,1.55) forwards; }
    `}</style>
  </div>
);

export default CharacterCard; 