"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productsSlice";
import { Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function Products() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-violet-400">Loading products...</p>;
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow">
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        className="w-full px-4 py-2 text-sm rounded-md 
                   border border-violet-200
                   focus:outline-none 
                   focus:ring-2 focus:ring-violet-400"
      />

      {/* Table */}
      <div className="overflow-x-auto border border-violet-200 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-violet-50 text-xs uppercase text-violet-500">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No products yet
                </td>
              </tr>
            ) : (
              items.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-violet-100 hover:bg-violet-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-violet-600">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-gray-600">${product.price}</td>

                  <td className="px-6 py-4 text-gray-600">
                    {product.quantity}
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-4">
                    {/* Edit button */}
                    <button className="text-violet-700 hover:text-violet-900">
                      <Pencil size={16} />
                    </button>

                    {/* Delete button */}
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
