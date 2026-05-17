const sections = [
  {
    icon: "🛒",
    iconBg: "#fff7ed",
    title: "1. Orders & acceptance",
    points: [
      "All orders are subject to availability and acceptance by us.",
      <>We reserve the right to cancel any order, including for <strong>pricing errors, suspected fraud, or stock issues</strong>. If cancelled, any amount paid will be fully refunded.</>,
      "Prices and offers may change without notice.",
    ],
  },
  {
    icon: "💳",
    iconBg: "#f0fdf4",
    title: "2. Payment",
    points: [
      <>Some orders may require an <strong>advance payment</strong> to confirm — especially for free-delivery or high-value orders.</>,
      <>For online payments, you must provide a <strong>valid Transaction ID</strong>. Orders with invalid TrxIDs will be held until verified.</>,
    ],
  },
  {
    icon: "🚚",
    iconBg: "#eff6ff",
    title: "3. Shipping & delivery",
    points: [
      "Courier fees are shown at checkout and may vary by district.",
      <>We are <strong>not liable</strong> for delays caused by the courier, weather, or public holidays.</>,
    ],
  },
  {
    icon: "↩️",
    iconBg: "#fef9c3",
    title: "4. Returns & refunds",
    points: [
      <><strong>Check your parcel in front of the delivery person.</strong> Report any damage or wrong item immediately at the time of delivery.</>,
      <>Returns are accepted within <strong>3 days</strong> for damaged, defective, or wrong products only.</>,
      <>Products must be <strong>unused, in original packaging</strong>, with the original invoice enclosed.</>,
      <>Refunds are processed within <strong>7 business days</strong> after we receive and verify the returned item.</>,
    ],
  },
  {
    icon: "👤",
    iconBg: "#fce7f3",
    title: "5. Customer responsibilities",
    points: [
      <>Provide an <strong>accurate delivery address</strong> and a reachable phone number at the time of ordering.</>,
      "Be available to receive the parcel, or designate someone who can accept it on your behalf.",
      <>Repeated order cancellations or <strong>refusal at delivery</strong> may result in future orders being held for advance payment.</>,
    ],
  },
  {
    icon: "⚠️",
    iconBg: "#fef2f2",
    title: "6. Liability",
    points: [
      <>Our liability is limited to the <strong>value of the product purchased</strong>. Folmondi is not liable for indirect or consequential losses arising from the use of our products or service.</>,
    ],
  },
  {
    icon: "🔄",
    iconBg: "#f3f4f6",
    title: "7. Changes to these terms",
    points: [
      "We may update these terms from time to time. The date at the bottom of this page shows when they were last updated. Continued use of Folmondi.com after changes constitutes acceptance of the new terms.",
    ],
  },
];

const paymentMethods = ["Cash on Delivery", "bKash", "Nagad", "Bank Transfer"];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style> */}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-12 px-6"
        style={{ background: "#f04e0f" }}
      >
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-16 -right-12 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-xs font-bold text-white/75 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-black text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-xl">
            Please read these terms carefully before placing an order on Folmondi.com.
            By using this website you agree to these terms.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Intro notice */}
        <div
          className="text-sm text-gray-600 leading-relaxed rounded-r-xl px-5 py-4 mb-10"
          style={{ background: "#f9fafb", borderLeft: "3px solid #f04e0f" }}
        >
          By using this website and placing an order, you agree to the following terms.
          If you do not agree, please do not use the service.
        </div>

        {/* ── Sections ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-9">

          {/* Orders */}
          <Section
            icon={sections[0].icon}
            iconBg={sections[0].iconBg}
            title={sections[0].title}
            points={sections[0].points}
          />

          {/* Payment — with method pills */}
          <section>
            <SectionHeader icon={sections[1].icon} iconBg={sections[1].iconBg} title={sections[1].title} />
            <div className="flex flex-wrap gap-2 mb-4">
              {paymentMethods.map(m => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1.5 text-xs font-600 text-gray-500 px-3 py-1.5 rounded-full"
                  style={{ background: "#f3f4f6", border: "0.5px solid #e5e7eb" }}
                >
                  <span style={{ color: "#16a34a" }}>✓</span> {m}
                </span>
              ))}
            </div>
            <PointList points={sections[1].points} />
          </section>

          {/* Shipping — with delivery time cards */}
          <section>
            <SectionHeader icon={sections[2].icon} iconBg={sections[2].iconBg} title={sections[2].title} />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { area: "Inside Dhaka",    time: "1–2 days" },
                { area: "Outside Dhaka",   time: "2–4 days" },
              ].map(d => (
                <div key={d.area} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-700 text-gray-400 uppercase tracking-wide mb-1">{d.area}</p>
                  <p className="text-xl font-black" style={{ color: "#2563eb" }}>{d.time}</p>
                  <p className="text-xs text-gray-400 mt-0.5">working days</p>
                </div>
              ))}
            </div>
            <PointList points={sections[2].points} />
          </section>

          {/* Returns, Customer responsibilities, Liability, Changes */}
          {sections.slice(3).map(s => (
            <Section key={s.title} icon={s.icon} iconBg={s.iconBg} title={s.title} points={s.points} />
          ))}

        </div>

        {/* ── Footer bar ─────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 mt-10 px-5 py-4 rounded-xl text-sm text-gray-400"
          style={{ background: "#f9fafb", border: "0.5px solid #e5e7eb" }}
        >
          <span className="font-black text-sm" style={{ color: "#f04e0f" }}>Folmondi.com</span>
          <span>Last updated: May 2025</span>
          <span>
            Questions?{" "}
            <a href="mailto:fruitkingdomofficial@gmail.com" className="font-600 text-gray-600 hover:underline">
              fruitkingdomofficial@gmail.com
            </a>
          </span>
        </div>

      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

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
    <div
      className="rounded-xl divide-y"
      style={{ border: "0.5px solid #e5e7eb", divideColor: "#f3f4f6" }}
    >
      {points.map((point, i) => (
        <div key={i} className="flex gap-3 px-4 py-3.5">
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

function Section({ icon, iconBg, title, points }) {
  return (
    <section>
      <SectionHeader icon={icon} iconBg={iconBg} title={title} />
      <PointList points={points} />
    </section>
  );
}