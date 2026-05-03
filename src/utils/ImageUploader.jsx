import { useState } from "react";
import { HiOutlineArrowUpTray, HiOutlineStar, HiOutlineTrash } from "react-icons/hi2";

export default function ImageUploader({ value = [], onChange, error }) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    onChange([...value, ...newPreviews].slice(0, 5));
  };

  const remove = (idx) => {
    const updated = value.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const setMain = (idx) => {
    const reordered = [value[idx], ...value.filter((_, i) => i !== idx)];
    onChange(reordered);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <label
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-colors py-8 px-4 ${
          dragging ? "border-orange-400 bg-orange-50" : error ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-(--cream) text-(--orange-hot)"
        >
          <HiOutlineArrowUpTray size={22} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">
            Drop images here or <span className="text-(--orange-hot)">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB · Max 5 images</p>
        </div>
      </label>

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {value.map((img, i) => (
            <div key={i} className={`relative rounded-lg overflow-hidden group border ${i === 0 ? "border-(--orange-hot)" : "border-gray-200"}`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />

              {/* Main badge */}
              {i === 0 && (
                <span
                  className="absolute top-1.5 left-1.5 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 bg-(--orange-hot)"
                >
                  <HiOutlineStar size={9} /> Main
                </span>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.45)" }}
              >
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => setMain(i)}
                    className="w-7 h-7 rounded-lg text-(--orange-hot) bg-white flex items-center justify-center text-xs font-bold hover:bg-orange-50 transition-colors"
                    title="Set as main"
                  >
                    <HiOutlineStar size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-red-50 transition-colors"
                  title="Remove"
                  style={{ color: "#ef4444" }}
                >
                  <HiOutlineTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}