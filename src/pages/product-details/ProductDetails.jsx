import { useState } from "react";

// ─── Color tokens ──────────────────────────────────────────────────────────
const C = {
  orangeHot:   "#f04e0f",
  orangeMid:   "#f97316",
  orangeLight: "#fb923c",
  greenDeep:   "#16a34a",
  greenMid:    "#22c55e",
  blueTrust:   "#1e40af",
  blueMid:     "#2563eb",
  cream:       "#fffbf5",
  sand:        "#fef3e2",
  blueLight:   "#bfdbfe",
};

// ─── Static product data ───────────────────────────────────────────────────
const PRODUCT = {
  nameBn:      "হিমসাগর আম",
  nameEn:      "Himsagar Mango — Premium Grade A",
  origin:      "রাজশাহী",
  season:      "সিজন ২০২৫",
  rating:      4.4,
  reviewCount: 186,
  soldCount:   234,
  discount:    19,
  tags:        ["কার্বাইড মুক্ত", "অর্গানিক", "ফ্রি ডেলিভারি"],
  images: [
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=85",
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85",
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=85",
    "https://images.unsplash.com/photo-1546630392-db5b1f04874a?w=800&q=85",
  ],
  weights: [
    { label: "১২ কেজি", price: 1500, oldPrice: 1850 },
    { label: "২৪ কেজি", price: 3000, oldPrice: 3700 },
  ],
  specs: [
    ["জাত",    "হিমসাগর"],
    ["উৎপত্তি", "রাজশাহী, বাংলাদেশ"],
    ["গ্রেড",   "A (প্রিমিয়াম)"],
    ["আকার",   "মিডিয়াম-লার্জ"],
    ["রঙ",     "হলুদ-সোনালি"],
    ["সিজন",   "মে–জুন ২০২৫"],
  ],
  reviews: [
    { name: "রহিম উদ্দিন",  location: "ঢাকা",      date: "১২ মে ২০২৪", rating: 5, color: C.orangeHot,  text: "অসাধারণ আম! এত মিষ্টি আম আগে কখনো খাইনি। প্যাকেজিং একদম পারফেক্ট ছিল, একটাও আম নষ্ট হয়নি। আবার অর্ডার করব।" },
    { name: "নাজমা বেগম",   location: "চট্টগ্রাম",  date: "১৫ মে ২০২৪", rating: 4, color: C.greenDeep, text: "কেমিক্যাল মুক্ত হওয়ায় নিশ্চিন্তে বাচ্চাদের খাওয়াতে পেরেছি। ডেলিভারি একটু দেরি হলেও পণ্যের মান চমৎকার।" },
    { name: "করিম সাহেব",   location: "সিলেট",      date: "২০ মে ২০২৪", rating: 5, color: C.blueTrust, text: "Folmondi-র সার্ভিস সত্যিই বিশ্বস্ত। প্রতিবছর এখান থেকেই আম নিই। রাজশাহীর আসল স্বাদ পেলাম।" },
  ],
  ratingBars: [
    { star: "৫", pct: 70 },
    { star: "৪", pct: 18 },
    { star: "৩", pct: 7  },
    { star: "২", pct: 3  },
    { star: "১", pct: 2  },
  ],
  faqs: [
    { q: "কার্বাইড মুক্ত আম কিনা কীভাবে নিশ্চিত?", a: "আমরা সরাসরি বিশ্বস্ত বাগান থেকে আম সংগ্রহ করি এবং প্রতিটি ব্যাচ পরীক্ষা করি। আমাদের কেমিক্যাল ফ্রি সার্টিফিকেট আছে।" },
    { q: "আম কতদিন সতেজ থাকবে?",                    a: "সঠিকভাবে সংরক্ষণ করলে ৫–৭ দিন সতেজ থাকবে। ফ্রিজে রাখলে আরো বেশিদিন ভালো থাকে।" },
    { q: "ডেলিভারি কোথায় পাওয়া যাবে?",              a: "সারা বাংলাদেশে হোম ডেলিভারি দেওয়া হয়। ঢাকার ভেতরে সাধারণত ১–২ দিনের মধ্যে পৌঁছায়।" },
    { q: "আম নষ্ট হয়ে আসলে কী করব?",                a: "ছবি তুলে আমাদের সাথে যোগাযোগ করুন। আমরা সম্পূর্ণ রিফান্ড বা প্রতিস্থাপন নিশ্চিত করব।" },
  ],
};

// ─── Sub-components ────────────────────────────────────────────────────────

function Stars({ rating, size = "sm" }) {
  const sz = size === "lg" ? "text-xl" : "text-sm";
  return (
    <div className={`flex gap-0.5 ${sz}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db" }}>★</span>
      ))}
    </div>
  );
}

function Avatar({ name, color }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ background: color }}
    >
      {name.charAt(0)}
    </div>
  );
}

// ─── Tab: Description ──────────────────────────────────────────────────────
function TabDescription({ specs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pt-2">
      {/* Text */}
      <div className="md:col-span-3 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">হিমসাগর আম — বাংলার সেরা আম</h3>
        <p className="text-sm leading-relaxed text-gray-600">
          হিমসাগর আম বাংলাদেশের সবচেয়ে জনপ্রিয় ও সুস্বাদু আমের মধ্যে একটি। রাজশাহী ও চাঁপাইনবাবগঞ্জ থেকে সরাসরি সংগ্রহ করা এই আম মিষ্টি সুগন্ধ ও ঘন রসে ভরপুর।
        </p>
        <p className="text-sm leading-relaxed text-gray-600">
          আমরা কোনো কেমিক্যাল বা কার্বাইড ব্যবহার না করে প্রাকৃতিকভাবে পাকানো আম সরবরাহ করি। প্রতিটি আম সতর্কতার সাথে বাছাই করে গ্রেড-এ মান নিশ্চিত করা হয়।
        </p>
        <ul className="space-y-2 pt-1">
          {[
            "কার্বাইড মুক্ত, প্রাকৃতিকভাবে পাকা",
            "সরাসরি বাগান থেকে সংগ্রহ",
            "পেস্টিসাইড ফ্রি, অর্গানিক চাষ পদ্ধতি",
            "সারা বাংলাদেশে ফ্রি হোম ডেলিভারি",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 shrink-0" style={{ color: C.greenDeep, fontSize: 16 }}>✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs table */}
      <div className="md:col-span-2">
        <div className="rounded-2xl overflow-hidden border border-orange-100">
          <div className="px-4 py-3 text-sm font-bold text-white" style={{ background: C.orangeHot }}>
            পণ্যের বিবরণ
          </div>
          <table className="w-full text-sm">
            <tbody>
              {specs.map(([label, value], i) => (
                <tr
                  key={i}
                  className="border-b border-orange-50 last:border-none"
                  style={{ background: i % 2 === 0 ? "#fff" : C.cream }}
                >
                  <td className="px-4 py-2.5 text-gray-500 w-2/5">{label}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// ─── Tab: Reviews ──────────────────────────────────────────────────────────
function TabReviews({ reviews, ratingBars, rating, reviewCount }) {
  return (
    <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Summary */}
      <div
        className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-orange-100"
        style={{ background: C.sand }}
      >
        <p className="text-6xl font-extrabold" style={{ color: C.orangeHot, fontFamily: "Nunito, sans-serif" }}>
          {rating}
        </p>
        <Stars rating={rating} size="lg" />
        <p className="text-sm text-gray-500 mt-1">{reviewCount} জন রিভিউ করেছেন</p>
        <div className="w-full mt-5 space-y-2">
          {ratingBars.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-3 shrink-0">{star}</span>
              <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    background: pct > 30 ? C.orangeMid : pct > 10 ? C.orangeLight : "#fca5a5",
                  }}
                />
              </div>
              <span className="w-7 text-right shrink-0">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="md:col-span-2 space-y-4">
        {reviews.map(({ name, location, date, rating: r, color, text }, i) => (
          <div key={i} className="rounded-2xl p-5 bg-white border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <Avatar name={name} color={color} />
                <div>
                  <p className="font-semibold text-sm text-gray-800">{name}</p>
                  <p className="text-xs text-gray-400">{location} · {date}</p>
                </div>
              </div>
              <Stars rating={r} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: FAQ ──────────────────────────────────────────────────────────────
function TabFAQ({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="pt-2 max-w-3xl space-y-3">
      {faqs.map(({ q, a }, i) => (
        <div
          key={i}
          className="rounded-xl border border-orange-100 overflow-hidden"
          style={{ background: C.sand }}
        >
          <button
            className="w-full flex justify-between items-center px-5 py-4 text-sm font-semibold text-gray-700 text-left gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{q}</span>
            <span
              className="shrink-0 transition-transform duration-200 text-gray-400"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▾
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-orange-100">
              {a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ProductDetails() {
  const p = PRODUCT;

  const [activeImg,    setActiveImg]    = useState(0);
  const [activeWeight, setActiveWeight] = useState(0);
  const [qty,          setQty]          = useState(1);
  const [activeTab,    setActiveTab]    = useState("desc");
  const [cartFlash,    setCartFlash]    = useState(false);
  const [wishlist,     setWishlist]     = useState(false);

  const currentWeight = p.weights[activeWeight];

  const handleAddToCart = () => {
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 2000);
  };

  const TABS = [
    { key: "desc",      label: "বিবরণ" },
    { key: "reviews",   label: `রিভিউ (${p.reviewCount})` },
    { key: "faq",       label: "সচরাচর জিজ্ঞাসা" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: C.cream, fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');
        .nunito { font-family: 'Nunito', sans-serif; }
        .tab-underline { border-bottom: 3px solid ${C.orangeHot}; color: ${C.orangeHot}; font-weight: 600; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── Breadcrumb ── */}
        <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-6 flex-wrap">
          <a href="#" className="hover:underline">Home</a>
          <span>›</span>
          <a href="#" className="hover:underline">আম</a>
          <span>›</span>
          <span className="font-medium" style={{ color: C.orangeHot }}>হিমসাগর আম</span>
        </div>

        {/* ══ PRODUCT SECTION ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

          {/* ── Left: Image Gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
              className="relative rounded-2xl overflow-hidden border border-orange-100"
              style={{ background: C.sand, aspectRatio: "4/3" }}
            >
              {/* Discount badge */}
              <span
                className="absolute top-4 left-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-lg nunito"
                style={{ background: C.orangeHot }}
              >
                -{p.discount}%
              </span>

              {/* Pre-order pill */}
              <span
                className="absolute top-4 right-14 z-10 text-xs font-medium px-3 py-1 rounded-full border"
                style={{ background: C.sand, color: C.orangeHot, borderColor: "#fbd5bb" }}
              >
                প্রি-অর্ডার
              </span>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className="absolute top-3.5 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center border shadow-sm transition-transform hover:scale-110"
                style={{ borderColor: wishlist ? C.orangeHot : "#f5cbb4" }}
                aria-label="Wishlist"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill={wishlist ? C.orangeHot : "none"} stroke={C.orangeHot} strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <img
                src={p.images[activeImg]}
                alt="হিমসাগর আম"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {p.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                  style={{ borderColor: activeImg === i ? C.orangeHot : "#e5e7eb" }}
                >
                  <img src={src.replace("w=800", "w=200")} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>

            {/* Trust pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌿", text: "১০০% অর্গানিক" },
                { icon: "🚚", text: "ফ্রি ডেলিভারি" },
                { icon: "✅", text: "গ্যারান্টিড ফ্রেশ" },
              ].map(({ icon, text }, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 flex flex-col items-center gap-1 text-center border"
                  style={{ background: C.sand, borderColor: "#fbd5bb" }}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs font-medium text-gray-600">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col gap-5">

            {/* Tags + Title */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full border"
                  style={{ background: C.sand, color: C.orangeHot, borderColor: "#fbd5bb" }}
                >
                  {p.origin}
                </span>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full border"
                  style={{ background: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0" }}
                >
                  {p.season}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-1">{p.nameBn}</h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-extrabold nunito" style={{ color: C.orangeHot }}>
                ৳{currentWeight.price.toLocaleString("bn-BD")}
              </span>
              <span className="text-lg text-gray-400 line-through nunito">
                ৳{currentWeight.oldPrice.toLocaleString("bn-BD")}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-lg text-white nunito"
                style={{ background: C.orangeHot }}
              >
                {p.discount}% ছাড়
              </span>
            </div>

            <hr className="border-orange-100" />

            {/* Weight Selector */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2.5">পরিমাণ নির্বাচন করুন</p>
              <div className="flex gap-3 flex-wrap">
                {p.weights.map(({ label, price }, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveWeight(i)}
                    className="px-6 py-2.5 rounded-full border-2 text-sm transition-all"
                    style={{
                      borderColor:   activeWeight === i ? C.orangeHot : "#e5e7eb",
                      background:    activeWeight === i ? C.sand      : "#fff",
                      color:         activeWeight === i ? C.orangeHot : "#374151",
                      fontWeight:    activeWeight === i ? 600          : 400,
                    }}
                  >
                    {label}
                    <br />
                    <span className="text-xs font-bold nunito">৳{price.toLocaleString("bn-BD")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2.5">সংখ্যা</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold text-gray-600 bg-white transition-colors hover:border-orange-400"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  −
                </button>
                <span className="text-xl font-extrabold nunito text-gray-800 w-6 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => Math.min(5, q + 1))}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold text-gray-600 bg-white transition-colors hover:border-orange-400"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  +
                </button>
                <span className="text-sm text-gray-400 ml-1">সর্বোচ্চ ৫টি</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 sm:gap-8 flex-wrap">
              <button
                onClick={handleAddToCart}
                className="btn-secondary"
              >
                🛒 কার্টে যোগ করুন
              </button>
              <button
                className="btn-primary"
              >
                ⚡ এখনই অর্ডার করুন
              </button>
            </div>

            {/* Delivery Info */}
            <div
              className="rounded-2xl p-4 border"
              style={{ background: C.sand, borderColor: "#fbd5bb" }}
            >
              <p className="text-sm font-bold text-gray-700 mb-2">ডেলিভারি তথ্য</p>
              {[
                { bg: "#fff0e6", icon: "🗓️", title: "ডেলিভারির তারিখ",  sub: "আনুমানিক ১৭ মে ২০২৫, ইনশাআল্লাহ" },
                { bg: "#dcfce7", icon: "🚚", title: "ফ্রি ডেলিভারি",     sub: "সারা বাংলাদেশে হোম ডেলিভারি" },
                { bg: "#dbeafe", icon: "📦", title: "নিরাপদ প্যাকেজিং", sub: "বিশেষ কাঠের বাক্সে প্যাক করা হয়" },
              ].map(({ bg, icon, title, sub }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2.5"
                  style={{ borderBottom: i < 2 ? "1px solid #f0ede8" : "none" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-base"
                    style={{ background: bg }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{title}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ══ TABS SECTION ═════════════════════════════════════════════════ */}
        <div>
          {/* Tab bar */}
          <div className="flex gap-0 border-b border-gray-200 mb-8 overflow-x-auto">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 text-sm whitespace-nowrap transition-all ${
                  activeTab === key ? "tab-underline" : "text-gray-500 hover:text-orange-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "desc"      && <TabDescription specs={p.specs} />}
          {activeTab === "reviews"   && (
            <TabReviews
              reviews={p.reviews}
              ratingBars={p.ratingBars}
              rating={p.rating}
              reviewCount={p.reviewCount}
            />
          )}
          {activeTab === "faq" && <TabFAQ faqs={p.faqs} />}
        </div>
      </div>
    </div>
  );
}