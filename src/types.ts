export type Lang = 'ru' | 'en';

export type MenuCategoryId = 'all' | 'coffee' | 'matcha' | 'cold' | 'desserts';

export type MilkOptionId = 'whole' | 'oat' | 'almond' | 'none';

export interface MenuItem {
  id: string;
  name: Record<Lang, string>;
  category: Exclude<MenuCategoryId, 'all'>;
  categoryLabel: Record<Lang, string>;
  priceUsd: number;
  priceRub: number;
  description: Record<Lang, string>;
  tastingNotes: Record<Lang, string>;
  image: string;
  isSignature: boolean;
  defaultMilk?: MilkOptionId;
  badge?: Record<Lang, string>;
}

export interface CartItem {
  cartKey: string;
  item: MenuItem;
  milk: MilkOptionId;
  quantity: number;
}

export interface AtmosphereItem {
  id: string;
  index: string;
  title: Record<Lang, string>;
  caption: Record<Lang, string>;
  image: string;
  spanClass: string;
  aspectClass: string;
}

export interface ReviewItem {
  id: string;
  quote: Record<Lang, string>;
  author: Record<Lang, string>;
  role: Record<Lang, string>;
  rating: number;
  favoriteOrder: Record<Lang, string>;
}

export interface ToastMessage {
  id: string;
  title: string;
  subtitle: string;
}
