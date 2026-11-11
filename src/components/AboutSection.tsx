import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';
import { EditorialImage } from './EditorialImage';

interface AboutSectionProps {
  lang: Lang;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const leftImgY = useTransform(scrollYProgress, [0, 1], ['-3%', '4%']);
  const rightImgY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  const t = UI_TEXT[lang].about;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F5F1E9] text-[#29221E] py-20 sm:py-28 lg:py-36 border-b border-[#29221E]/10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between border-b border-[#29221E]/12 pb-4 mb-12 lg:mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#73765C] font-medium">
            {t.eyebrow}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#665B54] hidden sm:inline">
            {t.locationTag}
          </span>
        </motion.div>

        {/* Asymmetric 12-column Magazine Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Primary Architectural Interior Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 min-w-0"
          >
            <div className="overflow-hidden">
              <motion.div style={{ y: leftImgY }} className="will-change-transform">
                <EditorialImage
                  src="images/about-interior.jpg"
                  alt="MORROW COFFEE sunlit corner table with ceramic cup and open book"
                  className="aspect-[4/5] w-full"
                  imgClassName="hover:scale-[1.03] transition-transform duration-700"
                />
              </motion.div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#665B54]">
              <span>{t.fig1Caption}</span>
              <span className="text-[#73765C]">{t.fig1Right}</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative + Offset Barista Craft Photo */}
          <div className="lg:col-span-6 lg:pt-12 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.03] font-light tracking-[-0.015em] mb-7">
                {t.titleStart}{' '}
                <span className="italic text-[#B78358] font-normal">{t.titleItalic}</span>
              </h2>

              <div className="space-y-5 text-[15px] sm:text-base leading-[1.75] text-[#4C423B] max-w-xl">
                <p>
                  {t.p1Prefix}{' '}
                  <strong className="font-medium text-[#29221E]">MORROW COFFEE</strong>{' '}
                  {t.p1Suffix}
                </p>
                <p>{t.p2}</p>
              </div>
            </motion.div>

            {/* Asymmetric Sub-Grid: Secondary Photo + Architectural Craft Specs */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-12 gap-8 items-end">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="sm:col-span-7 overflow-hidden"
              >
                <motion.div style={{ y: rightImgY }} className="will-change-transform">
                  <EditorialImage
                    src="images/about-barista.jpg"
                    alt="Barista pouring silky microfoam rosetta latte art into stoneware cup"
                    className="aspect-[3/4] w-full"
                    imgClassName="hover:scale-[1.04] transition-transform duration-700"
                  />
                </motion.div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#665B54]">
                  {t.fig2Caption}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="sm:col-span-5 border-t border-[#29221E]/15 pt-5 space-y-5"
              >
                {t.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="border-b border-[#29221E]/10 pb-3.5 last:border-b-0"
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#73765C] mb-1">
                      {spec.label}
                    </span>
                    <span className="block font-serif text-lg text-[#29221E]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
