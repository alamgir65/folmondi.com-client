import { useEffect, useState } from "react";
import {
  HiOutlineShoppingCart,
  HiOutlineTrash,
  HiMinus,
  HiPlus,
  HiOutlineTag,
  HiOutlineTruck,
  HiOutlineArrowRight,
  HiOutlineXMark,
  HiOutlineGift,
  HiOutlineShoppingBag,
  HiOutlineArrowLeft,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { get_product_from_LS, remove_product_from_LS, removeItem, updateQty } from "../../utils";
import Swal from "sweetalert2";
import { Link } from "react-router";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_CART = [
  {
    id: 1,
    name: "হিমসাগর আম",
    nameEn: "Himsagar Mango",
    category: "Mango",
    origin: "Rajshahi",
    weight: "12 KG",
    price: 1800,
    qty: 2,
    stock: 50,
    freeDelivery: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg",
  },
  {
    id: 2,
    name: "গোবিন্দভোগ আম",
    nameEn: "Gobindobhog Mango",
    category: "Mango",
    origin: "Chapai Nawabganj",
    weight: "5 KG",
    price: 1680,
    qty: 1,
    stock: 30,
    freeDelivery: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg",
  },
  {
    id: 3,
    name: "সুন্দরবন মধু",
    nameEn: "Sundarban Honey",
    category: "Honey",
    origin: "Khulna",
    weight: "1 KG",
    price: 950,
    qty: 1,
    stock: 15,
    freeDelivery: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sunflower_from_Silesia2.jpg/320px-Sunflower_from_Silesia2.jpg",
  },
];

const PROMO_CODES = { FOLMONDI10: 10, FRESH20: 20 };

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) => `৳${Number(n).toLocaleString()}`;

// ── Sub-components ────────────────────────────────────────────────────────────

function QtyButton({ onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 transition-all hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: "#fff7ed" }}
      >
        <HiOutlineShoppingCart size={44} style={{ color: "#f04e0f" }} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Your cart is empty</h2>
        <p className="text-sm text-gray-400">আপনার কার্টে কোনো পণ্য নেই। কেনাকাটা শুরু করুন!</p>
      </div>
      <Link to={'/shop'}
        className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm transition-all hover:brightness-110 shadow-sm"
        style={{ backgroundColor: "#f04e0f" }}
      >
        <HiOutlineShoppingBag size={16} />
        Continue Shopping
      </Link>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(new Set(cart.map((i) => i.cart_id)));
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  // ── Load Cart From LocalStorage ──────────────────────────────────────────
      useEffect(() => {
          const storedCart = get_product_from_LS();
          if (storedCart && Array.isArray(storedCart)) {
              setCart(storedCart);
          }
      }, [setCart]);


  const clearCart = () => {
    setCart([]);
    setSelected(new Set());
    setAppliedPromo(null);
  };

  // ── Selection ─────────────────────────────────────────────────────────────
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const allSelected = cart.length > 0 && selected.size === cart.length;
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(cart.map((i) => i.cart_id)));

  // ── Promo ─────────────────────────────────────────────────────────────────
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, pct: PROMO_CODES[code] });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try FOLMONDI10 or FRESH20.");
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError("");
  };

  // ── Totals (only selected items) ──────────────────────────────────────────
  const selectedItems = cart.filter((i) => selected.has(i.cart_id));
  const subtotal = selectedItems.reduce((s, i) => s + i.package_price * i.package_count, 0);
  const discount = appliedPromo ? Math.round((subtotal * appliedPromo.pct) / 100) : 0;
  const delivery = 0; // all free for now
  const total = subtotal - discount + delivery;
  const totalItems = selectedItems.reduce((s, i) => s + i.package_count, 0);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to={'/shop'}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-all"
            >
              <HiOutlineArrowLeft size={17} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <HiOutlineShoppingCart size={22} style={{ color: "#f04e0f" }} />
                Shopping Cart
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
              </p>
            </div>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors px-3 py-2 rounded-xl hover:bg-red-50"
            >
              <HiOutlineTrash size={14} />
              Clear Cart
            </button>
          )}
        </div>

        {/* ── Empty state ──────────────────────────────────────────────── */}
        {cart.length === 0 ? (
          <EmptyCart/>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* ── LEFT — Cart items ───────────────────────────────────── */}
            <div className="flex flex-col gap-4">

              {/* Select-all toolbar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={toggleAll}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      allSelected
                        ? "border-orange-500"
                        : "border-gray-300 hover:border-orange-300"
                    }`}
                    style={allSelected ? { backgroundColor: "#f04e0f" } : {}}
                  >
                    {allSelected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Select All ({cart.length})
                  </span>
                </label>
                {selected.size > 0 && (
                  <span className="text-xs text-gray-400">
                    {selected.size} selected · {fmt(subtotal)}
                  </span>
                )}
              </div>

              {/* Item cards */}
              {cart.map((item) => {
                const isSelected = selected.has(item.cart_id);
                const isRemoving = removingId === item.cart_id;
                return (
                  <div
                    key={item.cart_id}
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${
                      isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    } ${
                      isSelected ? "border-orange-200" : "border-gray-100"
                    }`}
                  >
                    <div className="flex gap-4 p-5">

                      {/* Checkbox */}
                      <div className="flex items-start pt-1">
                        <div
                          onClick={() => toggleSelect(item.cart_id)}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all shrink-0 ${
                            isSelected
                              ? "border-orange-500"
                              : "border-gray-300 hover:border-orange-300"
                          }`}
                          style={isSelected ? { backgroundColor: "#f04e0f" } : {}}
                        >
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative shrink-0">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-100"
                        />
                      </div>
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-bold text-gray-800 text-base leading-tight truncate">
                              {item.product_name}
                            </h3>
                            {/* <p className="text-xs text-gray-400 mt-0.5">{item.nameEn}</p> */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                                <HiOutlineTag size={10} /> {'item.category'}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                                📦 {item.package_quantity} KG
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                                📍 {' Rajshahi'}
                              </span>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.cart_id)}
                            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          >
                            <HiOutlineTrash size={15} />
                          </button>
                        </div>

                        {/* Price + Qty row */}
                        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                          <div>
                            <span
                              className="text-lg font-bold"
                              style={{ color: "#f04e0f" }}
                            >
                              {fmt(item.package_price * item.package_count)}
                            </span>
                            {item.package_quantity > 1 && (
                              <span className="text-xs text-gray-400 ml-1.5">
                                ({fmt(item.package_price)} × {item.package_count})
                              </span>
                            )}
                          </div>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <QtyButton
                              onClick={() => updateQty(item.cart_id, -1,setCart)}
                              disabled={item.package_count <= 1}
                            >
                              <HiMinus size={12} />
                            </QtyButton>
                            <span className="w-8 text-center text-sm font-bold text-gray-800">
                              {item.package_count}
                            </span>
                            <QtyButton
                              onClick={() => updateQty(item.cart_id, 1,setCart)}
                            >
                              <HiPlus size={12} />
                            </QtyButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Free delivery strip */}
                    {item.free_delivery === "Yes" && (
                      <div
                        className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-green-700 border-t"
                        style={{ background: "#f0fdf4", borderColor: "#dcfce7" }}
                      >
                        <HiOutlineTruck size={13} />
                        Free delivery on this item
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Continue shopping */}
              <Link
                to={'/shop'}
                className="flex items-center gap-2 text-sm font-semibold self-start px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all"
              >
                <HiOutlineArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>

            {/* ── RIGHT — Summary ──────────────────────────────────────── */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-6">

              {/* Promo code */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
                  <HiOutlineGift size={15} style={{ color: "#f04e0f" }} />
                  Promo Code
                </h3>

                {appliedPromo ? (
                  <div
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl border"
                    style={{ background: "#f0fdf4", borderColor: "#86efac" }}
                  >
                    <div className="flex items-center gap-2">
                      <HiOutlineCheckBadge size={16} className="text-green-600" />
                      <span className="text-sm font-bold text-green-700">
                        {appliedPromo.code}
                      </span>
                      <span className="text-xs text-green-600">
                        −{appliedPromo.pct}% applied
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-green-500 hover:text-red-500 transition-colors"
                    >
                      <HiOutlineXMark size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                      placeholder="Enter promo code"
                      className="flex-1 h-10 px-4 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 text-xs font-bold text-white rounded-xl transition-all hover:brightness-110"
                      style={{ backgroundColor: "#f04e0f" }}
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 mt-1.5">{promoError}</p>
                )}
              </div>

              {/* Order summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-4">
                  <HiOutlineShoppingBag size={15} style={{ color: "#f04e0f" }} />
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                    </span>
                    <span className="font-semibold">{fmt(subtotal)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedPromo.pct}%)</span>
                      <span className="font-semibold">−{fmt(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="font-bold text-green-600">Free!</span>
                  </div>

                  {/* Free delivery banner */}
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-green-700 border"
                    style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}
                  >
                    🎉 Delivery is free on this order!
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">Total</span>
                      <span className="text-xl font-bold" style={{ color: "#f04e0f" }}>
                        {fmt(total)}
                      </span>
                    </div>
                    {appliedPromo && (
                      <p className="text-[11px] text-green-600 text-right mt-0.5">
                        You saved {fmt(discount)}!
                      </p>
                    )}
                  </div>
                </div>

                {/* Checkout button */}
                <Link
                  to={'/checkout'}
                  disabled={selected.size === 0}
                  className="mt-5 w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  style={{ backgroundColor: "#f04e0f" }}
                >
                  Proceed to Checkout
                  <HiOutlineArrowRight size={16} />
                </Link>

                {selected.size === 0 && (
                  <p className="text-[11px] text-center text-gray-400 mt-2">
                    Select at least one item to checkout
                  </p>
                )}
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: "🛡️", label: "Secure Payment" },
                  { icon: "🚚", label: "Free Delivery" },
                  { icon: "✅", label: "Fresh Quality" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-semibold text-gray-500">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}