import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiMapPin,
  HiEnvelope,
  HiPhone,
  HiCheckCircle,
  HiPaperAirplane,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

const C = {
  orangeHot: "#f04e0f",
  greenDeep: "#16a34a",
  blueTrust: "#1e40af",
  cream:     "#fffbf5",
  sand:      "#fef3e2",
};

const CONTACT_INFO = [
  {
    icon:    <HiMapPin size={20} />,
    label:   "Our Address",
    lines:   ["House 12, Road 5, Block B", "Mirpur-10, Dhaka-1216", "Bangladesh"],
    iconBg:  "#fff0e6",
    iconClr: C.orangeHot,
  },
  {
    icon:    <HiEnvelope size={20} />,
    label:   "Email Us",
    lines:   ["support@folmondi.com", "orders@folmondi.com"],
    iconBg:  "#dbeafe",
    iconClr: C.blueTrust,
  },
  {
    icon:    <HiPhone size={20} />,
    label:   "Call Us",
    lines:   ["+880 1700-000000", "Sat – Thu, 9:00 AM – 9:00 PM"],
    iconBg:  "#dcfce7",
    iconClr: C.greenDeep,
  },
];

const BUSINESS_HOURS = [
  { day: "Saturday – Thursday", time: "9:00 AM – 9:00 PM"  },
  { day: "Friday",              time: "10:00 AM – 5:00 PM" },
];

const SUBJECT_OPTIONS = [
  { value: "order",    label: "Order Inquiry"    },
  { value: "delivery", label: "Delivery Issue"   },
  { value: "quality",  label: "Product Quality"  },
  { value: "payment",  label: "Payment Related"  },
  { value: "other",    label: "Other"            },
];


export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading,   setIsLoading]   = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // TODO: replace with your real API call, e.g. await sendContactForm(data)
    await new Promise((res) => setTimeout(res, 1400));
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <section
      className="min-h-screen py-16 px-4"
      style={{ background: C.cream, fontFamily: "'Nunito', sans-serif" }}
    >
      <style>{`
        .input-brand:focus {
          outline: none;
          border-color: ${C.orangeHot} !important;
          box-shadow: 0 0 0 3px rgba(240,78,15,0.12);
        }
        .whatsapp-btn:hover  { filter: brightness(1.07); transform: translateY(-2px); }
        .submit-btn:not(:disabled):hover { filter: brightness(1.1); transform: translateY(-1px); }
        .info-card:hover .info-icon { transform: scale(1.12); }
        .info-icon { transition: transform 0.2s ease; }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold px-4 py-1.5 rounded-full border bg-(--sand) text-(--orange-hot) border-(--orange-hot) mb-4 tracking-widest uppercase"          >
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-3 leading-tight">
            Let's Talk
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Have a question about your order, delivery, or our products? We're
            here for you every step of the way.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ════ LEFT: Info panel (2/5) ════ */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Info cards */}
            {CONTACT_INFO.map(({ icon, label, lines, iconBg, iconClr }, i) => (
              <div
                key={i}
                className="info-card bg-white rounded-2xl border border-orange-50 shadow-sm px-5 py-5 flex items-start gap-4 transition-shadow hover:shadow-md"
              >
                <div
                  className="info-icon w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: iconBg, color: iconClr }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    {label}
                  </p>
                  {lines.map((line, j) => (
                    <p key={j} className="text-sm text-gray-700 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp button */}
            <a
              href="https://wa.me/8801860384930"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn flex items-center justify-center gap-3 rounded-2xl py-4 px-6 text-white font-bold text-base shadow-md transition-all"
              style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.30)" }}
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp
            </a>

            {/* Business hours */}
            <div
              className="rounded-2xl px-5 py-4 border"
              style={{ background: C.sand, borderColor: "#fbd5bb" }}
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Business Hours
              </p>
              {BUSINESS_HOURS.map(({ day, time }, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2.5 text-sm"
                  style={{
                    borderBottom: i < BUSINESS_HOURS.length - 1
                      ? "1px solid #f0ede8"
                      : "none",
                  }}
                >
                  <span className="text-gray-600 font-medium">{day}</span>
                  <span className="font-bold text-(--orange-hot)">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT: Form (3/5) ════ */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-orange-50 shadow-sm rounded-2xl p-7 sm:p-9 h-full">

              {isSubmitted ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center text-center h-full gap-5 py-16">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "#dcfce7" }}
                  >
                    <HiCheckCircle size={44} style={{ color: C.greenDeep }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                      Thanks for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm font-bold px-6 py-2.5 rounded-full border-2 transition-all hover:scale-105 text-(--orange-hot) border-(--orange-hot)"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <div className="mb-7">
                    <h3 className="text-2xl font-black text-gray-800 mb-1">
                      Send a Message
                    </h3>
                    <p className="text-sm text-gray-400">
                      Fill out the form and we'll respond shortly.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Row 1 — Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name" required error={errors.name}>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          className="input input-bordered input-brand w-full text-sm rounded-xl bg-white h-11"
                          style={{ borderColor: errors.name ? "#f87171" : "#e5e7eb" }}
                          {...register("name", {
                            required: "Full name is required",
                            minLength: {
                              value:   2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                        />
                      </Field>

                      <Field label="Email Address" required error={errors.email}>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="input input-bordered input-brand w-full text-sm rounded-xl bg-white h-11"
                          style={{ borderColor: errors.email ? "#f87171" : "#e5e7eb" }}
                          {...register("email", {
                            required: "Email address is required",
                            pattern: {
                              value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email address",
                            },
                          })}
                        />
                      </Field>
                    </div>

                    {/* Row 2 — Phone + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Phone Number" error={errors.phone}>
                        <input
                          type="tel"
                          placeholder="+880 1XXX-XXXXXX"
                          className="input input-bordered input-brand w-full text-sm rounded-xl bg-white h-11"
                          style={{ borderColor: errors.phone ? "#f87171" : "#e5e7eb" }}
                          {...register("phone", {
                            pattern: {
                              value:   /^[+\d\s\-()]{7,20}$/,
                              message: "Enter a valid phone number",
                            },
                          })}
                        />
                      </Field>

                      <Field label="Subject" error={errors.subject}>
                        <select
                          className="select select-bordered input-brand w-full text-sm rounded-xl bg-white"
                          style={{
                            borderColor: errors.subject ? "#f87171" : "#e5e7eb",
                            height: "44px",
                          }}
                          {...register("subject")}
                        >
                          <option value="">Select a subject</option>
                          {SUBJECT_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Row 3 — Message */}
                    <Field label="Message" required error={errors.message}>
                      <textarea
                        rows={5}
                        placeholder="Write your message here..."
                        className="textarea textarea-bordered input-brand w-full text-sm rounded-xl bg-white resize-none leading-relaxed"
                        style={{ borderColor: errors.message ? "#f87171" : "#e5e7eb" }}
                        {...register("message", {
                          required:  "Message is required",
                          minLength: {
                            value:   10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                      />
                    </Field>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="submit-btn bg-(--orange-hot) w-full py-3.5 rounded-full text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        boxShadow:  "0 4px 18px rgba(240,78,15,0.28)",
                      }}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : (
                        <>
                          <HiPaperAirplane size={18} className="-rotate-45" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────
function Field({ label, required = false, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {label}
        {required && (
          <span className="ml-0.5 text-(--orange-hot)">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error.message}
        </p>
      )}
    </div>
  );
}