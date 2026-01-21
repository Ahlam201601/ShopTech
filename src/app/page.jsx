"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
import { getProducts } from "./redux/productsSlice";
import SalesChart from "./components/SalesChart";
import SoldProductsTable from "./components/SoldProductsTable";

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
  const totalStockValue = items.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.quantity),
    0
  );
  const totalSold = items.reduce((sum, p) => sum + Number(p.sold || 0), 0);
  const totalSalesValue = items.reduce(
    (sum, p) => sum + Number(p.sold || 0) * Number(p.price || 0),
    0
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50 ml-64">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stock Total */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Stock Total</p>
              <p className="text-2xl font-bold text-gray-800">{totalStock}</p>
            </div>
          </div>
        </div>

        {/* Valeur Stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Valeur Stock</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalStockValue.toFixed(2)} DH
              </p>
            </div>
          </div>
        </div>

        {/* Produits Vendus */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Produits Vendus</p>
              <p className="text-2xl font-bold text-gray-800">{totalSold}</p>
            </div>
          </div>
        </div>

        {/* Valeur Ventes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Valeur Ventes</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalSalesValue.toFixed(2)} DH
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <SalesChart products={items} />
      </div>
      
      <SoldProductsTable products={items} />
    </div>
  );
}