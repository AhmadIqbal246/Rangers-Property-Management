'use client';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

const SPOTLIGHT_R = 260;

export function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const isVisible = cursorX !== -999 && cursorY !== -999;
  const gradient = `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorX}px ${cursorY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`;

  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none transition-opacity duration-300"
      style={{
        backgroundImage: `url(${image})`,
        maskImage: isVisible ? gradient : 'none',
        WebkitMaskImage: isVisible ? gradient : 'none',
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
