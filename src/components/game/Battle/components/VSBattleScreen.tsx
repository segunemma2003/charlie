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
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Top Diagonal Rectangle (VIC) */}
     
      {/* VIC Image */}
      <img
        src="/assets/images/vic-character.svg"
        alt="VIC"
        className="absolute z-20"
        style={{
          top: '4px',
          right: '10px',
          width: '220px',
          height: 'auto',
          filter: 'drop-shadow(0 8px 32px #2563eb88)',
        }}
      />
    
      {/* Upper background image, clipped to upper diagonal */}
      <div
        className="absolute z-0"
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '85vh',
          backgroundImage: 'url(/assets/images/upper.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 55%)',
          transform: 'scaleX(-1)',
        }}
      />
      {/* Center Diagonal VS Bar */}
      <div
        className="absolute z-30 flex items-center justify-center"
        style={{
          top: '43%',
          left: '50%',
          width: '520px',
          height: '80px',
          background: '#111',
          borderRadius: '32px',
          transform: 'translate(-50%, 0) skewY(-18deg)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
        }}
      >
        <div className="w-full flex items-center justify-center">
          <span className="text-white font-extrabold text-6xl tracking-widest" style={{letterSpacing: '0.2em', textShadow: '0 2px 12px #0008'}}>VS</span>
        </div>
      </div>
      {/* VS Badge Animation (rotating ring, lightning, etc.) */}
      {showClash && (
        <div className="absolute z-40 top-[38%] left-1/2 transform -translate-x-1/2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 w-32 h-32 border-4 border-yellow-400 rounded-full animate-spin" />
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl tracking-wider">VS</span>
            </div>
          </div>
        </div>
      )}
      {/* Lightning Effects - Only show during clash */}
      {showClash && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse text-yellow-300 transform -rotate-45">⚡</div>
          <div className="absolute top-1/4 right-1/4 text-6xl animate-pulse text-yellow-400 transform rotate-45">⚡</div>
          <div className="absolute bottom-1/4 left-1/3 text-6xl animate-pulse text-yellow-300 transform rotate-12">⚡</div>
          <div className="absolute bottom-1/4 right-1/3 text-6xl animate-pulse text-yellow-400 transform -rotate-12">⚡</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-4 border-yellow-400/50 rounded-full animate-ping" />
            <div className="absolute inset-4 border-4 border-cyan-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      )}
      {/* Bottom Diagonal Rectangle (WIZZY) */}
      
     
      {/* WIZZY Image */}
      <img
        src="/assets/images/wizzy-character.svg"
        alt="WIZZY"
        className="absolute z-20"
        style={{
          bottom: '40px',
          left: '10px',
          width: '250px',
          height: 'auto',
          filter: 'drop-shadow(0 8px 32px #dc262688)',
        }}
      />
      {/* Lower background image, clipped to lower diagonal */}
      <div
        className="absolute z-0"
        style={{
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '110vh',
          backgroundImage: 'url(/assets/images/below.svg)',
          backgroundSize: 'cover',
          backgroundColor:"red",
          backgroundPosition: 'center',
          clipPath: 'polygon(0 45%, 100% 65%, 100% 100%, 0 100%)',
          transform: 'scaleX(-1)',
        }}
      />
      {/* Countdown Display */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-60 pointer-events-none">
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
      {/* VIC Diagonal Label - just above VS bar */}
      <div
        className="absolute z-30 flex items-center justify-center"
        style={{
          top: '35%', // just above VS bar
          left: '70%',
          width: '320px',
          height: '35px',
          background: 'linear-gradient(90deg, #2563eb 0%, #22d3ee 100%)',
          borderRadius: '18px',
          transform: 'translate(-50%, 0) skewY(-18deg)',
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.2)',
        }}
      >
        <span className="text-white font-extrabold text-3xl tracking-wider" style={{letterSpacing: '0.1em', textShadow: '0 2px 8px #0008'}}>VIC</span>
      </div>
      {/* WIZZY Diagonal Label - just below VS bar */}
      <div
        className="absolute z-30 flex items-center justify-center"
        style={{
          bottom: '40%', // just below VS bar
          left: '38%',
          width: '330px',
          height: '35px',
          background: 'linear-gradient(90deg, #2563eb 0%, #22d3ee 100%)',
          borderRadius: '18px',
          transform: 'translate(-50%, 0) skewY(-18deg)',
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.2)',
        }}
      >
        <span className="text-white font-extrabold text-3xl tracking-wider" style={{letterSpacing: '0.1em', textShadow: '0 2px 8px #0008'}}>WIZZY</span>
      </div>
      <style>{`
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