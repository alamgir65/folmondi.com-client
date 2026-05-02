import React from "react";
import { FaHome, FaShoppingBag, FaShoppingCart, FaPhone } from "react-icons/fa";
import { Link } from "react-router";
import "./MobileMenuBar.css";

const MobileMenuBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-base-100 shadow-md z-50 md:hidden">
      <div className="flex justify-around items-center py-2 mobile-menu-bar">

        {/* Home */}
        <Link to="/" className="flex flex-col items-center text-gray-500">
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Shop */}
        <Link to="/shop" className="flex flex-col items-center text-gray-500">
          <FaShoppingBag size={20} />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex flex-col items-center text-gray-500 relative">
          <FaShoppingCart size={20} />

          {/* Optional cart badge */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
            2
          </span>

          <span className="text-xs mt-1">Cart</span>
        </Link>

        {/* Contact */}
        <Link to="/contact" className="flex flex-col items-center text-gray-500">
          <FaPhone size={20} />
          <span className="text-xs mt-1">Contact</span>
        </Link>

      </div>
    </div>
  );
};

export default MobileMenuBar;