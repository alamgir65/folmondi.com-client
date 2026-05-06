import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { HiOutlineCheckCircle, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { Modal } from '../../../utils/Modal';
import EditPackage from './EditPackage';

const API = import.meta.env.VITE_API_BASE_URL;

const ManagePackages = () => {
    const [delete_id, set_delete_id] = useState(null);
    const [edit_id, set_edit_id] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    // ── packages Query ───────
    const { data: packages = [] } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axios.get(`${API}/packages`);
            return res.data;
        },
    });


    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id) => {
            const res = await axios.delete(`${API}/package/${id}`);
            return res.data;
        },

        onSuccess: () => {
            setIsSuccess(true);
            set_delete_id(null);
            QueryClient.invalidateQueries({ queryKey: ["packages"] });
        },
        onError: (error) => {
            console.error("Error deleting category:", error);
        },
    });

    if (isSuccess) {
        return (
            <Modal size={'md'}>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100">
                        <HiOutlineCheckCircle size={46} className="text-green-600" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            Package Deleted!
                        </h2>
                        <p className="text-sm text-gray-400">
                            Your package has been deleted successfully.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center gap-3">
                    <button onClick={() => setIsSuccess(false)} className='btn-primary'>ok</button>
                </div>
            </Modal>
        );
    }

    const handleDelete = (delete_id) => {
        mutateAsync(delete_id);
    }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Packages</h1>
                    <p className="text-sm text-gray-400">{packages.length} packages</p>
                </div>
            </div>
            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: "#f9fafb" }}>
                                {["No.", "Product", "Price", "Quantity", "Actions"].map((h) => (
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
                            {packages.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                                        No Packages found.
                                    </td>
                                </tr>
                            ) : (
                                packages.map((p, i) => (
                                    <tr key={p._id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3.5 text-gray-500">{i + 1}</td>
                                        <td className="px-5 py-3.5 text-gray-500">{p?.product_name}</td>
                                        <td className="px-5 py-3.5 font-bold text-gray-800">{(p.price)}</td>
                                        <td className="px-5 py-3.5 font-bold text-gray-800">{(p.quantity)}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-200"
                                                    onClick={() => set_edit_id(p._id)}
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
                    Showing {packages.length} of {packages.length} packages
                </div>
            </div>

            {/* Edit Modal */}
            {edit_id && (
                <Modal title="Edit Package" size='md' onClose={() => set_edit_id(null)}>
                    <EditPackage package_id={edit_id} onClose={() => set_edit_id(null)} onCancel={() => set_edit_id(null)} />
                </Modal>
            )}
            {/* Delete Confirm Modal */}
            {delete_id && (
                <Modal title="Confirm Delete" size={'md'} onClose={() => set_delete_id(null)}>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete <strong>{packages.find(p => p._id === delete_id)?.product_name} Package</strong>? This action cannot be undone.
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

export default ManagePackages;