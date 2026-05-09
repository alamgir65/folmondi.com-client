import { HiOutlineCheckCircle } from "react-icons/hi2";

export function Section({ step, label, icon, children, done }) {
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
export function FormField({ label, required, error, children, hint }) {
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