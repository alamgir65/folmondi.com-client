import { useState, useEffect } from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

// ── Mock data ──────────────────────────────────────────────────────────────────
const STATS = {
  revenue:     { value: 128450, prev: 104200 },
  orders:      { value: 284,    prev: 231    },
  products:    { value: 47,     prev: 44     },
  customers:   { value: 193,    prev: 170    },
};

const ORDER_BREAKDOWN = [
  { label: "Pending",    count: 18,  color: "#d97706", bg: "#fffbeb", icon: HiOutlineClock         },
  { label: "Processing", count: 34,  color: "#2563eb", bg: "#eff6ff", icon: HiOutlineTruck         },
  { label: "Delivered",  count: 221, color: "#16a34a", bg: "#f0fdf4", icon: HiOutlineCheckCircle   },
  { label: "Cancelled",  count: 11,  color: "#dc2626", bg: "#fef2f2", icon: HiOutlineExclamationCircle },
];

const RECENT_ORDERS = [
  { id: "ORD-1010", customer: "Roksana Parvin",    total: 5160, status: "shipped",   date: "Today, 11:42 AM" },
  { id: "ORD-1009", customer: "Jamal Uddin",       total: 2400, status: "pending",   date: "Today, 09:15 AM" },
  { id: "ORD-1008", customer: "Sabrina Chowdhury", total: 2000, status: "delivered", date: "Yesterday"       },
  { id: "ORD-1007", customer: "Mizanur Rahman",    total: 3600, status: "shipped",   date: "Yesterday"       },
  { id: "ORD-1006", customer: "Fatema Begum",      total: 2850, status: "pending",   date: "May 7"           },
];

const TOP_PRODUCTS = [
  { name: "হিমসাগর আম",    nameEn: "Himsagar Mango",    sold: 84, revenue: 151200 },
  { name: "গোবিন্দভোগ আম", nameEn: "Gobindobhog Mango", sold: 61, revenue: 102480 },
  { name: "সুন্দরবন মধু",  nameEn: "Sundarban Honey",   sold: 43, revenue: 40850  },
  { name: "খাঁটি ঘি",      nameEn: "Pure Ghee",         sold: 29, revenue: 34800  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt    = (n) => `৳${Number(n).toLocaleString()}`;
const pct    = (v, p) => (((v - p) / p) * 100).toFixed(1);
const isUp   = (v, p) => v >= p;

const STATUS_META = {
  pending:    { label: "Pending",    color: "#d97706", bg: "#fffbeb" },
  processing: { label: "Processing", color: "#2563eb", bg: "#eff6ff" },
  shipped:    { label: "Shipped",    color: "#7c3aed", bg: "#f5f3ff" },
  delivered:  { label: "Delivered",  color: "#16a34a", bg: "#f0fdf4" },
  cancelled:  { label: "Cancelled",  color: "#dc2626", bg: "#fef2f2" },
};

// ── Animated counter ───────────────────────────────────────────────────────────
function useCount(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, prev, prefix = "", delay = 0 }) {
  const count  = useCount(value);
  const change = pct(value, prev);
  const up     = isUp(value, prev);

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      style={{ animation: `fadeUp 0.5s ease both`, animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#fff3ee" }}
        >
          <Icon size={20} style={{ color: "#f04e0f" }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
            up ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"
          }`}
        >
          {up
            ? <HiOutlineArrowTrendingUp size={12} />
            : <HiOutlineArrowTrendingDown size={12} />
          }
          {Math.abs(change)}%
        </div>
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .stats-root * { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="stats-root min-h-screen bg-gray-50/70 p-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-7">

          {/* ── Page header ──────────────────────────────────────────────── */}
          <div
            className="flex items-end justify-between flex-wrap gap-3"
            style={{ animation: "fadeUp 0.4s ease both" }}
          >
            <div>
              <h1 className="text-xl font-bold text-gray-900">Statistics</h1>
              <p className="text-xs text-gray-400 mt-0.5">{today}</p>
            </div>
            {/* Period badge */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-500">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#f04e0f" }}
              />
              This Month
            </div>
          </div>

          {/* ── 4 stat cards ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={HiOutlineCurrencyDollar} label="Total Revenue"  value={STATS.revenue.value}   prev={STATS.revenue.prev}   prefix="৳" delay={0}   />
            <StatCard icon={HiOutlineShoppingBag}    label="Total Orders"   value={STATS.orders.value}    prev={STATS.orders.prev}                delay={80}  />
            <StatCard icon={HiOutlineCube}           label="Total Products" value={STATS.products.value}  prev={STATS.products.prev}              delay={160} />
            <StatCard icon={HiOutlineUsers}          label="Total Customers" value={STATS.customers.value} prev={STATS.customers.prev}            delay={240} />
          </div>

          {/* ── Order breakdown + Top products ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Order breakdown */}
            <div
              className="bg-white rounded-2xl border border-gray-100 p-6"
              style={{ animation: "fadeUp 0.5s ease both", animationDelay: "300ms" }}
            >
              <SectionTitle title="Order Breakdown" sub="Current month status" />
              <div className="flex flex-col gap-3">
                {ORDER_BREAKDOWN.map((item) => {
                  const Icon = item.icon;
                  const total = ORDER_BREAKDOWN.reduce((s, i) => s + i.count, 0);
                  const barW  = Math.round((item.count / total) * 100);
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: item.bg }}
                          >
                            <Icon size={13} style={{ color: item.color }} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">{item.count}</span>
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
            </div>

            {/* Top products */}
            <div
              className="bg-white rounded-2xl border border-gray-100 p-6"
              style={{ animation: "fadeUp 0.5s ease both", animationDelay: "380ms" }}
            >
              <SectionTitle title="Top Products" sub="By units sold this month" />
              <div className="flex flex-col gap-3">
                {TOP_PRODUCTS.map((p, i) => {
                  const maxSold = TOP_PRODUCTS[0].sold;
                  const barW    = Math.round((p.sold / maxSold) * 100);
                  return (
                    <div key={p.nameEn}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center text-white"
                            style={{ backgroundColor: i === 0 ? "#f04e0f" : i === 1 ? "#d97706" : "#6b7280" }}
                          >
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 leading-tight">{p.name}</p>
                            <p className="text-[10px] text-gray-400">{p.nameEn}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-700">{p.sold} sold</p>
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
            </div>
          </div>

          {/* ── Recent orders ─────────────────────────────────────────────── */}
          <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            style={{ animation: "fadeUp 0.5s ease both", animationDelay: "460ms" }}
          >
            <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
              <SectionTitle title="Recent Orders" sub="Last 5 orders placed" />
              <button
                className="text-xs font-bold px-3 py-1.5 rounded-xl transition-colors hover:bg-orange-50"
                style={{ color: "#f04e0f" }}
              >
                View all →
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {RECENT_ORDERS.map((order) => {
                const meta = STATUS_META[order.status];
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: "#f04e0f" }}
                      >
                        {order.customer[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{order.customer}</p>
                        <p className="text-[11px] text-gray-400">{order.id} · {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-lg"
                        style={{ background: meta.bg, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      <span className="text-sm font-bold text-gray-800 min-w-[60px] text-right">
                        {fmt(order.total)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}