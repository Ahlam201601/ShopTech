"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import { toast } from "react-hot-toast"; 

export default function NewProduct() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const err = {};
    if (!formData.name) err.name = "Product name is required";
    if (!formData.price || formData.price <= 0) err.price = "Price must be greater than 0";
    if (formData.quantity === "" || formData.quantity < 0) err.quantity = "Quantity must be 0 or more";
    if (!formData.category) err.category = "Category is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddProduct = () => {
    if (!validate()) return;

    const product = {
      name: formData.name,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      category: formData.category,
      description: formData.description,
      status: "available",
      createdAt: new Date().toISOString(),
    };

    dispatch(addProduct(product));
    setFormData({ name: "", price: "", quantity: "", category: "", description: "" });

    // Afficher le toast de succès
    toast.success("Product added successfully!");
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-10 rounded-2xl shadow-xl space-y-6 mt-16">

      <h1 className="text-3xl font-bold text-violet-600 text-center">Add New Product</h1>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">Product Name</label>
        <input
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Price & Quantity */}
      <div className="flex gap-6">
        <div className="flex-1 space-y-1">
          <label className="text-gray-700 font-medium">Price (DH)</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm bg-white"
        >
          <option value="">Select category</option>
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Stationery</option>
          <option>Peripherals</option>
          <option>Storage</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-gray-700 font-medium">Description</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-5 py-3 rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm resize-none"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleAddProduct}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md transition transform hover:scale-105"
      >
        Add Product
      </button>
    </div>
  );
}
