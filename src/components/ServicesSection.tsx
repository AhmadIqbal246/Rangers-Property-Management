'use client';

import { Users, ShieldCheck, Wrench, FileText, CheckCircle2 } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const services = [
  {
    number: '01',
    title: 'Objective Screening & Smart Pet Policies',
    subtitle: 'Screening affects everything that comes after. You don’t get a second chance.',
    icon: Users,
    metric: 'Attract Best Applicants',
    badges: ['Consistent Screening', '60-70% Household Pool', 'Pet Risk Management'],
    description:
      'Every applicant deserves the same objective, standardized screening process to protect your investment. By structuring smart pet policies, we expand your qualified applicant pool to the 60-70% of pet-owning US households while maintaining strict property protection standards.'
  },
  {
    number: '02',
    title: 'Proactive Maintenance & HVAC Preservation',
    subtitle: 'Small maintenance items prevent massive repairs down the road.',
    icon: ShieldCheck,
    metric: 'Prevent Expensive Repairs',
    badges: ['HVAC Filter Care', 'Airflow & Efficiency', 'Proactive Property Care'],
    description:
      'Changing HVAC filters regularly helps your systems breathe easier, lowers energy costs, and keeps dust out of the air. We focus on small preventive maintenance actions to protect equipment life and avoid major emergency repair expenses.'
  },
  {
    number: '03',
    title: 'Drama-Free Turnover & Move-Out Management',
    subtitle: 'Knowing damage vs. wear and tear. Clear accountability without the drama.',
    icon: Wrench,
    metric: 'Seamless Move-Outs',
    badges: ['Damage vs. Wear Audits', 'Fresh Paint Value Boost', 'Rapid Unit Reset'],
    description:
      'Move-outs don’t have to be scary. We clearly evaluate tenant damage versus normal wear and tear with zero drama. We execute targeted turnover investments—like a fresh coat of paint—to make your property feel brand new and command top market rent.'
  },
  {
    number: '04',
    title: 'California Law Compliance & Ongoing Training',
    subtitle: 'California landlord-tenant laws change constantly. Staying current protects you.',
    icon: FileText,
    metric: 'Continuous Legal Shield',
    badges: ['CA Tenant Law Audits', 'Ongoing Team Training', 'Mandatory Appliance Care'],
    description:
      'California real estate laws and rental requirements change rapidly. We take continuous legal training seriously so your property stays 100% compliant with evolving state statutes, appliance mandates, and municipal regulations.'
  },
  {
    number: '05',
    title: 'Built on Systems & Consistent Standards',
    subtitle: 'We take care of the hard stuff so you don’t have to.',
    icon: CheckCircle2,
    metric: 'Total Owner Peace of Mind',
    badges: ['Consistent Execution', 'John & James Co-Ownership', 'Hands-Off Management'],
    description:
      'Co-founders John Chase and James Stinnett built Rangers Property Management on operational systems and unyielding standards. We deliver consistent results, reliable cash flow, and complete peace of mind for every owner.'
  }
];

export function ServicesSection() {
  return (
    <div className="w-full h-full relative text-white flex flex-col justify-start">
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 text-center px-4 w-full max-w-3xl">
        <h2 className="text-3xl sm:text-5xl font-playfair italic font-normal text-white drop-shadow-lg">
          Systems Built for Consistency
        </h2>
      </div>

      <div className="w-full h-full flex-1">
        <ScrollStack
          itemDistance={80}
          itemScale={0.035}
          itemStackDistance={25}
          stackPosition="26%"
          scaleEndPosition="12%"
          baseScale={0.86}
          blurAmount={3}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <ScrollStackItem key={service.number}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 h-full">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono-code font-bold tracking-widest text-[#e8702a] bg-[#e8702a]/10 border border-[#e8702a]/30 px-3 py-1 rounded-full">
                        {service.number}
                      </span>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#e8702a]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full ml-auto md:ml-0">
                        {service.metric}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#e8702a] font-medium">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl font-light">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-[10px] sm:text-xs font-medium text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-lg"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </div>
  );
}
