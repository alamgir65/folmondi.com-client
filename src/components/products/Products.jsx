import { useState } from "react";
import Category from "../category/Category";
import ProductCard from "./ProductCard";
import './Products.css';

// ─── Product Data ──────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
    name: "গোবিন্দভোগ আম",
    discount: 13,
    variants: [
      { label: "১২ কেজি", price: 1440 },
      { label: "২৪ কেজি", price: 2880 },
    ],
    originalPrice: 1650,
    delivery: "ডেলিভারির আনুমানিক সময় ৭ই মে ইনশাআল্লাহ",
    inStock: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop",
    name: "হিমসাগর আম",
    discount: 19,
    variants: [
      { label: "১২ কেজি", price: 1500 },
      { label: "২৪ কেজি", price: 3000 },
    ],
    originalPrice: 1850,
    delivery: "ডেলিভারির আনুমানিক সময় ১৭ই মে ইনশাআল্লাহ",
    inStock: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=400&h=300&fit=crop",
    name: "গোপালভোগ আম",
    discount: 9,
    variants: [
      { label: "12 KG", price: 1550 },
      { label: "24 KG", price: 3250 },
    ],
    originalPrice: 1700,
    delivery: null,
    inStock: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    name: "ল্যাংড়া আম",
    discount: 11,
    variants: [
      { label: "12 KG", price: 1650 },
      { label: "24 KG", price: 3350 },
    ],
    originalPrice: 1860,
    delivery: null,
    inStock: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=400&h=300&fit=crop",
    name: "আম্রপালি আম",
    discount: 15,
    variants: [
      { label: "১২ কেজি", price: 1380 },
      { label: "২৪ কেজি", price: 2700 },
    ],
    originalPrice: 1620,
    delivery: "ডেলিভারির আনুমানিক সময় ২০ই মে ইনশাআল্লাহ",
    inStock: true,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=300&fit=crop",
    name: "ফজলি আম",
    discount: 10,
    variants: [
      { label: "১২ কেজি", price: 1600 },
      { label: "২৪ কেজি", price: 3100 },
    ],
    originalPrice: 1780,
    delivery: "ডেলিভারির আনুমানিক সময় ২৫ই মে ইনশাআল্লাহ",
    inStock: true,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=300&fit=crop",
    name: "খিরসাপাত আম",
    discount: 8,
    variants: [
      { label: "১২ কেজি", price: 1720 },
      { label: "২৪ কেজি", price: 3380 },
    ],
    originalPrice: 1870,
    delivery: "ডেলিভারির আনুমানিক সময় ১০ই জুন ইনশাআল্লাহ",
    inStock: true,
  },
];


export default function Products() {
  const categories = ["All", "আম", "খেজুর", "খেজুরের গুড়", "ঘি", "তেল", "মধু"];
  const [activeCategory, setActiveCategory] = useState("আম");

  return (
    <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto m-[5px_8px_12px]  sm:m-[20px_32px_60px]">
      <div className="max-w-7xl mx-auto px-4 py-8">
         <div className="mx-auto px-4 flex justify-center mb-8">
             <Category categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
         </div>
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h1 className="text-2xl font-black text-base-content">
            {activeCategory === "All" ? "সব পণ্য" : `${activeCategory} — Shop`}
          </h1>
          <span className="text-sm text-base-content/50 font-medium">
            {products.length} products
          </span>
        </div>


        {/* Grid */}
        <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
            <button className="btn-primary w-full sm:w-auto">
          View All Products →
        </button>
        </div>
      </div>
    </div>
  );
}