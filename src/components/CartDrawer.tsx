import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { MILK_LABELS, UI_TEXT, formatPrice } from '../data/translations';
import { CartItem, Lang } from '../types';
import { EditorialImage } from './EditorialImage';

interface CartDrawerProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [demoNoticeActive, setDemoNoticeActive] = useState(false);
  const t = UI_TEXT[lang].cart;
  const milkLabels = MILK_LABELS[lang];

  useEffect(() => {
    if (!isOpen) setDemoNoticeActive(false);
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotalUsd = cart.reduce((sum, entry) => sum + entry.item.priceUsd * entry.quantity, 0);
  const subtotalRub = cart.reduce((sum, entry) => sum + entry.item.priceRub * entry.quantity, 0);
  const taxUsd = lang === 'en' ? subtotalUsd * 0.08 : 0;
  const totalUsd = subtotalUsd + taxUsd;
  const totalRub = subtotalRub;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#29221E]/55 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md bg-[#F5F1E9] text-[#29221E] h-full flex flex-col border-l border-[#29221E]/15"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#29221E]/12 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#73765C] block">
                  {t.eyebrow}
                </span>
                <h2 className="font-serif text-2xl font-normal text-[#29221E]">
                  {t.title} <span className="text-[#B78358] tabular-nums">({totalItems})</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 -mr-2 text-[#5B5048] hover:text-[#29221E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-14 h-14 border border-[#29221E]/15 flex items-center justify-center mb-5 text-[#B78358]">
                    <ShoppingBag className="w-6 h-6 stroke-[1.3]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#29221E] mb-2">{t.emptyTitle}</h3>
                  <p className="text-sm text-[#5B5048] max-w-xs leading-relaxed mb-7">
                    {t.emptyDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-[#29221E] text-[#F5F1E9] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#B78358] transition-colors cursor-pointer"
                  >
                    {t.browseMenu}
                  </button>
                </div>
              ) : demoNoticeActive ? (
                <div className="py-6 space-y-6">
                  <div className="p-5 bg-[#EBE4D6] border border-[#29221E]/15 space-y-3">
                    <div className="flex items-center gap-2.5 text-[#73765C]">
                      <Info className="w-5 h-5 shrink-0" />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                        {t.demoModalBadge}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#29221E]">{t.demoModalTitle}</h3>
                    <p className="text-sm text-[#5B5048] leading-relaxed">{t.demoModalDesc}</p>
                  </div>

                  <div className="border-t border-b border-[#29221E]/12 py-4 space-y-2 text-sm">
                    <div className="flex justify-between text-[#5B5048]">
                      <span>
                        {t.itemsCountLabel} ({totalItems})
                      </span>
                      <span className="tabular-nums">
                        {formatPrice(subtotalUsd, subtotalRub, lang)}
                      </span>
                    </div>
                    {lang === 'en' && (
                      <div className="flex justify-between text-[#5B5048]">
                        <span>{t.taxLabel}</span>
                        <span className="tabular-nums">${taxUsd.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium text-[#29221E] pt-2 border-t border-[#29221E]/10">
                      <span>{t.simulatedTotal}</span>
                      <span className="tabular-nums">
                        {formatPrice(totalUsd, totalRub, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setDemoNoticeActive(false)}
                      className="w-full py-3.5 bg-[#29221E] text-[#F5F1E9] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#3A312C] transition-colors cursor-pointer"
                    >
                      {t.returnToBag}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClearCart();
                        setDemoNoticeActive(false);
                      }}
                      className="w-full py-3 border border-[#29221E]/25 text-[#5B5048] text-[11px] uppercase tracking-[0.2em] hover:border-[#29221E] hover:text-[#29221E] transition-colors cursor-pointer"
                    >
                      {t.resetBag}
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-[#29221E]/10">
                  {cart.map((entry) => {
                    const itemName = entry.item.name[lang];
                    return (
                      <li key={entry.cartKey} className="py-5 first:pt-0 flex gap-4">
                        <EditorialImage
                          src={entry.item.image}
                          alt={itemName}
                          className="w-20 h-24 shrink-0 border border-[#29221E]/10"
                        />

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-serif text-xl text-[#29221E] leading-tight">
                                {itemName}
                              </h3>
                              <span className="text-sm font-medium text-[#29221E] tabular-nums shrink-0">
                                {formatPrice(
                                  entry.item.priceUsd * entry.quantity,
                                  entry.item.priceRub * entry.quantity,
                                  lang
                                )}
                              </span>
                            </div>
                            <p className="text-[11px] uppercase tracking-[0.14em] text-[#73765C] mt-1">
                              {entry.item.category === 'desserts'
                                ? t.freshlyBaked
                                : milkLabels[entry.milk]}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center border border-[#29221E]/20 bg-white/60">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(entry.cartKey, -1)}
                                aria-label={`Decrease ${itemName}`}
                                className="p-2 hover:bg-[#29221E] hover:text-[#F5F1E9] transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs tabular-nums font-medium">
                                {entry.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(entry.cartKey, 1)}
                                aria-label={`Increase ${itemName}`}
                                className="p-2 hover:bg-[#29221E] hover:text-[#F5F1E9] transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(entry.cartKey)}
                              aria-label={`Remove ${itemName}`}
                              className="p-1.5 text-[#665B54] hover:text-[#9B3B3B] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 stroke-[1.5]" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer Totals & Demo Checkout CTA */}
            {cart.length > 0 && !demoNoticeActive && (
              <div className="p-6 border-t border-[#29221E]/12 bg-[#EBE4D6]/65 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5B5048]">
                    <span>{t.subtotal}</span>
                    <span className="tabular-nums">
                      {formatPrice(subtotalUsd, subtotalRub, lang)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5B5048]">
                    <span>{t.taxLabel}</span>
                    <span className="tabular-nums">
                      {lang === 'ru' ? '0 ₽' : `$${taxUsd.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium text-[#29221E] pt-2 border-t border-[#29221E]/12">
                    <span>{t.total}</span>
                    <span className="tabular-nums">
                      {formatPrice(totalUsd, totalRub, lang)}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#665B54] leading-snug">{t.demoHint}</p>

                <button
                  type="button"
                  onClick={() => setDemoNoticeActive(true)}
                  className="w-full py-4 bg-[#29221E] text-[#F5F1E9] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#B78358] hover:text-white transition-colors cursor-pointer"
                >
                  {t.checkoutBtn} · {formatPrice(totalUsd, totalRub, lang)}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
