export type Tint = "lime" | "pink" | "cobalt" | "sunset" | "ink" | "clay" | "paper" | null;
export type Category = "tops" | "bottoms" | "co-ords";

export type Product = {
  slug: string;
  brand: string;
  name: string;
  price: number;
  photo: string;
  tint: Tint;
  category: Category;
  description: string;
  sizes: string[];
  colors?: { name: string; hex: string }[];
};

// 3 additional Unsplash photos shown alongside the hero on product detail.
// Shared pool so we don't have to curate 24 unique URLs.
const galleryExtras: string[] = [
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&h=1200&fit=crop&q=85",
  "https://images.unsplash.com/photo-1485518882345-15568b007407?w=900&h=1200&fit=crop&q=85",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=900&h=1200&fit=crop&q=85",
  "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=900&h=1200&fit=crop&q=85",
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=900&h=1200&fit=crop&q=85",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1200&fit=crop&q=85",
];

export function galleryFor(product: Product): string[] {
  // 4 photos: main + 3 from the shared pool, offset by product index for variety.
  const idx = products.findIndex((p) => p.slug === product.slug);
  const offset = idx >= 0 ? idx : 0;
  return [
    product.photo,
    galleryExtras[(offset + 0) % galleryExtras.length],
    galleryExtras[(offset + 2) % galleryExtras.length],
    galleryExtras[(offset + 4) % galleryExtras.length],
  ];
}

export function productsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

export const products: Product[] = [
  {
    slug: "snitch-oversized-cotton-tee",
    brand: "snitch",
    name: "Oversized cotton tee",
    price: 999,
    photo: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=900&h=1200&fit=crop&q=85",
    tint: "lime",
    category: "tops",
    description: "100% combed cotton. Drop-shoulder oversized fit. Made in Tirupur. Pre-washed. Won't shrink.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "off-white", hex: "#F0EDE7" },
      { name: "ink", hex: "#0E0E0E" },
      { name: "clay", hex: "#C2452D" },
    ],
  },
  {
    slug: "bewakoof-wide-leg-cargos",
    brand: "bewakoof",
    name: "Wide-leg cargos",
    price: 1299,
    photo: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&h=1200&fit=crop&q=85",
    tint: "pink",
    category: "bottoms",
    description: "Heavy cotton twill. Six pockets. Adjustable cuff. Looks better worn-in.",
    sizes: ["28", "30", "32", "34"],
    colors: [
      { name: "olive", hex: "#5b6b3a" },
      { name: "stone", hex: "#a9a39a" },
    ],
  },
  {
    slug: "the-souled-store-bomber",
    brand: "the souled store",
    name: "Bomber jacket",
    price: 2499,
    photo: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=900&h=1200&fit=crop&q=85",
    tint: null,
    category: "tops",
    description: "Quilted nylon shell. Rib knit cuffs. Cotton lining. Bengaluru-weather sweet spot.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "black", hex: "#0E0E0E" },
      { name: "navy", hex: "#1F3458" },
    ],
  },
  {
    slug: "urbanic-ribbed-tank-2pack",
    brand: "urbanic",
    name: "Ribbed tank, 2-pack",
    price: 699,
    photo: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=900&h=1200&fit=crop&q=85",
    tint: "cobalt",
    category: "tops",
    description: "Modal-cotton rib knit. Body-conforming. Two colorways per pack.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "white + black", hex: "#0E0E0E" },
      { name: "cream + clay", hex: "#C2452D" },
    ],
  },
  {
    slug: "house-of-masaba-linen-coord",
    brand: "house of masaba",
    name: "Linen co-ord",
    price: 3299,
    photo: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=900&h=1200&fit=crop&q=85",
    tint: "sunset",
    category: "co-ords",
    description: "Belgian linen. Print-on-print. Wide-leg trouser + boxy shirt. Sized in Indian half-numbers.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "rust print", hex: "#FF6B35" },
      { name: "ivory print", hex: "#F0EDE7" },
    ],
  },
  {
    slug: "fabindia-block-print-shirt",
    brand: "fabindia",
    name: "Block-print shirt",
    price: 1499,
    photo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&h=1200&fit=crop&q=85",
    tint: null,
    category: "tops",
    description: "Hand-block printed in Bagru. Cotton voile. Mandarin collar. Loose fit through the chest.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "indigo block", hex: "#2D6EFF" },
      { name: "madder block", hex: "#C2452D" },
    ],
  },
  {
    slug: "hm-pleated-mini-skirt",
    brand: "h&m",
    name: "Pleated mini skirt",
    price: 1199,
    photo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=1200&fit=crop&q=85",
    tint: "clay",
    category: "bottoms",
    description: "Box-pleated. Sits at natural waist. Knife-edge pleats hold a press.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "black", hex: "#0E0E0E" },
      { name: "tartan", hex: "#5b1f1f" },
    ],
  },
  {
    slug: "snitch-cropped-denim",
    brand: "snitch",
    name: "Cropped denim jacket",
    price: 1599,
    photo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop&q=85",
    tint: "lime",
    category: "tops",
    description: "13oz selvedge denim. Cropped at the waist. Vintage-style chest pockets. Sashiko stitching.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "indigo raw", hex: "#1F3458" },
      { name: "stone wash", hex: "#a9a39a" },
    ],
  },
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatINR(n: number) {
  // Indian number grouping. 1,299 / 12,99,999.
  return `₹${n.toLocaleString("en-IN")}`;
}
