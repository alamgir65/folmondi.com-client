import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { Modal } from '../../../utils/Modal';
import EditCategoryForm from './EditCategoryForm';

const API = import.meta.env.VITE_API_BASE_URL;

const Categories = () => {
    const [delete_id,set_delete_id] = useState(null);
    const [edit_id,set_edit_id] = useState(null);

      // ── Categories Query ───────
  const { data: categories = [] } = useQuery({
    queryKey: ["categories","manage"],
    queryFn: async () => {
      const res = await axios.get(`${API}/categories`);
      return res.data;
    },
  });
  console.log('Categories', categories);


  const handleDelete = () => {

  }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <p className="text-sm text-gray-400">{categories.length} categories</p>
                </div>
            </div>
            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: "#f9fafb" }}>
                                {["No.", "Image", "Name", "Description","", "Actions"].map((h) => (
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
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                                        No Categories found.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((p,i) => (
                                    <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3.5 text-gray-500">{i+1}</td>
                                        <td className="px-5 py-3.5">
                                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-500">{p.name}</td>
                                        <td colSpan="2" className="px-5 py-3.5 font-bold text-gray-800">{(p.description)}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-200"
                                                  onClick={()=>set_edit_id(p._id)}
                                                >
                                                    <HiOutlinePencilSquare size={16} />
                                                </button>

                                                <button
                                                      onClick={() => set_delete_id(p._id)}
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
                    Showing {categories.length} of {categories.length} products
                </div>
            </div>

            {/* Edit Modal */}
      {edit_id && (
        <Modal title="Edit Category" size='md' onClose={() => set_edit_id(null)}>
          <EditCategoryForm category_id={edit_id} onCancel={() => set_edit_id(null)} />
        </Modal>
      )}
      {/* Delete Confirm Modal */}
      {delete_id && (
        <Modal title="Confirm Delete" size={'md'} onClose={() => set_delete_id(null)}>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <strong>{categories.find(p => p.id === delete_id)?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => set_delete_id(null)}
              className="px-5 py-2 text-sm font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(delete_id)}
              className="px-5 py-2 text-sm font-bold rounded-xl text-white transition-all hover:brightness-110 bg-(--orange-hot)"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
        </div>
    );
};

export default Categories;