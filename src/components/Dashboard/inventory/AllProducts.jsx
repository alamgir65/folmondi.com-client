import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";

const API = import.meta.env.VITE_API_BASE_URL;


const fmt = (n) => `৳${n.toLocaleString()}`;

// ── Modal ─────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="flex justify-between p-4 border-b">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose}>
            <HiOutlineXMark size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

const AllProducts = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);

  // ── Products Query ─────────
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${API}/products`);
      return res.data;
    },
  });

  // ── Categories Query ───────
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`${API}/categories`);
      return res.data;
    },
  });

  // ── Delete Mutation ────────
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API}/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    setDeleteId(null);
  };

  // Correct category list
  const categoryList = ["All", ...categories.map((c) => c.name)];

  // ── Filtering ──────────────
  const visible = products.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch = p.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10 text-red-500">Error loading data</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-gray-400">{products.length} products</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 flex-wrap">

        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <HiOutlineMagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
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
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${filter === cat ? 'bg-(--orange-hot) text-white' : 'bg-(--base-color-light) text-(--base-color)'}`}
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
                {["Product", "Category", "Price (1kg)","Discount","Stock", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                visible.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        </span>
                        <span className="font-semibold text-gray-800">{p.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-gray-500">{p.category}</td>
                    <td className="px-5 py-3.5 font-bold text-gray-800">{fmt(p.price)}</td>
                    <td className="px-5 py-3.5 font-bold text-gray-800">{p.discount}%</td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`font-bold ${
                          p.quantity === 0
                            ? "text-red-500"
                            : p.quantity <= 20
                            ? "text-(--orange-hot)"
                            : "text-gray-700"
                        }`}
                      >
                        {p.quantity} units
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-200">
                          <HiOutlinePencilSquare size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-200"
                          style={{ color: "#ef4444" }}
                        >
                          <HiOutlineTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t text-xs text-gray-400">
          Showing {visible.length} of {products.length} products
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <Modal title="Confirm Delete" onClose={() => setDeleteId(null)}>
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setDeleteId(null)} className="btn">
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteId)}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllProducts;