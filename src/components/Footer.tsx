import React from 'react';
import { ArrowUpRight, Music } from 'lucide-react';
import { BRAND_INFO } from '../data/coffeeData';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';
import { BrandMark } from './BrandMark';

interface FooterProps {
  lang: Lang;
}

const InstagramGlyph: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = UI_TEXT[lang].footer;
  const nav = UI_TEXT[lang].nav;

  return (
    <footer className="bg-[#29221E] text-[#F5F1E9] pt-20 pb-12 border-t border-[#F5F1E9]/10 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F5F1E9]/12">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-5">
            <a href="#top" className="inline-flex items-center gap-3 group">
              <BrandMark className="w-7 h-7 text-[#F5F1E9]" />
              <span className="font-serif text-2xl tracking-[0.18em] uppercase font-normal">
                {BRAND_INFO.name}
              </span>
            </a>
            <p className="text-sm text-[#F5F1E9]/72 leading-relaxed max-w-sm">{t.desc}</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MORROW COFFEE Instagram"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#F5F1E9]/20 text-[11px] uppercase tracking-[0.18em] hover:border-[#B78358] hover:text-[#B78358] transition-colors"
              >
                <InstagramGlyph className="w-3.5 h-3.5" />
                <span>{BRAND_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={BRAND_INFO.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.playlist}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#F5F1E9]/20 text-[11px] uppercase tracking-[0.18em] hover:border-[#B78358] hover:text-[#B78358] transition-colors"
              >
                <Music className="w-3.5 h-3.5" />
                <span>{t.playlist}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-[#B78358] font-medium mb-5">
              {t.navTitle}
            </h4>
            <ul className="space-y-3 text-sm text-[#F5F1E9]/75">
              {nav.mobileLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-[#B78358] font-medium mb-5">
              {t.locationTitle}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F1E9]/75">
              <div>
                <p className="text-white">{BRAND_INFO.addressLine1[lang]}</p>
                <p>{BRAND_INFO.addressLine2[lang]}</p>
              </div>
              <div className="text-xs space-y-1 tabular-nums text-[#F5F1E9]/65">
                {t.hoursLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-[#B78358] font-medium mb-5">
              {t.contactTitle}
            </h4>
            <div className="space-y-3 text-sm text-[#F5F1E9]/75">
              <p>
                <a
                  href={`tel:${BRAND_INFO.phoneDisplay[lang].replace(/[^+\d]/g, '')}`}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {BRAND_INFO.phoneDisplay[lang]}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {BRAND_INFO.email}
                </a>
              </p>
              <p className="text-xs text-[#F5F1E9]/50 pt-2">{t.demoContactNote}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E9]/55">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_INFO.name}. {t.rights}
          </p>
          <p className="text-[11px] uppercase tracking-[0.16em]">{t.showcaseTag}</p>
        </div>
      </div>
    </footer>
  );
};
