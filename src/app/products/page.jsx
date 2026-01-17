"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../redux/productsSlice";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopupDelete from "../components/PopupDelete";

export default function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, status } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Open delete popup for selected product
  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    dispatch(deleteProduct(selectedId));
    setShowDelete(false);
  };

  if (status === "loading") {
    return (
      <p className="text-violet-400 text-center mt-10">Loading products...</p>
    );
  }

  // Filtrage des produits
  const filteredProducts = items.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? p.category === filterCategory : true)
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow mt-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-violet-600">Product List</h1>

        <Link
          href="/new"
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          <Plus size={16} />
          Add product
        </Link>
      </div>

      {/* Search & Category Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-sm rounded-md border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 text-sm rounded-md border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="">All Categories</option>
          {Array.from(new Set(items.map((p) => p.category))).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-violet-200 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-violet-50 text-xs uppercase text-violet-500">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-violet-100 hover:bg-violet-50 transition"
                  onClick={() => router.push(`/detailProduct/${product.id}`)}
                >
                  <td className="px-6 py-4 font-medium text-violet-600">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.price} DH
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    {/* view button */}
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye size={16} />
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-violet-700 hover:text-violet-900"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Popup Delete */}
        {showDelete && (
          <PopupDelete
            onConfirm={confirmDelete}
            onCancel={() => setShowDelete(false)}
          />
        )}
      </div>
    </div>
  );
}
