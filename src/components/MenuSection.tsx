import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { CATEGORY_LABELS, UI_TEXT, formatPrice } from '../data/translations';
import { CartItem, Lang, MenuCategoryId, MenuItem } from '../types';
import { EditorialImage } from './EditorialImage';

interface MenuSectionProps {
  lang: Lang;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onOpenFullMenu: () => void;
}

const CATEGORIES: MenuCategoryId[] = ['all', 'coffee', 'matcha', 'cold', 'desserts'];

export const MenuSection: React.FC<MenuSectionProps> = ({
  lang,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onOpenFullMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const t = UI_TEXT[lang].menu;
  const catLabels = CATEGORY_LABELS[lang];

  const displayedItems = useMemo(() => {
    if (activeCategory === 'all') {
      return MENU_ITEMS.filter((item) => item.isSignature);
    }
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const getItemCartInfo = (item: MenuItem) => {
    const defaultMilk = item.defaultMilk ?? 'whole';
    const defaultKey = `${item.id}::${defaultMilk}`;
    const matchingEntries = cart.filter((c) => c.item.id === item.id);
    const totalQuantity = matchingEntries.reduce((sum, entry) => sum + entry.quantity, 0);
    const defaultEntry = cart.find((c) => c.cartKey === defaultKey) ?? matchingEntries[0];
    return { totalQuantity, activeKey: defaultEntry?.cartKey ?? defaultKey };
  };

  return (
    <section
      id="menu"
      className="bg-[#EFE9DC] text-[#29221E] py-20 sm:py-28 lg:py-32 border-b border-[#29221E]/10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#29221E]/12 pb-4 mb-10">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#73765C] font-medium">
            {t.eyebrow}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#665B54] hidden sm:inline">
            {t.subtag}
          </span>
        </div>

        {/* Heading + Category Switcher Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.02] font-light tracking-[-0.015em] mb-4">
              {t.titleStart}{' '}
              <span className="italic font-normal text-[#B78358]">{t.titleItalic}</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[#5B5048] leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Interactive Category Tabs */}
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-2 border-b border-[#29221E]/12 pb-3 lg:pb-0 lg:border-b-0"
          >
            {CATEGORIES.map((categoryId) => {
              const isActive = activeCategory === categoryId;
              return (
                <button
                  key={categoryId}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78358] ${
                    isActive
                      ? 'text-[#F5F1E9]'
                      : 'text-[#5B5048] hover:text-[#29221E] bg-[#F5F1E9]/50'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menuCategoryPill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 bg-[#29221E]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{catLabels[categoryId]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, idx) => {
              const { totalQuantity, activeKey } = getItemCartInfo(item);
              const itemName = item.name[lang];

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(idx * 0.04, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col justify-between bg-[#F5F1E9] border border-[#29221E]/10 transition-colors duration-300 hover:border-[#29221E]/30 min-w-0"
                >
                  <div>
                    {/* Product Photography */}
                    <div className="relative overflow-hidden">
                      <EditorialImage
                        src={item.image}
                        alt={`${itemName} — MORROW COFFEE`}
                        className="aspect-[4/4.4] w-full"
                        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-[#F5F1E9]/92 backdrop-blur-xs text-[#29221E] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-medium border border-[#29221E]/10">
                          {item.badge[lang]}
                        </span>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="p-5 pb-4">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#73765C] mb-2">
                        <span>{item.categoryLabel[lang]}</span>
                        <span className="text-[#B78358]">0{idx + 1}</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-3 mb-2.5">
                        <h3 className="font-serif text-2xl font-normal text-[#29221E] leading-tight">
                          {itemName}
                        </h3>
                        <span className="font-sans text-sm font-medium text-[#29221E] tabular-nums shrink-0">
                          {formatPrice(item.priceUsd, item.priceRub, lang)}
                        </span>
                      </div>

                      <p className="text-[13px] text-[#5B5048] leading-relaxed line-clamp-2 mb-3">
                        {item.description[lang]}
                      </p>

                      <p className="text-[11px] text-[#73765C] italic font-serif tracking-wide">
                        {item.tastingNotes[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-5 pb-5 pt-3 border-t border-[#29221E]/8 flex items-center justify-between gap-3">
                    {totalQuantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => onAddToCart(item)}
                        className="w-full flex items-center justify-between px-4 py-2.5 border border-[#29221E]/25 text-[#29221E] text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-[#29221E] hover:text-[#F5F1E9] hover:border-[#29221E] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78358]"
                      >
                        <span>{t.addToBag}</span>
                        <Plus className="w-3.5 h-3.5 stroke-[1.75]" />
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between border border-[#29221E] bg-[#29221E] text-[#F5F1E9]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(activeKey, -1)}
                          aria-label={`Decrease ${itemName}`}
                          className="p-2.5 hover:bg-[#3A312C] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[1.75]" />
                        </button>
                        <span className="text-[11px] uppercase tracking-[0.16em] tabular-nums font-medium">
                          {totalQuantity} {t.inBagSuffix}
                        </span>
                        <button
                          type="button"
                          onClick={() => onAddToCart(item)}
                          aria-label={`Increase ${itemName}`}
                          className="p-2.5 hover:bg-[#3A312C] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[1.75]" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA: VIEW FULL MENU */}
        <div className="mt-16 pt-8 border-t border-[#29221E]/12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs sm:text-sm text-[#5B5048]">{t.bottomNote}</p>
          <button
            type="button"
            onClick={onOpenFullMenu}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#29221E] text-[#F5F1E9] text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:bg-[#B78358] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78358]"
          >
            <span>{t.viewFullMenu}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
