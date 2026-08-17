'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FooterSectionProps {
  onNavigateToSection?: (index: number) => void;
  isActive?: boolean;
}

const faqs = [
  {
    question: 'What are your property management fee structures?',
    answer:
      'We offer competitive, transparent pricing tailored to your portfolio size with zero hidden markups on maintenance or vendor invoices. You receive full financial transparency and automated monthly owner disbursements.'
  },
  {
    question: 'How quickly do you screen and place qualified tenants?',
    answer:
      'Using our objective 100-point screening process and strategic pet policy guidelines, we average 14–21 days to place high-caliber, long-term tenants while maintaining a zero-eviction standard.'
  },
  {
    question: 'How do you handle California AB 1482 rent caps and law updates?',
    answer:
      'California landlord-tenant laws change constantly. Co-founders John Chase and James Stinnett mandate ongoing legal training for our team, ensuring 100% compliance with state rent caps, deposit rules, and municipal codes.'
  },
  {
    question: 'What areas do you cover across Southern California?',
    answer:
      'We specialize in luxury residences, single-family homes, and multi-family residential portfolios across Long Beach, Orange County (Orange, Irvine, Newport Beach, Huntington Beach), and surrounding communities.'
  },
  {
    question: 'How do you manage 24/7 maintenance and repair emergencies?',
    answer:
      'We operate a dedicated 24/7 emergency maintenance dispatch network. We focus on preventive maintenance—like regular HVAC filter replacements—to preserve asset value and eliminate expensive repair surprises.'
  }
];

export function FooterSection({ onNavigateToSection, isActive = true }: FooterSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full relative text-white flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-4 sm:px-10 md:px-16 overflow-y-auto">
      {/* Top Half: Owner FAQ Accordion */}
      <div className={`max-w-4xl w-full mx-auto mb-10 z-10 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-playfair italic font-normal text-white drop-shadow-lg mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light">
            Everything you need to know about partnering with Rangers Property Management.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/15 bg-neutral-900/90 backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8702a] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#e8702a] text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-4 sm:pt-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/10 font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Half: Centered Full Width Luxury Footer with Contact Info */}
      <footer className={`w-full pt-8 pb-4 border-t border-white/15 z-10 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-2xl font-morgan uppercase tracking-wider bg-brand-gradient">
              RANGERS
            </span>
            <span className="text-white text-lg font-playfair italic font-medium border-l border-white/20 pl-2">
              Property Management
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/80 font-medium pt-1">
            <a href="tel:5624856899" className="hover:text-[#e8702a] transition-colors">
              (562) 485-6899
            </a>
            <span className="text-white/30">•</span>
            <a href="mailto:johnchace@rangerspm.com" className="hover:text-[#e8702a] transition-colors">
              johnchace@rangerspm.com
            </a>
            <span className="text-white/30">•</span>
            <span className="text-white/70">Orange County & Long Beach, CA</span>
          </div>

          <p className="text-[11px] text-white/50 text-center pt-1">
            © 2026 Rangers Property Management. All rights reserved. Co-Owners: John Chase & James Stinnett.
          </p>
        </div>
      </footer>
    </div>
  );
}
