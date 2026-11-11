import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { DEMO_REVIEWS } from '../data/coffeeData';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';

interface ReviewsSectionProps {
  lang: Lang;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = UI_TEXT[lang].reviews;

  return (
    <section
      id="reviews"
      className="bg-[#EBE4D6] text-[#29221E] py-20 sm:py-28 lg:py-32 border-b border-[#29221E]/10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#29221E]/12 pb-4 mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#73765C] font-medium">
            {t.eyebrow}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#665B54] border border-[#29221E]/15 px-3 py-1 bg-[#F5F1E9]/60">
            {t.demoBadge}
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.03] font-light tracking-[-0.015em]"
          >
            {t.titleStart}{' '}
            <span className="italic font-normal text-[#B78358]">{t.titleItalic}</span>
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#5B5048] max-w-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Minimalist 3-Column Editorial Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DEMO_REVIEWS.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between bg-[#F5F1E9] border border-[#29221E]/12 p-7 sm:p-8 transition-colors duration-300 hover:border-[#29221E]/28 min-w-0"
            >
              <div>
                <div
                  className="flex items-center gap-1 mb-6"
                  aria-label={`Rated ${review.rating} out of 5`}
                >
                  {Array.from({ length: review.rating }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="w-3.5 h-3.5 fill-[#B78358] text-[#B78358]"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-[#73765C] tabular-nums">
                    {review.rating}.0 / 5.0
                  </span>
                </div>

                <blockquote className="font-serif text-[1.35rem] sm:text-[1.45rem] leading-[1.4] font-normal text-[#29221E] mb-8">
                  &ldquo;{review.quote[lang]}&rdquo;
                </blockquote>
              </div>

              <footer className="pt-5 border-t border-[#29221E]/10">
                <p className="text-sm font-medium text-[#29221E]">{review.author[lang]}</p>
                <p className="text-[11px] text-[#665B54] mt-0.5">{review.role[lang]}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#73765C] mt-3">
                  {t.usualOrder}: {review.favoriteOrder[lang]}
                </p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
