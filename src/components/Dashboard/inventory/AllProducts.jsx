import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlinePencilSquare, HiOutlinePlus, HiOutlineTrash, HiOutlineXMark } from 'react-icons/hi2';

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

const AllProducts = () => {
  // const {data : products=[], isLoading, isError} = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async()  => {
  //     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
  //     return data;
  //   }
  // })


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
                    <td className="px-5 py-3.5 font-bold text-gray-800">{(p.price)}</td>
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

export default AllProducts