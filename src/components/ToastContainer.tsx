import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import { UI_TEXT } from '../data/translations';
import { Lang, ToastMessage } from '../types';

interface ToastContainerProps {
  lang: Lang;
  toasts: ToastMessage[];
  onOpenCart: () => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  lang,
  toasts,
  onOpenCart,
}) => {
  const bagLabel = UI_TEXT[lang].nav.bag;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-xs w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto bg-[#29221E] text-[#F5F1E9] border border-[#F5F1E9]/15 p-3.5 shadow-xl flex items-center gap-3.5"
          >
            <div className="w-8 h-8 bg-[#B78358]/20 border border-[#B78358]/50 flex items-center justify-center shrink-0 text-[#B78358]">
              <Check className="w-4 h-4 stroke-[2]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{toast.title}</p>
              <p className="text-[11px] text-[#F5F1E9]/70 truncate">{toast.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-[#F5F1E9]/25 text-[10px] uppercase tracking-[0.16em] text-[#F5F1E9] hover:bg-[#F5F1E9] hover:text-[#29221E] transition-colors shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>{bagLabel}</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
