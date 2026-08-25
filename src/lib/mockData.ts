import { Product, ShoppingMission, PriceWatchItem } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'phone-apple-iphone-17-pro-max',
    title: 'Apple iPhone 17 Pro Max (Natural Titanium, 256GB Storage)',
    brand: 'Apple',
    model: 'iPhone 17 Pro Max',
    category: 'smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Processor': 'A19 Pro Bionic Chip with 6-Core GPU',
      'Camera': '48MP Fusion Triple Camera + 5x Telephoto + 24MP Selfie',
      'Display': '6.9 inch Super Retina XDR OLED (ProMotion 120Hz)',
      'Build': 'Grade 5 Titanium Frame + Ceramic Shield Front',
      'Battery': 'Up to 33 hours video playback + USB-C 3'
    },
    currentBestTruePrice: 144900,
    mrp: 159900,
    lowestPrice365d: 142900,
    highestPrice365d: 159900,
    averagePrice30d: 149900,
    priceVolatility: 'Low',
    verdict: 'BUY',
    verdictReason: 'Exact product match for Apple iPhone 17. Flagship performance with A19 Pro chip, Titanium build, 48MP Fusion camera system, and verified ₹15,000 instant bank discount.',
    badge: 'Exact Match',
    dealScore: {
      overallScore: 94,
      priceAdvantage: 93,
      productFit: 97,
      reviewQuality: 96,
      sellerTrust: 97,
      priceHistoryScore: 92,
      specificationValue: 96,
      warrantyValue: 94,
      availabilityScore: 96
    },
    offers: [
      {
        id: 'offer-amazon-iphone-17',
        merchantName: 'Amazon.in',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80',
        basePrice: 149900,
        shippingFee: 0,
        applicableCoupons: 2000,
        bankDiscount: 3000,
        cashbackEstimated: 0,
        finalTruePrice: 144900,
        inStock: true,
        deliveryEstimate: 'Tomorrow by 10 AM (Prime)',
        affiliateUrl: 'https://www.amazon.in/s?k=Apple+iPhone+17+Pro+Max&tag=dealsathi-21',
        sellerName: 'Appario Retail Private Ltd',
        sellerRating: 4.9
      },
      {
        id: 'offer-flipkart-iphone-17',
        merchantName: 'Flipkart',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80',
        basePrice: 151900,
        shippingFee: 0,
        applicableCoupons: 1000,
        bankDiscount: 5000,
        cashbackEstimated: 0,
        finalTruePrice: 145900,
        inStock: true,
        deliveryEstimate: '2 Days via Flipkart Assured',
        affiliateUrl: 'https://www.flipkart.com/search?q=Apple+iPhone+17+Pro+Max&affid=dealsathi',
        sellerName: 'SuperComNet',
        sellerRating: 4.8
      }
    ],
    priceHistory: [
      { date: 'Feb 01', price: 159900, merchant: 'Amazon.in' },
      { date: 'Feb 15', price: 149900, merchant: 'Amazon.in' },
      { date: 'Today', price: 144900, merchant: 'Amazon.in' }
    ],
    reviewIntelligence: {
      sentimentScore: 96,
      totalAnalyzed: 4120,
      suspiciousSignalsDetected: false,
      positiveThemes: ['Unmatched Video Recording', 'Titanium Build', 'A19 Pro Speed'],
      negativeThemes: ['Premium pricing'],
      recurringDefects: [],
      topPros: ['Industry-leading camera stabilization', 'Sleek lightweight Titanium chassis', 'Outstanding 33-hour battery life'],
      topCons: ['Higher entry cost']
    }
  },
  {
    id: 'phone-samsung-s26-ultra',
    title: 'Samsung Galaxy S26 Ultra 5G (Titanium Black, 12GB RAM, 256GB Storage)',
    brand: 'Samsung',
    model: 'Galaxy S26 Ultra',
    category: 'smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Processor': 'Snapdragon 8 Gen 4 for Galaxy',
      'Camera': '200MP Quad OIS Telephoto + 50MP Periscope 10x + 50MP Ultra Wide',
      'Display': '6.8 inch Dynamic AMOLED 2X (1-120Hz, 3000 nits Anti-Reflective)',
      'S Pen': 'Integrated Bluetooth S Pen Stylus',
      'Battery': '5000 mAh + 45W Super Fast Charging 2.0'
    },
    currentBestTruePrice: 129999,
    mrp: 139999,
    lowestPrice365d: 128999,
    highestPrice365d: 139999,
    averagePrice30d: 134999,
    priceVolatility: 'Low',
    verdict: 'BUY',
    verdictReason: 'Exact product match for Samsung Galaxy S26 Ultra. Premier flagship smartphone with 200MP Quad Camera system, integrated S Pen, anti-reflective display, and verified bank discount savings.',
    badge: 'Exact Match',
    dealScore: {
      overallScore: 93,
      priceAdvantage: 92,
      productFit: 96,
      reviewQuality: 95,
      sellerTrust: 96,
      priceHistoryScore: 90,
      specificationValue: 97,
      warrantyValue: 92,
      availabilityScore: 95
    },
    offers: [
      {
        id: 'offer-amazon-s26-ultra',
        merchantName: 'Amazon.in',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80',
        basePrice: 134999,
        shippingFee: 0,
        applicableCoupons: 2000,
        bankDiscount: 3000,
        cashbackEstimated: 0,
        finalTruePrice: 129999,
        inStock: true,
        deliveryEstimate: 'Tomorrow by 10 AM (Prime)',
        affiliateUrl: 'https://www.amazon.in/s?k=Samsung+Galaxy+S26+Ultra&tag=dealsathi-21',
        sellerName: 'Appario Retail Private Ltd',
        sellerRating: 4.9
      }
    ],
    priceHistory: [
      { date: 'Feb 01', price: 139999, merchant: 'Amazon.in' },
      { date: 'Feb 15', price: 134999, merchant: 'Amazon.in' },
      { date: 'Today', price: 129999, merchant: 'Amazon.in' }
    ],
    reviewIntelligence: {
      sentimentScore: 95,
      totalAnalyzed: 3820,
      suspiciousSignalsDetected: false,
      positiveThemes: ['Unmatched 200MP Zoom', 'Anti-Reflective Display', 'S Pen Functionality'],
      negativeThemes: ['Heavy flagship body'],
      recurringDefects: [],
      topPros: ['Best mobile camera zoom system available', 'Integrated S Pen stylus', '7 years of OS updates'],
      topCons: ['Slightly heavy in hand']
    }
  },
  {
    id: 'phone-nothing-phone-4a',
    title: 'Nothing Phone (4a) 5G (White, 8GB RAM, 128GB Storage)',
    brand: 'Nothing',
    model: 'Phone (4a)',
    category: 'smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Processor': 'Dimensity 7200 Pro',
      'Camera': '50MP Dual OIS + 32MP Front',
      'Display': '6.7 inch Flexible AMOLED (120Hz)',
      'Glyph Interface': 'Iconic LED Light Strips',
      'Battery': '5000 mAh + 45W Fast Charging'
    },
    currentBestTruePrice: 23999,
    mrp: 27999,
    lowestPrice365d: 22999,
    highestPrice365d: 27999,
    averagePrice30d: 25499,
    priceVolatility: 'Low',
    verdict: 'BUY',
    verdictReason: 'Exact product match for Nothing 4a. Cleanest software experience under ₹25,000 with custom Glyph notifications and verified OIS camera stability.',
    badge: 'Exact Match',
    dealScore: {
      overallScore: 92,
      priceAdvantage: 94,
      productFit: 95,
      reviewQuality: 92,
      sellerTrust: 93,
      priceHistoryScore: 91,
      specificationValue: 90,
      warrantyValue: 90,
      availabilityScore: 95
    },
    offers: [
      {
        id: 'offer-flipkart-nothing-4a',
        merchantName: 'Flipkart',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80',
        basePrice: 25999,
        shippingFee: 0,
        applicableCoupons: 1000,
        bankDiscount: 1000,
        cashbackEstimated: 0,
        finalTruePrice: 23999,
        inStock: true,
        deliveryEstimate: 'Tomorrow by 2 PM via Flipkart Assured',
        affiliateUrl: 'https://www.flipkart.com/search?q=Nothing+Phone+4a&affid=dealsathi',
        sellerName: 'SuperComNet',
        sellerRating: 4.8
      }
    ],
    priceHistory: [
      { date: 'Jan 15', price: 27999, merchant: 'Flipkart' },
      { date: 'Feb 01', price: 25999, merchant: 'Flipkart' },
      { date: 'Today', price: 23999, merchant: 'Flipkart' }
    ],
    reviewIntelligence: {
      sentimentScore: 91,
      totalAnalyzed: 1420,
      suspiciousSignalsDetected: false,
      positiveThemes: ['Nothing OS 2.5 Clean Interface', 'Glyph Lights', 'Great 50MP OIS Camera'],
      negativeThemes: ['No charger included in retail box'],
      recurringDefects: [],
      topPros: ['Zero bloatware software', 'Distinctive design', 'Vibrant 120Hz display'],
      topCons: ['Charger sold separately']
    }
  },
  {
    id: 'phone-iqoo-neo-9-pro',
    title: 'iQOO Neo 9 Pro 5G (Fiery Red, 8GB RAM, 256GB Storage)',
    brand: 'iQOO',
    model: 'Neo 9 Pro',
    category: 'smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Processor': 'Snapdragon 8 Gen 2 Mobile Platform',
      'Camera': '50MP Sony IMX920 Night Vision + 8MP Ultra Wide',
      'Display': '144Hz LTPO AMOLED Display (3000 nits)',
      'Battery': '5160 mAh + 120W FlashCharge'
    },
    currentBestTruePrice: 33499,
    mrp: 39999,
    lowestPrice365d: 32999,
    highestPrice365d: 37999,
    averagePrice30d: 34999,
    priceVolatility: 'Low',
    verdict: 'BUY',
    verdictReason: 'Best camera & gaming performance match under ₹35,000. True price is ₹1,500 below its 30-day market average with verified 120W fast charging safety scores.',
    badge: 'Best Overall',
    dealScore: {
      overallScore: 94,
      priceAdvantage: 95,
      productFit: 96,
      reviewQuality: 92,
      sellerTrust: 95,
      priceHistoryScore: 90,
      specificationValue: 98,
      warrantyValue: 90,
      availabilityScore: 95
    },
    offers: [
      {
        id: 'offer-amazon-1',
        merchantName: 'Amazon.in',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80',
        basePrice: 34999,
        shippingFee: 0,
        applicableCoupons: 500,
        bankDiscount: 1000,
        cashbackEstimated: 0,
        finalTruePrice: 33499,
        inStock: true,
        deliveryEstimate: 'Tomorrow by 11 AM (Prime)',
        affiliateUrl: 'https://www.amazon.in/s?k=iQOO+Neo+9+Pro&tag=dealsathi-21',
        sellerName: 'Appario Retail Private Ltd',
        sellerRating: 4.8
      }
    ],
    priceHistory: [
      { date: 'Jan 15', price: 37999, merchant: 'Amazon.in' },
      { date: 'Feb 01', price: 36499, merchant: 'Amazon.in' },
      { date: 'Today', price: 33499, merchant: 'Amazon.in' }
    ],
    reviewIntelligence: {
      sentimentScore: 93,
      totalAnalyzed: 2420,
      suspiciousSignalsDetected: false,
      positiveThemes: ['Exceptional Night Camera', '120W Ultra Fast Charging'],
      negativeThemes: ['FunTouch OS Bloatware'],
      recurringDefects: [],
      topPros: ['Snapdragon 8 Gen 2 speed', 'IMX920 night camera'],
      topCons: ['No wireless charging']
    }
  },
  {
    id: 'phone-nothing-phone-2',
    title: 'Nothing Phone (2) 5G (Dark Grey, 12GB RAM, 256GB Storage)',
    brand: 'Nothing',
    model: 'Phone (2)',
    category: 'smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Processor': 'Snapdragon 8+ Gen 1',
      'Camera': '50MP Dual Sony Sensor + 32MP Front',
      'Display': '6.7 inch OLED LTPO (1-120Hz)',
      'Battery': '4700 mAh + 45W Fast Charging'
    },
    currentBestTruePrice: 34999,
    mrp: 44999,
    lowestPrice365d: 33999,
    highestPrice365d: 44999,
    averagePrice30d: 36999,
    priceVolatility: 'Medium',
    verdict: 'BUY',
    verdictReason: 'Cleanest software experience with unique Glyph interface. Solid camera performance.',
    badge: 'Best Performance',
    dealScore: {
      overallScore: 91,
      priceAdvantage: 90,
      productFit: 94,
      reviewQuality: 90,
      sellerTrust: 92,
      priceHistoryScore: 92,
      specificationValue: 88,
      warrantyValue: 88,
      availabilityScore: 90
    },
    offers: [
      {
        id: 'offer-flipkart-nothing',
        merchantName: 'Flipkart',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80',
        basePrice: 36999,
        shippingFee: 0,
        applicableCoupons: 1000,
        bankDiscount: 1000,
        cashbackEstimated: 0,
        finalTruePrice: 34999,
        inStock: true,
        deliveryEstimate: 'Tomorrow by 4 PM',
        affiliateUrl: 'https://www.flipkart.com/search?q=Nothing+Phone+2&affid=dealsathi',
        sellerName: 'SuperComNet',
        sellerRating: 4.7
      }
    ],
    priceHistory: [
      { date: 'Jan 15', price: 41999, merchant: 'Flipkart' },
      { date: 'Today', price: 34999, merchant: 'Flipkart' }
    ],
    reviewIntelligence: {
      sentimentScore: 90,
      totalAnalyzed: 1840,
      suspiciousSignalsDetected: false,
      positiveThemes: ['Zero Bloatware Nothing OS', 'Unique Glyph notifications'],
      negativeThemes: ['No charger included'],
      recurringDefects: [],
      topPros: ['Cleanest Android software', 'Fluid 120Hz LTPO screen'],
      topCons: ['Charger sold separately']
    }
  },
  {
    id: 'laptop-lenovo-loq-i5',
    title: 'Lenovo LOQ Intel Core i5 13th Gen (16GB RAM / 512GB SSD / RTX 4050 6GB)',
    brand: 'Lenovo',
    model: 'LOQ 15IRH8',
    category: 'laptops',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Processor': 'Intel Core i5-13450HX (10 Cores)',
      'Graphics': 'NVIDIA GeForce RTX 4050 6GB (105W TGP)',
      'RAM': '16GB DDR5 5200MHz',
      'Display': '15.6 inch FHD 144Hz 100% sRGB'
    },
    currentBestTruePrice: 72990,
    mrp: 98990,
    lowestPrice365d: 71990,
    highestPrice365d: 82990,
    averagePrice30d: 76990,
    priceVolatility: 'High',
    verdict: 'BUY',
    verdictReason: 'Unbeatable price-to-performance for a full 105W RTX 4050 gaming laptop.',
    badge: 'Best Value',
    dealScore: {
      overallScore: 95,
      priceAdvantage: 96,
      productFit: 95,
      reviewQuality: 93,
      sellerTrust: 95,
      priceHistoryScore: 94,
      specificationValue: 97,
      warrantyValue: 92,
      availabilityScore: 95
    },
    offers: [
      {
        id: 'offer-croma-lenovo',
        merchantName: 'Croma',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80',
        basePrice: 75990,
        shippingFee: 0,
        applicableCoupons: 1000,
        bankDiscount: 2000,
        cashbackEstimated: 0,
        finalTruePrice: 72990,
        inStock: true,
        deliveryEstimate: 'Express Delivery',
        affiliateUrl: 'https://www.croma.com/searchB?q=Lenovo+LOQ+i5',
        sellerName: 'Croma Official Store',
        sellerRating: 4.9
      }
    ],
    priceHistory: [
      { date: 'Jan 10', price: 82990, merchant: 'Croma' },
      { date: 'Today', price: 72990, merchant: 'Croma' }
    ],
    reviewIntelligence: {
      sentimentScore: 94,
      totalAnalyzed: 1420,
      suspiciousSignalsDetected: false,
      positiveThemes: ['100% sRGB Display', 'Full TGP RTX 4050'],
      negativeThemes: ['Battery life'],
      recurringDefects: [],
      topPros: ['Great display color accuracy', 'Smooth 60+ FPS'],
      topCons: ['Heavy power adapter']
    }
  },
  {
    id: 'earbuds-boat-airdopes-141',
    title: 'boAt Airdopes 141 ANC True Wireless Earbuds (42 Hour Playtime, 32dB ANC)',
    brand: 'boAt',
    model: 'Airdopes 141 ANC',
    category: 'earbuds',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: {
      'Active Noise Cancellation': '32dB Hybrid ANC',
      'Playtime': 'Up to 42 Hours',
      'Connectivity': 'Bluetooth v5.3'
    },
    currentBestTruePrice: 1299,
    mrp: 3990,
    lowestPrice365d: 1199,
    highestPrice365d: 1799,
    averagePrice30d: 1499,
    priceVolatility: 'Low',
    verdict: 'BUY',
    verdictReason: 'Top budget ANC earbuds choice under ₹1,500.',
    badge: 'Cheapest Good Option',
    dealScore: {
      overallScore: 92,
      priceAdvantage: 96,
      productFit: 94,
      reviewQuality: 88,
      sellerTrust: 92,
      priceHistoryScore: 92,
      specificationValue: 95,
      warrantyValue: 85,
      availabilityScore: 95
    },
    offers: [
      {
        id: 'offer-amazon-boat',
        merchantName: 'Amazon.in',
        merchantLogoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80',
        basePrice: 1399,
        shippingFee: 0,
        applicableCoupons: 100,
        bankDiscount: 0,
        cashbackEstimated: 0,
        finalTruePrice: 1299,
        inStock: true,
        deliveryEstimate: 'Tomorrow',
        affiliateUrl: 'https://www.amazon.in/s?k=boAt+Airdopes+141+ANC&tag=dealsathi-21',
        sellerName: 'Imagine Marketing',
        sellerRating: 4.8
      }
    ],
    priceHistory: [
      { date: 'Jan 15', price: 1699, merchant: 'Amazon.in' },
      { date: 'Today', price: 1299, merchant: 'Amazon.in' }
    ],
    reviewIntelligence: {
      sentimentScore: 89,
      totalAnalyzed: 8400,
      suspiciousSignalsDetected: false,
      positiveThemes: ['Great ANC', 'Long battery life'],
      negativeThemes: ['Touch controls'],
      recurringDefects: [],
      topPros: ['Solid noise cancellation', 'Type-C charging'],
      topCons: ['Mic quality in wind']
    }
  }
];

export const MOCK_MISSIONS: ShoppingMission[] = [
  {
    id: 'mission-1',
    title: 'Find My Next Phone Under ₹35,000',
    category: 'smartphones',
    budgetMax: 35000,
    priorityKey: 'Camera & Fast Charging',
    conditionPreference: 'New',
    deadlineDays: 14,
    status: 'Monitoring',
    createdAt: '2026-08-20',
    targetPrice: 33000,
    candidatesCount: 3,
    bestCandidateProduct: MOCK_PRODUCTS[3]
  },
  {
    id: 'mission-2',
    title: 'Gaming Laptop with RTX 4050 under ₹75,000',
    category: 'laptops',
    budgetMax: 75000,
    priorityKey: 'Full TGP GPU & 100% sRGB Screen',
    conditionPreference: 'New',
    deadlineDays: 30,
    status: 'Price Dropped',
    createdAt: '2026-08-15',
    targetPrice: 73000,
    candidatesCount: 2,
    bestCandidateProduct: MOCK_PRODUCTS[5]
  }
];

export const MOCK_PRICE_WATCHES: PriceWatchItem[] = [
  {
    id: 'watch-1',
    productId: 'phone-iqoo-neo-9-pro',
    productTitle: 'iQOO Neo 9 Pro 5G (8GB RAM, 256GB)',
    productImage: MOCK_PRODUCTS[3].imageUrl,
    currentPrice: 33499,
    targetPrice: 32500,
    dealScoreThreshold: 92,
    notifyOnPriceDrop: true,
    lastPriceDropAmount: 1500,
    status: 'ACTIVE',
    createdAt: '2026-08-22'
  },
  {
    id: 'watch-2',
    productId: 'laptop-lenovo-loq-i5',
    productTitle: 'Lenovo LOQ Intel i5 13th Gen / RTX 4050',
    productImage: MOCK_PRODUCTS[5].imageUrl,
    currentPrice: 72990,
    targetPrice: 72990,
    dealScoreThreshold: 90,
    notifyOnPriceDrop: true,
    lastPriceDropAmount: 4000,
    status: 'TRIGGERED',
    createdAt: '2026-08-18'
  }
];
