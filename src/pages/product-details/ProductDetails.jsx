import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import "./ProductDetails.css";
import { get_product_from_LS, set_product_to_LS } from "../../utils";
import toast, { Toaster } from "react-hot-toast";

// ─── Color tokens ──────────────────────────────────────────────────────────
const C = {
  orangeHot: "#f04e0f",
  orangeMid: "#f97316",
  orangeLight: "#fb923c",
  greenDeep: "#16a34a",
  cream: "#fffbf5",
  sand: "#fef3e2",
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function Stars({ rating = 5, size = "sm" }) {
  const sz = size === "lg" ? "text-xl" : "text-sm";

  return (
    <div className={`flex gap-0.5 ${sz}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Description Tab ───────────────────────────────────────────────────────
function TabDescription({ product }) {
  const specs = [
    ["ক্যাটাগরি", product?.category_name || "N/A"],
    ["উৎপত্তি", product?.origin || "N/A"],
    ["সর্বনিম্ন অর্ডার", `${product?.min_order?`${product?.min_order} ${product?.unit}`:"N/A"}`],
    ["ডিসকাউন্ট", `${product?.discount || 0}%`],
  ];

  const extra_info =  [
    {
      bg: "#fff0e6",
      icon: "🗓️",
      title: "ডেলিভারির তারিখ",
      sub: "১-২ দিনের মধ্যে ডেলিভারি",
    },
    {
      bg: "#dcfce7",
      icon: "🚚",
      title: "ফ্রি ডেলিভারি",
      sub: "সারা বাংলাদেশে হোম ডেলিভারি",
    },
    {
      bg: "#dbeafe",
      icon: "📦",
      title: "নিরাপদ প্যাকেজিং",
      sub: "বিশেষ কাঠের বাক্সে প্যাক করা হয়",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pt-2">
      {/* Text */}
      <div className="md:col-span-3 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          {product?.name}
        </h3>

        <p className="text-sm leading-relaxed text-gray-600">
          {product?.short_description}
        </p>

        <p className="text-sm leading-relaxed text-gray-600">
          {product?.description}
        </p>

        <ul className="space-y-2 pt-1">
          {[
            "কার্বাইড মুক্ত, প্রাকৃতিকভাবে পাকা",
            "সরাসরি বাগান থেকে সংগ্রহ",
            "সারা বাংলাদেশে হোম ডেলিভারি",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span
                className="mt-0.5 shrink-0"
                style={{ color: C.greenDeep, fontSize: 16 }}
              >
                ✔
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs */}
      <div className="md:col-span-2">
        <div className="rounded-2xl overflow-hidden border border-orange-100">
          <div
            className="px-4 py-3 text-sm font-bold text-white"
            style={{ background: C.orangeHot }}
          >
            পণ্যের বিবরণ
          </div>

          <table className="w-full text-sm">
            <tbody>
              {specs.map(([label, value], i) => (
                <tr
                  key={i}
                  className="border-b border-orange-50 last:border-none"
                  style={{
                    background: i % 2 === 0 ? "#fff" : C.cream,
                  }}
                >
                  <td className="px-4 py-2.5 text-gray-500 w-2/5">
                    {label}
                  </td>

                  <td className="px-4 py-2.5 font-medium text-gray-700">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
const notify = () => toast.success("Product added to the Cart!");
const notify2 = () => toast.success("Product already in the Cart!");

// ─── Main Component ────────────────────────────────────────────────────────
export default function ProductDetails() {
  const { id } = useParams();

  // ─── Product Query ─────────────────────────────────────────
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/product/${id}`
      );

      return res.data;
    },
    enabled: !!id,
  });

  // ─── Packages Query ────────────────────────────────────────
  const { data: packages = [] } = useQuery({
    queryKey: ["packages", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/packages/by-product/${id}`
      );

      return res.data;
    },
    enabled: !!id,
  });

  // ─── States ────────────────────────────────────────────────
  const [activeImg, setActiveImg] = useState(0);

  const [activeWeight, setActiveWeight] = useState(null);

  const [qty, setQty] = useState(1);

  const [activeTab, setActiveTab] = useState("desc");

  const [cartFlash, setCartFlash] = useState(false);

  const [wishlist, setWishlist] = useState(false);

  // console.log(get_product_from_LS());

  // ─── Set default package ───────────────────────────────────
  useEffect(() => {
    if (packages.length > 0 && !activeWeight) {
      setActiveWeight(packages[0]);
    }
  }, [packages, activeWeight]);

  // ─── Current Price ─────────────────────────────────────────
  const currentPrice = activeWeight?.price || product?.price_after_discount || 0;
  const oldPrice =
    (product?.price || 0) * (activeWeight?.quantity || 1);

  const discount =
    product?.discount || 0;

  const finalOldPrice =
    currentPrice +
    (currentPrice * discount) / 100;

  // ─── Add To Cart ───────────────────────────────────────────
  const handleAddToCart = () => {
    const item_details = {
      product_name: product?.name,
      free_delivery: product.free_delivery,
      product_quantity: (activeWeight?.quantity || product?.min_order) * qty,
      product_price: product.price_after_discount,
      package_price: activeWeight?.price || product.price_after_discount * product.min_order,
      product_id: product._id,
      package_quantity: activeWeight?.quantity || product?.min_order,
      package_count: qty,
      product_image: product?.images?.[0]
    }
    if(set_product_to_LS(item_details)){
      notify();
    }
    else notify2();
  };

  console.log()
  const TABS = [
    { key: "desc", label: "বিবরণ" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <style>{`
        .tab-underline {
          border-bottom: 3px solid var(--orange-hot);
          color: var(--orange-hot);
          font-weight: 600;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Toaster/>
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-6 flex-wrap">
          <a href="#" className="hover:underline">
            Home
          </a>

          <span>›</span>

          <a href="#" className="hover:underline">
            {product?.category_name}
          </a>

          <span>›</span>

          <span className="font-medium text-(--orange-hot)">
            {product?.name}
          </span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

          {/* LEFT */}
          <div className="flex flex-col gap-4">

            {/* Main Image */}
            <div
              className="relative rounded-2xl overflow-hidden border-2 border-(--orange-hot)"
              style={{
                background: C.sand,
                aspectRatio: "4/3",
              }}
            >

              {/* Discount */}
              {discount > 0 && (
                <span className="absolute top-4 left-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-lg nunito bg-(--orange-hot)">
                  -{activeWeight?.discount || product?.discount}%
                </span>
              )}

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`absolute top-3.5 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center border ${wishlist
                    ? "border-(--orange-hot)"
                    : "border-[#f5cbb4]"
                  } shadow-sm transition-transform hover:scale-110`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill={wishlist ? "var(--orange-hot)" : "none"}
                  stroke="var(--orange-hot)"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              <img
                src={product?.images?.[activeImg]}
                alt={product?.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product?.images?.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                  style={{
                    borderColor:
                      activeImg === i
                        ? C.orangeHot
                        : "#e5e7eb",
                  }}
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>

            {/* Trust Pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌿", text: "১০০% অর্গানিক" },
                { icon: "🚚", text: `${product?.free_delivery?'ফ্রি':'দ্রুত'} ডেলিভারি`},
                { icon: "✅", text: "গ্যারান্টিড ফ্রেশ" },
              ].map(({ icon, text }, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-(--cream-bg) p-3 flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-xl">{icon}</span>

                  <span className="text-xs font-medium text-gray-600">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-medium px-3 py-1 rounded-full border bg-(--sand2) text-(--orange-hot) border-(--sand)">
                  {product?.origin}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-1">
                {product?.name}
              </h1>
              <h1 className="text-lg text-(--base-color) leading-snug mb-1">
                সর্বনিম্ন অর্ডার - <span className="text-bold">{product?.min_order} {product?.unit}</span>
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="text-4xl font-extrabold nunito"
                style={{ color: C.orangeHot }}
              >
                ৳{activeWeight?.price || product?.price_after_discount}
              </span>

              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through nunito">
                    ৳{oldPrice}
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg text-white nunito"
                    style={{ background: C.orangeHot }}
                  >
                    {activeWeight?.discount || product?.discount}% ছাড়
                  </span>
                </>
              )}
            </div>

            <hr className="border-orange-100" />

            {/* Package */}
            <div className="bg-(--cream-bg) p-6 rounded-xl">
              <p className="text-sm font-semibold text-gray-600 mb-2.5">
                পরিমাণ নির্বাচন করুন
              </p>

              <div className="flex gap-3 flex-wrap">
                {packages.map((pac) => (
                  <button
                    key={pac._id}
                    onClick={() => setActiveWeight(pac)}
                    className="px-6 py-2.5 rounded-full border-2 text-sm transition-all"
                    style={{
                      borderColor:
                        activeWeight?._id === pac._id
                          ? C.orangeHot
                          : "#e5e7eb",

                      background:
                        activeWeight?._id === pac._id
                          ? C.sand
                          : "#fff",

                      color:
                        activeWeight?._id === pac._id
                          ? C.orangeHot
                          : "#374151",

                      fontWeight:
                        activeWeight?._id === pac._id
                          ? 600
                          : 400,
                    }}
                  >
                    {pac.quantity} {product.unit}
                    <br />
                    <span className="text-xs font-bold nunito">
                      ৳{pac.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2.5">
                সংখ্যা
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold text-gray-600 bg-white transition-colors hover:border-orange-400"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  −
                </button>

                <span className="text-xl font-extrabold nunito text-gray-800 w-6 text-center">
                  {qty}
                </span>

                <button
                  onClick={() =>
                    setQty((q) => Math.min(10, q + 1))
                  }
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold text-gray-600 bg-white transition-colors hover:border-(--orange-hot)"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 sm:gap-8 flex-wrap">
              <button
                onClick={handleAddToCart}
                className={`btn-secondary ${cartFlash ? "scale-105" : ""
                  }`}
              >
                🛒 Add to Cart
              </button>

              <Link 
                onClick={handleAddToCart}
                to={`/checkout`}
               className="btn-primary">
                ⚡ Order Now →
              </Link>
            </div>

            {/* Delivery */}
            <div
              className="rounded-2xl p-6 bg-(--cream-bg)"
            >
              <p className="text-sm font-bold text-gray-700 mb-2">
                ডেলিভারি তথ্য
              </p>

              {[
                {
                  bg: "#fff0e6",
                  icon: "🗓️",
                  title: "ডেলিভারির তারিখ",
                  sub: "১-২ দিনের মধ্যে ডেলিভারি",
                },
                {
                  bg: "#dcfce7",
                  icon: "🚚",
                  title: `${product?.free_delivery?'ফ্রি':'দ্রুত'} ডেলিভারি`,
                  sub: "সারা বাংলাদেশে হোম ডেলিভারি",
                },
                {
                  bg: "#dbeafe",
                  icon: "📦",
                  title: "নিরাপদ প্যাকেজিং",
                  sub: "বিশেষ কাঠের বাক্সে প্যাক করা হয়",
                },
              ].map(({ bg, icon, title, sub }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2.5"
                  style={{
                    borderBottom:
                      i < 2
                        ? "1px solid #f0ede8"
                        : "none",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-base"
                    style={{ background: bg }}
                  >
                    {icon}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {title}
                    </p>

                    <p className="text-xs text-gray-500">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex gap-0 border-b border-gray-200 mb-8 overflow-x-auto">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 text-sm whitespace-nowrap transition-all ${activeTab === key
                    ? "tab-underline"
                    : "text-gray-500 hover:text-orange-500"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "desc" && (
            <TabDescription product={product} />
          )}
        </div>
      </div>
    </div>
  );
}