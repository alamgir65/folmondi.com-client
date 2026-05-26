import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    HiOutlineTag,
    HiOutlineCheckCircle,
    HiOutlineSquares2X2,
} from "react-icons/hi2";
import Field from "../../../utils/Field";
import { Link } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function EditPackage({ package_id, onClose, onCancel }) {
    const [isSuccess, setIsSuccess] = useState(false);

    // ── Products ──
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios.get(`${API}/products`);
            return res.data;
        }
    });

    // ── Package ──
    const { data: pkg = {}, isLoading } = useQuery({
        queryKey: ['package', package_id],
        queryFn: async () => {
            const res = await axios.get(`${API}/package/${package_id}`);
            return res.data;
        },
        enabled: !!package_id
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched"
    });

    // ── Set default values ──
    useEffect(() => {
        if (pkg) {
            reset({
                product_id: pkg.product_id || "",
                price: pkg.price || "",
                quantity: pkg.quantity || ""
            });
        }
    }, [pkg, reset]);

    // ── Mutation (PATCH) ──
    const { mutateAsync } = useMutation({
        mutationFn: async (data) => {
            const token = localStorage.getItem('folmondi_token');
            await axios.patch(`${API}/package/${package_id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: () => {
            alert('Failed to update package.');
        }
    });

    const onSubmit = async (data) => {
        const selectedProduct = products.find(p => p._id === data.product_id);

        const package_data = {
            product_id: data.product,
            price: data.price,
            quantity: data.quantity,
            product_name: selectedProduct?.name || ""
        };

        await mutateAsync(package_data);
    };
    const successClickHandler = () => {
        setIsSuccess(false)
        onClose()
    }
    // ── Success UI ──
    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100">
                    <HiOutlineCheckCircle size={46} className="text-green-600" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Package Updated!
                    </h2>
                    <p className="text-sm text-gray-400">
                        Your package has been updated successfully.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={successClickHandler}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--orange-hot)]"
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-6 px-2 sm:px-0">

            {/* Header */}
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-800">
                    Edit Package
                </h1>
                <p className="text-sm text-gray-400">
                    Update package details below.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <SectionHeader
                        icon={<HiOutlineTag size={16} />}
                        title="Basic Information"
                    />

                    <div className="p-6 space-y-5">

                        {/* Product */}
                        <Field label="Product" icon={<HiOutlineSquares2X2 size={15} />} required error={errors.product}>
                            <select
                                className={`select select-bordered w-full text-sm rounded-xl bg-white ${errors.product ? "border-red-400" : ""}`}
                                {...register("product_id", { required: true })}
                            >
                                <option value="">Select product</option>
                                {products.map((p) => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>
                        </Field>

                        {/* Quantity */}
                        <Field label="Package Quantity" required error={errors.quantity}>
                            <input
                                type="number"
                                className="input input-bordered w-full rounded-xl"
                                {...register("quantity", { required: true })}
                            />
                        </Field>

                        {/* Price */}
                        <Field label="Package Price" required error={errors.price}>
                            <input
                                type="number"
                                className="input input-bordered w-full rounded-xl"
                                {...register("price", { required: true })}
                            />
                        </Field>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex justify-between flex-wrap gap-4">
                    <p className="text-xs text-gray-400">
                        Fields marked with * are required
                    </p>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2.5 text-sm font-bold rounded-xl border border-gray-200 text-gray-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-bold rounded-xl text-white bg-[var(--green-deep)]"
                        >
                            {isSubmitting ? "Saving..." : "Update Package"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Section Header
function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 bg-gray-50">
            <span className="text-(--orange-hot)">{icon}</span>
            <h2 className="text-sm font-bold text-gray-600">{title}</h2>
        </div>
    );
}