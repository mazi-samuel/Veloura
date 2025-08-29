// Product and collection data structure - easily scalable
export interface ProductShade {
  id: string
  name: string
  hexCode: string
  description?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  collection: string
  tags: string[]
  shades: ProductShade[]
  ingredients?: string[]
  benefits?: string[]
  howToUse?: string
  rating: number
  reviewCount: number
  featured: boolean
  bestseller: boolean
  newArrival: boolean
  limitedEdition: boolean
  inStock: boolean
  stockLevel?: number
  sku: string
  barcode?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  seoTitle?: string
  seoDescription?: string
  launchDate: string
  discontinuedDate?: string
}

export interface Collection {
  id: string
  name: string
  description: string
  longDescription?: string
  images: string[]
  heroImage: string
  featured: boolean
  season?: string
  launchDate: string
  endDate?: string
  tags: string[]
  story?: string
  inspiration?: string
  productIds: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  parentCategory?: string
  subcategories: string[]
  featured: boolean
  seoTitle?: string
  seoDescription?: string
}

// Mock data - replace with database/API calls in production
export const products: Product[] = [
  {
    id: '1',
    name: 'Velvet Rose',
    description: 'A sophisticated rose with velvet undertones that provides all-day comfort and luxurious color payoff.',
    price: 28,
    images: ['/products/velvet-rose-1.jpg', '/products/velvet-rose-2.jpg'],
    category: 'lip-gloss',
    collection: 'signature',
    tags: ['rose', 'pink', 'velvet', 'comfortable', 'long-lasting'],
    shades: [
      { id: 'velvet-rose-01', name: 'Velvet Rose', hexCode: '#D4506B', description: 'Classic rose with velvet finish' },
      { id: 'velvet-rose-02', name: 'Deep Rose', hexCode: '#B8374D', description: 'Deeper rose for evening wear' },
    ],
    ingredients: ['Vitamin E', 'Jojoba Oil', 'Hyaluronic Acid', 'Natural Waxes'],
    benefits: ['Hydrating', 'Long-lasting', 'Non-sticky', 'Comfortable wear'],
    howToUse: 'Apply to clean lips. Start from the center and work outward. Layer for more intensity.',
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    bestseller: true,
    newArrival: false,
    limitedEdition: false,
    inStock: true,
    stockLevel: 150,
    sku: 'VEL-LG-001',
    barcode: '1234567890123',
    weight: 15,
    dimensions: { length: 12, width: 2, height: 2 },
    seoTitle: 'Velvet Rose Lip Gloss - Luxurious Hydrating Formula | Veloura',
    seoDescription: 'Discover our best-selling Velvet Rose lip gloss with a comfortable, non-sticky formula that provides all-day hydration and beautiful color.',
    launchDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Golden Hour',
    description: 'Warm golden nude that captures the magic of sunset, perfect for everyday wear with a luminous finish.',
    price: 28,
    compareAtPrice: 35,
    images: ['/products/golden-hour-1.jpg', '/products/golden-hour-2.jpg'],
    category: 'lip-gloss',
    collection: 'signature',
    tags: ['nude', 'gold', 'warm', 'luminous', 'everyday'],
    shades: [
      { id: 'golden-hour-01', name: 'Golden Hour', hexCode: '#E6A867', description: 'Warm golden nude' },
      { id: 'golden-hour-02', name: 'Sunset Glow', hexCode: '#D4956B', description: 'Deeper sunset-inspired shade' },
    ],
    ingredients: ['Vitamin E', 'Coconut Oil', 'Peptides', 'Natural Pigments'],
    benefits: ['Plumping', 'Hydrating', 'Luminous finish', 'All-day comfort'],
    howToUse: 'Apply evenly to lips. Can be worn alone or over lip liner for added definition.',
    rating: 4.9,
    reviewCount: 89,
    featured: true,
    bestseller: false,
    newArrival: false,
    limitedEdition: false,
    inStock: true,
    stockLevel: 200,
    sku: 'VEL-LG-002',
    weight: 15,
    launchDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Midnight Berry',
    description: 'Deep berry that flatters all skin tones with a rich, luxurious finish perfect for special occasions.',
    price: 28,
    images: ['/products/midnight-berry-1.jpg'],
    category: 'lip-gloss',
    collection: 'signature',
    tags: ['berry', 'purple', 'deep', 'rich', 'evening'],
    shades: [
      { id: 'midnight-berry-01', name: 'Midnight Berry', hexCode: '#8B2F47', description: 'Rich midnight berry' },
    ],
    ingredients: ['Argan Oil', 'Vitamin C', 'Antioxidants', 'Natural Berry Extracts'],
    benefits: ['Antioxidant protection', 'Rich color payoff', 'Moisturizing', 'Long-wearing'],
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    bestseller: true,
    newArrival: false,
    limitedEdition: false,
    inStock: true,
    stockLevel: 75,
    sku: 'VEL-LG-003',
    weight: 15,
    launchDate: '2024-01-20',
  },
  {
    id: '4',
    name: 'Crystal Clear',
    description: 'Universal clear gloss with a mirror-like shine that enhances your natural lip color.',
    price: 25,
    images: ['/products/crystal-clear-1.jpg'],
    category: 'lip-gloss',
    collection: 'essentials',
    tags: ['clear', 'universal', 'shine', 'natural', 'versatile'],
    shades: [
      { id: 'crystal-clear-01', name: 'Crystal Clear', hexCode: 'transparent', description: 'Crystal clear with high shine' },
    ],
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'Peppermint Oil', 'Natural Polymers'],
    benefits: ['High shine', 'Plumping effect', 'Hydrating', 'Universal wear'],
    rating: 4.6,
    reviewCount: 203,
    featured: false,
    bestseller: true,
    newArrival: false,
    limitedEdition: false,
    inStock: true,
    stockLevel: 300,
    sku: 'VEL-LG-004',
    weight: 15,
    launchDate: '2024-01-10',
  },
  {
    id: '5',
    name: 'Rouge Noir',
    description: 'Limited edition deep red with black undertones, inspired by haute couture and evening elegance.',
    price: 35,
    images: ['/products/rouge-noir-1.jpg', '/products/rouge-noir-2.jpg'],
    category: 'lip-gloss',
    collection: 'limited-edition',
    tags: ['red', 'black', 'limited', 'couture', 'elegant'],
    shades: [
      { id: 'rouge-noir-01', name: 'Rouge Noir', hexCode: '#8B0000', description: 'Deep red with black undertones' },
    ],
    ingredients: ['24K Gold Flakes', 'Rose Hip Oil', 'Vitamin E', 'Premium Pigments'],
    benefits: ['Luxurious formula', 'Intense color', 'Moisturizing', 'Collectible packaging'],
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    bestseller: false,
    newArrival: true,
    limitedEdition: true,
    inStock: true,
    stockLevel: 25,
    sku: 'VEL-LE-001',
    weight: 15,
    launchDate: '2024-03-01',
    discontinuedDate: '2024-06-01',
  },
]

export const collections: Collection[] = [
  {
    id: 'signature',
    name: 'Signature Collection',
    description: 'Our most beloved shades that define the Veloura aesthetic',
    longDescription: 'The Signature Collection represents the heart of Veloura - timeless, sophisticated shades that have been carefully crafted to complement every skin tone and occasion. These are the colors that define our brand and showcase our commitment to luxury and quality.',
    images: ['/collections/signature-1.jpg', '/collections/signature-2.jpg'],
    heroImage: '/collections/signature-hero.jpg',
    featured: true,
    season: 'All Year',
    launchDate: '2024-01-15',
    tags: ['timeless', 'classic', 'versatile', 'bestseller'],
    story: 'Born from our founder\'s vision of creating the perfect everyday lip color, the Signature Collection represents the essence of Veloura - where luxury meets accessibility.',
    inspiration: 'Inspired by the natural beauty found in everyday moments, from the first blush of dawn to the golden hour of sunset.',
    productIds: ['1', '2', '3', '4'],
    seoTitle: 'Signature Collection - Timeless Luxury Lip Glosses | Veloura',
    seoDescription: 'Discover our Signature Collection featuring our most beloved and versatile lip gloss shades, perfect for any occasion.',
  },
  {
    id: 'limited-edition',
    name: 'Limited Edition',
    description: 'Exclusive, time-limited shades for the discerning collector',
    longDescription: 'Our Limited Edition releases celebrate special moments, collaborations, and seasonal inspirations. Each piece is a work of art, available only while supplies last and designed for those who appreciate the finest things in beauty.',
    images: ['/collections/limited-1.jpg'],
    heroImage: '/collections/limited-hero.jpg',
    featured: true,
    season: 'Special Release',
    launchDate: '2024-03-01',
    endDate: '2024-06-01',
    tags: ['exclusive', 'limited', 'collector', 'special'],
    story: 'Limited Edition releases are born from collaborations with artists, seasonal inspirations, and special moments that deserve to be commemorated in the most luxurious way.',
    inspiration: 'Drawing from haute couture, fine art, and rare gemstones to create truly unique shades you won\'t find anywhere else.',
    productIds: ['5'],
    seoTitle: 'Limited Edition Collection - Exclusive Luxury Lip Glosses | Veloura',
    seoDescription: 'Explore our exclusive Limited Edition lip glosses - rare, collectible shades available for a limited time only.',
  },
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Must-have basics for your everyday beauty routine',
    longDescription: 'The Essentials collection features fundamental shades and formulas that every beauty lover needs. These versatile products form the foundation of any lip wardrobe.',
    images: ['/collections/essentials-1.jpg'],
    heroImage: '/collections/essentials-hero.jpg',
    featured: false,
    season: 'All Year',
    launchDate: '2024-01-10',
    tags: ['basics', 'versatile', 'everyday', 'foundation'],
    productIds: ['4'],
    seoTitle: 'Essentials Collection - Must-Have Lip Gloss Basics | Veloura',
    seoDescription: 'Shop our Essentials collection for versatile, everyday lip gloss shades that form the perfect foundation for any look.',
  },
]

export const categories: Category[] = [
  {
    id: 'lip-gloss',
    name: 'Lip Gloss',
    description: 'Luxurious, hydrating lip glosses with brilliant shine',
    image: '/categories/lip-gloss.jpg',
    subcategories: ['glossy', 'matte', 'shimmer'],
    featured: true,
    seoTitle: 'Luxury Lip Gloss Collection | Veloura Beauty',
    seoDescription: 'Discover our collection of luxury lip glosses featuring hydrating formulas, brilliant shine, and beautiful colors.',
  },
  {
    id: 'lip-oil',
    name: 'Lip Oil',
    description: 'Nourishing lip oils for ultimate hydration and care',
    image: '/categories/lip-oil.jpg',
    subcategories: ['tinted', 'clear', 'treatment'],
    featured: true,
    seoTitle: 'Nourishing Lip Oils | Veloura Beauty',
    seoDescription: 'Pamper your lips with our nourishing lip oil collection for ultimate hydration and care.',
  },
  {
    id: 'lip-sets',
    name: 'Lip Sets',
    description: 'Curated sets and gift collections',
    image: '/categories/lip-sets.jpg',
    subcategories: ['gift-sets', 'mini-sets', 'discovery-sets'],
    featured: false,
    seoTitle: 'Luxury Lip Sets & Gift Collections | Veloura Beauty',
    seoDescription: 'Shop our curated lip sets and gift collections - perfect for trying multiple shades or gifting.',
  },
]

// Helper functions for easy data access
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(collection => collection.id === id)
}

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id)
}

export const getProductsByCollection = (collectionId: string): Product[] => {
  const collection = getCollectionById(collectionId)
  if (!collection) return []
  return products.filter(product => collection.productIds.includes(product.id))
}

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured)
}

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller)
}

export const getNewArrivalProducts = (): Product[] => {
  return products.filter(product => product.newArrival)
}

export const getLimitedEditionProducts = (): Product[] => {
  return products.filter(product => product.limitedEdition)
}

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.collection.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

// Filter and sort functions
export const filterProducts = (
  products: Product[],
  filters: {
    category?: string
    collection?: string
    priceMin?: number
    priceMax?: number
    inStock?: boolean
    tags?: string[]
  }
): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false
    if (filters.collection && product.collection !== filters.collection) return false
    if (filters.priceMin && product.price < filters.priceMin) return false
    if (filters.priceMax && product.price > filters.priceMax) return false
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false
    if (filters.tags && !filters.tags.some(tag => product.tags.includes(tag))) return false
    return true
  })
}

export const sortProducts = (
  products: Product[],
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest' | 'rating' | 'bestseller'
): Product[] => {
  const sorted = [...products]
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime())
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'bestseller':
      return sorted.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
    default:
      return sorted
  }
}
