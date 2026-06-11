export default function AboutUs() {
  const stats = [
    { num: "50+",  label: "Partner farms"    },
    { num: "10k+", label: "Happy customers"  },
    { num: "20+",  label: "Fruit varieties"  },
    { num: "8",    label: "Divisions covered" },
  ];

  const values = [
    {
      icon: "🌿",
      bg: "#fff7ed",
      title: "Farm-to-home freshness",
      desc: "Every fruit is harvested on order and shipped within 24 hours. No cold-storage stacking, no mid-chain spoilage.",
    },
    {
      icon: "🛡️",
      bg: "#f0fdf4",
      title: "Chemical-free guarantee",
      desc: "We test every batch for harmful chemicals. If it doesn't pass, it doesn't ship — simple as that.",
    },
    {
      icon: "🤝",
      bg: "#eff6ff",
      title: "Farmer-first sourcing",
      desc: "Our farmers earn a fair price, every time. No middlemen, no price squeezing — we grow together.",
    },
    {
      icon: "🚚",
      bg: "#fef9c3",
      title: "Same-day delivery",
      desc: "Same-day delivery across Dhaka and next-day to 64 districts through our trusted courier network.",
    },
  ];

  const steps = [
    {
      title: "You place an order",
      desc: "Choose your fruits, quantity, and delivery date on Pholmondi.com or the app.",
    },
    {
      title: "We notify the farm",
      desc: "Your order triggers a harvest request to the nearest partner farm — picked fresh, not from stock.",
    },
    {
      title: "Quality inspection",
      desc: "Our team checks every batch for ripeness, size, and chemical residue before packing.",
    },
    {
      title: "Packed and dispatched",
      desc: "Fruits are packed in ventilated boxes and handed to our delivery partner within hours.",
    },
    {
      title: "Delivered to your door",
      desc: "You receive a tracking link and the fruits arrive at your address — same day or next morning.",
    },
  ];

  const team = [
    { name: "Rafiq Ahmed",    role: "Founder & CEO",    avatar: "রা", color: "#f04e0f" },
  ];

  const certs = [
    "Chemical-free tested",
    "Secure SSL payments",
    "Easy 24h returns",
    "1000+ satisfied customers",
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-10 px-5"
        style={{ background: "#f04e0f" }}
      >
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-16 -right-12 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">About Pholmondi.com</h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-xl">
            Bangladesh's first dedicated fruit marketplace — bringing farm-fresh produce straight to your doorstep
            with full traceability, zero compromise.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col gap-12">

        {/* ── Our story ─────────────────────────────────────────────────────── */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Our story</p>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Born from a love of real fruit</h2>
          <hr className="border-gray-100 mb-5" />
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
            Folmondi started in 2023 when our founder — tired of buying overripe, chemically treated fruit from
            local markets — decided there had to be a better way. We partnered directly with orchards across
            Rajshahi, Dinajpur, Satkhira and beyond to build the supply chain that Bangladesh's fruit lovers
            deserved. Today we deliver hundreds of kilograms of seasonal fruit every week, all verified, all fresh.
          </p>
        </section>

        {/* ── Values ────────────────────────────────────────────────────────── */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">What we stand for</p>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Our values</h2>
          <hr className="border-gray-100 mb-5" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(v => (
              <div key={v.title} className="border border-gray-100 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: v.bg }}>
                  {v.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">How it works</p>
          <h2 className="text-2xl font-black text-gray-900 mb-1">From orchard to you</h2>
          <hr className="border-gray-100 mb-5" />

          <div className="flex flex-col divide-y divide-gray-100">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-4 py-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 border-2"
                  style={{ background: "#fff7ed", color: "#f04e0f", borderColor: "#fed7aa" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ────────────────────────────────────────────────── */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Certifications & trust</p>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Why customers trust us</h2>
          <hr className="border-gray-100 mb-5" />

          <div className="flex flex-wrap gap-2">
            {certs.map(c => (
              <div
                key={c}
                className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-600 text-gray-600"
              >
                <span style={{ color: "#16a34a", fontSize: 14 }}>✓</span>
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl text-center py-10 px-6"
          style={{ background: "#f04e0f" }}
        >
          <div className="absolute w-52 h-52 rounded-full bg-white/5 -top-14 -right-12 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl font-black text-white mb-2">Ready to taste the difference?</h3>
            <p className="text-white/85 text-sm mb-5">
              Order fresh fruits today and get free delivery on your first order above ৳500.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 bg-white font-black text-sm px-7 py-3 rounded-xl"
              style={{ color: "#f04e0f", textDecoration: "none" }}
            >
              🛒 Shop now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}