import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { CATEGORY_LABELS, UI_TEXT, formatPrice } from '../data/translations';
import { Lang, MenuCategoryId, MenuItem, MilkOptionId } from '../types';
import { EditorialImage } from './EditorialImage';

interface FullMenuModalProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, milk?: MilkOptionId) => void;
}

const MODAL_CATEGORIES: Exclude<MenuCategoryId, 'all'>[] = [
  'coffee',
  'matcha',
  'cold',
  'desserts',
];

const MILK_OPTIONS: ('whole' | 'oat' | 'almond')[] = ['whole', 'oat', 'almond'];

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  lang,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedMilk, setSelectedMilk] = useState<MilkOptionId>('oat');
  const t = UI_TEXT[lang].menu;
  const catLabels = CATEGORY_LABELS[lang];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t.fullModalTitle}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#29221E]/65 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[88vh] bg-[#F5F1E9] text-[#29221E] border border-[#29221E]/18 flex flex-col overflow-hidden"
          >
            {/* Sticky Header */}
            <div className="px-6 sm:px-10 py-6 border-b border-[#29221E]/12 flex flex-wrap items-center justify-between gap-4 bg-[#F5F1E9]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#73765C] block mb-1">
                  {t.fullModalEyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#29221E]">
                  {t.fullModalTitle}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1.5 border border-[#29221E]/15 p-1 bg-[#EBE4D6]/60">
                  {MILK_OPTIONS.map((milkId) => (
                    <button
                      key={milkId}
                      type="button"
                      onClick={() => setSelectedMilk(milkId)}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                        selectedMilk === milkId
                          ? 'bg-[#29221E] text-[#F5F1E9]'
                          : 'text-[#5B5048] hover:text-[#29221E]'
                      }`}
                    >
                      {t.milkShort[milkId]}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close full menu"
                  className="p-2 -mr-2 text-[#5B5048] hover:text-[#29221E] transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Scrollable Categories */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-12">
              {MODAL_CATEGORIES.map((categoryId) => {
                const items = MENU_ITEMS.filter((i) => i.category === categoryId);
                return (
                  <section key={categoryId}>
                    <div className="flex items-baseline justify-between border-b border-[#29221E]/12 pb-3 mb-6">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#29221E]">
                        {catLabels[categoryId]}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#73765C] tabular-nums">
                        {items.length} {t.selectionsSuffix}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {items.map((item) => {
                        const milkToUse: MilkOptionId =
                          item.defaultMilk === 'none' || item.category === 'desserts'
                            ? 'none'
                            : selectedMilk;
                        const itemName = item.name[lang];

                        return (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 border border-[#29221E]/10 bg-[#FFFFFF]/55 hover:border-[#29221E]/28 transition-colors"
                          >
                            <EditorialImage
                              src={item.image}
                              alt={itemName}
                              className="w-24 h-28 shrink-0"
                            />
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex items-baseline justify-between gap-2">
                                  <h4 className="font-serif text-xl text-[#29221E]">{itemName}</h4>
                                  <span className="text-sm font-medium tabular-nums shrink-0">
                                    {formatPrice(item.priceUsd, item.priceRub, lang)}
                                  </span>
                                </div>
                                <p className="text-xs text-[#5B5048] mt-1 line-clamp-2 leading-relaxed">
                                  {item.description[lang]}
                                </p>
                              </div>

                              <div className="flex items-center justify-between gap-2 pt-3">
                                <span className="text-[10px] italic font-serif text-[#73765C] truncate">
                                  {item.tastingNotes[lang]}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onAddToCart(item, milkToUse)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#29221E] text-[#F5F1E9] text-[10px] uppercase tracking-[0.16em] hover:bg-[#B78358] transition-colors shrink-0 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>{t.shortAdd}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
