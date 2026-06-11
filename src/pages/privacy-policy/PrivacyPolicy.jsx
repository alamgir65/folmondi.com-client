// ── Data ──────────────────────────────────────────────────────────────────────
const sections = [
  {
    icon: "📋",
    iconBg: "#fff7ed",
    title: "1. Information we collect",
    points: [
      <>
        <strong>Contact details:</strong> name, phone number, email, and delivery address — required
        to process and deliver your order.
      </>,
      <>
        <strong>Payment info:</strong> we do not store full card numbers. Transaction IDs for bKash,
        Nagad, or bank transfers are kept for order verification only.
      </>,
      <>
        <strong>Usage data:</strong> anonymous analytics (page views, product views) to improve the
        shopping experience.
      </>,
    ],
  },
  {
    icon: "⚙️",
    iconBg: "#f0fdf4",
    title: "2. How we use your information",
    points: [
      "To process, deliver, and track your orders.",
      "To communicate with you about your order (SMS, email, WhatsApp).",
      "To prevent fraud and improve our service.",
      "To send marketing updates — only if you opt in.",
    ],
  },
  {
    icon: "🔗",
    iconBg: "#fff7ed",
    title: "3. Information sharing",
    points: [
      <>
        We share your delivery address and phone number <strong>only with our courier partner</strong>{" "}
        (e.g., Steadfast) to fulfil your order.
      </>,
      "We never sell your personal data to third parties.",
    ],
  },
  {
    icon: "✅",
    iconBg: "#f0fdf4",
    title: "4. Your rights",
    points: [
      "You may request deletion of your personal information at any time by contacting us.",
      "We retain order records for tax and legal compliance.",
    ],
  },
  {
    icon: "🍪",
    iconBg: "#fce7f3",
    title: "5. Cookies",
    points: [
      "We use essential cookies to keep your cart working and analytics cookies to understand how visitors use our site.",
      "You can disable non-essential cookies in your browser settings.",
    ],
  },
  {
    icon: "✉️",
    iconBg: "#eff6ff",
    title: "6. Contact",
    points: [
      <>
        For privacy-related questions, contact us via our{" "}
        <a href="/contact-us" className="font-semibold underline" style={{ color: "#f04e0f" }}>
          Contact page
        </a>
        .
      </>,
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionHeader({ icon, iconBg, title }) {
  return (
    <div
      className="flex items-center gap-3 pb-3 mb-4"
      style={{ borderBottom: "0.5px solid #f3f4f6" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
  );
}

function PointList({ points }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "0.5px solid #e5e7eb" }}>
      {points.map((point, i) => (
        <div
          key={i}
          className="flex gap-3 px-4 py-3.5"
          style={{ borderBottom: i < points.length - 1 ? "0.5px solid #f3f4f6" : "none" }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
            style={{ background: "#f04e0f" }}
          />
          <p className="text-sm text-gray-500 leading-relaxed">{point}</p>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* Hero — same orange as Terms page */}
      <div
        className="relative overflow-hidden py-12 px-6"
        style={{ background: "#f04e0f" }}
      >
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-16 -right-12 pointer-events-none" />
        <div className="absolute w-36 h-36 rounded-full bg-white/5 -bottom-10 left-4 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Legal · Privacy</p>
          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-lg">
            This Privacy Policy explains how we collect, use, and protect the information you share
            with us when shopping on our website.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col gap-9">

        {/* Intro notice */}
        <div
          className="text-sm text-gray-600 leading-relaxed rounded-r-xl px-5 py-4"
          style={{ background: "#fff7ed", borderLeft: "3px solid #f04e0f" }}
        >
          By using Pholmondi.com, you agree to the collection and use of information described in
          this policy. We are committed to protecting your privacy and handling your data with care.
        </div>

        {/* Sections */}
        {sections.map(s => (
          <section key={s.title}>
            <SectionHeader icon={s.icon} iconBg={s.iconBg} title={s.title} />
            <PointList points={s.points} />
          </section>
        ))}

        {/* Footer bar */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 rounded-xl text-sm text-gray-400"
          style={{ background: "#f9fafb", border: "0.5px solid #e5e7eb" }}
        >
          <span className="font-black text-sm" style={{ color: "#f04e0f" }}>Pholmondi.com</span>
          <span>Last updated: April 28, 2026</span>
          <span>
            <a href="/contact-us" className="font-semibold text-gray-600 hover:underline">
              Contact us
            </a>
          </span>
        </div>

      </div>
    </div>
  );
}