import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckCircle, HiOutlinePhoto, HiOutlineTag } from "react-icons/hi2";
import Field from "../../../utils/Field";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cloudinary_image_upload } from "../../../utils";
import { Link } from "react-router";

const API = import.meta.env.VITE_API_BASE_URL;

const EditCategoryForm = ({ onClose, product_id, onCancel }) => {
    const [isSuccess,setIsSuccess] = useState(false);
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



  const {isPending, isError, mutateAsync, reset: mutationReset} = useMutation({
      mutationFn: async(category_data) => {
          await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/category/${product_id}`, category_data);
      },
      onSuccess: (data) => {
          console.log('Category added successfully from onsuccess:', data);
          setIsSuccess(true);
          mutationReset();
      },
      onError: (error) => {
          console.error('Error adding category:', error);
          alert('Failed to add category. Please try again.');
      }
  
    })

    const onSubmit = async (data) => {
        console.log(data);
        let image = null;
        if(data?.image){
            image =  await cloudinary_image_upload(data?.image[0]);
        }
    
        const category_data = {
            name: data.name,
            description: data.description,
            image: image == null? category.image : image
        };
    
        console.log(category_data);
        await mutateAsync(category_data);
      };

  // category fetch
  const { data: category = {}, isLoading } = useQuery({
    queryKey: ["category",product_id],
    queryFn: async () => {
      const res = await axios.get(`${API}/category/${product_id}`);
      return res.data;
    },
  });


    // ── Success UI ─────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100">
          <HiOutlineCheckCircle size={46} className="text-green-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Category Added!
          </h2>
          <p className="text-sm text-gray-400">
            Your category has been saved successfully.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/categories"
            className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Go to Categories
          </Link>
        </div>
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

      {/* ── Basic Info ───────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader
          icon={<HiOutlineTag size={16} />}
          title="Basic Information"
        />

        <div className="p-5 space-y-5">

          {/* Name */}
          <Field label="Category Name" required error={errors.name}>
            <input
              type="text"
              value={category.name}
              placeholder="e.g. Fruits"
              className={`input input-bordered w-full rounded-xl ${
                errors.name ? "border-red-400" : ""
              }`}
              {...register("name", {
                required: "Category name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
            />
          </Field>

          {/* Description */}
          <Field label="Description" required error={errors.description}>
            <textarea
              rows={2}
              value={category.description}
              maxLength={160}
              className={`textarea textarea-bordered w-full rounded-xl ${
                errors.description ? "border-red-400" : ""
              }`}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters",
                },
              })}
            />
            <span className="text-xs text-gray-400">
              {watch("description")?.length || 0}/160
            </span>
          </Field>

        </div>
      </div>

      {/* ── Image Section ───────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader
          icon={<HiOutlinePhoto size={16} />}
          title="Category Image"
        />
        <div className="p-5">
          <Field label="Upload Image" required error={errors.image}>
            <input
              type="file"
              accept="image/*"
              className={`file-input file-input-bordered w-full rounded-xl ${
                errors.image ? "border-red-400" : ""
              }`}
              {...register("image")}
            />
          </Field>
        <span> <img className="w-10 m-2" src={category?.image} /> </span>
        </div>
      </div>


      {/* ── Actions ───────────────── */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 text-sm font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-bold rounded-xl text-white bg-[var(--green-deep)] disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

// ── Section Header ─────────────────
function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
      <span className="text-(--orange-hot)">{icon}</span>
      <h2 className="text-sm font-bold text-gray-600">{title}</h2>
    </div>
  );
}

export default EditCategoryForm;