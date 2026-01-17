import { AlertTriangle } from "lucide-react";

export default function PopupDelete({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-xl border border-gray-100">
        <div className="flex items-center gap-2 mb-4 text-red-600">
          <AlertTriangle size={22} />
          <h2 className="text-lg font-semibold">Delete Product</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this product?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
