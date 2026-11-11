import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AtmosphereItem, Lang } from '../types';

interface LightboxModalProps {
  lang: Lang;
  photo: AtmosphereItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ lang, photo, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && photo) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={photo.title[lang]}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#29221E]/88 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-4xl w-full bg-[#29221E] border border-[#F5F1E9]/18 text-[#F5F1E9] overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photograph viewer"
              className="absolute top-4 right-4 z-20 p-2 bg-[#29221E]/80 text-[#F5F1E9] hover:text-[#B78358] border border-[#F5F1E9]/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-[#1D1815] flex items-center justify-center">
              <img
                src={photo.image}
                alt={photo.title[lang]}
                className="w-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#F5F1E9]/12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#B78358] mr-3">
                  {photo.index}
                </span>
                <span className="font-serif text-2xl text-white">{photo.title[lang]}</span>
                <p className="text-xs text-[#F5F1E9]/70 mt-1">{photo.caption[lang]}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
