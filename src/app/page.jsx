"use client";

// import { useSelector } from "react-redux";
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import StatsCard from "./components/StatsCard";

export default function Dashboard() {
  // const {
  //   totalStock,
  //   stockValue,
  //   soldProducts,
  //   salesValue,
  // } = useSelector((state) => state.sales);

  return (
    <div className="space-y-6 m-16">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <StatsCard
          title="Stock total"
          // value={totalStock}
          icon={Package}
          color="text-blue-400"
        />

        <StatsCard
          title="Valeur du stock"
          // value={`${stockValue} MAD`}
          icon={DollarSign}
          color="text-green-400"
        />

        <StatsCard
          title="Produits vendus"
          // value={soldProducts}
          icon={ShoppingCart}
          color="text-orange-400"
        />

        <StatsCard
          title="Valeur des ventes"
          // value={`${salesValue} MAD`}
          icon={TrendingUp}
          color="text-violet-400"
        />

      </div>

    </div>
  );
}
