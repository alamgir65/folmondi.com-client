import { HiOutlineXMark } from "react-icons/hi2";

export function Modal({ title, onClose, children,size }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`bg-white rounded-2xl w-full ${size?`max-w-${size}`:''}`}>
        <div className="flex justify-between p-4 border-b">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose}>
            <HiOutlineXMark size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}