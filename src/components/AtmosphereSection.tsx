import React from 'react';
import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import { ATMOSPHERE_GALLERY } from '../data/coffeeData';
import { UI_TEXT } from '../data/translations';
import { AtmosphereItem, Lang } from '../types';
import { EditorialImage } from './EditorialImage';

interface AtmosphereSectionProps {
  lang: Lang;
  onSelectPhoto: (item: AtmosphereItem) => void;
}

export const AtmosphereSection: React.FC<AtmosphereSectionProps> = ({
  lang,
  onSelectPhoto,
}) => {
  const t = UI_TEXT[lang].atmosphere;

  return (
    <section
      id="atmosphere"
      className="bg-[#29221E] text-[#F5F1E9] py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#F5F1E9]/14 pb-4 mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#B78358] font-medium">
            {t.eyebrow}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5F1E9]/60 hidden sm:inline">
            {t.subtag}
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 min-w-0"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.02] font-light tracking-[-0.015em]">
              {t.titleStart}{' '}
              <span className="italic text-[#B78358] font-normal">{t.titleItalic}</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 text-sm sm:text-[15px] text-[#F5F1E9]/72 leading-relaxed lg:pb-1 min-w-0"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Asymmetric Editorial Photo Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 items-start">
          {ATMOSPHERE_GALLERY.map((frame, index) => {
            const staggerClass = index === 3 ? 'md:mt-10' : '';
            const title = frame.title[lang];
            const caption = frame.caption[lang];

            return (
              <motion.figure
                key={frame.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: Math.min(index * 0.08, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${frame.spanClass} ${staggerClass} group min-w-0 w-full`}
              >
                <button
                  type="button"
                  onClick={() => onSelectPhoto(frame)}
                  aria-label={title}
                  className="relative block w-full text-left overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78358]"
                >
                  <EditorialImage
                    src={frame.image}
                    alt={`${title} — ${caption}`}
                    className={`${frame.aspectClass} w-full bg-[#3A312C]`}
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 w-9 h-9 bg-[#29221E]/80 backdrop-blur-xs border border-[#F5F1E9]/25 flex items-center justify-center text-[#F5F1E9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Expand className="w-4 h-4 stroke-[1.5]" />
                  </span>
                </button>

                <figcaption className="mt-4 pt-3 border-t border-[#F5F1E9]/12 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-[10px] tabular-nums tracking-[0.2em] text-[#B78358]">
                        {frame.index}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5F1E9]">
                        {title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#F5F1E9]/68 leading-relaxed max-w-md">
                      {caption}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};
