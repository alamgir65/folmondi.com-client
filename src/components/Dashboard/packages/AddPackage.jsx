import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    HiOutlineTag,
    HiOutlinePhoto,
    HiOutlineCheckCircle,
    HiOutlineSquares2X2,
} from "react-icons/hi2";
import Field from "../../../utils/Field";
import { Link } from "react-router";
import { cloudinary_image_upload, discount_calculate } from "../../../utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AddPackage() {
    const [isSuccess, setIsSuccess] = useState(false);

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
            return res.data;
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            product: "",
            price: "",
            quantity: ""
        },
    });


    const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
        mutationFn: async (package_data) => {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/packages`, package_data);
        },
        onSuccess: (data) => {
            // console.log('Package added successfully from onsuccess:', data);
            setIsSuccess(true);
            mutationReset();
        },
        onError: (error) => {
            // console.error('Error adding category:', error);
            alert('Failed to add category. Please try again.');
        }

    })


    const onSubmit = async (data) => {
        console.log(data);

        const p = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/product/${data?.product_id}`
        );

        const product = p?.data;
        const main_amount = Number(data.quantity) * Number(product?.price);
        const dis_amount = Number(data.price);
        console.log(main_amount, dis_amount);
        // return;

        const category_data = {
            product_id: data.product_id,
            price: Number(data.price),
            quantity: Number(data.quantity),
            product_name: product?.name || "",
            discount: discount_calculate(main_amount, dis_amount),
        };
        console.log(category_data);

        await mutateAsync(category_data);
    };

    const handleAddAnother = () => {
        reset();
        setIsSuccess(false);
    };

    // ── Success UI ─────────────────────────
    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100">
                    <HiOutlineCheckCircle size={46} className="text-green-600" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Package Added!
                    </h2>
                    <p className="text-sm text-gray-400">
                        Your Package has been saved successfully.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleAddAnother}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--orange-hot)] hover:brightness-110"
                    >
                        Add Another Package
                    </button>

                    <Link
                        to="/dashboard/manage-packages"
                        className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                        Go to Package
                    </Link>
                </div>
            </div>
        );
    }

    // ── Form ───────────────────────────────
    return (
        <div className="max-w-4xl mx-auto py-6 px-2 sm:px-0">

            {/* Header */}
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-800">
                    Add New Package
                </h1>
                <p className="text-sm text-gray-400">
                    Fill in the details below to create a new package.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
            >

                {/* ── Basic Info ───────────────── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <SectionHeader
                        icon={<HiOutlineTag size={16} />}
                        title="Basic Information"
                    />

                    <div className="p-6 space-y-5">

                        {/* Product */}
                        <Field label="Product" icon={<HiOutlineSquares2X2 size={15} />} required error={errors.product}>
                            <select
                                className={`select select-bordered w-full text-sm rounded-xl bg-white focus:outline-none ${errors.product ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                                style={{ borderColor: errors.product ? "#f87171" : "#e5e7eb", height: "44px" }}
                                {...register("product_id", { required: "Please select a product" })}
                            >
                                <option value="">Select product</option>
                                {products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
                            </select>
                        </Field>

                        {/* Quantity */}
                        <Field label="Package Quantity" required error={errors.quantity}>
                            <input
                                type="number"
                                placeholder="e.g. ১২ কেজি"
                                className={`input input-bordered w-full rounded-xl ${errors.quantity ? "border-red-400" : ""
                                    }`}
                                {...register("quantity", {
                                    required: "Package quantity is required",
                                })}
                            />
                        </Field>

                        {/* Price */}
                        <Field label="Package Price" required error={errors.price}>
                            <input
                                type="number"
                                placeholder="1020 tk"
                                className={`input input-bordered w-full rounded-xl ${errors.price ? "border-red-400" : ""
                                    }`}
                                {...register("price", {
                                    required: "Package price is required"
                                })}
                            />
                        </Field>
                    </div>
                </div>

                {/* ── Actions ───────────────── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex justify-between flex-wrap gap-4">

                    <p className="text-xs text-gray-400">
                        Fields marked with <span className="text-[var(--orange-hot)]">*</span> are required
                    </p>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-5 py-2.5 text-sm font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl text-white bg-[var(--green-deep)] disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving..." : "Save Category"}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}

// ── Section Header ─────────────────
function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 bg-gray-50">
            <span className="text-(--orange-hot)">{icon}</span>
            <h2 className="text-sm font-bold text-gray-600">{title}</h2>
        </div>
    );
}