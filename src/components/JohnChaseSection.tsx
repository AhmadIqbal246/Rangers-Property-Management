'use client';

import DarkVeil from '@/components/DarkVeil';
import FoldText from '@/components/FoldText';

interface JohnChaseSectionProps {
  isActive?: boolean;
  onConnectClick?: () => void;
}

export function JohnChaseSection({ isActive = true, onConnectClick }: JohnChaseSectionProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <DarkVeil speed={0.3} warpAmount={0.15} noiseIntensity={0.015} isActive={isActive} />
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center z-10 pt-14 md:pt-0">
        <div className="md:col-span-5 relative flex items-center justify-center">
          <div className="absolute w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[#e8702a]/30 via-amber-500/15 to-transparent blur-3xl -z-10" />
          <div className="relative group">
            <img
              src="/images/john_chase_portrait.png"
              alt="John Chase - Broker at Rangers Property Management"
              className="max-h-[35vh] sm:max-h-[55vh] md:max-h-[68vh] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/70 backdrop-blur-xl border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-left shadow-2xl">
              <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#e8702a]">Broker & Co-Founder</span>
              <span className="text-white text-[11px] sm:text-xs font-bold">500+ Properties Managed</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col items-center text-center md:items-start md:text-left gap-4 sm:gap-4 z-10">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e8702a] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#e8702a]">
              Leadership & Vision
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1 w-full">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-playfair italic text-white font-normal leading-tight drop-shadow-md">
              {isActive && (
                <FoldText
                  text="John Chase"
                  splitBy="char"
                  hinge="top"
                  duration={0.8}
                  stagger={0.05}
                  color="#ffffff"
                  fontSize="inherit"
                  fontWeight="inherit"
                  trigger="mount"
                />
              )}
            </h2>
            <div className="text-[#e8702a] font-semibold text-base sm:text-lg md:text-xl tracking-tight mt-0.5">
              {isActive && (
                <FoldText
                  text="Broker"
                  splitBy="word"
                  hinge="left"
                  duration={0.7}
                  stagger={0.06}
                  color="#e8702a"
                  fontSize="inherit"
                  fontWeight="600"
                  trigger="mount"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-white/80 text-xs sm:text-sm leading-relaxed font-light max-w-xl text-center md:text-left max-h-[32vh] md:max-h-none overflow-y-auto pr-1">
            <p>
              John launched his real estate career in 2008, excelling as part of Orange County’s leading REO sales team under the mentorship of James Stinnett. Overseeing a team of 11, they managed more than 500 properties through every stage—from foreclosure and eviction to rehabilitation, marketing, and closing.
            </p>
            <p>
              John’s expertise led to his promotion as an asset manager, where he handled a nationwide portfolio of 150 properties, navigating markets in California, Michigan, Florida, and New York. As the housing market recovered and foreclosures diminished, John transitioned into private real estate sales, evolving from a successful agent to a seasoned and accomplished broker.
            </p>
            <p>
              John later reunited with James to co-found Rangers Property Management, leveraging their combined experience to provide exceptional property management services across Long Beach and Orange County.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start pt-1 w-full">
            <button
              onClick={onConnectClick}
              className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-medium px-8 py-3 sm:py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#e8702a]/30"
            >
              Connect With John
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
