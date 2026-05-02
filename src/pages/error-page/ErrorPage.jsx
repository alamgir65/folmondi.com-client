import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-linear-to-br from-[#fff7ed] via-[#ffedd5] to-[#fef3c7]">

      {/* 404 */}
      <h1 className="text-6xl font-bold text-(--orange-hot) mb-2">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
        পেজটি খুঁজে পাওয়া যায়নি 😢
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mb-6">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা ভুল URL দিয়েছেন।
        <br />
        (The page you are looking for doesn't exist.)
      </p>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/"
          className="btn-primary"
        >
          🏠 হোমে ফিরে যান
        </Link>

        <Link
          to="/shop"
          className="btn-secondary"
        >
          🛒 শপ দেখুন
        </Link>
      </div>

      {/* Extra hint */}
      <p className="text-sm text-gray-400 mt-8">
        Fresh fruits are waiting for you 🍊
      </p>
    </div>
  );
};

export default ErrorPage;