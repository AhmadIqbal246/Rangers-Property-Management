'use client';

import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Building2, Clock, Send, CheckCircle } from 'lucide-react';

interface ContactSectionProps {
  isActive?: boolean;
}

export function ContactSection({ isActive = true }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyAddress: '',
    serviceType: 'Full-Service Property Management',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full relative text-white flex flex-col justify-start pt-20 sm:pt-24 pb-8 px-4 sm:px-10 md:px-16 overflow-y-auto">
      <div className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 z-10 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
      }`}>
        <h2 className="text-3xl sm:text-5xl font-playfair italic font-normal text-white drop-shadow-lg mb-2">
          Connect With Rangers
        </h2>
        <p className="text-xs sm:text-sm text-white/70 font-light">
          Whether you require full-service property management in Orange County or Long Beach, we are ready to assist.
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
        {/* Left Column: Real Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <a
            href="tel:5624856899"
            className={`p-5 rounded-2xl border border-white/15 bg-neutral-900/90 backdrop-blur-xl hover:border-[#e8702a]/60 hover:scale-[1.02] transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] group flex items-start gap-4 shadow-xl ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="p-3 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/30 text-[#e8702a] group-hover:bg-[#e8702a] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#e8702a] mb-0.5">
                Office Phone
              </span>
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#e8702a] transition-colors">
                (562) 485-6899
              </span>
            </div>
          </a>

          <a
            href="mailto:johnchace@rangerspm.com"
            className={`p-5 rounded-2xl border border-white/15 bg-neutral-900/90 backdrop-blur-xl hover:border-[#e8702a]/60 hover:scale-[1.02] transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] group flex items-start gap-4 shadow-xl ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="p-3 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/30 text-[#e8702a] group-hover:bg-[#e8702a] group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#e8702a] mb-0.5">
                Direct Email
              </span>
              <span className="text-sm sm:text-base font-medium text-white group-hover:text-[#e8702a] transition-colors break-all">
                johnchace@rangerspm.com
              </span>
            </div>
          </a>

          <div
            className={`p-5 rounded-2xl border border-white/15 bg-neutral-900/90 backdrop-blur-xl transition-all duration-700 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start gap-4 shadow-xl ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="p-3 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/30 text-[#e8702a]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#e8702a] mb-0.5">
                Orange County Office
              </span>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-tight">
                191 N Orange St, Ste 200
                <br />
                Orange, CA 92866
              </p>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border border-white/15 bg-neutral-900/90 backdrop-blur-xl transition-all duration-700 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start gap-4 shadow-xl ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="p-3 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/30 text-[#e8702a]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#e8702a] mb-0.5">
                Los Angeles County Mailing
              </span>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-tight">
                6285 E Spring St #209
                <br />
                Long Beach, CA 90808
              </p>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border border-white/15 bg-neutral-900/90 backdrop-blur-xl transition-all duration-700 delay-600 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start gap-4 shadow-xl ${
              isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="p-3 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/30 text-[#e8702a]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#e8702a] mb-0.5">
                Service Hours & Support
              </span>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-tight">
                Mon – Fri: 8:00 AM – 6:00 PM
                <br />
                <span className="text-[#e8702a] font-semibold">24/7 Emergency Maintenance Dispatch</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Owner Inquiry Form */}
        <div
          className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/15 bg-neutral-900/95 backdrop-blur-2xl shadow-2xl transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white mb-1">
            Request a Management Consultation
          </h3>
          <p className="text-xs text-white/60 mb-6">
            Fill out the details below and John Chase or James Stinnett will contact you directly.
          </p>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
              <p className="text-xs text-white/70 max-w-sm">
                Thank you for contacting Rangers Property Management. We will review your property details and reach out within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-[#e8702a] underline hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(562) 000-0000"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1">
                    Management Service
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                  >
                    <option value="Full-Service Property Management">Full-Service Property Management</option>
                    <option value="Tenant Screening & Placement">Tenant Screening & Placement</option>
                    <option value="REO & Distressed Rehabilitation">REO & Distressed Rehabilitation</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Property Address (Optional)
                </label>
                <input
                  type="text"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  placeholder="Street Address, City, CA"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Message / Details
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your property management needs..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#e8702a]/30"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
