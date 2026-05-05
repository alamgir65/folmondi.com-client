import { HiOutlineXMark } from "react-icons/hi2";

export function Modal({ title, onClose, children, size }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
      
      {/* wrapper for centering */}
      <div className="flex min-h-full items-center justify-center p-4">
        
        <div
          className={`bg-white rounded-2xl w-full ${
            size ? `max-w-${size}` : "max-w-md"
          } max-h-[90vh] flex flex-col`}
        >
          
          {/* Header */}
          <div className="flex justify-between p-4 border-b shrink-0">
            <h3 className="font-bold">{title}</h3>
            <button onClick={onClose}>
              <HiOutlineXMark size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 overflow-y-auto">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}