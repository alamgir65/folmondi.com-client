import { useState, useEffect, useRef } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTruck,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShoppingBag,
  HiOutlineArrowPath,
  HiOutlineXCircle,
  HiOutlineReceiptPercent,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineBookmark,
  HiOutlineTrash,
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
  HiMiniSignal,
} from "react-icons/hi2";

// ── Design tokens ──────────────────────────────────────────────────────────────
const PRIMARY   = "#f04e0f";
const PRIMARY_L = "#fff3ee";
const GREEN     = "#16a34a";
const GREEN_L   = "#f0fdf4";
const AMBER     = "#d97706";
const BLUE      = "#2563eb";
const RED       = "#dc2626";

// ── Mock order database ────────────────────────────────────────────────────────
const ORDER_DB = {
  "ORD-1001": {
    id: "ORD-1001",
    customer: "Rafiqul Islam",
    phone: "01712-345678",
    address: "House 12, Road 4, Mirpur-10, Dhaka",
    date: "2025-05-08",
    estimatedDelivery: "2025-05-11",
    items: [
      { name: "হিমসাগর আম", nameEn: "Himsagar Mango", qty: 2, price: 1800, weight: "12 KG" },
      { name: "সুন্দরবন মধু", nameEn: "Sundarban Honey", qty: 1, price: 950, weight: "1 KG" },
    ],
    subtotal: 4550,
    delivery: 0,
    total: 4550,
    payment: "unpaid",
    paymentMethod: "Cash on Delivery",
    status: "processing",
    delivery_status: "processing",
    timeline: [
      { step: "ordered",    label: "Order Placed",       time: "2025-05-08 10:32 AM", done: true,  note: "Your order has been received." },
      { step: "confirmed",  label: "Order Confirmed",    time: "2025-05-08 11:05 AM", done: true,  note: "Seller confirmed your order." },
      { step: "processing", label: "Being Prepared",     time: "2025-05-08 02:00 PM", done: true,  note: "Fresh items being packed carefully." },
      { step: "shipped",    label: "Shipped",            time: null,                  done: false, note: "Your package is on the way." },
      { step: "delivered",  label: "Delivered",          time: null,                  done: false, note: "Package delivered to your address." },
    ],
  },
  "ORD-1002": {
    id: "ORD-1002",
    customer: "Sumaiya Akter",
    phone: "01898-765432",
    address: "Flat 5B, Gulshan-2, Dhaka",
    date: "2025-05-07",
    estimatedDelivery: "2025-05-10",
    items: [
      { name: "গোবিন্দভোগ আম", nameEn: "Gobindobhog Mango", qty: 3, price: 1680, weight: "5 KG" },
    ],
    subtotal: 5040,
    delivery: 0,
    total: 5040,
    payment: "paid",
    paymentMethod: "bKash",
    status: "shipped",
    delivery_status: "shipped",
    timeline: [
      { step: "ordered",    label: "Order Placed",    time: "2025-05-07 09:14 AM", done: true,  note: "Your order has been received." },
      { step: "confirmed",  label: "Order Confirmed", time: "2025-05-07 09:50 AM", done: true,  note: "Seller confirmed your order." },
      { step: "processing", label: "Being Prepared",  time: "2025-05-07 12:30 PM", done: true,  note: "Fresh items packed with care." },
      { step: "shipped",    label: "Shipped",         time: "2025-05-08 08:00 AM", done: true,  note: "Package handed to Steadfast courier." },
      { step: "delivered",  label: "Delivered",       time: null,                  done: false, note: "Arriving soon!" },
    ],
  },
  "ORD-1003": {
    id: "ORD-1003",
    customer: "Karim Hossain",
    phone: "01611-223344",
    address: "Agrabad C/A, Chattogram",
    date: "2025-05-06",
    estimatedDelivery: "2025-05-08",
    items: [
      { name: "আনারস", nameEn: "Pineapple", qty: 5, price: 400, weight: "~5 KG" },
    ],
    subtotal: 2000,
    delivery: 0,
    total: 2000,
    payment: "paid",
    paymentMethod: "Cash on Delivery",
    status: "delivered",
    delivery_status: "delivered",
    timeline: [
      { step: "ordered",    label: "Order Placed",    time: "2025-05-06 11:00 AM", done: true, note: "Your order has been received." },
      { step: "confirmed",  label: "Order Confirmed", time: "2025-05-06 11:40 AM", done: true, note: "Seller confirmed your order." },
      { step: "processing", label: "Being Prepared",  time: "2025-05-06 02:00 PM", done: true, note: "Packed fresh from the farm." },
      { step: "shipped",    label: "Shipped",         time: "2025-05-07 07:30 AM", done: true, note: "Out for delivery via Steadfast." },
      { step: "delivered",  label: "Delivered",       time: "2025-05-08 01:15 PM", done: true, note: "Delivered successfully. Enjoy! 🎉" },
    ],
  },
};

const LS_KEY = "folmondi_tracked_orders";

const fmt   = (n) => `৳${Number(n).toLocaleString()}`;
const steps = ["ordered","confirmed","processing","shipped","delivered"];

const STATUS_META = {
  pending:    { label: "Pending",    color: AMBER, bg: "#fff7ed", icon: "⏳" },
  processing: { label: "Processing", color: BLUE,  bg: "#eff6ff", icon: "📦" },
  confirmed:  { label: "Confirmed",  color: GREEN, bg: GREEN_L,   icon: "✅" },
  shipped:    { label: "Shipped",    color: BLUE,  bg: "#eff6ff", icon: "🚚" },
  delivered:  { label: "Delivered",  color: GREEN, bg: GREEN_L,   icon: "🎉" },
  cancelled:  { label: "Cancelled",  color: RED,   bg: "#fef2f2", icon: "❌" },
};

const PAYMENT_META = {
  paid:     { label: "Paid",     color: GREEN, bg: GREEN_L   },
  unpaid:   { label: "Unpaid",   color: AMBER, bg: "#fff7ed" },
  refunded: { label: "Refunded", color: BLUE,  bg: "#eff6ff" },
};

// ── Pulse dot ──────────────────────────────────────────────────────────────────
function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: PRIMARY }}
      />
      <span
        className="relative inline-flex rounded-full h-2.5 w-2.5"
        style={{ backgroundColor: PRIMARY }}
      />
    </span>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────────
function Timeline({ timeline, currentStep }) {
  const currentIdx = steps.indexOf(currentStep);

  return (
    <div className="relative flex flex-col gap-0">
      {timeline.map((item, i) => {
        const stepIdx   = steps.indexOf(item.step);
        const isDone    = item.done;
        const isCurrent = stepIdx === currentIdx && isDone && (i === timeline.length - 1 || !timeline[i + 1]?.done);
        const isNext    = stepIdx === currentIdx + 1;

        return (
          <div key={item.step} className="flex gap-4 relative">
            {/* Vertical connector */}
            {i < timeline.length - 1 && (
              <div
                className="absolute left-[19px] top-10 w-0.5 h-full -translate-x-1/2 z-0"
                style={{
                  background: isDone && timeline[i + 1]?.done
                    ? `linear-gradient(to bottom, ${GREEN}, ${GREEN})`
                    : isDone
                    ? `linear-gradient(to bottom, ${GREEN}, #e5e7eb)`
                    : "#e5e7eb",
                }}
              />
            )}

            {/* Step icon */}
            <div className="relative z-10 shrink-0 mt-0.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isDone
                    ? "border-green-500 bg-green-500"
                    : isNext
                    ? "border-dashed border-orange-300 bg-orange-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {isDone ? (
                  <HiOutlineCheckCircle size={16} className="text-white" />
                ) : isNext ? (
                  <LiveDot />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </div>
            </div>

            {/* Step content */}
            <div className={`pb-8 flex-1 ${i === timeline.length - 1 ? "pb-0" : ""}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className={`text-sm font-bold ${
                    isDone ? "text-gray-800" : isNext ? "text-orange-500" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </p>
                {isCurrent && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Current
                  </span>
                )}
              </div>
              {item.time && (
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <HiOutlineCalendarDays size={11} />
                  {item.time}
                </p>
              )}
              <p className={`text-xs mt-1 ${isDone ? "text-gray-500" : "text-gray-400"}`}>
                {item.note}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Order Result Card ──────────────────────────────────────────────────────────
function OrderCard({ order, savedOrders, onSave, onRemoveSaved }) {
  const [showItems, setShowItems] = useState(false);
  const [copied,    setCopied]    = useState(false);
  const isSaved = savedOrders.includes(order.id);
  const statusMeta  = STATUS_META[order.status]  || STATUS_META.pending;
  const paymentMeta = PAYMENT_META[order.payment] || PAYMENT_META.unpaid;
  const currentStepIdx = steps.indexOf(order.delivery_status);
  const progress = Math.round(((currentStepIdx + 1) / steps.length) * 100);

  const copyId = () => {
    navigator.clipboard.writeText(order.id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
      style={{ animation: "slideUp 0.4s cubic-bezier(.22,1,.36,1) both" }}
    >

      {/* ── Header stripe ────────────────────────────────────────────────── */}
      <div
        className="px-6 py-5 flex items-start justify-between gap-4 flex-wrap"
        style={{
          background: `linear-gradient(135deg, ${PRIMARY} 0%, #c73d08 100%)`,
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-orange-100 text-xs font-medium">Order ID</p>
            <button
              onClick={copyId}
              className="text-orange-200 hover:text-white transition-colors"
              title="Copy order ID"
            >
              {copied
                ? <HiOutlineClipboardDocumentCheck size={13} />
                : <HiOutlineClipboardDocument size={13} />}
            </button>
          </div>
          <h2 className="text-white text-xl font-bold tracking-wide">{order.id}</h2>
          <p className="text-orange-100 text-xs mt-1 flex items-center gap-1.5">
            <HiOutlineCalendarDays size={12} /> Placed on {order.date}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Status pill */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm"
          >
            {statusMeta.icon} {statusMeta.label}
          </span>
          {/* Save button */}
          <button
            onClick={() => isSaved ? onRemoveSaved(order.id) : onSave(order.id)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-white/70 hover:text-white transition-colors"
          >
            {isSaved
              ? <><HiOutlineTrash size={12} /> Remove saved</>
              : <><HiOutlineBookmark size={12} /> Save order</>
            }
          </button>
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-500">Delivery Progress</span>
          <span className="text-xs font-bold" style={{ color: PRIMARY }}>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              background: order.status === "delivered"
                ? `linear-gradient(90deg, ${GREEN}, #22c55e)`
                : `linear-gradient(90deg, ${PRIMARY}, #ff7940)`,
            }}
          />
        </div>
        {/* Step labels */}
        <div className="flex justify-between mt-2">
          {["Ordered","Confirmed","Packing","Shipped","Delivered"].map((s, i) => (
            <span
              key={s}
              className={`text-[9px] font-bold ${
                i <= currentStepIdx ? "text-gray-600" : "text-gray-300"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Two-col body ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">

        {/* Left: Timeline */}
        <div className="px-6 py-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            Tracking Timeline
          </p>
          <Timeline timeline={order.timeline} currentStep={order.delivery_status} />
        </div>

        {/* Right: Info */}
        <div className="px-6 py-6 flex flex-col gap-5">

          {/* Estimated delivery */}
          {order.status !== "delivered" && order.status !== "cancelled" && (
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: PRIMARY_L, border: `1.5px dashed ${PRIMARY}40` }}
            >
              <HiOutlineTruck size={20} style={{ color: PRIMARY }} />
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Estimated Delivery</p>
                <p className="text-sm font-bold text-gray-800">{order.estimatedDelivery}</p>
              </div>
            </div>
          )}

          {order.status === "delivered" && (
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: GREEN_L, border: `1.5px dashed ${GREEN}40` }}
            >
              <span className="text-2xl">🎉</span>
              <div>
                <p className="text-[11px] text-green-600 font-medium">Delivered Successfully</p>
                <p className="text-sm font-bold text-green-700">Thank you for ordering!</p>
              </div>
            </div>
          )}

          {/* Customer */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Delivery Info</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2.5 text-sm text-gray-600">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {order.customer[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{order.customer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-500">
                <HiOutlinePhone size={14} className="shrink-0 text-gray-400" />
                {order.phone}
              </div>
              <div className="flex items-start gap-2.5 text-sm text-gray-500">
                <HiOutlineMapPin size={14} className="shrink-0 text-gray-400 mt-0.5" />
                {order.address}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Payment</p>
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
              <div>
                <p className="text-xs text-gray-400">{order.paymentMethod}</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">{fmt(order.total)}</p>
              </div>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-xl"
                style={{ background: paymentMeta.bg, color: paymentMeta.color }}
              >
                {paymentMeta.label}
              </span>
            </div>
          </div>

          {/* Items toggle */}
          <div>
            <button
              onClick={() => setShowItems(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-200 hover:border-orange-300 transition-colors bg-gray-50 hover:bg-orange-50/30"
            >
              <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <HiOutlineShoppingBag size={14} style={{ color: PRIMARY }} />
                {order.items.length} item{order.items.length > 1 ? "s" : ""} ordered
              </span>
              {showItems
                ? <HiOutlineChevronUp size={14} className="text-gray-400" />
                : <HiOutlineChevronDown size={14} className="text-gray-400" />
              }
            </button>

            {showItems && (
              <div
                className="mt-2 flex flex-col gap-2"
                style={{ animation: "slideUp 0.2s ease both" }}
              >
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.name}</p>
                      <p className="text-[11px] text-gray-400">{item.nameEn} · {item.weight}</p>
                      <p className="text-[11px] text-gray-400">Qty: {item.qty} × {fmt(item.price)}</p>
                    </div>
                    <p className="text-sm font-bold" style={{ color: PRIMARY }}>
                      {fmt(item.qty * item.price)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between px-4 pt-1 text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="flex justify-between px-4 pb-1 text-sm font-bold">
                  <span className="text-gray-800">Total</span>
                  <span style={{ color: PRIMARY }}>{fmt(order.total)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Saved order chip ───────────────────────────────────────────────────────────
function SavedChip({ orderId, onClick, onRemove }) {
  const order = ORDER_DB[orderId];
  const meta  = order ? STATUS_META[order.status] : null;
  return (
    <div
      className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl border border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm transition-all cursor-pointer group"
      onClick={() => onClick(orderId)}
    >
      <span className="text-sm">{meta?.icon || "📦"}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold text-gray-800 truncate">{orderId}</p>
        <p className="text-[10px] text-gray-400">{meta?.label || "Unknown"}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(orderId); }}
        className="w-5 h-5 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors ml-1"
      >
        <HiOutlineXCircle size={14} />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function OrderTrackPage() {
  const [input,        setInput]        = useState("");
  const [order,        setOrder]        = useState(null);
  const [error,        setError]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [savedOrders,  setSavedOrders]  = useState([]);
  const inputRef = useRef(null);

  // Load saved orders from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      setSavedOrders(stored);
      // Auto-load the most recently saved order
      if (stored.length > 0 && ORDER_DB[stored[0]]) {
        setOrder(ORDER_DB[stored[0]]);
      }
    } catch {
      setSavedOrders([]);
    }
  }, []);

  const persistSaved = (list) => {
    setSavedOrders(list);
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {}
  };

  const saveOrder = (id) => {
    if (!savedOrders.includes(id)) persistSaved([id, ...savedOrders]);
  };

  const removeSaved = (id) => {
    persistSaved(savedOrders.filter(s => s !== id));
  };

  const search = async (id) => {
    const q = (id || input).trim().toUpperCase();
    if (!q) { setError("Please enter an order ID."); return; }
    setLoading(true);
    setError("");
    setOrder(null);
    await new Promise(r => setTimeout(r, 700)); // simulate API call
    const found = ORDER_DB[q];
    if (found) {
      setOrder(found);
      setInput(q);
    } else {
      setError(`No order found for "${q}". Try: ORD-1001, ORD-1002, ORD-1003`);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") search();
  };

  const clear = () => {
    setInput("");
    setOrder(null);
    setError("");
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Global animation styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans+Bengali:wght@400;600;700&display=swap');

        * { font-family: 'Sora', 'Noto Sans Bengali', sans-serif; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-8px) rotate(2deg); }
        }
        .hero-blob {
          animation: float 6s ease-in-out infinite;
        }
        .search-glow:focus-within {
          box-shadow: 0 0 0 4px rgba(240,78,15,0.12);
        }
      `}</style>

      <div className="min-h-screen" style={{ background: "#fafaf8" }}>

        {/* ── Hero section ────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, #1a0a04 0%, #3d1405 50%, #5c1e07 100%)` }}
        >
          {/* Decorative blobs */}
          <div
            className="hero-blob absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: PRIMARY }}
          />
          <div
            className="hero-blob absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-10"
            style={{ background: "#ff7940", animationDelay: "2s" }}
          />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/10">
              <HiMiniSignal size={14} className="text-green-400" />
              <span className="text-xs font-bold text-green-300">Live Tracking</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight"
            >
              Track Your Order
            </h1>
            <p className="text-orange-200 text-sm sm:text-base font-medium mb-10 max-w-lg mx-auto">
              আপনার অর্ডার কোথায় আছে জানুন — রিয়েল টাইমে। Enter your Order ID to get live updates.
            </p>

            {/* ── Search box ──────────────────────────────────────────────── */}
            <div
              className="search-glow relative flex items-center gap-0 bg-white rounded-2xl p-1.5 max-w-xl mx-auto shadow-2xl transition-all duration-300"
            >
              <HiOutlineMagnifyingGlass
                size={18}
                className="absolute left-5 text-gray-400 pointer-events-none"
              />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => { setInput(e.target.value.toUpperCase()); setError(""); }}
                onKeyDown={handleKey}
                placeholder="e.g. ORD-1001"
                className="flex-1 h-12 pl-11 pr-4 text-sm font-bold text-gray-700 bg-transparent focus:outline-none placeholder:font-normal placeholder:text-gray-400 tracking-wider"
              />
              {input && (
                <button
                  onClick={clear}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors mr-1"
                >
                  <HiOutlineXCircle size={16} />
                </button>
              )}
              <button
                onClick={() => search()}
                disabled={loading}
                className="h-12 px-6 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 flex items-center gap-2 shrink-0"
                style={{ backgroundColor: PRIMARY }}
              >
                {loading
                  ? <HiOutlineArrowPath size={15} className="animate-spin" />
                  : <HiOutlineMagnifyingGlass size={15} />
                }
                {loading ? "Searching…" : "Track"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "#fef2f2", color: RED, animation: "fadeIn 0.3s ease" }}
              >
                <HiOutlineXCircle size={16} />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">

          {/* ── Saved orders ──────────────────────────────────────────────── */}
          {savedOrders.length > 0 && (
            <div style={{ animation: "slideUp 0.4s ease both" }}>
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineBookmark size={14} style={{ color: PRIMARY }} />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Saved Orders
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {savedOrders.map(id => (
                  <SavedChip
                    key={id}
                    orderId={id}
                    onClick={(id) => { search(id); setInput(id); }}
                    onRemove={removeSaved}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── No search yet — hint cards ─────────────────────────────────── */}
          {!order && !loading && !error && savedOrders.length === 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              style={{ animation: "slideUp 0.5s ease both" }}
            >
              {[
                { icon: "🔍", title: "Search by ID",    desc: "Enter your order ID in the search box above." },
                { icon: "📌", title: "Save & Revisit",  desc: "Save orders to track them quickly next time." },
                { icon: "🚚", title: "Live Updates",    desc: "See real-time delivery status & timeline." },
              ].map(card => (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <span className="text-3xl block mb-3">{card.icon}</span>
                  <p className="text-sm font-bold text-gray-800 mb-1">{card.title}</p>
                  <p className="text-xs text-gray-400">{card.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── Loading skeleton ───────────────────────────────────────────── */}
          {loading && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
              <div className="h-28" style={{ background: "#f1ece9" }} />
              <div className="p-6 flex flex-col gap-4">
                <div className="h-4 bg-gray-100 rounded-full w-1/3" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />
                <div className="h-3 bg-gray-100 rounded-full w-1/4" />
              </div>
            </div>
          )}

          {/* ── Order result ───────────────────────────────────────────────── */}
          {order && !loading && (
            <OrderCard
              order={order}
              savedOrders={savedOrders}
              onSave={saveOrder}
              onRemoveSaved={removeSaved}
            />
          )}

          {/* ── Demo hint ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <p className="text-xs text-gray-400">Try demo orders:</p>
            {["ORD-1001","ORD-1002","ORD-1003"].map(id => (
              <button
                key={id}
                onClick={() => { setInput(id); search(id); }}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition-all"
              >
                {id}
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}