import { useState, useEffect } from "react";
import "./FolmondiHero.css";
import Marque from "./marque/Marque";

const FloatingFruit = ({ emoji, style, delay }) => (
  <div
    className="absolute select-none pointer-events-none"
    style={{
      ...style,
      animation: `floatBob 4s ease-in-out ${delay}s infinite`,
      filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.13))",
    }}
  >
    {emoji}
  </div>
);

const Badge = ({ children }) => (
  <div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
    style={{
      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      border: "1.5px solid #fb923c",
      color: "#c2410c",
      boxShadow: "0 2px 12px rgba(251,146,60,0.2)",
    }}
  >
    {children}
  </div>
);

export default function FolmondiHero() {
  const lang = "bn";
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const copy = {
    bn: {
      badge: "🌿 বাগান থেকে আপনার দরজায়",
      headline1: "দেশের সবচেয়ে তাজা",
      headline2: "ফলমূল, পৌঁছে যায়",
      headline3: "নিরাপদে ও বিশ্বস্তে",
      sub: "পাকা আম থেকে তাজা আপেল — আমরা বাগান সরাসরি আপনার ঘরে নিয়ে আসি। প্রতিটি ফল বাছাই করা, তাজা পরিবেশন করা।",
      cta1: "এখনই কিনুন",
      cta2: "ফলমূল দেখুন",
      trust1: "১০০% তাজা",
      trust2: "নিরাপদ ডেলিভারি",
      trust3: "বাগান থেকে সরাসরি",
    },
  };

  const t = copy[lang];

  // Mobile: fewer, smaller, tightly positioned fruits
  const desktopFruits = [
    { emoji: "🥭", style: { top: "8%",    right: "18%", fontSize: "4rem"   }, delay: 0   },
    { emoji: "🍎", style: { top: "30%",   right: "6%",  fontSize: "3rem"   }, delay: 0.8 },
    { emoji: "🍊", style: { bottom: "20%",right: "20%", fontSize: "3.5rem" }, delay: 1.4 },
    { emoji: "🍍", style: { top: "55%",   right: "42%", fontSize: "3rem"   }, delay: 0.5 },
    { emoji: "🍋", style: { bottom: "28%",right: "8%",  fontSize: "2.5rem" }, delay: 2   },
    { emoji: "🍇", style: { top: "15%",   right: "38%", fontSize: "2.5rem" }, delay: 1.8 },
  ];

  const mobileFruits = [
    { emoji: "🥭", style: { top: "4%",    left: "4%",   fontSize: "2.2rem" }, delay: 0   },
    { emoji: "🍎", style: { top: "4%",    right: "4%",  fontSize: "2rem"   }, delay: 0.6 },
    { emoji: "🍍", style: { bottom: "4%", left: "4%",   fontSize: "2rem"   }, delay: 1.2 },
    { emoji: "🍊", style: { bottom: "4%", right: "4%",  fontSize: "2rem"   }, delay: 1.8 },
  ];

  return (
    <>
      <div className="hero-root">
        <Marque />

        {/* Background mesh blobs */}
        <div className="mesh-blob" style={{ width: 500, height: 500, background: "rgba(251,146,60,0.12)", top: -100, right: -100 }} />
        <div className="mesh-blob" style={{ width: 400, height: 400, background: "rgba(34,197,94,0.10)", bottom: -50, left: -80 }} />

        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.4,
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* ════════════════════════════════════════════════════════════
            DESKTOP LAYOUT  (md and up)
        ════════════════════════════════════════════════════════════ */}
        <div className="hidden md:block max-w-7xl mx-auto px-10 py-10">
          <div style={{ display: "flex", alignItems: "center", gap: 32, minHeight: "78vh" }}>

            {/* Left text */}
            <div style={{ flex: "0 0 52%", paddingRight: 16 }}>
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

              <div className="reveal-4" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="#products" className="btn-primary">{t.cta1} →</a>
                <button className="btn-secondary">{t.cta2}</button>
              </div>

              <div className="reveal-5" style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { icon: "✅", text: t.trust1 },
                  { icon: "🛡️", text: t.trust2 },
                  { icon: "🌿", text: t.trust3 },
                ].map(chip => (
                  <div key={chip.text} className="trust-chip">
                    <span style={{ fontSize: "1.1rem" }}>{chip.icon}</span>
                    {chip.text}
                  </div>
                ))}
              </div>

              <div className="reveal-5" style={{ marginTop: 36, display: "flex", gap: 32 }}>
                {[
                  { num: "10K+", label: "সুখী গ্রাহক" },
                  { num: "50+",  label: "ফলের ধরন"   },
                  { num: "24h",  label: "তাজা ডেলিভারি" },
                ].map(s => (
                  <div key={s.num}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f04e0f", fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                    <div style={{ fontSize: "0.8rem", color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual */}
            <div style={{ flex: 1, position: "relative", minHeight: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fef9c3 100%)", border: "2px solid rgba(251,146,60,0.2)", boxShadow: "0 20px 80px rgba(249,115,22,0.15)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
              <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", border: "1.5px dashed rgba(251,146,60,0.3)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", animation: "spin-slow 20s linear infinite" }} />

              {desktopFruits.map((f, i) => (
                <FloatingFruit key={i} emoji={f.emoji} style={f.style} delay={f.delay} />
              ))}

              <div style={{ position: "relative", zIndex: 5, animation: "scaleIn 0.8s ease 0.6s both", textAlign: "center" }}>
                <div style={{ fontSize: "9rem", lineHeight: 1, filter: "drop-shadow(0 16px 32px rgba(249,115,22,0.3))" }}>🥭</div>
                <div style={{ marginTop: 1, background: "white", borderRadius: 16, padding: "12px 24px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", display: "inline-block" }}>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500 }}>আজকের বিশেষ</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1f2937", fontFamily: "'Playfair Display', serif" }}>রাজশাহীর আম</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginTop: 4 }}>
                    <span style={{ fontSize: "0.8rem", color: "#f04e0f", fontWeight: 700 }}>৳ 180/kg</span>
                    <span style={{ fontSize: "0.72rem", color: "#9ca3af", textDecoration: "line-through" }}>৳ 250</span>
                    <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.7rem", fontWeight: 700, borderRadius: 20, padding: "2px 8px" }}>28% OFF</span>
                  </div>
                </div>
              </div>

              {[
                { emoji: "🍎", name: "আপেল", top: "8%",   left: "0%"  },
                { emoji: "🍊", name: "কমলা", bottom: "8%", left: "2%"  },
                { emoji: "🍍", name: "আনারস", top: "8%",   right: "0%" },
              ].map((card, i) => (
                <div key={i} className="fruit-card" style={{ position: "absolute", width: 100, ...{ top: card.top, bottom: card.bottom, left: card.left, right: card.right }, animation: `scaleIn 0.6s ease ${0.8 + i * 0.15}s both`, zIndex: 6 }}>
                  <div style={{ fontSize: "2rem" }}>{card.emoji}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#374151", marginTop: 4 }}>{card.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            MOBILE LAYOUT  (below md) — completely redesigned
        ════════════════════════════════════════════════════════════ */}
        <div className="md:hidden px-5 pt-6 pb-10 flex flex-col items-center text-center gap-6">

          {/* Badge */}
          <div className="reveal-1">
            <Badge>
              <span className="pulse-dot" />
              {t.badge}
            </Badge>
          </div>

          {/* Headline */}
          <div className="reveal-2">
            <h1 style={{ fontSize: "1.9rem", fontWeight: 800, lineHeight: 1.25, margin: 0 }}>
              <span style={{ color: "#1f2937" }}>{t.headline1}</span>
              <br />
              <span className="gradient-text">{t.headline2}</span>
              <br />
              <span className="green-gradient-text">{t.headline3}</span>
            </h1>
          </div>

          {/* ── Compact visual zone ── */}
          <div
            className="reveal-3 relative flex items-center justify-center"
            style={{ width: "100%", maxWidth: 320, height: 280 }}
          >
            {/* Background circle — contained */}
            <div style={{
              position: "absolute",
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 65%, #fef9c3 100%)",
              border: "2px solid rgba(251,146,60,0.2)",
              boxShadow: "0 12px 50px rgba(249,115,22,0.18)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }} />

            {/* Dashed rotating ring */}
            <div style={{
              position: "absolute",
              width: 264,
              height: 264,
              borderRadius: "50%",
              border: "1.5px dashed rgba(251,146,60,0.35)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "spin-slow 20s linear infinite",
            }} />

            {/* Corner fruit emojis — inside the 320px box, no overflow */}
            {mobileFruits.map((f, i) => (
              <FloatingFruit key={i} emoji={f.emoji} style={f.style} delay={f.delay} />
            ))}

            {/* Centre mango + card */}
            <div style={{ position: "relative", zIndex: 5, textAlign: "center", animation: "scaleIn 0.7s ease 0.4s both" }}>
              <div style={{ fontSize: "5.5rem", lineHeight: 1, filter: "drop-shadow(0 10px 20px rgba(249,115,22,0.3))" }}>
                🥭
              </div>
              <div style={{
                marginTop: 6,
                background: "white",
                borderRadius: 14,
                padding: "8px 16px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
                display: "inline-block",
              }}>
                <div style={{ fontSize: "0.65rem", color: "#9ca3af", fontWeight: 500 }}>আজকের বিশেষ</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1f2937", fontFamily: "'Playfair Display', serif" }}>রাজশাহীর আম</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center", marginTop: 3 }}>
                  <span style={{ fontSize: "0.75rem", color: "#f04e0f", fontWeight: 700 }}>৳ 180/kg</span>
                  <span style={{ fontSize: "0.68rem", color: "#9ca3af", textDecoration: "line-through" }}>৳ 250</span>
                  <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.65rem", fontWeight: 700, borderRadius: 20, padding: "2px 7px" }}>28% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Fruit chips row (replaces absolute-positioned cards) ── */}
          <div className="reveal-4 flex gap-2.5 justify-center flex-wrap">
            {[
              { emoji: "🍎", name: "আপেল",  price: "৳320/kg" },
              { emoji: "🍊", name: "কমলা",  price: "৳150/kg" },
              { emoji: "🍍", name: "আনারস", price: "৳80/pc"  },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 14,
                  padding: "10px 14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(251,146,60,0.15)",
                  textAlign: "center",
                  animation: `scaleIn 0.5s ease ${0.6 + i * 0.12}s both`,
                  minWidth: 80,
                }}
              >
                <div style={{ fontSize: "1.6rem" }}>{c.emoji}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#374151", marginTop: 3 }}>{c.name}</div>
                <div style={{ fontSize: "0.65rem", color: "#f04e0f", fontWeight: 600 }}>{c.price}</div>
              </div>
            ))}
          </div>

          {/* Sub text */}
          <p className="reveal-4" style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
            {t.sub}
          </p>

          {/* CTA buttons */}
          <div className="reveal-4 flex flex-col gap-3 w-full" style={{ maxWidth: 320 }}>
            <a href="#products" className="btn-primary w-full text-center">{t.cta1} →</a>
            <button className="btn-secondary w-full">{t.cta2}</button>
          </div>

          {/* Stats strip */}
          <div
            className="reveal-5 flex justify-around w-full rounded-2xl py-4"
            style={{
              maxWidth: 320,
              background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
              border: "1.5px solid rgba(251,146,60,0.2)",
            }}
          >
            {[
              { num: "10K+", label: "সুখী গ্রাহক"    },
              { num: "50+",  label: "ফলের ধরন"        },
              { num: "24h",  label: "তাজা ডেলিভারি"   },
            ].map(s => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#f04e0f", fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                <div style={{ fontSize: "0.68rem", color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Trust chips */}
          <div className="reveal-5 flex gap-2 flex-wrap justify-center">
            {[
              { icon: "✅", text: t.trust1 },
              { icon: "🛡️", text: t.trust2 },
              { icon: "🌿", text: t.trust3 },
            ].map(chip => (
              <div key={chip.text} className="trust-chip" style={{ fontSize: "0.75rem" }}>
                <span>{chip.icon}</span>
                {chip.text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}