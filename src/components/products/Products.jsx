import { useEffect, useState } from "react";
import Category from "../category/Category";
import ProductCard from "./ProductCard";
import "./Products.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import logo from "../../assets/logo.png";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(-1);
  const [products, setProducts] = useState([]);

  // ── Categories Query ─────────────────
  const { data: categories = [] } = useQuery({
    queryKey: ["all_categories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/categories`
      );
      return res.data;
    },
  });
  console.log(activeCategory);
  // ── Products Fetch ───────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;

        // All products
        if (activeCategory === -1) {
          res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/products`
          );
        }

        // Category wise products
        else {
          res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/products/by-category/${activeCategory}`
          );
        }

        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // ── Add All Category ─────────────────
  const all_categories = [
    { _id: -1, name: "All", image: logo },
    ...categories,
  ];

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-2 sm:px-4">

      {/* CATEGORY */}
      <div className="sticky top-20 z-30 py-3 mb-4">
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
            {activeCategory === -1
              ? "সব পণ্য"
              : `${categories.find(c => c._id === activeCategory)?.name || "Products"} — Shop`}
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
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

      </div>
    </div>
  );
}