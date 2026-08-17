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
      if (mouseRef.current.x !== -999) {
        const dx = mouseRef.current.x - smoothRef.current.x;
        const dy = mouseRef.current.y - smoothRef.current.y;
        if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
          smoothRef.current.x += dx * 0.1;
          smoothRef.current.y += dy * 0.1;
          setCursorPos({ x: Math.round(smoothRef.current.x), y: Math.round(smoothRef.current.y) });
        }
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    };
    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(updatePosition);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
        <div className="absolute inset-0 z-0">
          <DarkVeil speed={0.3} warpAmount={0.15} noiseIntensity={0.015} />
        </div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />

        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center z-10 pt-14 md:pt-0">
          {/* Left Column: Portrait */}
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

          {/* Right Column: Bio & Info */}
          <div className="md:col-span-7 flex flex-col items-center text-center md:items-start md:text-left gap-4 sm:gap-4 z-10">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e8702a] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#e8702a]">
                Leadership & Vision
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1 w-full">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-playfair italic text-white font-normal leading-tight drop-shadow-md">
                {activeSection === 2 && (
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
                {activeSection === 2 && (
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
              <button className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-medium px-8 py-3 sm:py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#e8702a]/30">
                Connect With John
              </button>
            </div>
          </div>
        </div>
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
        <div className="absolute inset-0 z-0">
          <DarkVeil speed={0.3} warpAmount={0.15} noiseIntensity={0.015} />
        </div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />

        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center z-10 pt-14 md:pt-0">
          {/* Left Column: Portrait */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            <div className="absolute w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[#e8702a]/30 via-amber-500/15 to-transparent blur-3xl -z-10" />
            <div className="relative group">
              <img
                src="/images/james_stinnett_portrait.png"
                alt="James Stinnett - Broker at Rangers Property Management"
                className="max-h-[35vh] sm:max-h-[55vh] md:max-h-[68vh] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/70 backdrop-blur-xl border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-left shadow-2xl">
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#e8702a]">Broker & Co-Founder</span>
                <span className="text-white text-[11px] sm:text-xs font-bold">DRE #01168032</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Info */}
          <div className="md:col-span-7 flex flex-col items-center text-center md:items-start md:text-left gap-4 sm:gap-4 z-10">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e8702a] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#e8702a]">
                Leadership & Vision
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1 w-full">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-playfair italic text-white font-normal leading-tight drop-shadow-md">
                {activeSection === 3 && (
                  <FoldText
                    text="James Stinnett"
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
                {activeSection === 3 && (
                  <FoldText
                    text="Broker – DRE 01168032"
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
                James graduated from UC Irvine before obtaining his real estate salesperson’s license. He began his career working with RE/MAX and Coldwell Banker, gaining valuable experience in real estate sales. James also served as a loan officer and mortgage broker, receiving his Broker License in 2004, further broadening his expertise in the housing industry.
              </p>
              <p>
                In 2008, James shifted his focus to residential bank-owned property sales, joining a prominent asset management company in Orange County. It was here that James and John Chace partnered to build a team of 11, establishing themselves as the top REO sales team in the county. Representing commercial banks and the State of California, they successfully managed and sold nearly 500 properties. Their responsibilities included property inspections, maintenance and repairs, tenant issues, evictions, and final sales.
              </p>
              <p>
                As the real estate market rebounded, James launched a successful independent real estate brokerage. Building on their shared expertise in REO/foreclosures, real estate, asset management, and finance, James and John joined forces once again to establish Rangers Property Management, delivering expert property management services to Long Beach and Orange County.
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start pt-1 w-full">
              <button className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-medium px-8 py-3 sm:py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#e8702a]/30">
                Connect With James
              </button>
            </div>
          </div>
        </div>
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
        <ServicesSection />
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
