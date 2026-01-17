"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
import { getProducts } from "./redux/productsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="p-8">Loading...</p>;
  }

  // 📊 STATISTIQUES
  const totalStock = items.reduce((sum, p) => sum + Number(p.quantity), 0);
  const totalStockValue = items.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity),0);
  const totalSold = items.reduce((sum, p) => sum + Number(p.sold || 0), 0);
  const totalSalesValue = items.reduce((sum, p) => sum + Number(p.sold || 0) * Number(p.price || 0),0);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stock Total */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">Stock Total</h2>
            <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-violet-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
        </div>

        {/* Valeur Stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">Valeur Stock</h2>
            <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalStockValue.toFixed(2)} DH</p>
        </div>

        {/* Produits Vendus */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">Produits Vendus</h2>
            <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalSold}</p>
        </div>

        {/* Valeur Ventes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">Valeur Ventes</h2>
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalSalesValue.toFixed(2)} DH</p>
        </div>
      </div>
    </div>
  );
}