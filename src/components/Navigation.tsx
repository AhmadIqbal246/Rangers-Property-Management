'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [activeTab, setActiveTab] = useState('Estates');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Estates', 'Residences', 'Architecture', 'Valuations', 'Virtual Tour'];
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      <div className="flex items-center gap-2 z-10 cursor-pointer">
        <span className="text-2xl sm:text-3xl font-morgan uppercase tracking-wider bg-brand-gradient drop-shadow-[0_4px_12px_rgba(232,112,42,0.3)] hover:scale-105 transition-transform">
          RANGERS
        </span>
        <span className="text-white text-lg sm:text-xl font-playfair italic font-medium tracking-normal border-l border-white/20 pl-2">
          Property
        </span>
      </div>
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
        {navItems.map((item) => {
          const isActive = item === activeTab;
          return (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white bg-white/20'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="hidden md:block">
        <button className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
          Sign Up
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-0 flex flex-col items-center justify-center gap-6 md:hidden">
          <div className="flex flex-col items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`text-xl font-medium px-6 py-2 rounded-full transition-colors ${
                  item === activeTab ? 'text-white bg-white/20' : 'text-white/70 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="bg-white text-gray-900 text-base font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors mt-4">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
