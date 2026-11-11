import { AtmosphereItem, Lang, MenuItem, ReviewItem } from '../types';

export const BRAND_INFO = {
  name: 'MORROW COFFEE',
  addressLine1: {
    ru: 'Камергерский пер., 14 · Исторический центр',
    en: '142 Mercer Row, Old Town District',
  } as Record<Lang, string>,
  addressLine2: {
    ru: 'Демо-локация · Концепт-флагман',
    en: 'Portland, OR 97204',
  } as Record<Lang, string>,
  fullAddress: {
    ru: 'Камергерский пер., 14 · Исторический центр (Демо-локация)',
    en: '142 Mercer Row, Old Town District, Portland, OR 97204',
  } as Record<Lang, string>,
  coordinatesLabel: '45.5202° N, 122.6742° W',
  mapsUrl: 'https://maps.google.com/?q=45.5202,-122.6742',
  phone: '+1 (503) 555-0194',
  phoneDisplay: {
    ru: '+7 (900) 555-01-94',
    en: '+1 (503) 555-0194',
  } as Record<Lang, string>,
  email: 'hello@morrowcoffee.example',
  instagramHandle: '@morrowcoffee',
  instagramUrl: 'https://instagram.com',
  spotifyUrl: 'https://open.spotify.com',
  shortHours: {
    ru: 'Ежедневно · 07:30 – 19:00',
    en: 'Daily · 07:30 – 19:00',
  } as Record<Lang, string>,
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'flat-white',
    name: { ru: 'Флэт Уайт', en: 'Flat White' },
    category: 'coffee',
    categoryLabel: { ru: 'Кофе', en: 'Coffee' },
    priceUsd: 4.5,
    priceRub: 360,
    description: {
      ru: 'Двойной ристретто на фирменном бленде Эфиопии и Колумбии под шелковистой глянцевой микропеной.',
      en: 'Double ristretto of our house Ethiopian & Colombian blend folded under glossy, micro-textured steamed milk.',
    },
    tastingNotes: {
      ru: 'Жареный фундук · Тёмный какао · Бархатный финиш',
      en: 'Toasted hazelnut · Dark cacao · Silky finish',
    },
    image: 'images/menu-flat-white.jpg',
    isSignature: true,
    defaultMilk: 'whole',
    badge: { ru: 'Классика бара', en: 'House Classic' },
  },
  {
    id: 'vanilla-latte',
    name: { ru: 'Ванильный Латте', en: 'Vanilla Latte' },
    category: 'coffee',
    categoryLabel: { ru: 'Кофе', en: 'Coffee' },
    priceUsd: 5.5,
    priceRub: 420,
    description: {
      ru: 'Мягкий двойной эспрессо с домашним сиропом на основе стручковой мадагаскарской ванили и нежного молока.',
      en: 'Velvety double espresso balanced with cold-infused Madagascar vanilla bean syrup and gently steamed milk.',
    },
    tastingNotes: {
      ru: 'Бурбонская ваниль · Сливочный крем · Карамель',
      en: 'Bourbon vanilla · Sweet cream · Caramel',
    },
    image: 'images/menu-vanilla-latte.jpg',
    isSignature: true,
    defaultMilk: 'oat',
  },
  {
    id: 'caramel-cappuccino',
    name: { ru: 'Карамельный Капучино', en: 'Caramel Cappuccino' },
    category: 'coffee',
    categoryLabel: { ru: 'Кофе', en: 'Coffee' },
    priceUsd: 5.25,
    priceRub: 410,
    description: {
      ru: 'Насыщенный эспрессо под плотной шапкой молочной пены с нашей томлёной солёной карамелью.',
      en: 'Rich espresso crowned with sculpted microfoam and our slow-cooked sea-salt amber caramel drizzle.',
    },
    tastingNotes: {
      ru: 'Жжёный сахар · Морская соль · Жареный миндаль',
      en: 'Burnt sugar · Sea salt · Roasted almond',
    },
    image: 'images/menu-caramel-cappuccino.jpg',
    isSignature: true,
    defaultMilk: 'whole',
  },
  {
    id: 'iced-matcha',
    name: { ru: 'Айс Матча', en: 'Iced Matcha' },
    category: 'matcha',
    categoryLabel: { ru: 'Матча', en: 'Matcha' },
    priceUsd: 5.75,
    priceRub: 450,
    description: {
      ru: 'Церемониальная матча первого урожая из Удзи, взбитая вручную венчиком и поданная с холодным овсяным молоком.',
      en: 'First-harvest Uji ceremonial matcha hand-whisked to order and poured over crystalline ice and cold oat milk.',
    },
    tastingNotes: {
      ru: 'Сладкий умами · Свежий бамбук · Овсяный крем',
      en: 'Sweet umami · Fresh bamboo · Creamy oat',
    },
    image: 'images/menu-iced-matcha.jpg',
    isSignature: true,
    defaultMilk: 'oat',
    badge: { ru: 'Моносорт Удзи', en: 'Single Cultivar' },
  },
  {
    id: 'classic-espresso',
    name: { ru: 'Классический Эспрессо', en: 'Classic Espresso' },
    category: 'coffee',
    categoryLabel: { ru: 'Кофе', en: 'Coffee' },
    priceUsd: 3.25,
    priceRub: 260,
    description: {
      ru: 'Выверенная двойная экстракция из 18 г зерна в тёплой керамической чашке со стаканом прохладной воды.',
      en: 'Precisely dialed 18g double extraction served in warm stoneware with a sparkling mineral palate cleanser.',
    },
    tastingNotes: {
      ru: 'Бергамот · Молочный шоколад · Тростник',
      en: 'Bergamot · Milk chocolate · Molasses',
    },
    image: 'images/menu-classic-espresso.jpg',
    isSignature: true,
    defaultMilk: 'none',
  },
  {
    id: 'spanish-latte',
    name: { ru: 'Испанский Латте', en: 'Spanish Latte' },
    category: 'coffee',
    categoryLabel: { ru: 'Кофе', en: 'Coffee' },
    priceUsd: 5.75,
    priceRub: 440,
    description: {
      ru: 'Яркий эспрессо поверх охлаждённого сгущённого молока, льда и шёлковой пены с лёгкой нотой корицы.',
      en: 'Bold espresso pulled directly over chilled sweetened condensed milk and silky microfoam with warm cinnamon dust.',
    },
    tastingNotes: {
      ru: 'Сливочная карамель · Тёплая корица · Бархатный кофе',
      en: 'Sweet cream · Warm spice · Velvet espresso',
    },
    image: 'images/menu-spanish-latte.jpg',
    isSignature: true,
    defaultMilk: 'whole',
  },
  {
    id: 'pistachio-latte',
    name: { ru: 'Фисташковый Латте', en: 'Pistachio Latte' },
    category: 'coffee',
    categoryLabel: { ru: 'Кофе', en: 'Coffee' },
    priceUsd: 6.0,
    priceRub: 470,
    description: {
      ru: 'Пралине из сицилийской фисташки собственного помола с двойным эспрессо и дроблёным орехом.',
      en: 'House-stoneground Sicilian pistachio praline folded into double espresso and topped with crushed roasted kernels.',
    },
    tastingNotes: {
      ru: 'Жареная фисташка · Марципан · Какао-бобы',
      en: 'Roasted pistachio · Marzipan · Cocoa nib',
    },
    image: 'images/menu-pistachio-latte.jpg',
    isSignature: true,
    defaultMilk: 'oat',
    badge: { ru: 'Хит сезона', en: 'Seasonal Favorite' },
  },
  {
    id: 'cold-brew',
    name: { ru: 'Колд Брю', en: 'Cold Brew' },
    category: 'cold',
    categoryLabel: { ru: 'Холодные напитки', en: 'Cold Drinks' },
    priceUsd: 5.0,
    priceRub: 390,
    description: {
      ru: 'Моносорт Кения AA холодного настаивания в течение 18 часов, подаётся на крупном кристальном кубе льда.',
      en: 'Single-origin Kenyan AA slow-steeped for 18 hours in filtered water and served over a hand-cut clear ice block.',
    },
    tastingNotes: {
      ru: 'Чёрная смородина · Спелая слива · Чистый какао',
      en: 'Blackcurrant · Dark plum · Clean cocoa',
    },
    image: 'images/menu-cold-brew.jpg',
    isSignature: true,
    defaultMilk: 'none',
  },
  {
    id: 'hot-matcha',
    name: { ru: 'Церемониальная Матча', en: 'Ceremonial Hot Matcha' },
    category: 'matcha',
    categoryLabel: { ru: 'Матча', en: 'Matcha' },
    priceUsd: 5.5,
    priceRub: 430,
    description: {
      ru: 'Киотский зелёный чай каменного помола, взбитый бамбуковым часэном в тёплой керамической пиале.',
      en: 'Stone-milled Kyoto green tea whisked with bamboo chasen into textured, warm milk inside a handmade ceramic bowl.',
    },
    tastingNotes: {
      ru: 'Нежный умами · Сладкий крем · Нефритовый лист',
      en: 'Velvet umami · Sweet cream · Jade aroma',
    },
    image: 'images/menu-hot-matcha.jpg',
    isSignature: false,
    defaultMilk: 'oat',
  },
  {
    id: 'espresso-tonic',
    name: { ru: 'Айс Американо', en: 'Iced Americano' },
    category: 'cold',
    categoryLabel: { ru: 'Холодные напитки', en: 'Cold Drinks' },
    priceUsd: 4.75,
    priceRub: 370,
    description: {
      ru: 'Двойной эспрессо на мытой Эфиопии, аккуратно влитый в холодную родниковую воду со льдом.',
      en: 'Double shot of washed single-origin Ethiopian espresso poured gently over chilled spring water and crystal ice.',
    },
    tastingNotes: {
      ru: 'Бергамот · Дикий жасмин · Чистый шоколад',
      en: 'Bergamot · Wild jasmine · Crisp cacao',
    },
    image: 'images/menu-espresso-tonic.jpg',
    isSignature: false,
    defaultMilk: 'none',
    badge: { ru: 'Выбор бариста', en: 'Barista Pick' },
  },
  {
    id: 'butter-croissant',
    name: { ru: 'Круассан на сливочном масле', en: 'Cultured Butter Croissant' },
    category: 'desserts',
    categoryLabel: { ru: 'Десерты', en: 'Desserts' },
    priceUsd: 4.75,
    priceRub: 360,
    description: {
      ru: 'Слоёное тесто 72-часовой холодной ферментации, выпеченное в 06:00 утра на фермерском сливочном масле.',
      en: '72-hour cold-fermented sourdough lamination baked every morning at 6:00 AM with French Normandy cultured butter.',
    },
    tastingNotes: {
      ru: 'Золотистые соты · Топлёное масло · Хрустящая корочка',
      en: 'Golden honeycomb · Cultured butter · Crisp flake',
    },
    image: 'images/menu-croissant.jpg',
    isSignature: false,
    defaultMilk: 'none',
    badge: { ru: 'Печём в 06:00', en: 'Baked at 06:00' },
  },
  {
    id: 'basque-cheesecake',
    name: { ru: 'Баскский чизкейк', en: 'Basque Burnt Cheesecake' },
    category: 'desserts',
    categoryLabel: { ru: 'Десерты', en: 'Desserts' },
    priceUsd: 7.5,
    priceRub: 560,
    description: {
      ru: 'Карамелизованная тёмно-янтарная корочка и кремовая сердцевина с мадагаскарской ванилью — идеальная пара к эспрессо.',
      en: 'Caramelized deep-amber crust yielding to a cool, custardy Madagascar vanilla heart—crafted to pair with espresso.',
    },
    tastingNotes: {
      ru: 'Жжёные сливки · Ваниль Бурбон · Нежный мусс',
      en: 'Caramelized cream · Madagascar vanilla · Silky custard',
    },
    image: 'images/menu-cheesecake.jpg',
    isSignature: false,
    defaultMilk: 'none',
  },
];

export const ATMOSPHERE_GALLERY: AtmosphereItem[] = [
  {
    id: 'morning-light',
    index: '01',
    title: {
      ru: 'Архитектура утреннего света',
      en: 'Architectural Morning Light',
    },
    caption: {
      ru: 'Рифлёный европейский дуб, светлый бетон и длинные утренние тени на столах.',
      en: 'Fluted European oak, limewash concrete, and quiet early sunbeams along Mercer Row.',
    },
    image: 'images/atmo-morning-light.jpg',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10] md:aspect-[16/11]',
  },
  {
    id: 'espresso-macro',
    index: '02',
    title: {
      ru: 'Чистая экстракция',
      en: 'Naked Portafilter Extraction',
    },
    caption: {
      ru: 'Девять бар давления, раскрывающих тигровую крема из свежеобжаренного зерна.',
      en: '9 bars of pressure drawing out tiger-striped crema from freshly rested beans.',
    },
    image: 'images/atmo-espresso-macro.jpg',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5] md:aspect-[4/4.2]',
  },
  {
    id: 'pourover-craft',
    index: '03',
    title: {
      ru: 'Медленный фильтр-бар',
      en: 'Slow Filter Ritual',
    },
    caption: {
      ru: 'Точные проливы из чайника с гусиным носиком на весах с точностью до десятой грамма.',
      en: 'Precision gooseneck pours at our open brew bar, weighed to the tenth of a gram.',
    },
    image: 'images/atmo-pourover.jpg',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'pastry-counter',
    index: '04',
    title: {
      ru: 'Утренняя выпечка',
      en: 'Morning Viennoiserie',
    },
    caption: {
      ru: 'Тёплые слоёные круассаны и булочки с кардамоном на плитах травертина.',
      en: 'Warm laminated croissants and cardamom knots laid on travertine slabs.',
    },
    image: 'images/atmo-pastry-counter.jpg',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'neighborhood-guests',
    index: '05',
    title: {
      ru: 'Неспешные беседы',
      en: 'Unhurried Conversations',
    },
    caption: {
      ru: 'Аналоговый винил звучит мягким фоном, пока гости задерживаются на вторую чашку.',
      en: 'Analog vinyl playing softly while neighbors linger over second cups.',
    },
    image: 'images/atmo-guests.jpg',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]',
  },
];

export const DEMO_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: {
      ru: 'У местного флэт-уайта та самая природная сладость, в которую ничего не хочется добавлять. Каждое четверговое утро прихожу сюда с блокнотом за столик у окна.',
      en: 'The Flat White has the kind of natural sweetness that needs nothing added. I bring a notebook every Thursday morning just to sit in the sunlight by the oak bench.',
    },
    author: { ru: 'Анна Линдквист', en: 'Clara Lindqvist' },
    role: {
      ru: 'Архитектор · Демо-отзыв гостя',
      en: 'Architectural Designer · Sample Guest Note',
    },
    rating: 5,
    favoriteOrder: {
      ru: 'Флэт Уайт и круассан',
      en: 'Flat White & Butter Croissant',
    },
  },
  {
    id: 'rev-2',
    quote: {
      ru: 'Редко встретишь пространство, где минимализм сочетается с живым уютом. Фисташковый латте и мягкий звук пластинок дарят ощущение неспешного европейского утра.',
      en: 'Rare to find a room that balances quiet minimalist design with genuine warmth. Their Pistachio Latte and warm vinyl soundtrack feel like a morning in Copenhagen.',
    },
    author: { ru: 'Артём Волков', en: 'Julian Vance' },
    role: {
      ru: 'Арт-директор · Демо-отзыв гостя',
      en: 'Creative Director · Sample Guest Note',
    },
    rating: 5,
    favoriteOrder: {
      ru: 'Фисташковый Латте',
      en: 'Pistachio Latte',
    },
  },
  {
    id: 'rev-3',
    quote: {
      ru: 'Наблюдать, как бариста без спешки заваривают воронку V60, — уже отдельный ритуал. Одно из самых спокойных мест в центре, чтобы начать день.',
      en: 'Watching the baristas weigh every pour-over with calm precision sets the tone for the whole day. Hands down my favorite slow coffee ritual in the neighborhood.',
    },
    author: { ru: 'Елена Моралес', en: 'Elena Morales' },
    role: {
      ru: 'Гастрономический журналист · Демо-отзыв',
      en: 'Culinary Writer · Sample Guest Note',
    },
    rating: 5,
    favoriteOrder: {
      ru: 'Колд Брю и баскский чизкейк',
      en: 'Cold Brew & Basque Cheesecake',
    },
  },
];
