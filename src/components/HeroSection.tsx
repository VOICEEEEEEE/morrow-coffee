import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/coffeeData';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';

interface HeroSectionProps {
  lang: Lang;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const t = UI_TEXT[lang].hero;

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-[94svh] lg:min-h-[96vh] flex flex-col justify-end overflow-hidden bg-[#29221E] text-[#F5F1E9]"
    >
      {/* Full-bleed atmospheric coffee interior with subtle parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <img
          src="images/hero-cafe.jpg"
          alt="MORROW COFFEE sunlit specialty cafe interior with fluted oak counter and warm stone walls"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#29221E]/90 via-[#29221E]/40 to-[#29221E]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#29221E]/75 via-[#29221E]/25 to-transparent" />
      </motion.div>

      {/* Main Hero Copy Container */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-8 sm:pb-12"
      >
        <div className="max-w-3xl min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 max-w-full"
          >
            <span className="w-6 sm:w-8 h-[1px] bg-[#B78358] shrink-0" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.24em] text-[#F5F1E9]/85 font-medium leading-snug">
              {t.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[2.25rem] sm:text-[4.25rem] lg:text-[5.5rem] leading-[0.98] sm:leading-[0.95] tracking-[-0.02em] font-light text-white mb-5 sm:mb-6"
          >
            {t.titleLine1}
            <br />
            <span className="italic font-normal text-[#F5F1E9]/95">{t.titleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-[#F5F1E9]/85 max-w-xl leading-relaxed font-light mb-9"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#F5F1E9] text-[#29221E] text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[#B78358] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78358]"
            >
              <span>{t.ctaMenu}</span>
              <ArrowRight className="w-4 h-4 stroke-[1.6] transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#location"
              className="inline-flex items-center gap-2.5 px-7 py-4 border border-[#F5F1E9]/45 bg-[#29221E]/25 backdrop-blur-xs text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-[#F5F1E9] hover:bg-[#F5F1E9]/12 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E9]"
            >
              <MapPin className="w-3.5 h-3.5 stroke-[1.6] text-[#B78358]" />
              <span>{t.ctaFind}</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Architectural Metadata Hairline Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.48 }}
          className="mt-14 sm:mt-20 pt-5 border-t border-[#F5F1E9]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#F5F1E9]/80"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#B78358] block mb-0.5">
                {t.addressLabel}
              </span>
              <span className="font-light">{BRAND_INFO.fullAddress[lang]}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-7 bg-[#F5F1E9]/20" aria-hidden="true" />
            <div>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#B78358] block mb-0.5">
                {t.hoursLabel}
              </span>
              <span className="font-light tabular-nums">{t.hoursInline}</span>
            </div>
          </div>

          <a
            href="#about"
            className="hidden md:inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#F5F1E9]/70 hover:text-white transition-colors"
          >
            <span>{t.scrollCue}</span>
            <span className="w-8 h-[1px] bg-[#F5F1E9]/45" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
