"use client";

import { useState } from "react";
import CategoriesTable from "./categories-table";
import ProductsTable from "./products-table";
import { Header } from "@/components/admin/header";
import { Footer } from '@/components/footer';

export default function AdminPanel() {
  const [tab, setTab] = useState("categories");

  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Panel Admin</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button
          onClick={() => setTab("categories")}
          className={`px-4 py-2 ${
            tab === "categories" ? "border-b-2 border-primary font-bold" : ""
          }`}
        >
          Categorías
        </button>

        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 ${
            tab === "products" ? "border-b-2 border-primary font-bold" : ""
          }`}
        >
          Productos
        </button>
      </div>

      {/* Content */}
      {tab === "categories" && <CategoriesTable />}
      {tab === "products" && <ProductsTable />}
    </div>
    </main>
    <Footer />
    </div>
  );
}
