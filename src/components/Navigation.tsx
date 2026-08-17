'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection?: number;
  onNavigateToSection?: (index: number) => void;
}

const navItems = [
  { label: 'Home', sectionIndex: 0 },
  { label: 'Portfolio', sectionIndex: 1 },
  { label: 'Leadership', sectionIndex: 2 },
  { label: 'Services', sectionIndex: 4 },
  { label: 'Contact', sectionIndex: 5 },
  { label: 'FAQ', sectionIndex: 6 }
];

export function Navigation({ activeSection = 0, onNavigateToSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 pointer-events-auto">
      <div
        onClick={() => onNavigateToSection?.(0)}
        className="flex items-center gap-2 z-10 cursor-pointer group select-none"
      >
        <span className="text-2xl sm:text-3xl font-morgan uppercase tracking-wider bg-brand-gradient drop-shadow-[0_4px_12px_rgba(232,112,42,0.3)] group-hover:scale-105 transition-transform">
          RANGERS
        </span>
        <span className="text-white text-lg sm:text-xl font-playfair italic font-normal tracking-normal border-l border-white/20 pl-2.5">
          Property
        </span>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 py-1.5 items-center gap-1 shadow-2xl">
        {navItems.map((item) => {
          const isActive =
            item.sectionIndex === activeSection ||
            (item.sectionIndex === 2 && (activeSection === 2 || activeSection === 3));

          return (
            <button
              key={item.label}
              onClick={() => onNavigateToSection?.(item.sectionIndex)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'text-white bg-[#e8702a] shadow-lg shadow-[#e8702a]/40 font-semibold'
                  : 'text-white/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block">
        <button
          onClick={() => onNavigateToSection?.(5)}
          className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#e8702a]/30"
        >
          Contact Us
        </button>
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors z-10"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-0 flex flex-col items-center justify-center gap-6 md:hidden">
          <div className="flex flex-col items-center gap-4">
            {navItems.map((item) => {
              const isActive =
                item.sectionIndex === activeSection ||
                (item.sectionIndex === 2 && (activeSection === 2 || activeSection === 3));

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigateToSection?.(item.sectionIndex);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xl font-medium px-6 py-2 rounded-full transition-all ${
                    isActive
                      ? 'text-white bg-[#e8702a] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onNavigateToSection?.(5);
              setMobileMenuOpen(false);
            }}
            className="bg-[#e8702a] text-white text-base font-semibold px-8 py-3 rounded-full hover:bg-[#d2611f] transition-all mt-4 shadow-lg shadow-[#e8702a]/30"
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
}
