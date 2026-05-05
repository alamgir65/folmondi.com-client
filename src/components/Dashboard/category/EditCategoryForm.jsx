import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineCheckCircle,
  HiOutlinePhoto,
  HiOutlineTag,
} from "react-icons/hi2";
import Field from "../../../utils/Field";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { cloudinary_image_upload } from "../../../utils";
import { Link } from "react-router";
import { Modal } from "../../../utils/Modal";

const API = import.meta.env.VITE_API_BASE_URL;

const EditCategoryForm = ({  category_id,onClose, onCancel }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();

  // ── Fetch category ──
  const { data: category, isLoading } = useQuery({
    queryKey: ["category", category_id],
    queryFn: async () => {
      const res = await axios.get(`${API}/category/${category_id}`);
      return res.data;
    },
    enabled: !!category_id,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  // ── Prefill form ──
  useEffect(() => {
    if (category) {
      reset({
        name: category.name || "",
        description: category.description || "",
      });
    }
  }, [category, reset]);

  // ── Mutation ──
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (category_data) => {
      const res = await axios.patch(
        `${API}/category/${category_id}`,
        category_data
      );
      return res.data;
    },
    onSuccess: () => {
      onClose()
      setIsSuccess(true);
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      console.error("Error updating category:", error);
      alert("Failed to update category.");
    },
  });

  // ── Submit ──
  const onSubmit = async (data) => {
    let image = category?.image;

    if (data?.image?.[0]) {
      image = await cloudinary_image_upload(data.image[0]);
    }

    const category_data = {
      name: data.name,
      description: data.description,
      image,
    };

    await mutateAsync(category_data);
  };

  // ── Loading ──
  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // ── Success UI ──
  if (isSuccess) {
    return (
      <Modal size={'md'}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100">
            <HiOutlineCheckCircle size={46} className="text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Category Updated!
            </h2>
            <p className="text-sm text-gray-400">
              Your category has been updated successfully.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={() => setIsSuccess(false)} className='btn-primary'>ok</button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader icon={<HiOutlineTag size={16} />} title="Basic Information" />

        <div className="p-5 space-y-5">
          <Field label="Category Name" required error={errors.name}>
            <input
              type="text"
              className={`input input-bordered w-full rounded-xl ${errors.name ? "border-red-400" : ""
                }`}
              {...register("name", {
                required: "Category name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
          </Field>

          <Field label="Description" required error={errors.description}>
            <textarea
              rows={2}
              maxLength={160}
              className={`textarea textarea-bordered w-full rounded-xl ${errors.description ? "border-red-400" : ""
                }`}
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
            />
            <span className="text-xs text-gray-400">
              {watch("description")?.length || 0}/160
            </span>
          </Field>
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <SectionHeader icon={<HiOutlinePhoto size={16} />} title="Category Image" />

        <div className="p-5">
          <Field label="Upload Image" error={errors.image}>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full rounded-xl"
              {...register("image")}
            />
          </Field>

          {category?.image && (
            <img src={category.image} className="w-12 mt-2 rounded" />
          )}
        </div>
      </div>

      {/* Actions */}
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
          disabled={isSubmitting || isPending}
          className="px-6 py-2 text-sm font-bold rounded-xl text-white bg-[var(--green-deep)] disabled:opacity-60"
        >
          {isSubmitting || isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

// Header
function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
      <span className="text-(--orange-hot)">{icon}</span>
      <h2 className="text-sm font-bold text-gray-600">{title}</h2>
    </div>
  );
}

export default EditCategoryForm;