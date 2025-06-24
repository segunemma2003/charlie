import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTelegram } from '../../hooks/useTelegram'

interface BattleSelectionScreenProps {
  // Add any props you need, like navigation handlers
}

export const BattleSelectionScreen: React.FC<BattleSelectionScreenProps> = () => {
  const { hapticFeedback } = useTelegram()
  const [selectedMode, setSelectedMode] = useState(1) // 0: Tournament, 1: Multiplayer, 2: Training
  
  const battleModes = [
    {
      id: 0,
      title: "CHARLIE UNICORN",
      subtitle: "TOURNAMENT",
      image: "/assets/images/tournament-card.svg",
      stars: 3,
      hexColor: "from-purple-500 to-blue-500"
    },
    {
      id: 1,
      title: "MULTIPLAYER",
      subtitle: "",
      image: "/assets/images/multiplayer-card.svg",
      stars: 0,
      hexColor: "from-yellow-400 to-orange-500",
      isCenter: true
    },
    {
      id: 2,
      title: "TRANING TRIALS",
      subtitle: "",
      image: "/assets/images/training-card.svg",
      stars: 0,
      hexColor: "from-orange-400 to-red-500"
    }
  ]

  const bottomItems = [
    { title: "SETTINGS", image: "/assets/images/settings-icon.svg" },
    { title: "INBOX", image: "/assets/images/inbox-icon.svg" },
    { title: "CARD", image: "/assets/images/card-icon.svg" },
    { title: "DECKS", image: "/assets/images/decks-icon.svg" },
    { title: "PROFILE", image: "/assets/images/profile-icon.svg", badge: "4" },
    { title: "MARKETPLACE", image: "/assets/images/marketplace-icon.svg" },
  ]

  const handleBattleClick = () => {
    hapticFeedback('impact', 'medium')
    // Add your battle logic here
    console.log('Starting battle with mode:', selectedMode)
  }

  const handleModeSelect = (modeId: number) => {
    hapticFeedback('selection')
    setSelectedMode(modeId)
  }

  const handleBottomItemClick = (item: string) => {
    hapticFeedback('impact', 'light')
    // Add navigation logic here
    console.log('Clicked:', item)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black relative overflow-hidden telegram-safe-area"
    >
      {/* Starry background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Top Stats */}
      <div className="flex justify-between items-center p-6 relative z-10">
        {/* Funny Mode */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <img src="/assets/images/funny-mode-icon.svg" alt="Funny Mode" className="w-8 h-8" />
          </div>
          <div>
            <div className="text-white font-bold text-lg">3200</div>
            <div className="text-white/60 text-sm">FUNNY MODE</div>
          </div>
        </div>

        {/* Hardcore Mode */}
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-white font-bold text-lg text-right">0</div>
            <div className="text-white/60 text-sm">HARDCORE MODE</div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
            <img src="/assets/images/hardcore-mode-icon.svg" alt="Hardcore Mode" className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Main Battle Cards */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="relative w-full max-w-lg">
          {/* Battle Mode Cards */}
          <div className="flex justify-between items-center relative">
            {battleModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                className={`relative cursor-pointer ${
                  mode.isCenter ? 'w-48 h-64 z-20' : 'w-32 h-44 z-10'
                }`}
                style={{
                  marginTop: mode.isCenter ? 0 : '40px',
                  ...(index === 0 && { marginLeft: '-20px' }),
                  ...(index === 2 && { marginRight: '-20px' }),
                }}
                whileHover={{ scale: mode.isCenter ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleModeSelect(mode.id)}
              >
                {/* Hexagonal Card */}
                <div 
                  className={`relative w-full h-full bg-gradient-to-br ${mode.hexColor} rounded-lg border-2 ${
                    selectedMode === mode.id ? 'border-cyan-400 shadow-lg shadow-cyan-400/50' : 'border-white/30'
                  } overflow-hidden transition-all duration-300`}
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  {/* Card Content */}
                  <div className="relative w-full h-full p-4 flex flex-col items-center justify-center">
                    {/* Character Image */}
                    <div className={`${mode.isCenter ? 'w-24 h-24 mb-4' : 'w-16 h-16 mb-2'} relative`}>
                      <img
                        src={mode.image}
                        alt={mode.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title */}
                    <div className="text-center">
                      <div className={`text-white font-bold ${mode.isCenter ? 'text-sm' : 'text-xs'} leading-tight`}>
                        {mode.title}
                      </div>
                      {mode.subtitle && (
                        <div className={`text-white/80 ${mode.isCenter ? 'text-xs' : 'text-xs'} mt-1`}>
                          {mode.subtitle}
                        </div>
                      )}
                    </div>

                    {/* Stars */}
                    {mode.stars > 0 && (
                      <div className="flex space-x-1 mt-2">
                        {[...Array(mode.stars)].map((_, i) => (
                          <div key={i} className="w-3 h-3 text-yellow-400">⭐</div>
                        ))}
                      </div>
                    )}

                    {/* NFT Badge for center card */}
                    {mode.isCenter && (
                      <div className="absolute bottom-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                        NFT
                      </div>
                    )}
                  </div>

                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg blur-sm -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 w-12 h-12 bg-purple-500/50 rounded-full flex items-center justify-center text-white hover:bg-purple-500/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => hapticFeedback('impact', 'light')}
          >
            &#8249;
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 w-12 h-12 bg-purple-500/50 rounded-full flex items-center justify-center text-white hover:bg-purple-500/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => hapticFeedback('impact', 'light')}
          >
            &#8250;
          </motion.button>
        </div>
      </div>

      {/* Battle Now Button */}
      <div className="px-6 mb-8 relative z-10">
        <motion.button
          onClick={handleBattleClick}
          className="w-full max-w-sm mx-auto block py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-xl text-white font-bold text-xl relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">Battle Now!</span>
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <div className="grid grid-cols-3 gap-4 p-6 relative z-10">
        {bottomItems.map((item, index) => (
          <motion.div
            key={item.title}
            className="relative flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBottomItemClick(item.title)}
          >
            {/* Hexagonal Icon */}
            <div 
              className="relative w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-2 hover:from-cyan-300 hover:to-blue-500 transition-all duration-300"
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
              }}
            >
              <img src={item.image} alt={item.title} className="w-8 h-8" />
              
              {/* Badge */}
              {item.badge && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {item.badge}
                </div>
              )}
            </div>
            
            {/* Label */}
            <div className="text-white text-xs font-medium text-center">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}