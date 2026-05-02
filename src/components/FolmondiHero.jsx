import { useState, useEffect } from "react";
import "./FolmondiHero.css";

const FloatingFruit = ({ emoji, style, delay }) => (
  <div
    className="absolute text-5xl select-none pointer-events-none"
    style={{
      ...style,
      animation: `floatBob 4s ease-in-out ${delay}s infinite`,
      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
    }}
  >
    {emoji}
  </div>
);

const Badge = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
    style={{
      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      border: "1.5px solid #fb923c",
      color: "#c2410c",
      boxShadow: "0 2px 12px rgba(251,146,60,0.2)",
    }}>
    {children}
  </div>
);

export default function FolmondiHero() {
//   const [lang, setLang] = useState("en");
  const lang = "bn";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copy = {
    en: {
      badge: "🌿 Farm to Your Doorstep",
      headline1: "Bangladesh's Freshest",
      headline2: "Fruits, Delivered",
      headline3: "Safe & Trusted",
      sub: "From sun-ripened mangoes to crisp apples — we bring the orchard straight to your home. Every fruit handpicked, quality checked, delivered fresh.",
      cta1: "Shop Now",
      cta2: "Explore Fruits",
      trust1: "100% Fresh",
      trust2: "Safe Delivery",
      trust3: "Farm Direct",
      langToggle: "বাংলা",
    },
    bn: {
      badge: "🌿 বাগান থেকে আপনার দরজায়",
      headline1: "দেশের সবচেয়ে তাজা",
      headline2: "ফলমূল, পৌঁছে যায়",
      headline3: "নিরাপদ ও বিশ্বস্ত",
      sub: "পাকা আম থেকে তাজা আপেল — আমরা বাগান সরাসরি আপনার ঘরে নিয়ে আসি। প্রতিটি ফল বাছাই করা, মান যাচাই করা, তাজা পরিবেশন করা।",
      cta1: "এখনই কিনুন",
      cta2: "ফলমূল দেখুন",
      trust1: "১০০% তাজা",
      trust2: "নিরাপদ ডেলিভারি",
      trust3: "বাগান থেকে সরাসরি",
      langToggle: "English",
    },
  };

  const t = copy[lang];

  const fruits = [
    { emoji: "🥭", style: { top: "8%", right: "18%", fontSize: "4rem" }, delay: 0 },
    { emoji: "🍎", style: { top: "30%", right: "6%", fontSize: "3rem" }, delay: 0.8 },
    { emoji: "🍊", style: { bottom: "20%", right: "20%", fontSize: "3.5rem" }, delay: 1.4 },
    { emoji: "🍍", style: { top: "55%", right: "42%", fontSize: "3rem" }, delay: 0.5 },
    { emoji: "🍋", style: { bottom: "28%", right: "8%", fontSize: "2.5rem" }, delay: 2 },
    { emoji: "🍇", style: { top: "15%", right: "38%", fontSize: "2.5rem" }, delay: 1.8 },
  ];

  return (
    <>
      <div className="hero-root">
        {/* Background mesh blobs */}
        <div className="mesh-blob" style={{ width: 500, height: 500, background: "rgba(251,146,60,0.12)", top: -100, right: -100 }} />
        <div className="mesh-blob" style={{ width: 400, height: 400, background: "rgba(34,197,94,0.10)", bottom: -50, left: -80 }} />
        <div className="mesh-blob" style={{ width: 300, height: 300, background: "rgba(37,99,235,0.07)", top: "40%", left: "30%" }} />

        {/* Subtle dot grid pattern */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.4,
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* Hero Body */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 32px 60px", position: "relative", zIndex: 5 }}>
          <div className="hero-split" style={{ display: "flex", alignItems: "center", gap: 32, minHeight: "78vh" }}>

            {/* Left: Text Column */}
            <div className="hero-text-col" style={{ flex: "0 0 52%", paddingRight: 16 }}>
              <div className="reveal-1">
                <Badge>
                  <span className="pulse-dot" />
                  {t.badge}
                </Badge>
              </div>

              <div className="reveal-2" style={{ marginTop: 24 }}>
                <h1 className="headline-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", margin: 0 }}>
                  <span style={{ color: "#1f2937" }}>{t.headline1}</span>
                  <br />
                  <span className="gradient-text">{t.headline2}</span>
                  <br />
                  <span className="green-gradient-text">{t.headline3}</span>
                </h1>
              </div>

              <div className="reveal-3" style={{ marginTop: 20 }}>
                <p style={{ fontSize: "1.05rem", color: "#6b7280", lineHeight: 1.75, maxWidth: 500, margin: 0 }}>
                  {t.sub}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="reveal-4" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="btn-primary w-full sm:w-auto">
                  {t.cta1} →
                </button>
                <button className="btn-secondary w-full sm:w-auto">
                  {t.cta2}
                </button>
              </div>

              {/* Trust chips */}
              <div className="reveal-5 mt-9 hidden sm:flex gap-3 flex-wrap" >
                <div className="trust-chip">
                  <span style={{ fontSize: "1.1rem" }}>✅</span>
                  {t.trust1}
                </div>
                <div className="trust-chip">
                  <span style={{ fontSize: "1.1rem" }}>🛡️</span>
                  {t.trust2}
                </div>
                <div className="trust-chip">
                  <span style={{ fontSize: "1.1rem" }}>🌿</span>
                  {t.trust3}
                </div>
              </div>

              {/* Stats */}
              <div className="reveal-5 mt-9 flex gap-8">
                {[
                  { num: "10K+", label: "সুখী গ্রাহক" },
                  { num: "50+", label: "ফলের ধরন" },
                  { num: "24h", label: "তাজা ডেলিভারি" },
                ].map(s => (
                  <div key={s.num}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f04e0f", fontFamily: "'Playfair Display', serif" }}>
                      {s.num}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Column */}
            <div className="fruit-float-zone" style={{ flex: 1, position: "relative", minHeight: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Big decorative circle */}
              <div style={{
                position: "absolute",
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fef9c3 100%)",
                border: "2px solid rgba(251,146,60,0.2)",
                boxShadow: "0 20px 80px rgba(249,115,22,0.15)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }} />

              {/* Rotating ring */}
              <div style={{
                position: "absolute",
                width: 450,
                height: 450,
                borderRadius: "50%",
                border: "1.5px dashed rgba(251,146,60,0.3)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                animation: "spin-slow 20s linear infinite",
              }} />

              {/* Fruit emojis floating */}
              {fruits.map((f, i) => (
                <FloatingFruit key={i} emoji={f.emoji} style={f.style} delay={f.delay} />
              ))}

              {/* Center: Mango card */}
              <div style={{
                position: "relative",
                zIndex: 5,
                animation: "scaleIn 0.8s ease 0.6s both",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "9rem", lineHeight: 1, filter: "drop-shadow(0 16px 32px rgba(249,115,22,0.3))" }}>
                  🥭
                </div>
                <div style={{
                  marginTop: 1,
                  background: "white",
                  borderRadius: 16,
                  padding: "12px 24px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  display: "inline-block",
                }}>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500 }}>
                    {"আজকের বিশেষ"}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1f2937", fontFamily: "'Playfair Display', serif" }}>
                    {"রাজশাহীর আম"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginTop: 4 }}>
                    <span style={{ fontSize: "0.8rem", color: "#f04e0f", fontWeight: 700 }}>৳ 180/kg</span>
                    <span style={{ fontSize: "0.72rem", color: "#9ca3af", textDecoration: "line-through" }}>৳ 250</span>
                    <span style={{
                      background: "#dcfce7", color: "#16a34a",
                      fontSize: "0.7rem", fontWeight: 700,
                      borderRadius: 20, padding: "2px 8px",
                    }}>28% OFF</span>
                  </div>
                </div>
              </div>

              {/* Mini fruit cards on edges */}
              {[
                { emoji: "🍎", name: "আপেল", price: "৳ 320/kg", top: "8%", left: "0%" },
                { emoji: "🍊", name: "কমলা", price: "৳ 150/kg", bottom: "8%", left: "2%" },
                { emoji: "🍍", name: "আনারস", price: "৳ 80/pc", top: "8%", right: "0%" },
              ].map((card, i) => (
                <div key={i} className="fruit-card" style={{
                  position: "absolute",
                  width: 100,
                  ...{ top: card.top, bottom: card.bottom, left: card.left, right: card.right },
                  animation: `scaleIn 0.6s ease ${0.8 + i * 0.15}s both`,
                  zIndex: 6,
                }}>
                  <div style={{ fontSize: "2rem" }}>{card.emoji}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#374151", marginTop: 4 }}>{card.name}</div>
                  <div style={{ fontSize: "0.65rem", color: "#f04e0f", fontWeight: 600 }}>{card.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        {/* <div style={{
          background: "linear-gradient(90deg, #f04e0f 0%, #f97316 50%, #eab308 100%)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          position: "relative",
          zIndex: 5,
          flexWrap: "wrap",
        }}>
          {[
            { icon: "🚚", text: "৳৫০০ এর উপরে ফ্রি ডেলিভারি" },
            { icon: "🌿", text: "১০০% প্রাকৃতিক" },
            { icon: "📦", text: "ঢাকায় একই দিনে ডেলিভারি" },
            { icon: "🔄", text: "সহজ রিটার্ন" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "white", fontSize: "0.85rem", fontWeight: 500 }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div> */}

        <div className="marquee-container">
            <div className="marquee-track">
                {[
                { icon: "🚚", text: "৳৫০০ এর উপরে ফ্রি ডেলিভারি" },
                { icon: "🌿", text: "১০০% প্রাকৃতিক" },
                { icon: "📦", text: "ঢাকায় একই দিনে ডেলিভারি" },
                { icon: "🔄", text: "সহজ রিটার্ন" },
                ]
                .concat([
                    { icon: "🚚", text: "৳৫০০ এর উপরে ফ্রি ডেলিভারি" },
                    { icon: "🌿", text: "১০০% প্রাকৃতিক" },
                    { icon: "📦", text: "ঢাকায় একই দিনে ডেলিভারি" },
                    { icon: "🔄", text: "সহজ রিটার্ন" },
                ]) // duplicate for smooth loop
                .map((item, i) => (
                    <div className="marquee-item" key={i}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                    </div>
                ))}
            </div>
            </div>
        </div>
    </>
  );
}