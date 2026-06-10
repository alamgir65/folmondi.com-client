import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const PER_PAGE = 6;

const FALLBACK_REVIEWS = [
  {
    _id: "1",
    name: "রাহেলা বেগম",
    loc: "ঢাকা",
    product: "হিমসাগর আম",
    text: "সত্যিই অসাধারণ আম! এত মিষ্টি এবং তাজা আম আগে কখনো খাইনি।",
    rating: 5,
    helpful: 24,
    verified: true,
    createdAt: "2026-05-10T10:00:00.000Z",
  },
  {
    _id: "2",
    name: "মোঃ করিম",
    loc: "চট্টগ্রাম",
    product: "ফজলি আম",
    text: "Folmondi থেকে প্রথমবার অর্ডার করলাম। খুব ভালো লেগেছে।",
    rating: 5,
    helpful: 18,
    verified: true,
    createdAt: "2026-05-11T10:00:00.000Z",
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const formatBanglaDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "আজকে";
  }
};

const getAvatar = (name = "") => {
  return name.trim().slice(0, 2);
};

const getColor = (rating) => {
  if (rating >= 5) return "#1d4ed8";
  if (rating >= 4) return "#2563eb";
  return "#3b82f6";
};

// ─────────────────────────────────────────────────────────────
// Stars
// ─────────────────────────────────────────────────────────────

const Stars = React.memo(function Stars({
  rating,
  size = 15,
  interactive = false,
  onRate = null,
}) {
  const [hov, setHov] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          type="button"
          key={s}
          style={{
            background: "none",
            border: "none",
            padding: 1,
            cursor: interactive ? "pointer" : "default",
            transition: "transform .15s",
          }}
          className={interactive ? "hover:scale-125" : ""}
          onClick={() => interactive && onRate?.(s)}
          onMouseEnter={() => interactive && setHov(s)}
          onMouseLeave={() => interactive && setHov(0)}
        >
          <svg
            width={size}
            height={size}
            fill={
              (interactive ? hov || rating : rating) >= s
                ? "#f59e0b"
                : "#e2e8f0"
            }
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Review Card
// ─────────────────────────────────────────────────────────────

const ReviewCard = React.memo(function ReviewCard({ r }) {
  const storageKey = `review_helpful_${r._id}`;

  const [helpful, setHelpful] = useState(r.helpful || 0);

  const [voted, setVoted] = useState(
    localStorage.getItem(storageKey) === "true"
  );

  const handleHelpful = () => {
    if (voted) return;

    setHelpful((prev) => prev + 1);
    setVoted(true);

    localStorage.setItem(storageKey, "true");
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm"
          style={{
            background: `linear-gradient(135deg, ${getColor(
              r.rating
            )}, #3b82f6)`,
          }}
        >
          {getAvatar(r.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm text-blue-900">
              {r.name}
            </span>

            {r.verified && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">
                যাচাইকৃত
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={r.rating} size={13} />

            <span className="text-xs text-slate-400">
              • {formatBanglaDate(r.createdAt)}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            📍 {r.loc || "বাংলাদেশ"}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <span className="text-4xl text-blue-100 font-serif leading-none block -mb-2">
          "
        </span>

        <p className="text-sm text-gray-600 leading-7 font-medium">
          {r.text}
        </p>
      </div>

      {/* Product */}
      <div className="inline-flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1 self-start">
        <span className="text-sm">🥭</span>

        <span className="text-xs font-bold text-blue-700">
          {r.product}
        </span>
      </div>

      <hr className="border-blue-50" />

      {/* Helpful */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">
          সহায়ক ছিল?
        </span>

        <button
          onClick={handleHelpful}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 border text-xs font-bold transition-all ${voted
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "bg-transparent border-gray-200 text-gray-400 hover:border-blue-300"
            }`}
        >
          👍 {helpful}
        </button>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────────────────────

function WriteReviewModal({ onClose }) {
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      loc: "",
      product: "",
      text: "",
    },
  });

  const text = watch("text", "");

  const submit = async (data) => {
    if (!rating) return;

    try {
      setLoading(true);

      const reviewData = {
        ...data,
        rating,
        createdAt: new Date().toISOString(),
      };

      const token = localStorage.getItem('folmondi_token');

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await queryClient.invalidateQueries(["reviews"]);

      setDone(true);

      setTimeout(() => {
        reset();
        onClose();
      }, 1500);
    } catch (err) {
      // console.log(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">🎉</div>

            <h3 className="text-xl font-black text-blue-700 mb-2">
              ধন্যবাদ!
            </h3>

            <p className="text-slate-500 text-sm">
              আপনার রিভিউ সফলভাবে জমা হয়েছে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-lg font-black text-blue-900">
                  রিভিউ লিখুন
                </h3>

                <p className="text-xs text-slate-400 mt-0.5">
                  আপনার সৎ অভিজ্ঞতা অন্যদের সাহায্য করে
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle text-slate-400"
              >
                ✕
              </button>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-700 block mb-2">
                রেটিং দিন *
              </label>

              <div className="flex items-center gap-2">
                <Stars
                  rating={rating}
                  size={28}
                  interactive
                  onRate={setRating}
                />

                {rating > 0 && (
                  <span className="text-xs font-bold text-blue-700">
                    {
                      [
                        "",
                        "খুব খারাপ",
                        "খারাপ",
                        "ঠিক আছে",
                        "ভালো",
                        "অসাধারণ!",
                      ][rating]
                    }
                  </span>
                )}
              </div>
            </div>

            {/* Name + Loc */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  আপনার নাম *
                </label>

                <input
                  className="input input-bordered input-sm w-full"
                  placeholder="রাহেলা বেগম"
                  {...register("name", {
                    required: "নাম আবশ্যক",
                  })}
                />

                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  জেলা
                </label>

                <input
                  className="input input-bordered input-sm w-full"
                  placeholder="ঢাকা"
                  {...register("loc")}
                />
              </div>
            </div>

            {/* Product */}
            <div className="mb-3">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">
                কোন পণ্য কিনেছেন?
              </label>

              <input
                className="input input-bordered input-sm w-full"
                placeholder="হিমসাগর আম"
                {...register("product")}
              />
            </div>

            {/* Review */}
            <div className="mb-5">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">
                আপনার মতামত *
              </label>

              <textarea
                className="textarea textarea-bordered w-full text-sm"
                rows={4}
                maxLength={300}
                placeholder="আপনার অভিজ্ঞতা বিস্তারিত লিখুন..."
                {...register("text", {
                  required: "মতামত লিখুন",
                  minLength: {
                    value: 10,
                    message: "কমপক্ষে ১০ অক্ষর লিখুন",
                  },
                })}
              />

              <div
                className={`text-right text-xs mt-1 ${text.length > 260
                    ? "text-red-400"
                    : "text-slate-400"
                  }`}
              >
                {text.length}/300
              </div>

              {errors.text && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.text.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm flex-1 btn-ghost border border-base-300 font-bold"
              >
                বাতিল
              </button>

              <button
                type="submit"
                disabled={!isValid || !rating || loading}
                className="btn btn-sm flex-[2] text-white font-bold border-none"
                style={{
                  background:
                    isValid && rating
                      ? "#1d4ed8"
                      : "#cbd5e1",
                }}
              >
                {loading
                  ? "জমা হচ্ছে..."
                  : "রিভিউ জমা দিন →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);

  const { data: reviews = FALLBACK_REVIEWS, isLoading } =
    useQuery({
      queryKey: ["reviews"],
      queryFn: async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/reviews`
        );

        return res.data;
      },
    });

  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [reviews]);

  const totalPages = Math.ceil(
    sortedReviews.length / PER_PAGE
  );

  const paginatedReviews = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    return sortedReviews.slice(start, end);
  }, [sortedReviews, page]);

  return (
    <div
      className="min-h-screen bg-blue-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Hero */}
      <div
        className="relative overflow-hidden text-center py-14 px-4"
        style={{
          background:
            "linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)",
        }}
      >
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-16 -right-16 pointer-events-none" />

        <div className="absolute w-44 h-44 rounded-full bg-white/5 -bottom-12 left-8 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-5 py-2 mb-4">
            <span>⭐</span>

            <span className="text-xs font-bold text-blue-200">
              গ্রাহকদের মতামত
            </span>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">
            সকল রিভিউ
          </h1>

          <p className="text-blue-200 text-sm max-w-md mx-auto mb-6">
            আমাদের {reviews.length}+ গ্রাহকের
            সত্যিকারের অভিজ্ঞতা।
          </p>

          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-black px-7 py-3 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 shadow-lg"
          >
            ✍️ রিভিউ লিখুন
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : paginatedReviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedReviews.map((r) => (
                <ReviewCard key={r._id} r={r} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10 flex-wrap">
                {[...Array(totalPages).keys()].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === n + 1
                        ? "bg-blue-700 text-white"
                        : "bg-white border border-blue-100 text-blue-700"
                      }`}
                  >
                    {n + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-blue-100">
            <div className="text-5xl mb-3">🔍</div>

            <h3 className="font-black text-blue-900 mb-1">
              কোনো রিভিউ পাওয়া যায়নি
            </h3>

            <p className="text-slate-400 text-sm">
              পরে আবার চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <WriteReviewModal
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}