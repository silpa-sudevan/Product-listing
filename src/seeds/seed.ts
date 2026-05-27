import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productlisting';

const ProductSchema = new mongoose.Schema(
  {
    name: String, slug: String, sku: String,
    description: String, shortDescription: String,
    price: Number, compareAtPrice: Number,
    brand: String, category: String, tags: [String], images: [String],
    availability: String, stockQuantity: Number,
    rating: Number, reviewCount: Number,
    reviews: [{ reviewer: String, rating: Number, comment: String, date: Date }],
    specifications: { type: Map, of: String },
    weight: Number,
    dimensions: { length: Number, width: Number, height: Number, unit: String },
    isActive: Boolean,
  },
  { timestamps: true },
);
ProductSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });

const ProductModel = mongoose.model('Product', ProductSchema);

const products = [
  {
    name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    slug: 'apple-iphone-15-pro-max-256gb',
    sku: 'APL-IP15PM-256-NT',
    description:
      'The iPhone 15 Pro Max features a Grade 5 titanium design, a 48MP main camera with 5x optical zoom, and the powerful A17 Pro chip. With USB‑C connectivity and up to 29 hours of video playback, it sets the standard for premium smartphones.',
    shortDescription: 'Apple flagship with A17 Pro chip, titanium frame, 5x zoom camera',
    price: 134900,
    compareAtPrice: 149900,
    brand: 'Apple',
    category: 'Smartphones',
    tags: ['iPhone', 'Apple', '5G', 'Flagship', 'iOS'],
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 85,
    rating: 4.8,
    reviewCount: 3,
    reviews: [
      { reviewer: 'Rahul Sharma', rating: 5, comment: 'Absolutely stunning phone. Camera is mind-blowing!', date: new Date('2024-02-10') },
      { reviewer: 'Priya Nair', rating: 5, comment: 'Best iPhone ever. The titanium build feels premium.', date: new Date('2024-03-05') },
      { reviewer: 'Amit Patel', rating: 4, comment: 'Great phone but very expensive. Worth every rupee though.', date: new Date('2024-03-20') },
    ],
    specifications: new Map([
      ['Chip', 'A17 Pro'],
      ['Display', '6.7" Super Retina XDR OLED'],
      ['Storage', '256 GB'],
      ['RAM', '8 GB'],
      ['Main Camera', '48 MP + 12 MP + 12 MP'],
      ['Front Camera', '12 MP TrueDepth'],
      ['Battery', '4422 mAh'],
      ['OS', 'iOS 17'],
      ['5G', 'Yes'],
      ['Color', 'Natural Titanium'],
      ['Water Resistance', 'IP68'],
    ]),
    weight: 0.221,
    dimensions: { length: 159.9, width: 76.7, height: 8.25, unit: 'mm' },
    isActive: true,
  },
  {
    name: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    sku: 'SAM-S24U-512-BLK',
    description:
      'The Galaxy S24 Ultra combines the most advanced Galaxy AI with an integrated S Pen, a 200 MP quad-camera system, and a Titanium frame. Powered by Snapdragon 8 Gen 3 and a 5000 mAh battery for all-day performance.',
    shortDescription: 'Samsung\'s most powerful phone with 200MP camera and built-in S Pen',
    price: 129999,
    compareAtPrice: 144999,
    brand: 'Samsung',
    category: 'Smartphones',
    tags: ['Samsung', 'Galaxy', 'S Pen', '5G', 'Android', 'Flagship'],
    images: [
      'https://images.unsplash.com/photo-1706096600741-d38efa0fda74?w=600',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 60,
    rating: 4.7,
    reviewCount: 2,
    reviews: [
      { reviewer: 'Deepika Rao', rating: 5, comment: 'The S Pen is incredibly useful. Camera is insane!', date: new Date('2024-02-15') },
      { reviewer: 'Kiran Mehta', rating: 4, comment: 'Galaxy AI features are genuinely helpful. Great display.', date: new Date('2024-04-01') },
    ],
    specifications: new Map([
      ['Chip', 'Snapdragon 8 Gen 3'],
      ['Display', '6.8" Dynamic AMOLED 2X, 120Hz'],
      ['Storage', '512 GB'],
      ['RAM', '12 GB'],
      ['Main Camera', '200 MP + 12 MP + 10 MP + 50 MP'],
      ['Battery', '5000 mAh'],
      ['OS', 'Android 14 (One UI 6.1)'],
      ['5G', 'Yes'],
      ['S Pen', 'Built-in'],
      ['Water Resistance', 'IP68'],
    ]),
    weight: 0.232,
    dimensions: { length: 162.3, width: 79, height: 8.6, unit: 'mm' },
    isActive: true,
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    sku: 'SNY-WH1000XM5-BLK',
    description:
      'Industry-leading noise cancellation with two processors and eight microphones. Up to 30-hour battery life, Multipoint connection for two devices simultaneously, and crystal-clear hands-free calling.',
    shortDescription: 'Best-in-class noise cancellation with 30hr battery life',
    price: 26990,
    compareAtPrice: 34990,
    brand: 'Sony',
    category: 'Headphones',
    tags: ['Sony', 'Wireless', 'Noise Cancelling', 'Headphones', 'Bluetooth'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 120,
    rating: 4.9,
    reviewCount: 2,
    reviews: [
      { reviewer: 'Ananya Singh', rating: 5, comment: 'Best headphones I\'ve ever owned. Noise cancellation is phenomenal.', date: new Date('2024-01-20') },
      { reviewer: 'Vikram Gupta', rating: 5, comment: '30 hours battery is no joke. Sounds amazing.', date: new Date('2024-02-28') },
    ],
    specifications: new Map([
      ['Driver Unit', '30 mm'],
      ['Frequency Response', '4 Hz–40,000 Hz'],
      ['Battery Life', 'Up to 30 hours (NC on)'],
      ['Charging', 'USB-C (3 min quick charge = 3 hrs)'],
      ['Bluetooth', '5.2'],
      ['Codecs', 'LDAC, AAC, SBC'],
      ['Weight', '250 g'],
      ['Colors', 'Black, Silver'],
    ]),
    weight: 0.25,
    isActive: true,
  },
  {
    name: 'Apple MacBook Pro 14" M3 Pro Chip 18GB 512GB Space Black',
    slug: 'apple-macbook-pro-14-m3-pro-512gb',
    sku: 'APL-MBP14-M3P-512-SB',
    description:
      'The MacBook Pro 14 with M3 Pro chip delivers exceptional performance for demanding professionals. Liquid Retina XDR display, up to 18 hours battery life, MagSafe 3, and Thunderbolt 4 ports in a strikingly new Space Black finish.',
    shortDescription: 'Pro-level laptop with M3 Pro chip and Liquid Retina XDR display',
    price: 199900,
    compareAtPrice: 219900,
    brand: 'Apple',
    category: 'Laptops',
    tags: ['MacBook', 'Apple', 'M3', 'Laptop', 'Pro', 'macOS'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 30,
    rating: 4.9,
    reviewCount: 2,
    reviews: [
      { reviewer: 'Suresh Kumar', rating: 5, comment: 'Unbelievable performance. Handles 4K video editing like a breeze!', date: new Date('2024-03-10') },
      { reviewer: 'Neha Joshi', rating: 5, comment: 'The Space Black colour is gorgeous. Best laptop I\'ve used.', date: new Date('2024-04-15') },
    ],
    specifications: new Map([
      ['Chip', 'Apple M3 Pro'],
      ['CPU Cores', '11 (5 performance + 6 efficiency)'],
      ['GPU Cores', '14'],
      ['Unified Memory', '18 GB'],
      ['Storage', '512 GB SSD'],
      ['Display', '14.2" Liquid Retina XDR, 120Hz ProMotion'],
      ['Battery', 'Up to 18 hours'],
      ['Ports', 'MagSafe 3, 3× Thunderbolt 4, HDMI, SD card, 3.5mm'],
      ['OS', 'macOS Sonoma'],
      ['Weight', '1.55 kg'],
    ]),
    weight: 1.55,
    dimensions: { length: 312.6, width: 221.2, height: 15.5, unit: 'mm' },
    isActive: true,
  },
  {
    name: 'OnePlus 12 5G 256GB Flowy Emerald',
    slug: 'oneplus-12-5g-256gb-emerald',
    sku: 'OPL-OP12-256-GRN',
    description:
      'OnePlus 12 features Snapdragon 8 Gen 3, a 50 MP Hasselblad camera, 100W SUPERVOOC fast charging (full charge in 26 minutes), and a 6.82" LTPO AMOLED display with 2K resolution.',
    shortDescription: '100W fast charge flagship with Hasselblad camera tuning',
    price: 64999,
    compareAtPrice: 74999,
    brand: 'OnePlus',
    category: 'Smartphones',
    tags: ['OnePlus', '5G', 'Hasselblad', 'Fast Charging', 'Android'],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 75,
    rating: 4.6,
    reviewCount: 1,
    reviews: [
      { reviewer: 'Rohan Verma', rating: 5, comment: '100W charging is insane. Fully charged in under 30 minutes!', date: new Date('2024-04-10') },
    ],
    specifications: new Map([
      ['Chip', 'Snapdragon 8 Gen 3'],
      ['Display', '6.82" LTPO AMOLED, 120Hz, 2K'],
      ['Storage', '256 GB'],
      ['RAM', '12 GB'],
      ['Main Camera', '50 MP (Hasselblad) + 48 MP + 64 MP'],
      ['Battery', '5400 mAh'],
      ['Charging', '100W SUPERVOOC + 50W wireless'],
      ['OS', 'OxygenOS 14 (Android 14)'],
      ['5G', 'Yes'],
    ]),
    weight: 0.22,
    isActive: true,
  },
  {
    name: 'LG C3 65" OLED 4K Smart TV',
    slug: 'lg-c3-65-oled-4k-tv',
    sku: 'LG-C3-65-OLED',
    description:
      'The LG C3 OLED TV delivers perfect blacks, infinite contrast, and over a billion colors. Powered by α9 AI Processor Gen6, it upscales content and supports Dolby Vision, Dolby Atmos, and NVIDIA G-SYNC for gaming.',
    shortDescription: 'Perfect OLED picture with α9 Gen6 AI processor for cinematic viewing',
    price: 159990,
    compareAtPrice: 189990,
    brand: 'LG',
    category: 'Televisions',
    tags: ['LG', 'OLED', '4K', 'Smart TV', 'Dolby Vision'],
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 20,
    rating: 4.8,
    reviewCount: 1,
    reviews: [
      { reviewer: 'Madhuri Desai', rating: 5, comment: 'Picture quality is out of this world. Gaming on it is incredible!', date: new Date('2024-01-30') },
    ],
    specifications: new Map([
      ['Panel', 'OLED evo'],
      ['Resolution', '4K UHD (3840 × 2160)'],
      ['Processor', 'α9 Gen6 AI'],
      ['Refresh Rate', '120 Hz'],
      ['HDR', 'Dolby Vision, HDR10, HLG'],
      ['Audio', 'Dolby Atmos 60W'],
      ['HDMI', '4 × HDMI 2.1 (4K@120Hz)'],
      ['Smart Platform', 'webOS 23'],
      ['Gaming', 'G-SYNC, FreeSync, VRR, ALLM'],
    ]),
    isActive: true,
  },
  {
    name: 'boAt Rockerz 450 Bluetooth Headphone Aqua Blue',
    slug: 'boat-rockerz-450-aqua-blue',
    sku: 'BOAT-R450-AQUA',
    description:
      'boAt Rockerz 450 delivers 15 hours of playtime with 40mm dynamic drivers for immersive sound. Foldable design, padded ear cushions, and Bluetooth 5.0 connectivity for a seamless listening experience.',
    shortDescription: 'Budget-friendly wireless headphones with 15hr playtime',
    price: 1299,
    compareAtPrice: 3490,
    brand: 'boAt',
    category: 'Headphones',
    tags: ['boAt', 'Budget', 'Wireless', 'Bluetooth'],
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 500,
    rating: 4.1,
    reviewCount: 1,
    reviews: [
      { reviewer: 'Sanjay More', rating: 4, comment: 'Great value for money! Sound is decent for the price.', date: new Date('2024-03-12') },
    ],
    specifications: new Map([
      ['Driver', '40 mm Dynamic'],
      ['Battery', '15 hours'],
      ['Bluetooth', '5.0'],
      ['Charging', 'Micro-USB'],
      ['Impedance', '32 Ω'],
    ]),
    weight: 0.195,
    isActive: true,
  },
  {
    name: 'Logitech MX Master 3S Wireless Mouse Graphite',
    slug: 'logitech-mx-master-3s-graphite',
    sku: 'LOG-MXMS3-GRP',
    description:
      'MX Master 3S is the most advanced Master Series mouse ever. With a new 8000 DPI sensor, virtually silent clicks, 70-day battery, and ergonomic design to reduce hand fatigue during long work sessions.',
    shortDescription: 'Premium ergonomic wireless mouse with 8000 DPI and silent clicks',
    price: 9995,
    compareAtPrice: 11995,
    brand: 'Logitech',
    category: 'Computer Peripherals',
    tags: ['Logitech', 'Mouse', 'Wireless', 'Ergonomic', 'MX Master'],
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
    ],
    availability: 'in_stock',
    stockQuantity: 200,
    rating: 4.7,
    reviewCount: 1,
    reviews: [
      { reviewer: 'Aditya Kulkarni', rating: 5, comment: 'Best mouse I\'ve ever used. The MagSpeed scroll wheel is addictive!', date: new Date('2024-02-20') },
    ],
    specifications: new Map([
      ['Sensor', 'Darkfield 8000 DPI'],
      ['Buttons', '7'],
      ['Battery', 'Up to 70 days'],
      ['Charging', 'USB-C'],
      ['Connectivity', 'Bluetooth / Logi Bolt USB'],
      ['Compatible', 'Windows, macOS, Linux, iPadOS'],
    ]),
    weight: 0.141,
    isActive: true,
  },
];

async function seed() {
  console.log(`Connecting to MongoDB at ${MONGO_URI}...`);
  await mongoose.connect(MONGO_URI);
  console.log('Connected.');

  const existing = await ProductModel.countDocuments();
  if (existing > 0) {
    console.log(`Database already has ${existing} products. Skipping seed (use --force to override).`);
    if (!process.argv.includes('--force')) {
      await mongoose.disconnect();
      return;
    }
    console.log('--force flag detected. Dropping existing products...');
    await ProductModel.deleteMany({});
  }

  console.log(`Seeding ${products.length} products...`);
  await ProductModel.insertMany(products);
  console.log(`✅  Successfully seeded ${products.length} products!`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
