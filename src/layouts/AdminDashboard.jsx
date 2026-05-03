import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import {
  HiOutlineSquares2X2,
  HiOutlineArchiveBox,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineExclamationTriangle,
  HiOutlineShoppingCart,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineBars3,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineChartBarSquare,
  HiOutlineArrowRightOnRectangle,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTruck,
} from "react-icons/hi2";

// ─── Brand tokens ──────────────────────────────────────────────────────────
const C = {
  orangeHot:   "#f04e0f",
  orangeMid:   "#f97316",
  orangeLight: "#fb923c",
  greenDeep:   "#16a34a",
  greenMid:    "#22c55e",
  greenLight:  "#86efac",
  blueTrust:   "#1e40af",
  blueMid:     "#2563eb",
  cream:       "#fffbf5",
  sand:        "#fef3e2",
  sidebar:     "#0f1f0f",
  sidebarHov:  "#1a3a1a",
  sidebarAct:  "#16a34a",
};

// ─── Static data ───────────────────────────────────────────────────────────
const SALES_DATA = [
  { month: "Jan", Mango: 420, Apple: 310, Pineapple: 180, Lychee: 95 },
  { month: "Feb", Mango: 380, Apple: 290, Pineapple: 210, Lychee: 120 },
  { month: "Mar", Mango: 510, Apple: 340, Pineapple: 195, Lychee: 140 },
  { month: "Apr", Mango: 720, Apple: 410, Pineapple: 260, Lychee: 175 },
  { month: "May", Mango: 940, Apple: 380, Pineapple: 310, Lychee: 210 },
  { month: "Jun", Mango: 860, Apple: 350, Pineapple: 290, Lychee: 195 },
];

const REVENUE_DATA = [
  { month: "Jan", Revenue: 84000,  Target: 75000  },
  { month: "Feb", Revenue: 76000,  Target: 80000  },
  { month: "Mar", Revenue: 102000, Target: 90000  },
  { month: "Apr", Revenue: 144000, Target: 110000 },
  { month: "May", Revenue: 188000, Target: 140000 },
  { month: "Jun", Revenue: 172000, Target: 160000 },
];

const PRODUCTS = [
  { id: 1,  name: "Himsagar Mango",   category: "Mango",     price: 1500, stock: 240,  status: "In Stock",    img: "🥭" },
  { id: 2,  name: "Gobindabhog Mango",category: "Mango",     price: 1440, stock: 185,  status: "In Stock",    img: "🥭" },
  { id: 3,  name: "Langra Mango",     category: "Mango",     price: 1650, stock: 8,    status: "Low Stock",   img: "🥭" },
  { id: 4,  name: "Fuji Apple",       category: "Apple",     price: 980,  stock: 320,  status: "In Stock",    img: "🍎" },
  { id: 5,  name: "Green Apple",      category: "Apple",     price: 850,  stock: 5,    status: "Low Stock",   img: "🍏" },
  { id: 6,  name: "Sylhet Pineapple", category: "Pineapple", price: 220,  stock: 0,    status: "Out of Stock",img: "🍍" },
  { id: 7,  name: "Lychee Premium",   category: "Lychee",    price: 650,  stock: 140,  status: "In Stock",    img: "🍒" },
  { id: 8,  name: "Black Berry Date", category: "Date",      price: 1800, stock: 12,   status: "Low Stock",   img: "🌴" },
  { id: 9,  name: "Organic Honey",    category: "Honey",     price: 1200, stock: 55,   status: "In Stock",    img: "🍯" },
  { id: 10, name: "Pure Ghee",        category: "Ghee",      price: 2400, stock: 30,   status: "In Stock",    img: "🧈" },
];

const ORDERS = [
  { id: "#ORD-1041", customer: "Rahim Uddin",   items: 3, total: 4500,  date: "May 2, 2025",  status: "Delivered" },
  { id: "#ORD-1040", customer: "Nazma Begum",   items: 1, total: 1500,  date: "May 2, 2025",  status: "Shipped"   },
  { id: "#ORD-1039", customer: "Karim Ahmed",   items: 5, total: 9200,  date: "May 1, 2025",  status: "Processing"},
  { id: "#ORD-1038", customer: "Sadia Islam",   items: 2, total: 3300,  date: "May 1, 2025",  status: "Delivered" },
  { id: "#ORD-1037", customer: "Tariq Hassan",  items: 4, total: 6800,  date: "Apr 30, 2025", status: "Pending"   },
  { id: "#ORD-1036", customer: "Farhana Khatun",items: 2, total: 2980,  date: "Apr 30, 2025", status: "Shipped"   },
  { id: "#ORD-1035", customer: "Arif Hossain",  items: 1, total: 1800,  date: "Apr 29, 2025", status: "Processing"},
  { id: "#ORD-1034", customer: "Mou Chowdhury", items: 6, total: 12400, date: "Apr 29, 2025", status: "Delivered" },
];

const CUSTOMERS = [
  { id: 1, name: "Rahim Uddin",    email: "rahim@email.com",    orders: 12, spent: 24500, joined: "Jan 2024", status: "Active"    },
  { id: 2, name: "Nazma Begum",    email: "nazma@email.com",    orders: 8,  spent: 18200, joined: "Feb 2024", status: "Active"    },
  { id: 3, name: "Karim Ahmed",    email: "karim@email.com",    orders: 21, spent: 52000, joined: "Nov 2023", status: "Active"    },
  { id: 4, name: "Sadia Islam",    email: "sadia@email.com",    orders: 5,  spent: 9800,  joined: "Mar 2024", status: "Active"    },
  { id: 5, name: "Tariq Hassan",   email: "tariq@email.com",    orders: 3,  spent: 6200,  joined: "Apr 2024", status: "Inactive"  },
  { id: 6, name: "Farhana Khatun", email: "farhana@email.com",  orders: 15, spent: 31000, joined: "Dec 2023", status: "Active"    },
  { id: 7, name: "Arif Hossain",   email: "arif@email.com",     orders: 7,  spent: 14500, joined: "Feb 2024", status: "Active"    },
  { id: 8, name: "Mou Chowdhury",  email: "mou@email.com",      orders: 18, spent: 44800, joined: "Oct 2023", status: "Active"    },
];

const NAV_LINKS = [
  { key: "dashboard", label: "Dashboard",  icon: <HiOutlineSquares2X2 size={20} /> },
  { key: "products",  label: "Inventory",  icon: <HiOutlineArchiveBox size={20} /> },
  { key: "orders",    label: "Orders",     icon: <HiOutlineClipboardDocumentList size={20} /> },
  { key: "customers", label: "Customers",  icon: <HiOutlineUsers size={20} /> },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
const fmt = (n) => `৳${n.toLocaleString()}`;

const StatusPill = ({ status }) => {
  const map = {
    "In Stock":    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
    "Low Stock":   { bg: "#fff7ed", color: "#c2410c", dot: "#f97316" },
    "Out of Stock":{ bg: "#fee2e2", color: "#b91c1c", dot: "#f87171" },
    "Active":      { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
    "Inactive":    { bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" },
    "Delivered":   { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
    "Shipped":     { bg: "#dbeafe", color: "#1d4ed8", dot: "#60a5fa" },
    "Processing":  { bg: "#fef9c3", color: "#a16207", dot: "#facc15" },
    "Pending":     { bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" },
  };
  const s = map[status] || map["Pending"];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
};

const OrderStatusIcon = ({ status }) => {
  const map = {
    "Delivered":  <HiOutlineCheckCircle size={15} />,
    "Shipped":    <HiOutlineTruck size={15} />,
    "Processing": <HiOutlineClock size={15} />,
    "Pending":    <HiOutlineClock size={15} />,
  };
  return map[status] || null;
};

// Custom recharts tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 shadow-lg p-3 text-xs" style={{ background: "#fff", minWidth: 140 }}>
      <p className="font-bold text-gray-600 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-500">{p.name}</span>
          </span>
          <span className="font-bold text-gray-700">{typeof p.value === "number" && p.name === "Revenue" || p.name === "Target" ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Sub-views ─────────────────────────────────────────────────────────────

// ── Dashboard Overview ──────────────────────────────────────────────────────
function ViewDashboard() {
  const lowStock = PRODUCTS.filter(p => p.status === "Low Stock" || p.status === "Out of Stock").length;

  const STATS = [
    {
      label:   "Total Revenue",
      value:   "৳7,66,000",
      sub:     "+18.4% vs last month",
      trend:   "up",
      icon:    <HiOutlineChartBarSquare size={22} />,
      iconBg:  "#fff0e6",
      iconClr: C.orangeHot,
    },
    {
      label:   "Active Orders",
      value:   "38",
      sub:     "12 shipped today",
      trend:   "up",
      icon:    <HiOutlineShoppingCart size={22} />,
      iconBg:  "#dbeafe",
      iconClr: C.blueMid,
    },
    {
      label:   "Low Stock Items",
      value:   String(lowStock),
      sub:     "Needs restocking",
      trend:   "warn",
      icon:    <HiOutlineExclamationTriangle size={22} />,
      iconBg:  "#fff7ed",
      iconClr: C.orangeMid,
    },
    {
      label:   "Total Customers",
      value:   "1,284",
      sub:     "+42 this week",
      trend:   "up",
      icon:    <HiOutlineUsers size={22} />,
      iconBg:  "#dcfce7",
      iconClr: C.greenDeep,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-black text-gray-800">Good morning, Admin 👋</h1>
        <p className="text-sm text-gray-400 mt-0.5">Here's what's happening with Folmondi today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map(({ label, value, sub, trend, icon, iconBg, iconClr }, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: iconBg, color: iconClr }}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-2xl font-black text-gray-800 leading-none mb-1.5">{value}</p>
              <p
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: trend === "up" ? C.greenDeep : trend === "warn" ? C.orangeMid : "#6b7280" }}
              >
                {trend === "up"   && <HiOutlineArrowTrendingUp  size={13} />}
                {trend === "down" && <HiOutlineArrowTrendingDown size={13} />}
                {trend === "warn" && <HiOutlineExclamationTriangle size={13} />}
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* Bar chart - fruit sales */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-black text-gray-800">Fruit Sales by Month</h2>
              <p className="text-xs text-gray-400 mt-0.5">Units sold — Jan to Jun 2025</p>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: C.sand, color: C.orangeHot }}
            >
              2025
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SALES_DATA} barCategoryGap="30%" barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
              <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
              <Bar dataKey="Mango"     fill={C.orangeHot}  radius={[4, 4, 0, 0]} />
              <Bar dataKey="Apple"     fill={C.greenDeep}  radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pineapple" fill={C.orangeMid}  radius={[4, 4, 0, 0]} />
              <Bar dataKey="Lychee"    fill={C.blueMid}    radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart - revenue vs target */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-black text-gray-800">Revenue vs Target</h2>
            <p className="text-xs text-gray-400 mt-0.5">৳ BDT — monthly comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
              <Line type="monotone" dataKey="Revenue" stroke={C.greenDeep}  strokeWidth={2.5} dot={{ r: 3, fill: C.greenDeep }}  activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="Target"  stroke={C.orangeHot} strokeWidth={2}   dot={{ r: 3, fill: C.orangeHot }} activeDot={{ r: 5 }} strokeDasharray="5 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent orders preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-base font-black text-gray-800">Recent Orders</h2>
          <span className="text-xs font-bold cursor-pointer hover:underline" style={{ color: C.orangeHot }}>
            View all →
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Order ID", "Customer", "Items", "Total", "Date", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-gray-700">{o.id}</td>
                  <td className="px-5 py-3.5 text-gray-600 font-medium">{o.customer}</td>
                  <td className="px-5 py-3.5 text-gray-500">{o.items} items</td>
                  <td className="px-5 py-3.5 font-bold text-gray-800">{fmt(o.total)}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{o.date}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={o.status} />
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

// ── Products / Inventory ────────────────────────────────────────────────────
function ViewProducts() {
  const [products, setProducts]   = useState(PRODUCTS);
  const [search,   setSearch]     = useState("");
  const [filter,   setFilter]     = useState("All");
  const [editRow,  setEditRow]    = useState(null);
  const [deleteId, setDeleteId]   = useState(null);

  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];

  const visible = products.filter(p => {
    const matchCat  = filter === "All" || p.category === filter;
    const matchSrch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrch;
  });

  const handleDelete = (id) => {
    setProducts(ps => ps.filter(p => p.id !== id));
    setDeleteId(null);
  };

  const handleSave = (updated) => {
    setProducts(ps => ps.map(p => p.id === updated.id ? updated : p));
    setEditRow(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Inventory</h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} products total</p>
        </div>
        <button
          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white shadow-sm hover:brightness-110 transition-all"
          style={{ background: C.orangeHot }}
        >
          <HiOutlinePlus size={17} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <HiOutlineMagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: filter === cat ? C.orangeHot : "#f3f4f6",
                color:      filter === cat ? "#fff"      : "#6b7280",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Product", "Category", "Price (12kg)", "Stock", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">No products found.</td>
                </tr>
              ) : visible.map(p => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.img}</span>
                      <span className="font-semibold text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-800">{fmt(p.price)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-bold ${p.stock === 0 ? "text-red-500" : p.stock <= 10 ? "text-orange-500" : "text-gray-700"}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-5 py-3.5"><StatusPill status={p.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditRow({ ...p })}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-50"
                        style={{ color: C.blueMid }}
                      >
                        <HiOutlinePencilSquare size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
                        style={{ color: "#ef4444" }}
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
          Showing {visible.length} of {products.length} products
        </div>
      </div>

      {/* Edit Modal */}
      {editRow && (
        <Modal title="Edit Product" onClose={() => setEditRow(null)}>
          <EditProductForm product={editRow} onSave={handleSave} onCancel={() => setEditRow(null)} />
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <Modal title="Confirm Delete" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <strong>{products.find(p => p.id === deleteId)?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setDeleteId(null)}
              className="px-5 py-2 text-sm font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteId)}
              className="px-5 py-2 text-sm font-bold rounded-xl text-white transition-all hover:brightness-110"
              style={{ background: "#ef4444" }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Edit form inside the modal
function EditProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(product);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const statusOptions = ["In Stock", "Low Stock", "Out of Stock"];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</label>
          <input
            className="input input-bordered w-full text-sm rounded-xl bg-white h-10"
            style={{ borderColor: "#e5e7eb" }}
            value={form.name}
            onChange={e => set("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price (৳)</label>
          <input
            type="number"
            className="input input-bordered w-full text-sm rounded-xl bg-white h-10"
            style={{ borderColor: "#e5e7eb" }}
            value={form.price}
            onChange={e => set("price", Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stock (units)</label>
          <input
            type="number"
            className="input input-bordered w-full text-sm rounded-xl bg-white h-10"
            style={{ borderColor: "#e5e7eb" }}
            value={form.stock}
            onChange={e => set("stock", Number(e.target.value))}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
          <select
            className="select select-bordered w-full text-sm rounded-xl bg-white"
            style={{ borderColor: "#e5e7eb", height: "40px" }}
            value={form.status}
            onChange={e => set("status", e.target.value)}
          >
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button
          onClick={onCancel}
          className="px-5 py-2 text-sm font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="px-5 py-2 text-sm font-bold rounded-xl text-white transition-all hover:brightness-110"
          style={{ background: C.greenDeep }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

// ── Orders ──────────────────────────────────────────────────────────────────
function ViewOrders() {
  const [orders, setOrders] = useState(ORDERS);
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Delivered", "Shipped", "Processing", "Pending"];
  const visible = filter === "All" ? orders : orders.filter(o => o.status === filter);

  const cycleStatus = (id) => {
    const seq = ["Pending", "Processing", "Shipped", "Delivered"];
    setOrders(os => os.map(o => {
      if (o.id !== id) return o;
      const next = seq[(seq.indexOf(o.status) + 1) % seq.length];
      return { ...o, status: next };
    }));
  };

  const counts = statuses.slice(1).reduce((acc, s) => {
    acc[s] = orders.filter(o => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-800">Orders</h1>
        <p className="text-sm text-gray-400 mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Status summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Delivered",  count: counts.Delivered,  bg: "#dcfce7", clr: "#15803d", icon: <HiOutlineCheckCircle size={18}/> },
          { label: "Shipped",    count: counts.Shipped,    bg: "#dbeafe", clr: "#1d4ed8", icon: <HiOutlineTruck size={18}/> },
          { label: "Processing", count: counts.Processing, bg: "#fef9c3", clr: "#a16207", icon: <HiOutlineClock size={18}/> },
          { label: "Pending",    count: counts.Pending,    bg: "#f3f4f6", clr: "#6b7280", icon: <HiOutlineClock size={18}/> },
        ].map(({ label, count, bg, clr, icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, color: clr }}>
              {icon}
            </div>
            <div>
              <p className="text-xl font-black text-gray-800">{count}</p>
              <p className="text-xs font-semibold text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3.5 flex gap-2 flex-wrap">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: filter === s ? C.orangeHot : "#f3f4f6",
              color:      filter === s ? "#fff"      : "#6b7280",
            }}
          >
            {s} {s !== "All" && `(${counts[s]})`}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Order ID", "Customer", "Items", "Total", "Date", "Status", "Action"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(o => (
                <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-gray-700">{o.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-700">{o.customer}</td>
                  <td className="px-5 py-3.5 text-gray-500">{o.items} items</td>
                  <td className="px-5 py-3.5 font-bold text-gray-800">{fmt(o.total)}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{o.date}</td>
                  <td className="px-5 py-3.5"><StatusPill status={o.status} /></td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => cycleStatus(o.id)}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-colors"
                    >
                      <HiOutlineEye size={13} /> Advance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
          Showing {visible.length} of {orders.length} orders
        </div>
      </div>
    </div>
  );
}

// ── Customers ───────────────────────────────────────────────────────────────
function ViewCustomers() {
  const [search, setSearch] = useState("");

  const visible = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Customers</h1>
          <p className="text-sm text-gray-400 mt-0.5">{CUSTOMERS.length} registered customers</p>
        </div>
        <div className="relative">
          <HiOutlineMagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-white w-64 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>
      </div>

      {/* Customer cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { label: "Total Customers", value: CUSTOMERS.length, icon: "👥", bg: "#dbeafe", clr: C.blueMid },
          { label: "Active",          value: CUSTOMERS.filter(c => c.status === "Active").length, icon: "✅", bg: "#dcfce7", clr: C.greenDeep },
          { label: "Total Revenue",   value: fmt(CUSTOMERS.reduce((s, c) => s + c.spent, 0)), icon: "💰", bg: "#fff0e6", clr: C.orangeHot },
          { label: "Avg. Spent",      value: fmt(Math.round(CUSTOMERS.reduce((s, c) => s + c.spent, 0) / CUSTOMERS.length)), icon: "📊", bg: "#fef9c3", clr: "#a16207" },
        ].map(({ label, value, icon, bg, clr }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: bg, color: clr }}>
              {icon}
            </div>
            <div>
              <p className="text-xl font-black text-gray-800">{value}</p>
              <p className="text-xs font-semibold text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Customer", "Email", "Orders", "Total Spent", "Joined", "Status"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(c => (
                <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                        style={{ background: C.orangeHot }}
                      >
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{c.email}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-700">{c.orders}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-800">{fmt(c.spent)}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{c.joined}</td>
                  <td className="px-5 py-3.5"><StatusPill status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
          Showing {visible.length} of {CUSTOMERS.length} customers
        </div>
      </div>
    </div>
  );
}

// ── Modal wrapper ───────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-black text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Root Layout ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeView,    setActiveView]    = useState("dashboard");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  const viewMap = {
    dashboard: <ViewDashboard />,
    products:  <ViewProducts />,
    orders:    <ViewOrders />,
    customers: <ViewCustomers />,
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ background: C.sidebar }}>

      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3 border-b" style={{ borderColor: "#1a3a1a" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black shrink-0"
          style={{ background: C.orangeHot }}
        >
          🍋
        </div>
        <div>
          <p className="font-black text-white text-base leading-none">Folmondi</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: C.greenLight }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs font-bold px-3 mb-3 uppercase tracking-widest" style={{ color: "#4b6b4b" }}>
          Main Menu
        </p>
        {NAV_LINKS.map(({ key, label, icon }) => {
          const active = activeView === key;
          return (
            <button
              key={key}
              onClick={() => { setActiveView(key); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: active ? C.sidebarAct      : "transparent",
                color:      active ? "#fff"             : "#6b9b6b",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.sidebarHov; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b9b6b"; }}}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {active && <HiOutlineChevronRight size={14} className="ml-auto opacity-70" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "#1a3a1a" }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "#1a3a1a" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ background: C.orangeHot }}
          >
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">Admin User</p>
            <p className="text-xs truncate" style={{ color: "#4b6b4b" }}>admin@folmondi.com</p>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors shrink-0">
            <HiOutlineArrowRightOnRectangle size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 shadow-xl" style={{ background: C.sidebar }}>
        <SidebarContent />
      </aside>

      {/* ── Mobile Drawer Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-60 shadow-2xl z-50">
            <SidebarContent/>
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center gap-4 shrink-0 shadow-sm">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <HiOutlineBars3 size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-400">Folmondi</span>
            <HiOutlineChevronRight size={13} className="text-gray-300" />
            <span className="font-bold text-gray-700 capitalize">{activeView}</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <div className="relative hidden md:block">
              <HiOutlineMagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="pl-8 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors w-48"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <HiOutlineBell size={19} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: C.orangeHot }}
              />
            </button>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: C.orangeHot }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {viewMap[activeView]}
        </main>
      </div>
    </div>
  );
}