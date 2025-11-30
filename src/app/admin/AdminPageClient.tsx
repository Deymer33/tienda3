"use client";

import { useState } from "react";
import CategoriesTable from "./categories-table";
import ProductsTable from "./products-table";
import { Header } from "@/components/admin/header";
import { Footer } from "@/components/footer";

export default function AdminPageClient() {
  const [tab, setTab] = useState("categories");

  const tabs = [
    { id: "categories", label: "Categorías" },
    { id: "products", label: "Productos" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Panel Administrativo</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-lg transition rounded-md ${
                tab === t.id
                  ? "font-bold text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {tab === "categories" && <CategoriesTable />}
        {tab === "products" && <ProductsTable />}
      </main>

      <Footer />
    </div>
  );
}
