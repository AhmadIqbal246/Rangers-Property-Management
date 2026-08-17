'use client';

import { useEffect, useState } from 'react';

interface SplashOverlayProps {
  onComplete?: () => void;
}

export function SplashOverlay({ onComplete }: SplashOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsOpening(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 1100);
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden font-sans">
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-neutral-950 transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      />
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-neutral-950 transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-out z-10 ${
          isOpening ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100'
        }`}
      >
        <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#e8702a]/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-4xl sm:text-6xl md:text-7xl font-morgan uppercase tracking-wider bg-brand-gradient drop-shadow-[0_4px_24px_rgba(232,112,42,0.4)]">
            RANGERS
          </span>
          <span className="text-xl sm:text-3xl md:text-4xl font-playfair italic font-normal text-white drop-shadow-md">
            Property Management
          </span>

          <p className="text-[10px] sm:text-xs font-mono-code font-semibold tracking-[0.3em] uppercase text-[#e8702a]/90 pt-2">
            Long Beach & Orange County Brokerage • Est. 2008
          </p>

          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-4 relative">
            <div
              className="h-full bg-gradient-to-r from-[#e8702a] via-amber-400 to-[#e8702a] transition-all duration-100 ease-out shadow-[0_0_12px_rgba(232,112,42,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-xs font-mono-code font-bold tracking-widest text-white/60">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}
