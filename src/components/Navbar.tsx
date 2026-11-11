import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { BRAND_INFO } from '../data/coffeeData';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';

interface NavbarProps {
  lang: Lang;
  onChangeLang: (next: Lang) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onChangeLang,
  cartCount,
  onOpenCart,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = UI_TEXT[lang].nav;

  const leftLinks = [
    { label: t.story, href: '#about' },
    { label: t.menu, href: '#menu' },
    { label: t.atmosphere, href: '#atmosphere' },
  ];

  const rightLinks = [
    { label: t.philosophy, href: '#philosophy' },
    { label: t.reviews, href: '#reviews' },
    { label: t.visit, href: '#location' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F5F1E9]/94 backdrop-blur-md text-[#29221E] border-b border-[#29221E]/10 py-3.5'
            : 'bg-gradient-to-b from-[#29221E]/65 to-transparent text-[#F5F1E9] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-2">
          {/* Desktop Left Links */}
          <nav aria-label="Primary navigation left" className="hidden lg:flex items-center gap-7">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-85 hover:opacity-100 transition-opacity relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.openMenuAria}
              aria-expanded={mobileOpen}
              className="p-2 -ml-2 cursor-pointer transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78358]"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Center Brand Logo */}
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-2.5 min-w-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78358]"
          >
            <BrandMark className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-500 group-hover:scale-105" />
            <span className="font-serif text-[15px] sm:text-xl tracking-[0.12em] sm:tracking-[0.18em] font-medium uppercase whitespace-nowrap">
              {BRAND_INFO.name}
            </span>
          </a>

          {/* Desktop Right Links + Language Switcher + Cart */}
          <div className="flex items-center gap-2 sm:gap-5 lg:gap-7">
            <nav aria-label="Primary navigation right" className="hidden lg:flex items-center gap-7">
              {rightLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-85 hover:opacity-100 transition-opacity relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* RU / EN Language Toggle */}
            <div
              role="group"
              aria-label="Language switcher"
              className={`inline-flex items-center border text-[10px] tracking-[0.14em] font-medium transition-colors ${
                scrolled
                  ? 'border-[#29221E]/20 bg-[#EFE9DC]/60'
                  : 'border-[#F5F1E9]/30 bg-[#29221E]/30 backdrop-blur-xs'
              }`}
            >
              {(['ru', 'en'] as Lang[]).map((code) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onChangeLang(code)}
                    aria-pressed={active}
                    className={`px-2 py-1.5 uppercase cursor-pointer transition-colors ${
                      active
                        ? scrolled
                          ? 'bg-[#29221E] text-[#F5F1E9]'
                          : 'bg-[#F5F1E9] text-[#29221E]'
                        : scrolled
                          ? 'text-[#5B5048] hover:text-[#29221E]'
                          : 'text-[#F5F1E9]/75 hover:text-white'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`${t.bag} (${cartCount})`}
              className={`flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] uppercase tracking-[0.18em] font-medium border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78358] ${
                scrolled
                  ? 'border-[#29221E]/20 hover:border-[#29221E] hover:bg-[#29221E] hover:text-[#F5F1E9]'
                  : 'border-[#F5F1E9]/35 bg-[#29221E]/25 backdrop-blur-xs hover:bg-[#F5F1E9] hover:text-[#29221E]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.6]" />
              <span className="hidden sm:inline">{t.bag}</span>
              <span
                className={`tabular-nums inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] transition-colors ${
                  cartCount > 0
                    ? 'bg-[#B78358] text-white'
                    : scrolled
                      ? 'bg-[#29221E]/10 text-[#29221E]'
                      : 'bg-[#F5F1E9]/20 text-[#F5F1E9]'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Editorial Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#29221E] text-[#F5F1E9] flex flex-col justify-between p-6 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-[#F5F1E9]/12 pb-5">
              <div className="flex items-center gap-2.5">
                <BrandMark className="w-6 h-6 text-[#F5F1E9]" />
                <span className="font-serif text-lg tracking-[0.18em] uppercase">
                  {BRAND_INFO.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t.closeMenuAria}
                className="p-2 -mr-2 text-[#F5F1E9]/80 hover:text-[#F5F1E9] cursor-pointer"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            <nav className="my-auto py-8 flex flex-col gap-5" aria-label="Mobile sections">
              {t.mobileLinks.map((item, idx) => (
                <motion.button
                  key={item.href}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * idx, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleLinkClick(item.href)}
                  className="group flex items-baseline gap-4 text-left cursor-pointer py-1 border-b border-[#F5F1E9]/8"
                >
                  <span className="text-[11px] font-sans tracking-[0.2em] text-[#B78358] tabular-nums">
                    {item.index}
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-light tracking-tight group-hover:italic group-hover:translate-x-2 transition-transform duration-300">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="border-t border-[#F5F1E9]/12 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#F5F1E9]/70">
              <div>
                <p className="uppercase tracking-[0.16em] text-[#B78358] text-[10px] mb-1">
                  {t.visitEyebrow}
                </p>
                <p>{BRAND_INFO.addressLine1[lang]}</p>
                <p>{BRAND_INFO.shortHours[lang]}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCart();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F5F1E9] text-[#29221E] text-[11px] uppercase tracking-[0.18em] font-medium cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                <span>
                  {t.viewBag} ({cartCount})
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
