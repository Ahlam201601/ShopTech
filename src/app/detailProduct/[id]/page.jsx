"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowLeft,
  Package,
  Tag,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import PopupDelete from "@/app/components/PopupDelete";
import { deleteProduct } from "@/app/redux/productsSlice";

export default function DetailProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id == id)
  );

  const dispatch = useDispatch();
  const handleDelete = () => {
    setDeleteProductId(id);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(id));
    setShowDelete(false);
    router.push("/products");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-gray-400 text-lg">Product not found</p>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/products/edit/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-30">
      {/* Header avec Back et Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-all"
          >
            <Pencil size={18} className="text-violet-600" />
            <span className="text-sm font-medium text-gray-700">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all"
          >
            <Trash2 size={18} className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Delete</span>
          </button>
        </div>
      </div>

      {/* Card Principale */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* En-tête du produit */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>
        </div>

        {/* Grille des informations */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 bg-violet-100 rounded-lg">
                <DollarSign size={22} className="text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-xl font-semibold text-gray-900">
                  {product.price} DH
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Quantity</p>
                <p className="text-xl font-semibold text-gray-900">
                  {product.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Tag size={22} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="text-xl font-semibold text-gray-900">
                  {product.category}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>
        </div>
      </div>
      {showDelete && (
        <PopupDelete
          onConfirm={confirmDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
