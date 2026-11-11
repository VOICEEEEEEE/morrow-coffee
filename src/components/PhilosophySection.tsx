import React from 'react';
import { motion } from 'framer-motion';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';

interface PhilosophySectionProps {
  lang: Lang;
}

const PillarIllustration: React.FC<{ index: number }> = ({ index }) => {
  if (index === 0) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-11 h-11 text-[#29221E]"
        aria-hidden="true"
      >
        <ellipse
          cx="24"
          cy="24"
          rx="11"
          ry="15"
          transform="rotate(-18 24 24)"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M19.5 11.5C22.5 17 20.5 23.5 24 29C26.2 32.5 28 34.5 28.8 36.5"
          stroke="#B78358"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M11 16C8.5 11.5 11.5 7 16.5 8"
          stroke="#73765C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-11 h-11 text-[#29221E]"
        aria-hidden="true"
      >
        <path
          d="M14 21H34L28.5 31H19.5L14 21Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M12 31H36" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path
          d="M17 31V37C17 38.6569 18.3431 40 20 40H28C29.6569 40 31 38.6569 31 37V31"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M24 9V16"
          stroke="#B78358"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
        <circle cx="24" cy="18" r="1.4" fill="#B78358" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-11 h-11 text-[#29221E]"
      aria-hidden="true"
    >
      <path
        d="M10 39V22C10 14.268 16.268 8 24 8C31.732 8 38 14.268 38 22V39"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M7 39H41" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M18 39V28H30V39" stroke="#73765C" strokeWidth="1.25" />
      <circle cx="24" cy="19" r="2.2" stroke="#B78358" strokeWidth="1.3" />
    </svg>
  );
};

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ lang }) => {
  const t = UI_TEXT[lang].philosophy;

  return (
    <section
      id="philosophy"
      className="bg-[#F5F1E9] text-[#29221E] py-20 sm:py-28 lg:py-36 border-b border-[#29221E]/10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#29221E]/12 pb-4 mb-12 lg:mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#73765C] font-medium">
            {t.eyebrow}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#665B54] hidden sm:inline">
            {t.subtag}
          </span>
        </div>

        {/* Expressive Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16 lg:mb-20"
        >
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] leading-[0.98] font-light tracking-[-0.02em]">
            {t.titleStart}{' '}
            <span className="italic font-normal text-[#B78358]">{t.titleItalic}</span>
          </h2>
        </motion.div>

        {/* Architectural Triptych */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#29221E]/14 divide-y md:divide-y-0 md:divide-x divide-[#29221E]/14">
          {t.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`py-10 md:py-12 min-w-0 ${
                idx === 0 ? 'md:pr-10' : idx === 1 ? 'md:px-10' : 'md:pl-10'
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <PillarIllustration index={idx} />
                <span className="font-serif text-2xl italic text-[#B78358] tabular-nums">
                  {pillar.number}
                </span>
              </div>

              <span className="block text-[10px] uppercase tracking-[0.22em] text-[#73765C] font-medium mb-2">
                {pillar.subtitle}
              </span>

              <h3 className="font-serif text-3xl font-normal text-[#29221E] mb-4">
                {pillar.title}
              </h3>

              <p className="text-sm sm:text-[15px] text-[#5B5048] leading-[1.75]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
