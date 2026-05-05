import { useEffect, useState } from "react";
import Category from "../category/Category";
import ProductCard from "./ProductCard";
import './Products.css';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: categories = [] } = useQuery({
    queryKey: ["all_categories"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
      return res.data;
    }
  });

  const all_categories = ["All", ...categories.map(c => c.name)];

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-2 sm:px-4">

      {/* CATEGORY (Sticky inside this section only) */}
      <div className="sticky top-20 z-30  py-3 mb-4">
        <div className="flex justify-center">
          <Category
            categories={all_categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-2 sm:px-4 pb-10">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h1 className="text-2xl font-black text-base-content">
            {activeCategory === "All"
              ? "সব পণ্য"
              : `${activeCategory} — Shop`}
          </h1>
          <span className="text-sm text-base-content/50 font-medium">
            {products.length} products
          </span>
        </div>

        {/* Grid */}
        <div
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </div>
  );
}