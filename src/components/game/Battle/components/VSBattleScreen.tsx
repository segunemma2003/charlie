import { useState, useEffect } from 'react'

interface VSBattleScreenProps {
  onBattleStart?: () => void
}

export const VSBattleScreen: React.FC<VSBattleScreenProps> = ({ onBattleStart }) => {
  const [showClash, setShowClash] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  useEffect(() => {
    // Start clash animation after 2 seconds
    const clashTimer = setTimeout(() => {
      setShowClash(true)
    }, 2000)

    // Start countdown after clash
    const countdownTimer = setTimeout(() => {
      setCountdown(3)
    }, 3500)

    return () => {
      clearTimeout(clashTimer)
      clearTimeout(countdownTimer)
    }
  }, [])

  // Handle countdown sequence
  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Countdown finished, start battle
      const battleTimer = setTimeout(() => {
        onBattleStart?.()
      }, 500)
      return () => clearTimeout(battleTimer)
    }
  }, [countdown, onBattleStart])

  return (
    <div className="min-h-screen relative overflow-hidden bg-black" >
      {/* VIC Section - Top Half */}
      <div className="h-1/2 relative ">
        <div 
          className="absolute inset-0 w-full h-full bg-[url(/assets/images/upper.svg)] bg-cover bg-center bg-no-repeat"
         
        >
          </div>
          <div className="absolute inset-0 bg-blue-500/20"></div>

            <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`vic-dot-${i}`}
              className="absolute rounded-full bg-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="absolute  bg-green inset-0 flex items-center justify-center">
          <div 
          
          >
            {/* VIC Character Image */}
            <div className="relative w-40 h-40 flex items-center justify-center top-70 left-20">
              <img 
                src="/assets/images/vic-character.svg" 
                alt="VIC Character" 
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />
              
              {/* Character glow effect */}
              <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl -z-10" />
            </div>
          </div>
        </div>

            <div className="absolute top-8 left-0 right-0 z-10">
              <div className="mx-auto w-fit">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-cyan-400 px-8 py-3 relative"
                  style={{
                    clipPath: 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)'
                  }}
                >
                  <span className="text-white font-bold text-2xl tracking-wider">VIC</span>
                </div>
              </div>
            </div>
        {/* UPPER.SVG Background Image */}
       </div>

             {/* WIZZY Section - Bottom Half */}
      <div className="h-1/2 relative">
        {/* LOWER.SVG Background Image */}
        <div 
          className="absolute inset-0 w-full h-full top-48 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/assets/images/lower.svg")',
            backgroundColor: '#dc2626' // Fallback red color if image doesn't load
          }}
        />
        
        {/* Light red color tint (much lighter) */}
        <div className="absolute inset-0 bg-red-500/20" />
        
        {/* Animated pattern dots */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={`wizzy-pattern-${i}`}
              className="absolute rounded-full bg-yellow-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${6 + Math.random() * 12}px`,
                height: `${6 + Math.random() * 12}px`,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* WIZZY Character */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
           
          >
            {/* WIZZY Character Image */}
            <div className="relative  top-160  right-20 -w-80 h-80 flex items-center justify-center">
              <img 
                src="/assets/images/wizzy-character.svg" 
                alt="WIZZY Character" 
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />
              
              {/* Character glow effect */}
              <div className="absolute inset-0 bg-red-400/30 rounded-full blur-xl -z-10" />
            </div>
          </div>
        </div>

        {/* WIZZY Label */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="mx-auto w-fit">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-400 px-8 py-3 relative"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
              }}
            >
              <span className="text-white font-bold text-2xl tracking-wider">WIZZY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal VS Divider */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Main diagonal split line */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(155deg, 
              transparent 47%, 
              #000000 47%, 
              #ffffff 48%, 
              #000000 49%, 
              #ffffff 50%, 
              #000000 51%, 
              #ffffff 52%, 
              #000000 53%, 
              transparent 53%
            )`
          }}
        />
       

       
        
        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-24 h-24 bg-black rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
              {/* Inner glow */}
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl tracking-wider">VS</span>
              </div>
            </div>
            
            {/* Rotating ring effect */}
            {showClash && (
              <div className="absolute inset-0 w-24 h-24 border-4 border-yellow-400 rounded-full animate-spin" />
            )}
          </div>
        </div>
      </div>


      {/* Lightning Effects - Only show during clash */}
      {showClash && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Lightning bolts */}
          <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse text-yellow-300 transform -rotate-45">⚡</div>
          <div className="absolute top-1/4 right-1/4 text-6xl animate-pulse text-yellow-400 transform rotate-45">⚡</div>
          <div className="absolute bottom-1/4 left-1/3 text-6xl animate-pulse text-yellow-300 transform rotate-12">⚡</div>
          <div className="absolute bottom-1/4 right-1/3 text-6xl animate-pulse text-yellow-400 transform -rotate-12">⚡</div>
          
          {/* Energy waves */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-4 border-yellow-400/50 rounded-full animate-ping" />
            <div className="absolute inset-4 border-4 border-cyan-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      )}

      {/* Countdown Display */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div 
            key={countdown}
            className="text-white font-bold text-9xl drop-shadow-2xl"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4)',
              animation: 'countdownPulse 1s ease-out'
            }}
          >
            {countdown === 0 ? 'GO!' : countdown}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes countdownPulse {
          0% { 
            transform: scale(0.5); 
            opacity: 0;
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1;
          }
          100% { 
            transform: scale(1); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default VSBattleScreen