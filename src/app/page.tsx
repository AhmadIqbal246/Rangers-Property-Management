'use client';

import { useEffect, useRef, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { RevealLayer } from '@/components/RevealLayer';
import DepthCarousel from '@/components/DepthCarousel';
import DarkVeil from '@/components/DarkVeil';
import FoldText from '@/components/FoldText';
import { ServicesSection } from '@/components/ServicesSection';
import { ContactSection } from '@/components/ContactSection';
import { FooterSection } from '@/components/FooterSection';
import { JohnChaseSection } from '@/components/JohnChaseSection';
import { JamesStinnettSection } from '@/components/JamesStinnettSection';
import { SplashOverlay } from '@/components/SplashOverlay';

const BG_IMAGE_1 = '/images/estate_twilight.png';
const BG_IMAGE_2 = '/images/estate_interior.png';

const luxuryProperties = [
  {
    image: '/images/card_home_1.png',
    alt: 'The Cliffside Villa',
    title: 'The Cliffside Villa',
    price: '$14,800,000',
    location: 'Malibu, CA',
  },
  {
    image: '/images/card_home_2.png',
    alt: 'Alpine Sky Chalet',
    title: 'Alpine Sky Chalet',
    price: '$18,500,000',
    location: 'Aspen, CO',
  },
  {
    image: '/images/card_home_3.png',
    alt: 'The Grand Penthouse',
    title: 'The Grand Penthouse',
    price: '$22,000,000',
    location: 'Manhattan, NY',
  },
  {
    image: '/images/card_home_4.png',
    alt: 'Azure Oceanfront Residence',
    title: 'Azure Oceanfront Residence',
    price: '$12,900,000',
    location: 'Miami, FL',
  },
  {
    image: '/images/card_home_5.png',
    alt: 'Desert Oasis Estate',
    title: 'Desert Oasis Estate',
    price: '$9,400,000',
    location: 'Scottsdale, AZ',
  },
];

export default function Home() {
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const touchStartY = useRef(0);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (smoothRef.current.x === -999 && smoothRef.current.y === -999) {
        smoothRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    const updatePosition = () => {
      if (activeSection === 0 && mouseRef.current.x !== -999) {
        const dx = mouseRef.current.x - smoothRef.current.x;
        const dy = mouseRef.current.y - smoothRef.current.y;
        if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
          smoothRef.current.x += dx * 0.1;
          smoothRef.current.y += dy * 0.1;
          setCursorPos({ x: Math.round(smoothRef.current.x), y: Math.round(smoothRef.current.y) });
        }
      }
      if (activeSection === 0) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    if (activeSection === 0) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeSection]);

  useEffect(() => {
    const changeSection = (next: number) => {
      if (isTransitioningRef.current || next === activeSection) return;
      isTransitioningRef.current = true;
      setActiveSection(next);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 950);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;
      if (e.deltaY > 35 && activeSection < 6) {
        if (activeSection === 4) {
          const scroller = document.querySelector('.scroll-stack-inner')?.parentElement;
          if (scroller) {
            const isAtBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 15;
            if (!isAtBottom) return;
          }
        }
        changeSection(activeSection + 1);
      } else if (e.deltaY < -35 && activeSection > 0) {
        if (activeSection === 4) {
          const scroller = document.querySelector('.scroll-stack-inner')?.parentElement;
          if (scroller && scroller.scrollTop > 10) return;
        }
        changeSection(activeSection - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      if (diffY > 40 && activeSection < 6) {
        if (activeSection === 4) {
          const scroller = document.querySelector('.scroll-stack-inner')?.parentElement;
          if (scroller) {
            const isAtBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 15;
            if (!isAtBottom) return;
          }
        }
        changeSection(activeSection + 1);
      } else if (diffY < -40 && activeSection > 0) {
        if (activeSection === 4) {
          const scroller = document.querySelector('.scroll-stack-inner')?.parentElement;
          if (scroller && scroller.scrollTop > 10) return;
        }
        changeSection(activeSection - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && activeSection < 6) {
        if (activeSection === 4) {
          const scroller = document.querySelector('.scroll-stack-inner')?.parentElement;
          if (scroller) {
            const isAtBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 15;
            if (!isAtBottom) return;
          }
        }
        changeSection(activeSection + 1);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && activeSection > 0) {
        if (activeSection === 4) {
          const scroller = document.querySelector('.scroll-stack-inner')?.parentElement;
          if (scroller && scroller.scrollTop > 10) return;
        }
        changeSection(activeSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection]);

  return (
    <main
      className="relative w-full h-screen bg-black overflow-hidden tracking-[-0.02em] select-none"
      style={{ height: '100dvh', fontFamily: "'Inter', sans-serif" }}
    >
      <SplashOverlay />
      <Navigation activeSection={activeSection} onNavigateToSection={(idx) => setActiveSection(idx)} />

      {/* Floating Section Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 items-center">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-500 border ${
              activeSection === idx
                ? 'bg-[#e8702a] border-[#e8702a] scale-125 shadow-lg shadow-[#e8702a]/50'
                : 'bg-white/30 border-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to Section ${idx + 1}`}
          />
        ))}
      </div>

      {/* Section 0: Hero Section */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeSection === 0
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto z-10 blur-none'
            : 'opacity-40 scale-95 translate-y-0 pointer-events-none z-10 blur-[4px]'
        }`}
        style={{ height: '100dvh' }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />
        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
        />
        <div className="absolute top-1/2 -translate-y-1/2 md:top-[10%] md:translate-y-0 left-0 right-0 flex flex-col items-center text-center px-4 pointer-events-none z-50 w-full">
          <h1 className="text-white leading-[1.0] mb-2 sm:mb-4">
            <span
              className="block font-playfair italic font-normal text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em] animate-smooth-reveal"
              style={{ animationDelay: '0.15s' }}
            >
              Homes built for the
            </span>
            <span
              className="block font-normal text-3xl sm:text-5xl md:text-6xl -mt-1 tracking-[-0.06em] animate-smooth-reveal"
              style={{ animationDelay: '0.3s' }}
            >
              skyline of your dreams
            </span>
          </h1>
          <div className="w-full text-center overflow-hidden mt-1 sm:mt-2">
            <p
              className="text-white font-black uppercase tracking-[-0.05em] leading-none whitespace-nowrap text-[17.5vw] sm:text-[18vw] md:text-[18vw] drop-shadow-2xl select-none animate-smooth-reveal"
              style={{ animationDelay: '0.48s' }}
            >
              RANGERS
            </p>
          </div>
          <div className="w-full text-center mt-2 sm:mt-4 overflow-hidden">
            <p
              className="text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-xl select-none animate-smooth-reveal"
              style={{ animationDelay: '0.66s' }}
            >
              Property Management
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Signature Collections Section */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black py-12 flex flex-col items-center justify-between overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] border-t border-white/15 ${
          activeSection === 1
            ? 'translate-y-0 opacity-100 pointer-events-auto z-20'
            : activeSection > 1
            ? 'opacity-40 scale-95 translate-y-0 pointer-events-none z-10 blur-[4px]'
            : 'translate-y-[100dvh] opacity-100 pointer-events-none z-20'
        }`}
        style={{ height: '100dvh' }}
      >
        <div className="text-center mt-6 z-10 px-4">
          <h2 className="text-4xl sm:text-6xl font-playfair italic text-white font-normal mb-3">
            Signature Collections
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto">
            Swipe horizontally or use control arrows to explore our portfolio of architectural masterpieces across prime coastal, mountain, and urban sanctuaries.
          </p>
        </div>
        <div className="w-full h-[600px] relative flex-1">
          <DepthCarousel
            items={luxuryProperties}
            depth={220}
            spread={110}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay
            loop
            cardWidth={380}
            cardHeight={500}
            isActive={activeSection === 1}
          />
        </div>
      </section>

      {/* Section 2: Leadership & Vision (John Chase, Broker) */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black text-white py-12 sm:py-16 px-6 sm:px-12 md:px-20 flex items-center justify-center overflow-y-auto md:overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] border-t border-white/15 ${
          activeSection === 2
            ? 'translate-y-0 opacity-100 pointer-events-auto z-30'
            : activeSection > 2
            ? 'opacity-40 scale-95 translate-y-0 pointer-events-none z-10 blur-[4px]'
            : 'translate-y-[100dvh] opacity-100 pointer-events-none z-30'
        }`}
        style={{ height: '100dvh' }}
      >
        <JohnChaseSection isActive={activeSection === 2} onConnectClick={() => setActiveSection(5)} />
      </section>

      {/* Section 3: Leadership & Vision (James Stinnett, Broker) */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black text-white py-12 sm:py-16 px-6 sm:px-12 md:px-20 flex items-center justify-center overflow-y-auto md:overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] border-t border-white/15 ${
          activeSection === 3
            ? 'translate-y-0 opacity-100 pointer-events-auto z-40'
            : activeSection > 3
            ? 'opacity-40 scale-95 translate-y-0 pointer-events-none z-10 blur-[4px]'
            : 'translate-y-[100dvh] opacity-100 pointer-events-none z-40'
        }`}
        style={{ height: '100dvh' }}
      >
        <JamesStinnettSection isActive={activeSection === 3} onConnectClick={() => setActiveSection(5)} />
      </section>

      {/* Section 4: Core Services & Management Pillars */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] border-t border-white/15 ${
          activeSection === 4
            ? 'translate-y-0 opacity-100 pointer-events-auto z-50'
            : activeSection > 4
            ? 'opacity-40 scale-95 translate-y-0 pointer-events-none z-10 blur-[4px]'
            : 'translate-y-[100dvh] opacity-100 pointer-events-none z-50'
        }`}
        style={{ height: '100dvh' }}
      >
        <ServicesSection isActive={activeSection === 4} />
      </section>

      {/* Section 5: Contact Portal */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] border-t border-white/15 ${
          activeSection === 5
            ? 'translate-y-0 opacity-100 pointer-events-auto z-[60]'
            : activeSection > 5
            ? 'opacity-40 scale-95 translate-y-0 pointer-events-none z-10 blur-[4px]'
            : 'translate-y-[100dvh] opacity-100 pointer-events-none z-[60]'
        }`}
        style={{ height: '100dvh' }}
      >
        <ContactSection isActive={activeSection === 5} />
      </section>

      {/* Section 6: Owner FAQ & Luxury Footer */}
      <section
        className={`fixed inset-0 w-full h-screen bg-black transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] border-t border-white/15 ${
          activeSection === 6
            ? 'translate-y-0 opacity-100 pointer-events-auto z-[70]'
            : 'translate-y-[100dvh] opacity-100 pointer-events-none z-[70]'
        }`}
        style={{ height: '100dvh' }}
      >
        <FooterSection onNavigateToSection={(idx) => setActiveSection(idx)} isActive={activeSection === 6} />
      </section>
    </main>
  );
}
