import axios from "axios";
import { useRef, useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShoppingBag,
  HiOutlineArrowPath,
  HiOutlineXCircle,
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
  HiMiniSignal,
} from "react-icons/hi2";

// ── Theme ─────────────────────────────────────────────────────────────
const PRIMARY = "#f04e0f";
const PRIMARY_L = "#fff3ee";
const GREEN = "#16a34a";
const GREEN_L = "#f0fdf4";
const AMBER = "#d97706";
const BLUE = "#2563eb";
const RED = "#dc2626";

// ── Helpers ───────────────────────────────────────────────────────────
const formatPrice = (price) =>
  `৳${Number(price || 0).toLocaleString()}`;

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const STATUS_META = {
  pending: {
    label: "Pending",
    color: AMBER,
    bg: "#fff7ed",
    icon: "⏳",
  },

  processing: {
    label: "Processing",
    color: BLUE,
    bg: "#eff6ff",
    icon: "📦",
  },

  shipped: {
    label: "Shipped",
    color: BLUE,
    bg: "#eff6ff",
    icon: "🚚",
  },

  delivered: {
    label: "Delivered",
    color: GREEN,
    bg: GREEN_L,
    icon: "🎉",
  },

  cancelled: {
    label: "Cancelled",
    color: RED,
    bg: "#fef2f2",
    icon: "❌",
  },
};

const PAYMENT_META = {
  paid: {
    label: "Paid",
    color: GREEN,
    bg: GREEN_L,
  },

  unpaid: {
    label: "Unpaid",
    color: AMBER,
    bg: "#fff7ed",
  },

  refunded: {
    label: "Refunded",
    color: BLUE,
    bg: "#eff6ff",
  },
};

// ── Timeline Config ───────────────────────────────────────────────────
const steps = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

const timelineLabels = {
  pending: "Order Placed",
  processing: "Being Prepared",
  shipped: "Shipped",
  delivered: "Delivered",
};

// ── Pulse Dot ─────────────────────────────────────────────────────────
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

// ── Timeline ──────────────────────────────────────────────────────────
function Timeline({ status }) {
  const currentIdx = steps.indexOf(status);

  return (
    <div className="relative flex flex-col gap-0">
      {steps.map((step, i) => {
        const isDone = i <= currentIdx;
        const isCurrent = i === currentIdx;

        return (
          <div key={step} className="flex gap-4 relative">

            {/* Connector */}
            {i < steps.length - 1 && (
              <div
                className="absolute left-[19px] top-10 w-0.5 h-full -translate-x-1/2"
                style={{
                  background:
                    i < currentIdx
                      ? GREEN
                      : "#e5e7eb",
                }}
              />
            )}

            {/* Icon */}
            <div className="relative z-10 shrink-0 mt-0.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${isDone
                    ? "border-green-500 bg-green-500"
                    : "border-dashed border-orange-300 bg-orange-50"
                  }`}
              >
                {isDone ? (
                  <HiOutlineCheckCircle
                    size={16}
                    className="text-white"
                  />
                ) : (
                  <LiveDot />
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className={`pb-8 flex-1 ${i === steps.length - 1 ? "pb-0" : ""
                }`}
            >
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-bold ${isDone
                      ? "text-gray-800"
                      : "text-gray-400"
                    }`}
                >
                  {timelineLabels[step]}
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

              <p className="text-xs text-gray-400 mt-1">
                {step === "pending" &&
                  "Your order has been received."}

                {step === "processing" &&
                  "Fresh items being packed carefully."}

                {step === "shipped" &&
                  "Your package is on the way."}

                {step === "delivered" &&
                  "Package delivered successfully."}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Order Card ────────────────────────────────────────────────────────
function OrderCard({ order }) {
  const [showItems, setShowItems] = useState(false);
  const [copied, setCopied] = useState(false);

  const deliveryStatus =
    order.delivery?.delivery_status?.toLowerCase() ||
    "pending";

  const paymentStatus =
    order.payment?.payment_status?.toLowerCase() ||
    "unpaid";

  const statusMeta =
    STATUS_META[deliveryStatus] ||
    STATUS_META.pending;

  const paymentMeta =
    PAYMENT_META[paymentStatus] ||
    PAYMENT_META.unpaid;

  const currentStepIdx =
    steps.indexOf(deliveryStatus);

  const progress = Math.max(
    25,
    Math.round(
      ((currentStepIdx + 1) / steps.length) * 100
    )
  );

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(order._id);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch { }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

      {/* Header */}
      <div
        className="px-6 py-5 flex items-start bg-(--orange-hot) justify-between gap-4 flex-wrap"
      // style={{
      //   background: `linear-gradient(135deg, ${PRIMARY} 0%, #c73d08 100%)`,
      // }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-orange-100 text-xs font-medium">
              Order ID
            </p>

            <button
              onClick={copyId}
              className="text-orange-200 hover:text-white"
            >
              {copied ? (
                <HiOutlineClipboardDocumentCheck size={13} />
              ) : (
                <HiOutlineClipboardDocument size={13} />
              )}
            </button>
          </div>

          <h2 className="text-white text-lg sm:text-3xl font-black">
            {order._id}
          </h2>

          <p className="text-orange-100 text-xs mt-2 flex items-center gap-1">
            <HiOutlineCalendarDays size={12} />
            Placed on {formatDate(order.order_date)}
          </p>
        </div>

        <div>
          <span
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/20 text-white"
          >
            {statusMeta.icon} {statusMeta.label}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-500">
            Delivery Progress
          </span>

          <span
            className="text-xs font-bold"
            style={{ color: PRIMARY }}
          >
            {progress}%
          </span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background:
                deliveryStatus === "delivered"
                  ? `linear-gradient(90deg, ${GREEN}, #22c55e)`
                  : `linear-gradient(90deg, ${PRIMARY}, #ff7940)`,
            }}
          />
        </div>

        <div className="flex justify-between mt-2">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`text-[10px] font-bold capitalize ${i <= currentStepIdx
                  ? "text-gray-600"
                  : "text-gray-300"
                }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">

        {/* Timeline */}
        <div className="px-6 py-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            Tracking Timeline
          </p>

          <Timeline status={deliveryStatus} />
        </div>

        {/* Info */}
        <div className="px-6 py-6 flex flex-col gap-5">

          {/* Estimated Delivery */}
          {deliveryStatus !== "delivered" &&
            deliveryStatus !== "cancelled" && (
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: PRIMARY_L,
                  border: `1.5px dashed ${PRIMARY}40`,
                }}
              >
                <HiOutlineTruck
                  size={20}
                  style={{ color: PRIMARY }}
                />

                <div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Estimated Delivery
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    {order.delivery?.estimated_delivery
                      ? formatDate(
                        order.delivery.estimated_delivery
                      )
                      : "Not Available"}
                  </p>
                </div>
              </div>
            )}

          {/* Customer */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              Delivery Info
            </p>

            <div className="flex flex-col gap-3">

              {/* Name */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {order.customer?.name?.[0]}
                </div>

                <div>
                  <p className="font-bold text-gray-800">
                    {order.customer?.name}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiOutlinePhone size={14} />

                {order.customer?.phone}
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <HiOutlineMapPin
                  size={14}
                  className="mt-0.5"
                />

                <span>
                  {order.shipping_address?.address},{" "}
                  {order.shipping_address?.thana},{" "}
                  {order.shipping_address?.district_name}
                </span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              Payment
            </p>

            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  {order.payment?.method}
                </p>

                <p className="text-2xl font-black text-gray-800 mt-1">
                  {formatPrice(order.pricing?.total)}
                </p>
              </div>

              <span
                className="text-xs font-bold px-3 py-1.5 rounded-xl"
                style={{
                  background: paymentMeta.bg,
                  color: paymentMeta.color,
                }}
              >
                {paymentMeta.label}
              </span>
            </div>
          </div>

          {/* Items */}
          <div>
            <button
              onClick={() => setShowItems(!showItems)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 hover:border-orange-300"
            >
              <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <HiOutlineShoppingBag
                  size={14}
                  style={{ color: PRIMARY }}
                />

                {order.items?.length} items ordered
              </span>

              {showItems ? (
                <HiOutlineChevronUp
                  size={14}
                  className="text-gray-400"
                />
              ) : (
                <HiOutlineChevronDown
                  size={14}
                  className="text-gray-400"
                />
              )}
            </button>

            {showItems && (
              <div className="mt-3 flex flex-col gap-3">

                {order.items?.map((item) => (
                  <div
                    key={item.cart_id}
                    className="flex gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">
                        {item.product_name}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Package: {item.package_quantity} KG
                      </p>

                      <p className="text-xs text-gray-400">
                        Qty: {item.package_count}
                      </p>

                      <p className="text-xs text-gray-400">
                        Unit Price:{" "}
                        {formatPrice(item.unit_price)}
                      </p>
                    </div>

                    <div className="text-sm font-bold text-orange-600">
                      {formatPrice(item.total_price)}
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="flex justify-between text-sm px-2">
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="font-bold text-green-600">
                    {order.pricing?.delivery_cost > 0
                      ? formatPrice(
                        order.pricing.delivery_cost
                      )
                      : "Free"}
                  </span>
                </div>

                {order.pricing?.discount > 0 && (
                  <div className="flex justify-between text-sm px-2">
                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="font-bold text-red-500">
                      -{formatPrice(order.pricing.discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold px-2">
                  <span>Total</span>

                  <span style={{ color: PRIMARY }}>
                    {formatPrice(order.pricing?.total)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function OrderTrackPage() {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  const search = async () => {
    if (!input.trim()) {
      setError("Please enter your order ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${input}`
      );

      setOrder(res.data);
    } catch (err) {
      console.log(err);

      setOrder(null);

      setError("No order found");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setInput("");
    setOrder(null);
    setError("");

    inputRef.current?.focus();
  };

  return (
    <>
      <style>{`
        *{
          font-family:'Sora','Noto Sans Bengali',sans-serif;
        }

        @keyframes float{
          0%,100%{
            transform:translateY(0px) rotate(-2deg);
          }

          50%{
            transform:translateY(-8px) rotate(2deg);
          }
        }

        .hero-blob{
          animation:float 6s ease-in-out infinite;
        }
      `}</style>

      <div
        className="min-h-screen"
        style={{ background: "#fafaf8" }}
      >

        {/* Hero */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#1a0a04 0%,#3d1405 50%,#5c1e07 100%)",
          }}
        >

          {/* Blobs */}
          <div
            className="hero-blob absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: PRIMARY }}
          />

          <div
            className="hero-blob absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-10"
            style={{
              background: "#ff7940",
              animationDelay: "2s",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-1 sm:px-6 py-16 text-center">

            {/* Live */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/10">
              <HiMiniSignal
                size={14}
                className="text-green-400"
              />

              <span className="text-xs font-bold text-green-300">
                Live Tracking
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
              Track Your Order
            </h1>

            <p className="text-orange-200 text-sm sm:text-base font-medium mb-10">
              আপনার অর্ডার কোথায় আছে জানুন — রিয়েল টাইমে।
            </p>

            {/* Search */}
            <div className="w-full px-3 sm:px-4">
              <div className="relative flex items-center w-full max-w-lg mx-auto bg-white rounded-2xl p-2 shadow-xl border border-gray-100">

                {/* Search Icon */}
                <HiOutlineMagnifyingGlass
                  size={18}
                  className="absolute left-4 text-gray-400 shrink-0"
                />

                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      search();
                    }
                  }}
                  placeholder="Enter your order ID"
                  className="
        flex-1
        h-11 sm:h-12
        pl-10
        pr-2
        text-sm
        sm:text-base
        font-semibold
        text-gray-700
        bg-transparent
        outline-none
        min-w-0
      "
                />

                {/* Clear Button */}
                {input && (
                  <button
                    onClick={clear}
                    className="
          hidden xs:flex
          w-8 h-8
          rounded-lg
          items-center
          justify-center
          text-gray-400
          hover:bg-gray-100
          transition
          shrink-0
        "
                  >
                    <HiOutlineXCircle size={18} />
                  </button>
                )}

                {/* Track Button */}
                <button
                  onClick={search}
                  disabled={loading}
                  className="
        ml-2
        h-11 sm:h-12
        px-3 sm:px-5
        rounded-xl
        text-sm
        font-bold
        text-white
        bg-orange-600
        hover:bg-orange-700
        active:scale-[0.98]
        transition-all
        flex
        items-center
        justify-center
        gap-2
        whitespace-nowrap
        shrink-0
      "
                >
                  {loading ? (
                    <HiOutlineArrowPath
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <HiOutlineMagnifyingGlass size={16} />
                  )}

                  <span className="hidden sm:inline">
                    {loading ? "Searching..." : "Track"}
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600">
                <HiOutlineXCircle size={16} />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* ── No search yet — hint cards ─────────────────────────────────── */}
        {!order && !loading && !error && (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 sm:my-8 mx-6 sm:mx-14"
            style={{ animation: "slideUp 0.5s ease both" }}
          >
            {[
              { icon: "🔍", title: "Search by ID", desc: "Enter your order ID in the search box above." },
              { icon: "📌", title: "Save & Revisit", desc: "Save orders to track them quickly next time." },
              { icon: "🚚", title: "Live Updates", desc: "See real-time delivery status & timeline." },
            ].map(card => (
              <div
                key={card.title}
                className="bg-(--cream-bg) rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md hover:border-orange-200 transition-all"
              >
                <span className="text-3xl block mb-3">{card.icon}</span>
                <p className="text-sm font-bold text-gray-800 mb-1">{card.title}</p>
                <p className="text-xs text-gray-400">{card.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
              <div className="h-28 bg-gray-100" />

              <div className="p-6 flex flex-col gap-4">
                <div className="h-4 bg-gray-100 rounded-full w-1/3" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />
              </div>
            </div>
          )}

          {/* Order */}
          {order && !loading && (
            <OrderCard order={order} />
          )}
        </div>
      </div>
    </>
  );
}