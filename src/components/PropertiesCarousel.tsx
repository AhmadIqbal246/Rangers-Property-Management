'use client';

import React, { useState, useEffect, useRef } from 'react';

const CARD_IMAGES = [
  '/images/card_home_1.png',
  '/images/card_home_2.png',
  '/images/card_home_3.png',
  '/images/card_home_4.png',
  '/images/card_home_5.png',
];

const CARD_DETAILS = [
  { name: 'THE CLIFFSIDE VILLA', price: '$14,800,000', location: 'MALIBU, CA', specs: '4 BEDS • 6 BATHS' },
  { name: 'ALPINE SKY CHALET', price: '$18,500,000', location: 'ASPEN, CO', specs: '6 BEDS • 8 BATHS' },
  { name: 'THE GRAND PENTHOUSE', price: '$22,000,000', location: 'MANHATTAN, NY', specs: '3 BEDS • 4 BATHS' },
  { name: 'AZURE OCEANFRONT RESIDENCE', price: '$12,900,000', location: 'MIAMI, FL', specs: '5 BEDS • 7 BATHS' },
  { name: 'DESERT OASIS ESTATE', price: '$9,400,000', location: 'SCOTTSDALE, AZ', specs: '4 BEDS • 5 BATHS' },
];

export function PropertiesCarousel() {
  const cardCount = 5;
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  const progress = useRef<number>(0);
  const targetProgress = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveredRef = useRef<boolean>(false);

  const [metrics, setMetrics] = useState({
    cardW: 336,
    cardH: 211,
  });

  const [fontMetrics, setFontMetrics] = useState({
    titleFontSize: '1.5rem',
    sigFontSize: '2.5rem',
    descFontSize: '14px',
    titleGap: '40px',
    pl: '0px'
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
      isHoveredRef.current = false;
    };

    const handleSectionWheel = (e: WheelEvent) => {
      if (isHoveredRef.current) {
        e.preventDefault();
        targetProgress.current += e.deltaY * 0.0025;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleSectionWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (section) {
        section.removeEventListener('wheel', handleSectionWheel);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      let cardW = Math.round(w * 0.16 + 130);
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);
      cardW = Math.min(336, Math.max(150, cardW));
      const cardH = Math.round(cardW / 1.5925);

      setMetrics({ cardW, cardH });

      const isMobile = w < 640;
      let titleSize = '';
      let sigSize = '';
      let descSize = '';
      let titleGap = '40px'; 
      let plVal = '0px';

      if (isMobile) {
        titleSize = 'clamp(1.8rem, 5.2vw + 0.4rem, 2.2rem)';
        sigSize = 'clamp(2.86rem, 7.8vw + 0.6rem, 3.5rem)';
        descSize = 'clamp(0.72rem, 1.4vw + 0.35rem, 0.95rem)';
        titleGap = '24px';
        plVal = '0px';
      } else {
        const scale = Math.min(1.0, Math.max(0.48, (w * 0.45 + h * 0.55) / 1300));
        titleSize = `${Math.max(1.15, 3.5 * scale).toFixed(3)}rem`;
        sigSize = `${Math.max(1.5, 4.5 * scale).toFixed(3)}rem`;
        descSize = `${Math.max(11, 16 * scale).toFixed(1)}px`;
        titleGap = `${Math.max(16, Math.round(40 * scale))}px`;
        plVal = `${Math.min(6, Math.max(2.8, 3.5 * scale + 2.2)).toFixed(2)}rem`;
      }

      setFontMetrics({
        titleFontSize: titleSize,
        sigFontSize: sigSize,
        descFontSize: descSize,
        titleGap,
        pl: plVal
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderLoop = () => {
    if (!isHoveredRef.current) {
      targetProgress.current += 0.0004;
    }
    progress.current += (targetProgress.current - progress.current) * 0.08;

    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = window.innerHeight;
    const { cardH } = metrics;

    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex;
    
    const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      let offset = i - virtualActiveIndex;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      if (absOffset > 3.0) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      const gap = 36;
      const peekAmount = -55;
      const D = 1350;

      let y = 0;
      let z = 0;
      let rot = 0;

      if (absOffset <= 1) {
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);

        const targetY = cardH + gap;
        y = -sign * (easedT * targetY);

        z = 400 + easedT * (220 - 400);
        rot = easedT * 132;
      } else if (absOffset <= 2) {
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);

        const yStart = cardH + gap;
        const zStart = 220;
        const rotStart = 132;

        const zEnd = -60;
        const rotEnd = 175;

        const sEnd = D / (D - zEnd);
        const yEnd = (h / 2 - peekAmount) / sEnd - (cardH / 2);

        const currentY = yStart + easedT * (yEnd - yStart);
        y = -sign * currentY;

        z = zStart + easedT * (zEnd - zStart);
        rot = rotStart + easedT * (rotEnd - rotStart);
      } else {
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);

        const zStart = -60;
        const rotStart = 175;

        const zEnd3 = -250;
        const rotEnd3 = 195;

        const sEnd2 = D / (D - zStart);
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - (cardH / 2);

        const sEnd3 = D / (D - zEnd3);
        const yEnd3 = (h / 2 + 100) / sEnd3 + (cardH / 2);

        const currentY = yEnd2 + easedT * (yEnd3 - yEnd2);
        y = -sign * currentY;

        z = zStart + easedT * (zEnd3 - zStart);
        rot = rotStart + easedT * (rotEnd3 - rotStart);
      }

      const localCardRotation = -sign * rot;
      const centerFactor = Math.max(0, 1 - absOffset);

      const maxTiltY = 15;
      const maxTiltX = 12;

      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

      const totalRotX = localCardRotation + activeTiltX;
      const totalRotY = activeTiltY;

      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = '1';

      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-3deg)`;
    }
  };

  useEffect(() => {
    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [metrics]);

  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      className="relative w-full h-screen bg-[#000000] text-white flex items-center justify-center overflow-hidden select-none"
      style={{ height: '100dvh' }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1350px',
        }}
      >
        <div
          className="absolute"
          style={{
            width: `${metrics.cardW}px`,
            height: `${metrics.cardH}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
              }}
            >
              {thicknessLayers.map((zOffset, layerIdx) => {
                const isFrontFace = layerIdx === thicknessLayers.length - 1;
                const isBackFace = layerIdx === 0;

                const imageSrc = CARD_IMAGES[i % CARD_IMAGES.length];
                const details = CARD_DETAILS[i % CARD_DETAILS.length];
                const baseBgColor = '#0f0f0f';

                if (!isFrontFace && !isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] border border-[#808080] pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: '#808080',
                        transform: `translateZ(${zOffset}px)`,
                      }}
                    />
                  );
                }

                if (isFrontFace) {
                  const frontBorderStyle = "border border-white/20";
                  return (
                    <div
                      key={layerIdx}
                      className={`absolute inset-0 rounded-[16px] ${frontBorderStyle} pointer-events-none overflow-hidden`}
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.25)',
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt={details.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
                      />

                      <div className="absolute inset-0 p-5 sm:p-6 text-white h-full w-full font-sans z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/20 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/90 bg-white/20 backdrop-blur-md border border-white/25 px-2.5 py-1 rounded-full uppercase">
                            Exclusive Listing
                          </span>
                          <span className="font-playfair italic text-lg sm:text-xl font-bold text-white tracking-tight">
                            Aura
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h3 className="font-playfair italic text-base sm:text-lg font-bold text-white leading-tight">
                            {details.name}
                          </h3>
                          <div className="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                            <span className="text-[#e8702a] font-bold text-sm">{details.price}</span>
                            <span>{details.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (isBackFace) {
                  const backBorderStyle = "border border-white/20";
                  return (
                    <div
                      key={layerIdx}
                      className={`absolute inset-0 rounded-[16px] ${backBorderStyle} pointer-events-none overflow-hidden`}
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.25)',
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'blur(18px)', transform: 'scale(1.15)' }}>
                        <img
                          src={imageSrc}
                          alt={details.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 p-5 sm:p-6 flex flex-col justify-between text-left" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-[10px] sm:text-xs tracking-widest text-[#e8702a] font-semibold uppercase">
                            PROPERTY SPECIFICATIONS
                          </span>
                          <span className="text-[10px] text-white/60">AURA-ESTATE</span>
                        </div>

                        <div className="flex flex-col gap-2 my-auto">
                          <div className="text-xs sm:text-sm font-bold text-white tracking-wider">
                            {details.name}
                          </div>
                          <div className="text-[11px] sm:text-xs text-white/80 font-medium">
                            {details.specs}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-[#e8702a]">
                            {details.price}
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-white/60 border-t border-white/15 pt-2">
                          <span>LOCATION: {details.location}</span>
                          <span className="text-white/40">VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
