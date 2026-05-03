import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  HiOutlineTag,
  HiOutlineSquares2X2,
  HiOutlinePhoto,
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentList,
  HiOutlineCurrencyDollar,
  HiOutlineReceiptPercent,
  HiOutlineCube,
  HiOutlineMapPin,
  HiOutlineCheckCircle,
  HiOutlineArrowUpTray,
  HiOutlineTrash,
  HiOutlineStar,
} from "react-icons/hi2";
import Field from "../../../utils/Field";
import ImageUploader from "../../../utils/ImageUploader";
import { cloudinary_image_upload } from "../../../utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const CATEGORIES = [
  "Mango", "Apple", "Pineapple", "Lychee", "Orange",
  "Date", "Honey", "Ghee", "Oil", "Other",
];



// ── Image Upload Preview ───────────────────────────────────────────────────


// ── Main Component ─────────────────────────────────────────────────────────
export default function AddProductForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const { register,handleSubmit,control,reset,watch,formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "", category: "", origin: "",
      price: "", discount: "", quantity: "",
      short_description: "", description: "",
      images: [],
    },
  });

  const {isPending, isError, mutateAsync, reset: mutationReset} = useMutation({
    mutationFn: async(product_data) => {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, product_data);
    },
    onSuccess: (data) => {
        console.log('Product added successfully:', data);
        setIsSuccess(true);
        mutationReset();
    },
    onError: (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
    }

  })

  const price    = watch("price");
  const discount = watch("discount");
  const finalPrice = price && discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price || "";

  const onSubmit = async (data) => {
    // console.log("Product data:", data);

    const images = await Promise.all(data.images.map(async (image) => {
      return await cloudinary_image_upload(image?.file);
    }));

    const product_data = {
        name : data.name,
        category : data.category,
        origin : data.origin,
        price : data.price,
        discount : data.discount,
        quantity : data.quantity,
        short_description : data.short_description,
        description : data.description,
        images : images,
        price_after_discount : finalPrice,
    };
    // setIsSuccess(true);
    await mutateAsync(product_data);

  };

  const handleAddAnother = () => {
    reset();
    setIsSuccess(false);
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "#dcfce7" }}
        >
          <HiOutlineCheckCircle size={46} style={{ color: "#16a34a" }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Product Added!</h2>
          <p className="text-sm text-gray-400">Your product has been saved successfully.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAddAnother}
            className="px-6 py-2.5 rounded-xl text-sm bg-(--orange-hot) font-bold text-white transition-all hover:brightness-110"
          >
            Add Another Product
          </button>
          <button
            onClick={handleAddAnother}
            className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Go to Inventory
          </button>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto py-6 px-2 sm:px-0">

      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">Fill in the details below to list a new product.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

        {/* ── Section: Basic Info ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <SectionHeader icon={<HiOutlineTag size={16} />} title="Basic Information" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Product Name */}
            <div className="md:col-span-2">
              <Field label="Product Name" icon={<HiOutlineTag size={15} />} required error={errors.name}>
                <input
                  type="text"
                  placeholder="e.g. Himsagar Mango"
                  className={`input input-bordered w-full text-sm rounded-xl bg-white h-11 focus:outline-none ${errors.name ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                  style={{ borderColor: errors.name ? "#f87171" : "#e5e7eb" }}
                  {...register("name", {
                    required: "Product name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                />
              </Field>
            </div>

            {/* Category */}
            <Field label="Category" icon={<HiOutlineSquares2X2 size={15} />} required error={errors.category}>
              <select
                className={`select select-bordered w-full text-sm rounded-xl bg-white focus:outline-none ${errors.category ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                style={{ borderColor: errors.category ? "#f87171" : "#e5e7eb", height: "44px" }}
                {...register("category", { required: "Please select a category" })}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {/* Origin */}
            <Field label="Origin" icon={<HiOutlineMapPin size={15} />} required error={errors.origin}>
              <input
                  type="text"
                  placeholder="e.g. Rajshashi"
                  className={`input input-bordered w-full text-sm rounded-xl bg-white h-11 focus:outline-none ${errors.origin ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                  style={{ borderColor: errors.origin ? "#f87171" : "#e5e7eb" }}
                  {...register("origin", {
                    required: "Product origin is required",
                    minLength: { value: 3, message: "Origin must be at least 3 characters" },
                  })}
                />
            </Field>
          </div>
        </div>

        {/* ── Section: Product Images ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <SectionHeader icon={<HiOutlinePhoto size={16} />} title="Product Images" />
          <div className="p-6">
            <Field
              label="Upload Images"
              icon={<HiOutlinePhoto size={15} />}
              required
              error={errors.images}
              hint="First image will be used as the main product photo. Click ★ to change."
            >
              <Controller
                name="images"
                control={control}
                rules={{
                  validate: (v) => v.length > 0 || "Please upload at least one image",
                }}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.images}
                  />
                )}
              />
            </Field>
          </div>
        </div>

        {/* ── Section: Pricing & Stock ───────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <SectionHeader icon={<HiOutlineCurrencyDollar size={16} />} title="Pricing & Stock" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">

            {/* Price */}
            <Field label="Price (৳)" icon={<HiOutlineCurrencyDollar size={15} />} required error={errors.price}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">৳</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={`input input-bordered w-full text-sm rounded-xl bg-white h-11 pl-8 focus:outline-none ${errors.price ? "border-red-400" : "focus:border-(---orange-mid)"}`}
                  style={{ borderColor: errors.price ? "#f87171" : "#e5e7eb" }}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                    valueAsNumber: true,
                  })}
                />
              </div>
            </Field>

            {/* Discount */}
            <Field label="Discount (%)" icon={<HiOutlineReceiptPercent size={15} />} error={errors.discount} hint="Leave 0 for no discount">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="99"
                  placeholder="0"
                  className={`input input-bordered w-full text-sm rounded-xl bg-white h-11 pr-8 focus:outline-none ${errors.discount ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                  style={{ borderColor: errors.discount ? "#f87171" : "#e5e7eb" }}
                  {...register("discount", {
                    min: { value: 0,  message: "Cannot be negative" },
                    max: { value: 99, message: "Cannot exceed 99%" },
                    valueAsNumber: true,
                  })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">%</span>
              </div>
            </Field>

            {/* Quantity */}
            <Field label="Quantity (units)" icon={<HiOutlineCube size={15} />} required error={errors.quantity}>
              <input
                type="number"
                min="0"
                placeholder="e.g. 100"
                className={`input input-bordered w-full text-sm rounded-xl bg-white h-11 focus:outline-none ${errors.quantity ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                style={{ borderColor: errors.quantity ? "#f87171" : "#e5e7eb" }}
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 0, message: "Cannot be negative" },
                  valueAsNumber: true,
                })}
              />
            </Field>

            {/* Final price preview */}
            {finalPrice && discount > 0 && (
              <div
                className="sm:col-span-3 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm bg-(--cream-light) border-(--orange-mid)"
              >
                <HiOutlineReceiptPercent size={18} className="text-(--orange-hot)" />
                <span className="text-gray-600">
                  After <strong>{discount}%</strong> discount, the selling price will be{" "}
                  <strong className="text-(--orange-hot)">৳{finalPrice}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Section: Description ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <SectionHeader icon={<HiOutlineDocumentText size={16} />} title="Description" />
          <div className="p-6 flex flex-col gap-5">

            {/* Short description */}
            <Field
              label="Short Description"
              icon={<HiOutlineDocumentText size={15} />}
              required
              error={errors.short_description}
              hint="A brief summary shown on the product card (max 160 chars)"
            >
              <div className="relative">
                <textarea
                  rows={2}
                  maxLength={160}
                  placeholder="e.g. Sweet, chemical-free Himsagar mangoes from Rajshahi..."
                  className={`textarea textarea-bordered w-full text-sm rounded-xl bg-white resize-none leading-relaxed focus:outline-none ${errors.short_description ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                  style={{ borderColor: errors.short_description ? "#f87171" : "#e5e7eb" }}
                  {...register("short_description", {
                    required: "Short description is required",
                    maxLength: { value: 160, message: "Max 160 characters" },
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-300">
                  {watch("short_description")?.length || 0}/160
                </span>
              </div>
            </Field>

            {/* Full description */}
            <Field
              label="Full Description"
              icon={<HiOutlineClipboardDocumentList size={15} />}
              required
              error={errors.description}
              hint="Detailed product info shown on the product details page"
            >
              <textarea
                rows={6}
                placeholder="Write a detailed description about the product, its quality, sourcing, and any special notes..."
                className={`textarea textarea-bordered w-full text-sm rounded-xl bg-white resize-none leading-relaxed focus:outline-none ${errors.description ? "border-red-400" : "focus:border-(--orange-mid)"}`}
                style={{ borderColor: errors.description ? "#f87171" : "#e5e7eb" }}
                {...register("description", {
                  required: "Full description is required",
                  minLength: { value: 30, message: "At least 30 characters required" },
                })}
              />
            </Field>
          </div>
        </div>

        {/* ── Action Buttons ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-gray-400">
            Fields marked with <span className="text-(--orange-hot)">*</span> are required
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 text-sm font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-(--orange-mid) hover:text-white transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-7 py-2.5 text-sm font-bold rounded-xl text-white transition-all hover:brightness-110 bg-(--green-deep) disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <HiOutlineCheckCircle size={17} />
              )}
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ── Section header strip ───────────────────────────────────────────────────
function SectionHeader({ icon, title }) {
  return (
    <div
      className="flex items-center gap-2.5 px-6 py-3.5 border-b border-gray-100"
      style={{ background: "#fafafa" }}
    >
      <span className="text-(--orange-hot)">{icon}</span>
      <h2 className="text-sm font-bold text-gray-600 tracking-wide">{title}</h2>
    </div>
  );
}