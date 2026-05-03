import { HiOutlineXMark } from "react-icons/hi2";

export default function Field({ label, icon, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
        <span className="text-gray-400">{icon}</span>
        {label}
        {required && <span className="text-(--orange-hot)">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs font-medium flex items-center gap-1 text-red-500">
          <HiOutlineXMark size={12} /> {error.message}
        </p>
      )}
    </div>
  );
}