import { MenuItem, Branch, JobPost, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Lauriat Meals
  {
    id: 'lauriat-chicken',
    name: 'Chinese-Style Fried Chicken Lauriat',
    category: 'lauriat',
    description: 'Crispy, juicy Chinese-style fried chicken served with egg fried rice, half-portion Pancit Canton, Egg Roll, Siomai, and Chicharap.',
    price: 219,
    calories: 1040,
    rating: 4.9,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    spiceLevel: 0,
    sizeOptions: [
      { name: 'Regular (1 pc Chicken)', priceAdjustment: 0 },
      { name: 'Large (2 pcs Chicken)', priceAdjustment: 75 }
    ],
    addonOptions: [
      { id: 'add-siomai-3', name: 'Add 3pcs Siomai', price: 55 },
      { id: 'upgrade-chao-fan', name: 'Upgrade to Chao Fan', price: 29 },
      { id: 'add-buchi-1', name: 'Add 1 pc Buchi', price: 18 }
    ]
  },
  {
    id: 'lauriat-pork',
    name: 'Sweet & Sour Pork Lauriat',
    category: 'lauriat',
    description: 'Crispy pork chunks tossed in signature sweet and sour sauce with bell peppers and pineapples, with egg fried rice, Pancit Canton, Egg Roll, Siomai, and Chicharap.',
    price: 229,
    calories: 980,
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    spiceLevel: 0,
    addonOptions: [
      { id: 'add-siomai-3', name: 'Add 3pcs Siomai', price: 55 },
      { id: 'add-drink-large', name: 'Upgrade Drink to Large Pearl Milk Tea', price: 49 }
    ]
  },
  {
    id: 'lauriat-fish',
    name: 'Sweet & Sour Fish Lauriat',
    category: 'lauriat',
    description: 'Tender fish fillets fried light and golden, enveloped in our signature sweet and sour glaze, paired with standard Lauriat sides.',
    price: 225,
    calories: 890,
    rating: 4.7,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0,
    addonOptions: [
      { id: 'add-siomai-3', name: 'Add 3pcs Siomai', price: 55 }
    ]
  },

  // Chao Fan
  {
    id: 'chaofan-pork',
    name: 'Pork Chao Fan with Siomai',
    category: 'chaofan',
    description: 'Wok-fired rice mixed with tender pork cubes, fresh egg, carrots, and spring onions, topped with 4 savory steamed pork siomai.',
    price: 139,
    originalPrice: 159,
    calories: 720,
    rating: 4.9,
    reviewsCount: 3840,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isPromo: true,
    spiceLevel: 0,
    sizeOptions: [
      { name: 'Regular Platters', priceAdjustment: 0 },
      { name: 'Yang Chow Platter Extra', priceAdjustment: 40 }
    ],
    addonOptions: [
      { id: 'add-fried-egg', name: 'Add Fried Egg on Top', price: 15 },
      { id: 'extra-siomai-2', name: 'Extra 2pcs Siomai', price: 35 },
      { id: 'make-chili-hot', name: 'Make it Chili-Chao Fan (Spicy)', price: 10 }
    ]
  },
  {
    id: 'chaofan-beef',
    name: 'Beef Chao Fan with Fried Dumpling',
    category: 'chaofan',
    description: 'Wok-hei rich beef fried rice loaded with savory beef strips and greens, served with 3 pieces of golden-fried pork dumplings.',
    price: 155,
    calories: 780,
    rating: 4.8,
    reviewsCount: 2210,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 1,
    addonOptions: [
      { id: 'add-fried-egg', name: 'Add Fried Egg on Top', price: 15 },
      { id: 'add-chili-oil', name: 'Add Extra Chili Garlic Sauce', price: 5 }
    ]
  },

  // Dim Sum
  {
    id: 'dimsum-steamed-siomai',
    name: 'Steamed Pork Siomai (4pcs)',
    category: 'dimsum',
    description: 'Our iconic tasty bites packed with pure pork and shrimp filling, wrapped in delicate skins and steamed. Served with soy sauce and signature chili garlic oil.',
    price: 79,
    calories: 280,
    rating: 4.9,
    reviewsCount: 1950,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0,
    sizeOptions: [
      { name: '4 Pieces', priceAdjustment: 0 },
      { name: '6 Pieces', priceAdjustment: 35 }
    ]
  },
  {
    id: 'dimsum-fried-dumplings',
    name: 'Crispy Fried Dumplings (4pcs)',
    category: 'dimsum',
    description: 'Deep-fried pork dumplings featuring a crunchy outer layer and savory, juicy seasoned pork core inside. Comes with special dipping vinegar.',
    price: 89,
    calories: 360,
    rating: 4.7,
    reviewsCount: 920,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0
  },
  {
    id: 'dimsum-buchi',
    name: 'Sweet Lotus Buchi (3pcs)',
    category: 'dimsum',
    description: 'Crisp sesame seed-coated glutinous rice balls stuffed with a warm, creamy sweetened red lotus seed paste.',
    price: 59,
    calories: 240,
    rating: 4.8,
    reviewsCount: 1100,
    image: 'https://images.unsplash.com/photo-1616031034440-279090aa4fa4?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0
  },

  // Noodles
  {
    id: 'noodles-mami',
    name: 'Beef Wonton Mami',
    category: 'noodles',
    description: 'Warm, heartwarming rich beef broth loaded with fresh egg noodles, tender braised beef cubes, spring onions, pak choi, and juicy pork wontons.',
    price: 139,
    calories: 520,
    rating: 4.8,
    reviewsCount: 1850,
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    spiceLevel: 0,
    addonOptions: [
      { id: 'upgrade-mami-large', name: 'Upgrade to King Size Bowl', price: 30 },
      { id: 'add-siopao-mini', name: 'Add 1 pc Mini Asado Siopao', price: 35 }
    ]
  },
  {
    id: 'noodles-canton',
    name: 'Savory Pancit Canton Regular',
    category: 'noodles',
    description: 'Stir-fried flour noodles loaded with sliced chicken, shrimp, pork liver, and fresh crisp garden vegetables in dynamic wok seasoning.',
    price: 119,
    calories: 450,
    rating: 4.7,
    reviewsCount: 1315,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0,
    addonOptions: [
      { id: 'add-calamansi-extra', name: 'Extra 2 pcs Calamansi', price: 5 }
    ]
  },

  // Siopao
  {
    id: 'siopao-asado-king',
    name: 'Chowking King Asado Siopao',
    category: 'siopao',
    description: 'Our signature soft, fluffy steamed white bun loaded with chunky pork cooked to tender perfection in sweet, aromatic savory Asado glaze.',
    price: 65,
    calories: 340,
    rating: 4.9,
    reviewsCount: 4210,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    spiceLevel: 0,
    sizeOptions: [
      { name: '1 Piece Regular King', priceAdjustment: 0 },
      { name: '2 Pieces King Pack', priceAdjustment: 59 },
      { name: '3 Pieces King Box', priceAdjustment: 115 }
    ]
  },
  {
    id: 'siopao-bolabola',
    name: 'King Bola-Bola Siopao supreme',
    category: 'siopao',
    description: 'Premium steamed bun filled with flavorful mixed minced pork, Chinese sausage (lap cheong), and salted duck egg yolk.',
    price: 75,
    calories: 390,
    rating: 4.6,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0
  },

  // Halo-Halo
  {
    id: 'halohalo-supersangkap',
    name: 'Super Sangkap Halo-Halo with Ice Cream',
    category: 'halohalo',
    description: 'The ultimate Filipino cooling dessert! Premium shaved ice layered with sweetened fruit-mix, beans, leche flan, uba halaya, nata de coco, toasted pinipig, and a big scoop of premium Ube Ice Cream.',
    price: 115,
    originalPrice: 125,
    calories: 420,
    rating: 4.9,
    reviewsCount: 5120,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isPromo: true,
    spiceLevel: 0,
    sizeOptions: [
      { name: 'Regular Size', priceAdjustment: 0 },
      { name: 'Large Size w/ Double Ice Cream', priceAdjustment: 35 }
    ]
  },

  // Milk Tea
  {
    id: 'milktea-pearl',
    name: 'Chowking Pearl Milk Tea',
    category: 'milktea',
    description: 'Brewed black tea infused with sweet milk, brown sugar syrup, and cold, chewy brown sugar tapioca pearls.',
    price: 89,
    calories: 310,
    rating: 4.5,
    reviewsCount: 740,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0,
    sizeOptions: [
      { name: 'Medium Size', priceAdjustment: 0 },
      { name: 'Large Size Extra Pearl', priceAdjustment: 20 }
    ]
  },

  // Family Bundles
  {
    id: 'family-feast-a',
    name: 'Chowking Family Feast A (3-4 Pax)',
    category: 'family',
    description: 'A colossal feast containing 4 portions of Pork Chao Fan, 4 single-pieces Crispy Chinese Fried Chicken, a Regular Pancit Canton platter, 4 pcs Steamed Siomai, and a bag of Chicharap.',
    price: 699,
    originalPrice: 825,
    calories: 2850,
    rating: 4.9,
    reviewsCount: 1670,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isPromo: true,
    spiceLevel: 0,
    addonOptions: [
      { id: 'upgrade-to-halohalo-family', name: 'Add 4 Mini Halo-Halos', price: 249 },
      { id: 'upgrade-to-box-siopao', name: 'Add Box of 3 Asado Siopao', price: 175 }
    ]
  },
  {
    id: 'family-chao-fan-platter',
    name: 'Pork Chao Fan Family Platter (Shareable)',
    category: 'family',
    description: 'A large sharing-size wok platter containing golden fried Pork Chao Fan, perfect for 3 to 4 hungry family members.',
    price: 329,
    calories: 1980,
    rating: 4.8,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    spiceLevel: 0
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'br-cubao',
    name: 'Chowking Gateway Mall Cubao',
    address: 'Ground Floor, Gateway Mall, Aurora Blvd, Cubao, Quezon City',
    city: 'Quezon City',
    phone: '(02) 8911-3101',
    hours: '7:00 AM - 10:00 PM',
    lat: 14.6219,
    lng: 121.0531,
    hasDriveThru: false,
    hasDineIn: true,
    hasDelivery: true,
    is24Hours: false
  },
  {
    id: 'br-makati-ave',
    name: 'Chowking Makati Avenue 24/7',
    address: 'Makati Ave Cor Guerrero St, Brgy Poblacion, Makati City',
    city: 'Makati',
    phone: '(02) 8899-2470',
    hours: 'Open 24 Hours',
    lat: 14.5622,
    lng: 121.0312,
    hasDriveThru: true,
    hasDineIn: true,
    hasDelivery: true,
    is24Hours: true
  },
  {
    id: 'br-taft-vito-cruz',
    name: 'Chowking Taft Avenue Vito Cruz',
    address: 'Taft Avenue corner Pablo Ocampo St (near DLSU), Malate, Manila',
    city: 'Manila',
    phone: '(02) 8525-4509',
    hours: '6:00 AM - Midnight',
    lat: 14.5633,
    lng: 120.9949,
    hasDriveThru: false,
    hasDineIn: true,
    hasDelivery: true,
    is24Hours: false
  },
  {
    id: 'br-bgc-stopover',
    name: 'Chowking BGC stopover Plaza',
    address: 'Upper Ground Floor, BGC Stopover, 31st St cor 2nd Ave, BGC, Taguig',
    city: 'Taguig',
    phone: '(02) 8810-7462',
    hours: 'Open 24 Hours',
    lat: 14.5552,
    lng: 121.0415,
    hasDriveThru: false,
    hasDineIn: true,
    hasDelivery: true,
    is24Hours: true
  },
  {
    id: 'br-alabang-zapote',
    name: 'Chowking Alabang Zapote Drive-Thru',
    address: 'Alabang-Zapote Road corner Filinvest Ave, Alabang, Muntinlupa City',
    city: 'Muntinlupa',
    phone: '(02) 8771-4501',
    hours: 'Open 24 Hours',
    lat: 14.4258,
    lng: 121.0321,
    hasDriveThru: true,
    hasDineIn: true,
    hasDelivery: true,
    is24Hours: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Kylie Alcantara',
    rating: 5,
    comment: 'Nothing beats the comfort of a warm Pork Chao Fan and Chinese Fried Chicken Lauriat on a rainy afternoon! The delivery was ultra-fast and the food arrived piping hot.',
    date: '3 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    itemBought: 'Chinese-Style Fried Chicken Lauriat'
  },
  {
    id: 'rev-2',
    name: 'Marcus Jimenez',
    rating: 5,
    comment: 'Super Sangkap Halo-Halo is the absolute gold standard for dessert here. This app has incredibly smooth animations. Ordered the Family Bundle within 3 taps!',
    date: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    itemBought: 'Super Sangkap Halo-Halo with Ice Cream'
  },
  {
    id: 'rev-3',
    name: 'Tricia Santos',
    rating: 5,
    comment: 'Chowking Siopao has been our Sunday family breakfast tradition for 10 years. Ordering from this website was a total breeze. Big fan of the digital scratch-card promo, got 15% off!',
    date: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    itemBought: 'Chowking King Asado Siopao'
  }
];

export const JOB_POSTS: JobPost[] = [
  {
    id: 'job-1',
    title: 'Assistant Restaurant Store Manager',
    department: 'Store Service',
    location: 'Makati Operations Hub',
    type: 'Full-time',
    description: 'Supervise shift operations, manage restaurant crew, handle customer service escalations, and drive monthly target metrics.',
    requirements: [
      'Bachelor’s Degree in Hospitality Management, Business Administration or equivalent field',
      'At least 2 years of supervisory experience in a fast-paced Quick Service Restaurant (QSR)',
      'Strong leadership, team building, and operational communication skills',
      'Proficient in inventory controls and POS software structures'
    ]
  },
  {
    id: 'job-2',
    title: 'Service & Kitchen Assembly Specialist',
    department: 'Kitchen',
    location: 'Gateway Mall Cubao Branch',
    type: 'Full-time',
    description: 'Prepare, cook, and assemble signature Chowking dishes including Chao Fan wok tosses, Lauriat box setups, and Dim Sum steamings while upholding highest sanitary codes.',
    requirements: [
      'High School Graduate or Vocational Course in Culinary Arts or Food & Beverage',
      'Willingness to undergo extensive fast-food, high-precision wok training',
      'Passionate, detail-oriented, energetic team player',
      'Available to work on flexible rolling shifts, including holidays and weekends'
    ]
  },
  {
    id: 'job-3',
    title: 'Fast-Track Professional Delivery Rider',
    department: 'Delivery',
    location: 'BGC Taguig Branch',
    type: 'Full-time',
    description: 'Ensure prompt, friendly, safe and efficient delivery of freshly packed meals to local corporate offices and residential communities.',
    requirements: [
      'Requires a valid Professional Driver License (Subcode A/A1)',
      'Possess own roadworthy motorcycle with valid LTO Registration and active insurance',
      'Familiar with BGC and Makati geographical grids, secondary shortcuts, and buildings',
      'Excellent track record of customer courtesy, safety compliance, and punctuality'
    ]
  }
];

export const FAQS = [
  {
    question: 'How fast is the standard delivery? What are the charges?',
    answer: 'Our standard delivery aims to get your delicious food to your doorstep in 30-45 minutes depending on distance, traffic, and order volume. Delivery fee is a flat rate of ₱49 nationwide, but you can get free delivery by using special codes or hitting the minimum purchase amount of ₱550.'
  },
  {
    question: 'How can I apply for a Chowking Franchise? What is the investment cost?',
    answer: 'Chowking has been a cornerstone of Filipino franchising success since 1985. The total initial investment ranges from ₱12 Million to ₱15 Million depending on store size, layout formats (Dine-in, Drive-thru, or Mall counters), and location constraints. This covers the license fee, construction, kitchen equipment, signage, store seating, and initial operational setup. Complete our digital Franchise Form on this page to receive our official prospectus brochure.'
  },
  {
    question: 'Where can I find dietary and allergen listings for food items?',
    answer: 'Each menu card on this website features deep calories, allergen tags, and customization overlays. Many item listings contain details of soy, wheat, dairy, and shellfish content. For custom alterations (such as no egg or low salt), you can write special instructions inside the Cart customized tray before final checkout.'
  },
  {
    question: 'What payment options do you support for online checkout?',
    answer: 'We supply a state-of-the-art cashless checkout. We accept Cash on Delivery (COD), GCash, Maya digital wallets, and Visa or Mastercard Debit/Credit cards.'
  }
];

export const BRANDS_TIMELINE = [
  {
    year: '1985',
    title: 'The Inception',
    description: 'The first Chowking store opens at the heart of Plaza Carriedo in Quiapo, Manila, spearheaded by Robert Kuan, pioneering a brand new concept of Chinese-style fast food in the Philippines.'
  },
  {
    year: '1989',
    title: 'Franchise Revolution',
    description: 'Chowking expands its scope through structured franchising, rapidly opening branches in Southern Luzon and entering key national provincial capitals.'
  },
  {
    year: '2000',
    title: 'The Jollibee Integration',
    description: 'Jollibee Foods Corporation (JFC), the country’s leading QSR giant, officially acquires Chowking, injecting global food standards, supply chains, and research technologies.'
  },
  {
    year: '2015',
    title: 'Going Global & Modernizing',
    description: 'Stores expand globally, opening branches in the US, UAE, Qatar, and Singapore, introducing Chao Fan and Halo-Halo to overseas Filipinos and international foodies alike.'
  },
  {
    year: '2026',
    title: 'Digital Redesign Era',
    description: 'Unveiling the premium digital layout format—featuring fast mobile-first UI, online tracking overlays, interactive scratch-cards, and a hyper-smooth ordering pipeline.'
  }
];
