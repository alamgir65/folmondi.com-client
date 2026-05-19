import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n) => `৳${Number(n).toLocaleString()}`;

const STATUS_META = {
  pending:    { label: "Pending",    color: "#d97706", bg: "#fffbeb" },
  processing: { label: "Processing", color: "#2563eb", bg: "#eff6ff" },
  shipped:    { label: "Shipped",    color: "#7c3aed", bg: "#f5f3ff" },
  confirmed:  { label: "Confirmed",  color: "#0891b2", bg: "#ecfeff" },
  delivered:  { label: "Delivered",  color: "#16a34a", bg: "#f0fdf4" },
  cancelled:  { label: "Cancelled",  color: "#dc2626", bg: "#fef2f2" },
};

// Normalize order_status string → lowercase key
const normalizeStatus = (s = "") => s.toLowerCase();

// Format a date string to a short relative/readable label
const fmtDate = (iso) => {
  if (!iso) return "—";
  const d     = new Date(iso);
  const now   = new Date();
  const diffMs = now - d;
  const diffH  = diffMs / 36e5;
  if (diffH < 24 && d.getDate() === now.getDate()) {
    return `Today, ${d.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.getDate() === yesterday.getDate()) return "Yesterday";
  return d.toLocaleDateString("en-BD", { month: "short", day: "numeric" });
};

// ── Animated counter ───────────────────────────────────────────────────────────
function useCount(target, duration = 1100) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    let current = 0;
    const step  = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ── Skeleton loader ────────────────────────────────────────────────────────────
function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-100 ${className}`}
      style={style}
    />
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value = 0, prefix = "", delay = 0, loading = false, sub }) {
  const count = useCount(loading ? 0 : value);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-5">
          <Skeleton className="w-11 h-11" />
          <Skeleton className="w-14 h-6" />
        </div>
        <Skeleton className="w-24 h-7 mb-2" />
        <Skeleton className="w-20 h-3" />
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      style={{ animation: "fadeUp 0.5s ease both", animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#fff3ee" }}
        >
          <Icon size={20} style={{ color: "#f04e0f" }} />
        </div>
        {sub && (
          <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
            {sub}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
        {prefix}{count.toLocaleString()}
      </p>
      <p className="text-xs font-medium text-gray-400">{label}</p>
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionTitle({ title, sub }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold text-gray-800">{title}</h2>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function StatisticsPage() {
  const today = new Date().toLocaleDateString("en-BD", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  // ── API calls ────────────────────────────────────────────────────────────────
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products_stat"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
      return res.data;
    },
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["orders_stat"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
      return res.data;
    },
  });

  const isLoading = productsLoading || ordersLoading;

  // ── Derived stats from real data ─────────────────────────────────────────────

  // Total revenue: sum pricing.total where payment.payment_status === "paid"
  const totalRevenue = orders.reduce((sum, o) => {
    return o.payment?.payment_status === "paid" ? sum + (o.pricing?.total || 0) : sum;
  }, 0);

  // Total orders
  const totalOrders = orders.length;

  // Total products
  const totalProducts = products.length;

  // Unique customers (by phone as unique identifier)
  const totalCustomers = new Set(orders.map(o => o.customer?.phone).filter(Boolean)).size;

  // Order breakdown by order_status
  const statusCounts = orders.reduce((acc, o) => {
    const key = normalizeStatus(o.order_status);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const ORDER_BREAKDOWN = [
    { label: "Pending",    key: "pending",    color: "#d97706", bg: "#fffbeb", icon: HiOutlineClock          },
    { label: "Processing", key: "processing", color: "#2563eb", bg: "#eff6ff", icon: HiOutlineTruck          },
    { label: "Delivered",  key: "delivered",  color: "#16a34a", bg: "#f0fdf4", icon: HiOutlineCheckCircle    },
    { label: "Cancelled",  key: "cancelled",  color: "#dc2626", bg: "#fef2f2", icon: HiOutlineExclamationCircle },
  ].map(item => ({ ...item, count: statusCounts[item.key] || 0 }));

  const totalBreakdown = ORDER_BREAKDOWN.reduce((s, i) => s + i.count, 0) || 1;

  // Top products: count appearances in order items, sum total_price
  const productSalesMap = {};
  orders.forEach(o => {
    (o.items || []).forEach(item => {
      const key = item.product_id;
      if (!productSalesMap[key]) {
        productSalesMap[key] = {
          name:    item.product_name,
          image:   item.product_image,
          units:   0,
          revenue: 0,
        };
      }
      productSalesMap[key].units   += Number(item.package_count)    || 1;
      productSalesMap[key].revenue += Number(item.total_price)       || 0;
    });
  });

  const topProducts = Object.values(productSalesMap)
    .sort((a, b) => b.units - a.units)
    .slice(0, 4);

  const maxUnits = topProducts[0]?.units || 1;

  // Recent orders: last 5 sorted by createdAt desc
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // ── Pending payment count (for sub label)
  const pendingPayments = orders.filter(o => o.payment?.payment_status === "pending").length;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50/70 p-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-7">

          {/* ── Page header ─────────────────────────────────────────────── */}
          <div
            className="flex items-end justify-between flex-wrap gap-3"
            style={{ animation: "fadeUp 0.4s ease both" }}
          >
            <div>
              <h1 className="text-xl font-bold text-gray-900">Statistics</h1>
              <p className="text-xs text-gray-400 mt-0.5">{today}</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#f04e0f" }} />
              Live Data
            </div>
          </div>

          {/* ── 4 stat cards ────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={HiOutlineCurrencyDollar}
              label="Total Revenue"
              value={totalRevenue}
              prefix="৳"
              delay={0}
              loading={isLoading}
              sub={`${orders.filter(o => o.payment?.payment_status === "paid").length} paid`}
            />
            <StatCard
              icon={HiOutlineShoppingBag}
              label="Total Orders"
              value={totalOrders}
              delay={80}
              loading={isLoading}
              sub={pendingPayments > 0 ? `${pendingPayments} unpaid` : "all time"}
            />
            <StatCard
              icon={HiOutlineCube}
              label="Total Products"
              value={totalProducts}
              delay={160}
              loading={isLoading}
              sub="in stock"
            />
            <StatCard
              icon={HiOutlineUsers}
              label="Customers"
              value={totalCustomers}
              delay={240}
              loading={isLoading}
              sub="unique"
            />
          </div>

          {/* ── Order breakdown + Top products ──────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Order breakdown */}
            <div
              className="bg-white rounded-2xl border border-gray-100 p-6"
              style={{ animation: "fadeUp 0.5s ease both", animationDelay: "300ms" }}
            >
              <SectionTitle title="Order Breakdown" sub={`${totalOrders} total orders`} />

              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {[1,2,3,4].map(i => <Skeleton key={i} className="h-8 w-full" />)}
                </div>
              ) : totalOrders === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No orders yet</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {ORDER_BREAKDOWN.map((item) => {
                    const Icon  = item.icon;
                    const barW  = Math.round((item.count / totalBreakdown) * 100);
                    const pctVal = ((item.count / totalBreakdown) * 100).toFixed(0);
                    return (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: item.bg }}
                            >
                              <Icon size={13} style={{ color: item.color }} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400">{pctVal}%</span>
                            <span
                              className="text-sm font-bold min-w-[24px] text-right"
                              style={{ color: item.color }}
                            >
                              {item.count}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${barW}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top products — derived from order items */}
            <div
              className="bg-white rounded-2xl border border-gray-100 p-6"
              style={{ animation: "fadeUp 0.5s ease both", animationDelay: "380ms" }}
            >
              <SectionTitle title="Top Products" sub="By orders placed" />

              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : topProducts.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No product data yet</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {topProducts.map((p, i) => {
                    const barW = Math.round((p.units / maxUnits) * 100);
                    return (
                      <div key={p.name + i}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            {/* Rank badge OR product thumbnail */}
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-7 h-7 rounded-lg object-cover border border-gray-100 shrink-0"
                              />
                            ) : (
                              <span
                                className="w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center text-white shrink-0"
                                style={{ backgroundColor: i === 0 ? "#f04e0f" : i === 1 ? "#d97706" : "#6b7280" }}
                              >
                                {i + 1}
                              </span>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{p.name}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <p className="text-xs font-bold text-gray-700">{p.units} orders</p>
                            <p className="text-[10px] text-gray-400">{fmt(p.revenue)}</p>
                          </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${barW}%`,
                              backgroundColor: i === 0 ? "#f04e0f" : i === 1 ? "#d97706" : "#9ca3af",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── Recent orders ────────────────────────────────────────────── */}
          <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            style={{ animation: "fadeUp 0.5s ease both", animationDelay: "460ms" }}
          >
            <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
              <SectionTitle title="Recent Orders" sub="Latest 5 orders" />
              <button
                className="text-xs font-bold px-3 py-1.5 rounded-xl transition-colors hover:bg-orange-50"
                style={{ color: "#f04e0f" }}
              >
                View all →
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col divide-y divide-gray-50">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center justify-between px-6 py-3.5 gap-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-xl" />
                      <div>
                        <Skeleton className="w-28 h-3.5 mb-1.5" />
                        <Skeleton className="w-36 h-2.5" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Skeleton className="w-20 h-6 rounded-lg" />
                      <Skeleton className="w-14 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">No orders yet</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentOrders.map((order) => {
                  const status = normalizeStatus(order.order_status);
                  const meta   = STATUS_META[status] || STATUS_META.pending;
                  // Short order ID for display
                  const shortId = order.order_id
                    ? order.order_id.split("-")[0].toUpperCase()
                    : order._id?.slice(-6).toUpperCase();

                  return (
                    <div
                      key={order._id}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/60 transition-colors gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: "#f04e0f" }}
                        >
                          {(order.customer?.name || "?")[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {order.customer?.name || "Unknown"}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            #{shortId} · {fmtDate(order.createdAt)}
                            {order.shipping_address?.district_name
                              ? ` · ${order.shipping_address.district_name}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Payment status dot */}
                        <span
                          className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold"
                          style={{
                            color: order.payment?.payment_status === "paid" ? "#16a34a" : "#d97706",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                order.payment?.payment_status === "paid" ? "#16a34a" : "#d97706",
                            }}
                          />
                          {order.payment?.payment_status === "paid" ? "Paid" : "Unpaid"}
                        </span>

                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-lg"
                          style={{ background: meta.bg, color: meta.color }}
                        >
                          {meta.label}
                        </span>

                        <span className="text-sm font-bold text-gray-800 min-w-[60px] text-right">
                          {fmt(order.pricing?.total || 0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}