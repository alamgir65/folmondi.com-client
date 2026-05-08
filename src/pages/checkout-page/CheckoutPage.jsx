import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClipboardDocumentList,
  HiOutlineTruck,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineTag,
  HiMinus,
  HiPlus,
  HiXMark,
  HiOutlineShoppingBag,
  HiOutlineGift,
} from "react-icons/hi2";

// ── Mock cart data ────────────────────────────────────────────────────────────
const INITIAL_CART = [
  {
    id: 1,
    name: "হিমসাগর আম",
    badge: "Free Delivery",
    weight: "12 KG",
    note: "ডেলিভারির আনুমানিক সময় ১৭ থেকে ইনশাআল্লাহ",
    price: 1800,
    qty: 2,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg",
  },
  {
    id: 2,
    name: "গোবিন্দভোগ আম",
    badge: "Free Delivery",
    weight: "12 KG",
    note: "ডেলিভারির আনুমানিক সময় ১০ থেকে ইনশাআল্লাহ",
    price: 1680,
    qty: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg",
  },
];

const DISTRICTS = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna",
  "Barishal", "Sylhet", "Rangpur", "Mymensingh",
];

const UPAZILAS = {
  Dhaka: ["Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Motijheel"],
  Chattogram: ["Kotwali", "Pahartali", "Bayazid", "Panchlaish"],
  Rajshahi: ["Boalia", "Motihar", "Shah Makhdum", "Rajpara"],
  Khulna: ["Daulatpur", "Khalishpur", "Khan Jahan Ali", "Sonadanga"],
  Barishal: ["Kotwali", "Banaripara", "Bakerganj", "Babuganj"],
  Sylhet: ["Kotwali", "Balaganj", "Beanibazar", "Bishwanath"],
  Rangpur: ["Kotwali", "Badarganj", "Gangachara", "Kaunia"],
  Mymensingh: ["Kotwali", "Bhaluka", "Dhobaura", "Fulbaria"],
};

const DELIVERY_OPTIONS = [
  {
    id: "point",
    label: "Point Delivery",
    price: 0,
    sub: "নিকটস্থ স্টেডফাস্ট (Steadfast) পয়েন্ট থেকে সংগ্রহ করুন",
  },
  {
    id: "home",
    label: "Home Delivery",
    price: 0,
    sub: "উপজেলা পর্যায়ে ৫ কি.মি এর মধ্যে হোম ডেলিভারি হবে।",
  },
];

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "bkash", label: "bKash", icon: "📱" },
];

// ── Step indicator ────────────────────────────────────────────────────────────
function StepBadge({ number, label, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
          done
            ? "bg-green-500 text-white"
            : active
            ? "text-white"
            : "bg-gray-100 text-gray-400"
        }`}
        style={active && !done ? { backgroundColor: "#f04e0f" } : {}}
      >
        {done ? <HiOutlineCheckCircle size={15} /> : number}
      </div>
      <span
        className={`text-sm font-bold ${
          active || done ? "text-gray-800" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function Section({ step, label, icon, children, done }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: done ? "#22c55e" : "#f04e0f" }}
        >
          {done ? <HiOutlineCheckCircle size={14} /> : step}
        </div>
        <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
          {icon} {label}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ── Input wrapper ─────────────────────────────────────────────────────────────
function FormField({ label, required, error, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600">
        {label}
        {required && <span style={{ color: "#f04e0f" }}> *</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-gray-400">{hint}</p>}
      {error && <p className="text-[11px] text-red-500">{error.message}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full h-11 px-4 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
    err
      ? "border-red-400 focus:border-red-400"
      : "border-gray-200 focus:border-orange-400"
  }`;

// ═════════════════════════════════════════════════════════════════════════════
export default function CheckoutPage() {
  const [cart, setCart] = useState(INITIAL_CART);
  const [delivery, setDelivery] = useState("point");
  const [payment, setPayment] = useState("cod");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const watchedDistrict = watch("district");

  useEffect(() => {
    setSelectedDistrict(watchedDistrict || "");
  }, [watchedDistrict]);

  // ── Cart helpers ────────────────────────────────────────────────────────
  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryCost = 0;
  const total = subtotal + deliveryCost;

  const fmt = (n) => `৳${n.toLocaleString()}`;

  // ── Submit ──────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    console.log({ ...data, cart, delivery, payment, total });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // ── Success screen ──────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center flex flex-col items-center gap-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "#fff7ed" }}
          >
            <HiOutlineCheckCircle size={46} style={{ color: "#f04e0f" }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Order Placed!</h2>
            <p className="text-sm text-gray-400">
              আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।
            </p>
          </div>
          <div
            className="w-full rounded-2xl px-5 py-4 text-left text-sm"
            style={{ background: "#fff7ed" }}
          >
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Items</span>
              <span className="font-semibold">{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Delivery</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 mt-2 pt-2 border-t border-orange-100">
              <span>Total Paid</span>
              <span style={{ color: "#f04e0f" }}>{fmt(total)}</span>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:brightness-110"
            style={{ backgroundColor: "#f04e0f" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Main layout ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page title */}
        <div className="mb-7 flex items-center gap-3">
          <HiOutlineShoppingBag size={26} style={{ color: "#f04e0f" }} />
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* 1. Delivery Information */}
              <Section step={1} label="Delivery Information" icon={<HiOutlineTruck size={15} />}>
                <div className="grid grid-cols-1 gap-5">

                  {/* Full Name */}
                  <FormField label="Full Name" required error={errors.name}>
                    <div className="relative">
                      <HiOutlineUser
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Your full name"
                        className={`${inputCls(errors.name)} pl-9`}
                        {...register("name", { required: "Name is required" })}
                      />
                    </div>
                  </FormField>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Phone Number" required error={errors.phone}>
                      <div className="relative">
                        <HiOutlinePhone
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          className={`${inputCls(errors.phone)} pl-9`}
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^01[3-9]\d{8}$/,
                              message: "Enter a valid BD number",
                            },
                          })}
                        />
                      </div>
                    </FormField>

                    <FormField label="Email (optional)" error={errors.email}>
                      <div className="relative">
                        <HiOutlineEnvelope
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className={`${inputCls(errors.email)} pl-9`}
                          {...register("email", {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </div>
                    </FormField>
                  </div>

                  {/* Address */}
                  <FormField
                    label="Delivery Address"
                    required
                    error={errors.address}
                    hint="House / Road / Area — be specific"
                  >
                    <div className="relative">
                      <HiOutlineMapPin
                        size={15}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <textarea
                        rows={3}
                        placeholder="House / Road / Area — be specific"
                        className={`w-full px-4 pl-9 py-3 text-sm rounded-xl border bg-white focus:outline-none resize-none transition-colors ${
                          errors.address
                            ? "border-red-400"
                            : "border-gray-200 focus:border-orange-400"
                        }`}
                        {...register("address", { required: "Address is required", minLength: { value: 10, message: "Please be more specific" } })}
                      />
                    </div>
                  </FormField>

                  {/* District + Upazila */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="District" required error={errors.district}>
                      <select
                        className={`${inputCls(errors.district)} appearance-none cursor-pointer`}
                        {...register("district", { required: "Select a district" })}
                      >
                        <option value="">Select district</option>
                        {DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Thana / Upazila" required error={errors.upazila}>
                      <select
                        className={`${inputCls(errors.upazila)} appearance-none cursor-pointer`}
                        disabled={!selectedDistrict}
                        {...register("upazila", { required: "Select an upazila" })}
                      >
                        <option value="">
                          {selectedDistrict ? "Pick upazila" : "Pick district first"}
                        </option>
                        {(UPAZILAS[selectedDistrict] || []).map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  {/* Order Note */}
                  <FormField label="Order Note" error={errors.note}>
                    <div className="relative">
                      <HiOutlineClipboardDocumentList
                        size={15}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Special instructions (optional)"
                        className={`${inputCls(errors.note)} pl-9`}
                        {...register("note")}
                      />
                    </div>
                  </FormField>
                </div>
              </Section>

              {/* 2. Delivery Option */}
              <Section step={2} label="Delivery Option" icon={<HiOutlineTruck size={15} />}>
                <div className="flex flex-col gap-3">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        delivery === opt.id
                          ? "border-orange-400 bg-orange-50/60"
                          : "border-gray-200 hover:border-orange-200"
                      }`}
                    >
                      {/* Custom radio */}
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          delivery === opt.id ? "border-orange-500" : "border-gray-300"
                        }`}
                      >
                        {delivery === opt.id && (
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: "#f04e0f" }}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {opt.label}
                          <span
                            className="ml-2 text-xs font-bold"
                            style={{ color: "#f04e0f" }}
                          >
                            {opt.price === 0 ? "— ৳0" : `— ৳${opt.price}`}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Section>

              {/* 3. Payment Method */}
              <Section step={3} label="Payment Method" icon={<HiOutlineCreditCard size={15} />}>
                <div className="flex flex-wrap gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <label
                      key={pm.id}
                      onClick={() => setPayment(pm.id)}
                      className={`flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all min-w-[110px] ${
                        payment === pm.id
                          ? "border-orange-400 bg-orange-50/60"
                          : "border-gray-200 hover:border-orange-200"
                      }`}
                    >
                      <span className="text-2xl">{pm.icon}</span>
                      <span className="text-xs font-bold text-gray-700">{pm.label}</span>
                    </label>
                  ))}
                </div>
              </Section>
            </div>

            {/* ── RIGHT COLUMN — Order Summary ──────────────────────────── */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
                  <HiOutlineShoppingBag size={16} style={{ color: "#f04e0f" }} />
                  <h2 className="text-sm font-bold text-gray-700">Order Summary</h2>
                </div>

                {/* Cart items */}
                <div className="flex flex-col divide-y divide-gray-50 px-5">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold text-gray-800 leading-tight">{item.name}</p>
                            {item.badge && (
                              <span
                                className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 text-white"
                                style={{ backgroundColor: "#22c55e" }}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          >
                            <HiXMark size={12} />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.weight}</p>
                        <p className="text-[11px] text-gray-400 leading-tight">{item.note}</p>

                        {/* Price + Qty controls */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold" style={{ color: "#f04e0f" }}>
                            {fmt(item.price * item.qty)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 rounded-lg border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition-colors text-gray-500"
                            >
                              <HiMinus size={11} />
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-gray-700">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 rounded-lg border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition-colors text-gray-500"
                            >
                              <HiPlus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-5 pb-5">
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {delivery === "point" ? "Point Delivery" : "Home Delivery"}
                      </span>
                      <span className="font-bold text-green-600">Free!</span>
                    </div>

                    {/* Free delivery banner */}
                    <div className="rounded-xl bg-green-50 border border-green-100 text-green-700 text-xs font-semibold text-center py-2 mt-1">
                      🎉 Delivery is free on this order.
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100">
                      <span className="text-base font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold" style={{ color: "#f04e0f" }}>
                        {fmt(total)}
                      </span>
                    </div>
                  </div>

                  {/* Confirm button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="mt-4 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#f04e0f" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-xs" />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        <HiOutlineCheckCircle size={17} />
                        Confirm Order — {fmt(total)}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-white rounded-xl border border-gray-100 px-4 py-3">
                <HiOutlineGift size={14} style={{ color: "#f04e0f" }} />
                <span>100% fresh & guaranteed delivery</span>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}