const SIZES = {
  sm: { wrap: 48,  stroke: 3, icon: 20, text: "0.7rem"  },
  md: { wrap: 72,  stroke: 4, icon: 30, text: "0.82rem" },
  lg: { wrap: 96,  stroke: 5, icon: 40, text: "0.9rem"  },
  xl: { wrap: 128, stroke: 6, icon: 54, text: "1rem"    },
};

const ORANGE  = "#f04e0f";
const ORANGE2 = "#f97316";
const GREEN   = "#16a34a";

const STYLES = `
  @keyframes fm-pulse  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.88);opacity:.55} }
  @keyframes fm-bounce { 0%,80%,100%{transform:scale(0);opacity:.3} 40%{transform:scale(1);opacity:1} }
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("fm-spinner-styles")) return;
  const el = document.createElement("style");
  el.id = "fm-spinner-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

function PulseSpinner({ s }) {
  return (
    <div style={{ width: s.wrap, height: s.wrap, position: "relative", flexShrink: 0 }}>
      {[
        { scale: 1,    color: ORANGE,  delay: "0s"    },
        { scale: 0.72, color: ORANGE2, delay: "0.18s" },
        { scale: 0.46, color: GREEN,   delay: "0.36s" },
      ].map((r, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: `${s.stroke - i}px solid ${r.color}`,
          opacity: 1 - i * 0.28,
          transform: `scale(${r.scale})`,
          animation: `fm-pulse ${1 + i * 0.3}s ease-in-out ${r.delay} infinite`,
        }} />
      ))}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: s.icon * 0.55,
          height: s.icon * 0.55,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`,
          animation: "fm-pulse 1s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

function DotsSpinner({ s }) {
  const dot = Math.round(s.wrap * 0.2);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: dot * 0.6, height: s.wrap, flexShrink: 0 }}>
      {[
        { color: ORANGE,  delay: "0s"    },
        { color: ORANGE2, delay: "0.16s" },
        { color: GREEN,   delay: "0.32s" },
      ].map((d, i) => (
        <div key={i} style={{
          width: dot, height: dot, borderRadius: "50%",
          background: d.color,
          animation: `fm-bounce 1.2s ease-in-out ${d.delay} infinite`,
        }} />
      ))}
    </div>
  );
}

export default function FolmondiSpinner({
  size     = "md",
  variant  = "pulse",
  text     = null,
  fullPage = false,
}) {
  injectStyles();
  const s = SIZES[size] || SIZES.md;

  const spinner = variant === "dots"
    ? <DotsSpinner s={s} />
    : <PulseSpinner s={s} />;

  const content = (
    <div role="status" aria-label={text || "লোড হচ্ছে..."}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {spinner}
      {text && (
        <span style={{ fontSize: s.text, fontWeight: 600, color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
          {text}
        </span>
      )}
      <span className="sr-only">লোড হচ্ছে</span>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(255,251,245,0.85)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {content}
      </div>
    );
  }

  return content;
}
