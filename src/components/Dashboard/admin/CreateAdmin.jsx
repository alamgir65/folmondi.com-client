import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    HiOutlineTag,
    HiOutlinePhoto,
    HiOutlineCheckCircle,
} from "react-icons/hi2";
import Field from "../../../utils/Field";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function CreateAdmin() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            name: "",
            description: "",
            image: null,
        },
    });

    const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
        mutationFn: async (admin_data) => {

            const token = localStorage.getItem('folmondi_token');

            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/create-admin`,
                admin_data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;
        },
        onSuccess: (data) => {
            // console.log('Admin added successfully from onsuccess:', data);
            setIsSuccess(true);
            mutationReset();
        },
        onError: (error) => {
            // console.error('Error adding category:', error);
        }

    })


    const onSubmit = async (data) => {
        console.log(data);
        const admin_data = {
            email: data.email,
            password: data.password,
        };
        await mutateAsync(admin_data);
    };

    const handleAddAnother = () => {
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
                        Admin Created!
                    </h2>
                    <p className="text-sm text-gray-400">
                        Your admin has been saved successfully.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleAddAnother}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--orange-hot)] hover:brightness-110"
                    >
                        Ok
                    </button>
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
                    Create new Admin
                </h1>
                <p className="text-sm text-gray-400">
                    Fill in the details below to create a new admin.
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

                        {/* Email */}
                        <div>
                            <Field label="Email" required error={errors.email}>
                                <input
                                    type="email"
                                    placeholder="e.g. alamgir@gmail.com"
                                    className={`input input-bordered w-full rounded-xl ${errors.email ? "border-red-400" : ""
                                        }`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    })}
                                />
                            </Field>
                        </div>

                        <Field label="Password" required error={errors.password}>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder=""
                                    className={`input input-bordered w-full rounded-xl ${errors.password ? "border-red-400" : ""
                                        }`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" },
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
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
                            {isSubmitting ? "Saving..." : "Save Admin"}
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