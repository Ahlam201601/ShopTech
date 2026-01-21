"use client";

import React from "react";
import Link from "next/link";
import { Home, Grid, PlusSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition
     ${
       pathname === path
         ? "bg-violet-600 text-white shadow"
         : "text-gray-300 hover:bg-gray-800"
     }`;

  return (
    <aside className="fixed top-0 left-0 w-56 h-screen bg-gray-900 p-6">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Home className="w-6 h-6 text-violet-400" />
        <span className="text-white text-xl font-bold">ShopTech</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        
        <Link href="/" className={linkClass("/")}>
          <Home className="w-5 h-5" />
          Dashboard
        </Link>

        <Link href="/products" className={linkClass("/products")}>
          <Grid className="w-5 h-5" />
          Products
        </Link>

        <Link href="/new" className={linkClass("/new")}>
          <PlusSquare className="w-5 h-5" />
          Add Product
        </Link>

      </nav>
    </aside>
  );
}
