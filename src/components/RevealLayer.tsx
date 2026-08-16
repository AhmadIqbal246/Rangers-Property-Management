'use client';

import { useEffect, useRef, useState } from 'react';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

const SPOTLIGHT_R = 260;

export function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [maskUrl, setMaskUrl] = useState<string>('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    const grad = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R
    );
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();
    setMaskUrl(canvas.toDataURL());
  }, [cursorX, cursorY, dimensions]);
  const isReady = maskUrl !== '';
  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `url(${image})`,
          maskImage: isReady
            ? `url("${maskUrl}")`
            : 'radial-gradient(circle 0px at -999px -999px, #000 0%, transparent 100%)',
          WebkitMaskImage: isReady
            ? `url("${maskUrl}")`
            : 'radial-gradient(circle 0px at -999px -999px, #000 0%, transparent 100%)',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          opacity: isReady ? 1 : 0,
        }}
      />
    </>
  );
}
