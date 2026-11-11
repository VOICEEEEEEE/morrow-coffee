import { useCallback, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AboutSection } from './components/AboutSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { FullMenuModal } from './components/FullMenuModal';
import { HeroSection } from './components/HeroSection';
import { LightboxModal } from './components/LightboxModal';
import { LocationSection } from './components/LocationSection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { PhilosophySection } from './components/PhilosophySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ToastContainer } from './components/ToastContainer';
import { MILK_LABELS, UI_TEXT, formatPrice } from './data/translations';
import { AtmosphereItem, CartItem, Lang, MenuItem, MilkOptionId, ToastMessage } from './types';

const CART_STORAGE_KEY = 'morrow_coffee_demo_bag_v2';
const LANG_STORAGE_KEY = 'morrow_coffee_lang_v1';

function detectInitialLang(): Lang {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang === 'en' || paramLang === 'ru') return paramLang;
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') return saved;
  } catch {
    // Ignore storage/URL parsing errors
  }
  return 'ru';
}

export function App() {
  const [lang, setLang] = useState<Lang>(detectInitialLang);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage parsing errors
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<AtmosphereItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI_TEXT[lang].metaTitle;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  const totalCartCount = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.quantity, 0),
    [cart]
  );

  const pushToast = useCallback((title: string, subtitle: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-2), { id, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  }, []);

  const handleAddToCart = useCallback(
    (item: MenuItem, milkOverride?: MilkOptionId) => {
      const milk: MilkOptionId = milkOverride ?? item.defaultMilk ?? 'whole';
      const cartKey = `${item.id}::${milk}`;

      setCart((prev) => {
        const existing = prev.find((entry) => entry.cartKey === cartKey);
        if (existing) {
          return prev.map((entry) =>
            entry.cartKey === cartKey
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry
          );
        }
        return [...prev, { cartKey, item, milk, quantity: 1 }];
      });

      const priceStr = formatPrice(item.priceUsd, item.priceRub, lang);
      const subLabel =
        item.category === 'desserts' || milk === 'none'
          ? `${item.categoryLabel[lang]} · ${priceStr}`
          : `${MILK_LABELS[lang][milk]} · ${priceStr}`;
      pushToast(`${UI_TEXT[lang].cart.toastAdded} ${item.name[lang]}`, subLabel);
    },
    [lang, pushToast]
  );

  const handleUpdateQuantity = useCallback((cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.cartKey === cartKey
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((cartKey: string) => {
    setCart((prev) => prev.filter((entry) => entry.cartKey !== cartKey));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#F5F1E9] text-[#29221E]">
        <Navbar
          lang={lang}
          onChangeLang={setLang}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main className="flex-1 w-full min-w-0">
          <HeroSection lang={lang} />
          <AboutSection lang={lang} />
          <MenuSection
            lang={lang}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenFullMenu={() => setIsFullMenuOpen(true)}
          />
          <AtmosphereSection lang={lang} onSelectPhoto={(photo) => setSelectedPhoto(photo)} />
          <PhilosophySection lang={lang} />
          <ReviewsSection lang={lang} />
          <LocationSection lang={lang} />
        </main>

        <Footer lang={lang} />

        <CartDrawer
          lang={lang}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        <FullMenuModal
          lang={lang}
          isOpen={isFullMenuOpen}
          onClose={() => setIsFullMenuOpen(false)}
          onAddToCart={handleAddToCart}
        />

        <LightboxModal
          lang={lang}
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />

        <ToastContainer
          lang={lang}
          toasts={toasts}
          onOpenCart={() => setIsCartOpen(true)}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
