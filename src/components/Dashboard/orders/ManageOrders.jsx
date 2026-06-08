import { useState, useMemo } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineArrowsUpDown,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineCurrencyDollar,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineXMark,
  HiOutlineClipboardDocumentList,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineArrowPath,
  HiOutlineInboxArrowDown,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import OrderCol from "./order-component/OrderCol";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FolmondiSpinner from "../../snipnner/FolmondiSpinner";

// ── Palette ───────────────────────────────────────────────────────────────────
const PRIMARY = "#f04e0f";
const GREEN = "#16a34a";
const AMBER = "#d97706";
const BLUE = "#2563eb";
const RED = "#dc2626";


// ── Config ────────────────────────────────────────────────────────────────────
const ORDER_STATUSES = ["Pending", "Confirmed", "Processing", "Delivered", "Cancelled"];
const DELIVERY_OPTIONS = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT_OPTIONS = ["pending", "paid", "refunded"];

const STATUS_CONFIG = {
  Pending: { label: "Pending", bg: "#fff7ed", color: AMBER, dot: "#fbbf24" },
  Processing: { label: "Processing", bg: "#eff6ff", color: BLUE, dot: "#60a5fa" },
  Confirmed: { label: "Confirmed", bg: "#f0fdf4", color: GREEN, dot: "#4ade80" },
  Delivered: { label: "Delivered", bg: "#f0fdf4", color: GREEN, dot: GREEN },
  Cancelled: { label: "Cancelled", bg: "#fef2f2", color: RED, dot: "#f87171" },
};

const PAYMENT_CONFIG = {
  pending: { label: "Pending", bg: "#fff7ed", color: AMBER },
  paid: { label: "Paid", bg: "#f0fdf4", color: GREEN },
  refunded: { label: "Refunded", bg: "#eff6ff", color: BLUE },
};

const DELIVERY_CONFIG = {
  pending: { label: "Pending", icon: "⏳" },
  confirmed: { label: "Confirmed", icon: "🎫" },
  processing: { label: "Processing", icon: "📦" },
  shipped: { label: "Shipped", icon: "🚚" },
  delivered: { label: "Delivered", icon: "✅" },
  cancelled: { label: "Cancelled", icon: "❌" },
};

const fmt = (n) => `৳${Number(n).toLocaleString()}`;

// ── Order detail drawer ────────────────────────────────────────────────────────
function OrderDrawer({ order, onClose, onNotify }) {
  const [status, setStatus] = useState(order.order_status);
  const [payment, setPayment] = useState(order?.payment?.payment_status || null);
  const [delivery, setDelivery] = useState(order?.delivery?.delivery_status || null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const updated_info = {
      order_status: status,
      "payment.payment_status": payment,
      "delivery.delivery_status": delivery
    };
    try {
      const token = localStorage.getItem('folmondi_token');

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${order._id}`,
        updated_info,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onNotify({
        icon: "✅",
        title: `Order ${order._id} Updated`,
        msg: `Status: ${status} · Payment: ${payment} · Delivery: ${delivery}`,
      });
      setSaving(false);
      onClose();
    }
    catch (error) {
      console.error("Failed to update order:", error);
      onNotify({
        icon: "❌",
        title: "Update Failed",
        msg: "Failed to update order. Please try again."
      });
      setSaving(false);
      onClose()
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          <div>
            <p className="text-xs font-medium opacity-80">Order Details</p>
            <h2 className="text-lg font-bold">{order._id}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

          {/* Customer info */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Customer</h3>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                  {order.customer?.name?.[0] || "?"}
                </span>
                {order.customer?.name || "N/A"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiOutlinePhone size={13} /> {order.customer?.phone || "N/A"}
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <HiOutlineMapPin size={13} className="mt-0.5 shrink-0" />
                {order.shipping_address?.address || "N/A"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiOutlineCalendarDays size={13} /> {formatDate(order.order_date)}
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</h3>
            <div className="flex flex-col gap-2">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.product_name}</p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.package_count} × {fmt(item.unit_price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {fmt(item.package_count * item.unit_price)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between px-4 pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-700">Delivery Cost</span>
                <span className="text-sm font-bold text-gray-700">
                  {fmt(order.pricing?.delivery_cost || 0)}
                </span>
              </div>
              <div className="flex justify-between px-4 pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-700">Total</span>
                <span className="text-base font-bold" style={{ color: PRIMARY }}>
                  {fmt(order.pricing?.total || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Status update */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <HiOutlineArrowPath size={13} /> Order Status
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ORDER_STATUSES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all capitalize ${status === s
                      ? "border-orange-400 text-white"
                      : "border-gray-200 text-gray-500 hover:border-orange-200"
                    }`}
                  style={status === s ? { backgroundColor: 'var(--orange-hot)', borderColor: 'var(--orange-hot)' } : {}}
                >
                  {STATUS_CONFIG[s]?.label || s}
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <HiOutlineCurrencyDollar size={13} /> Payment Verification
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_OPTIONS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPayment(p)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all capitalize ${payment === p
                      ? "border-green-400 bg-green-500 text-white"
                      : "border-gray-200 text-gray-500 hover:border-green-200"
                    }`}
                >
                  {PAYMENT_CONFIG[p]?.label || p}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery tracking */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <HiOutlineTruck size={13} /> Delivery Tracking
            </h3>
            <div className="flex flex-col gap-2">
              {DELIVERY_OPTIONS.map((d, idx) => {
                const current = DELIVERY_OPTIONS.indexOf(delivery);
                const isPast = idx < current;
                const isActive = d === delivery;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDelivery(d)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${isActive
                        ? "border-orange-400 bg-orange-50"
                        : isPast
                          ? "border-green-200 bg-green-50/50"
                          : "border-gray-200 hover:border-orange-200"
                      }`}
                  >
                    <span className="text-base">{DELIVERY_CONFIG[d]?.icon || "📦"}</span>
                    <span className={`text-xs font-bold ${isActive ? "text-(--range-hot)" : isPast ? "text-(--green-deep)" : "text-gray-500"}`}>
                      {DELIVERY_CONFIG[d]?.label || d}
                    </span>
                    {isActive && (
                      <span className="ml-auto text-[10px] font-bold text-(--range-hot) bg-orange-100 px-2 py-0.5 rounded-lg">Current</span>
                    )}
                    {isPast && !isActive && (
                      <HiOutlineCheckCircle size={14} className="ml-auto text-(--green-deep)" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex gap-3 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 py-3 rounded-xl bg-(--orange-hot) text-sm font-bold text-white transition-all hover:brightness-110 flex items-center justify-center gap-2"
          >
            {saving ? <HiOutlineArrowPath size={15} className="animate-spin" /> : <HiOutlineCheckCircle size={15} />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [sortField, setSortField] = useState("order_date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data: Orders = [], refetch, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
      // Transform data to ensure consistent structure
      const transformedOrders = res.data.map(order => ({
        ...order,
        payment_status: order.payment?.payment_status || "pending",
        delivery_status: order.delivery?.delivery_status || "processing",
        total: order.pricing?.total || 0,
        status: order.order_status
      }));
      setOrders(transformedOrders);
      return transformedOrders;
    }
  });

  if (isLoading) <FolmondiSpinner />

  // ── Notifications ──────────────────────────────────────────────────────────
  const pushNotif = ({ icon, title, msg }) => {
    const id = Date.now();
    setNotifs(prev => [...prev, { id, icon, title, msg }]);
    setTimeout(() => setNotifs(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const dismissNotif = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  // ── Sort ───────────────────────────────────────────────────────────────────
  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  // ── Filtered + sorted data ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...orders];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o._id?.toLowerCase().includes(q) ||
        o.customer?.name?.toLowerCase().includes(q) ||
        o.shipping_address?.district_name?.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") list = list.filter(o => o.order_status === filterStatus);
    if (filterPayment !== "all") list = list.filter(o => o.payment_status === filterPayment);

    list.sort((a, b) => {
      let av, bv;
      if (sortField === "total") {
        av = a.pricing?.total || 0;
        bv = b.pricing?.total || 0;
      } else if (sortField === "order_date") {
        av = new Date(a.order_date);
        bv = new Date(b.order_date);
      } else {
        av = a[sortField];
        bv = b[sortField];
      }

      if (sortDir === "asc") {
        return av > bv ? 1 : -1;
      } else {
        return av < bv ? 1 : -1;
      }
    });
    return list;
  }, [orders, search, filterStatus, filterPayment, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalRevenue = orders.filter(o => o.payment_status === "paid").reduce((s, o) => s + (o.pricing?.total || 0), 0);
  const pendingCount = orders.filter(o => o.order_status === "Pending").length;
  const deliveredCount = orders.filter(o => o.order_status === "Delivered").length;
  const unpaidCount = orders.filter(o => o.payment_status === "pending").length;

  // ── Sort icon ──────────────────────────────────────────────────────────────
  const SortIcon = ({ field }) =>
    sortField === field ? (
      sortDir === "asc" ? <HiOutlineChevronUp size={12} /> : <HiOutlineChevronDown size={12} />
    ) : (
      <HiOutlineArrowsUpDown size={12} className="opacity-30" />
    );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/80 p-2">
      <div className="max-w-7xl mx-auto flex flex-col gap-1 sm:gap-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <HiOutlineClipboardDocumentList size={24} style={{ color: PRIMARY }} />
              Manage Orders
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {orders.length} total orders · {pendingCount} pending action
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <HiOutlineBell size={18} className="text-gray-500" />
              {notifs.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {notifs.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Stat cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="৳" label="Total Revenue" value={fmt(totalRevenue)} color={'var(--orange-hot)'} sub={`${orders.filter(o => o.payment_status === "paid").length} paid orders`} />
          <StatCard icon="🛒" label="Total Orders" value={orders.length} color={BLUE} sub="All time" />
          <StatCard icon="⏳" label="Pending Orders" value={pendingCount} color={AMBER} sub="Needs action" />
          <StatCard icon="💰" label="Unpaid Orders" value={unpaidCount} color={RED} sub="Verify payment" />
        </div>

        {/* ── Filters bar ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <HiOutlineMagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search order ID, customer, district…"
              className="w-full h-10 pl-9 pr-4 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <HiOutlineFunnel size={13} className="text-gray-400" />
            {["all", ...ORDER_STATUSES].map(s => (
              <button
                key={s}
                onClick={() => { setFilterStatus(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${filterStatus === s
                    ? "text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                style={filterStatus === s ? { backgroundColor: s === "all" ? PRIMARY : STATUS_CONFIG[s]?.color || PRIMARY } : {}}
              >
                {s === "all" ? "All" : STATUS_CONFIG[s]?.label || s}
              </button>
            ))}
          </div>

          {/* Payment filter */}
          <select
            value={filterPayment}
            onChange={e => { setFilterPayment(e.target.value); setPage(1); }}
            className="h-10 px-3 text-xs font-bold rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 transition-colors cursor-pointer"
          >
            <option value="all">All Payments</option>
            {PAYMENT_OPTIONS.map(p => <option key={p} value={p}
              style={{ backgroundColor: PAYMENT_CONFIG[p]?.bg, color: PAYMENT_CONFIG[p]?.color }}
            >{PAYMENT_CONFIG[p]?.label || p}</option>)}
          </select>
        </div>

        {/* ── Table ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  {[
                    { label: "Order ID", field: "_id" },
                    { label: "Customer", field: null },
                    { label: "Date", field: "order_date" },
                    { label: "Items", field: null },
                    { label: "Total", field: "total" },
                    { label: "Status", field: null },
                    { label: "Payment", field: null },
                    { label: "Delivery", field: null },
                    { label: "Actions", field: null },
                  ].map(col => (
                    <th
                      key={col.label}
                      onClick={() => col.field && toggleSort(col.field)}
                      className={`px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${col.field ? "cursor-pointer hover:text-gray-800 select-none" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        {col.field && <SortIcon field={col.field} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <HiOutlineInboxArrowDown size={36} />
                        <p className="text-sm font-medium">No orders found</p>
                      </div>
                    </td>
                  </tr>
                ) : paged.map(order => (
                  <OrderCol
                    key={order._id}
                    order={{
                      ...order,
                      payment_status: order.payment_status,
                      delivery_status: order.delivery_status,
                      total: order.pricing?.total || 0
                    }}
                    STATUS_CONFIG={STATUS_CONFIG}
                    DELIVERY_CONFIG={DELIVERY_CONFIG}
                    PAYMENT_CONFIG={PAYMENT_CONFIG}
                    setSelectedOrder={setSelectedOrder}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-400">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <HiOutlineChevronDown size={13} className="rotate-90" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === p ? "text-white" : "border border-gray-200 text-gray-500 hover:border-orange-300"
                      }`}
                    style={page === p ? { backgroundColor: PRIMARY } : {}}
                  >
                    {p}
                  </button>
                ))}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 transition-all"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <HiOutlineChevronDown size={13} className="-rotate-90" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Order detail drawer ──────────────────────────────────────────── */}
      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onNotify={pushNotif}
        />
      )}

      {/* ── Toast notifications ──────────────────────────────────────────── */}
      <Toast notifs={notifs} onDismiss={dismissNotif} />
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 text-xl"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Notification toast ────────────────────────────────────────────────────────
function Toast({ notifs, onDismiss }) {
  if (!notifs.length) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
      {notifs.map((n) => (
        <div
          key={n.id}
          className="flex items-start gap-3 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-gray-700 animate-pulse-once"
        >
          <span className="text-lg mt-0.5">{n.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold">{n.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{n.msg}</p>
          </div>
          <button onClick={() => onDismiss(n.id)} className="text-gray-500 hover:text-white mt-0.5">
            <HiOutlineXMark size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}