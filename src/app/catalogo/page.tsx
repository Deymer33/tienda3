"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";

type Category = {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
};

export default function ProductosPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Llamamos a la API
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Cargando categorías...</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      <main className="flex-1 py-20 container">
        <h1
          data-aos="fade-up"
          className="text-4xl font-bold mb-12 text-center font-headline"
        >
          Categorías de Productos
        </h1>

        {categories.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No hay categorías registradas.
          </p>
  ) : (
    <div
      data-aos="fade-up"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
    >
      {categories.map((category) => (
        <div
          key={category.id}
          data-aos="fade-up"
          onClick={() => window.location.href = `/catalogo/${category.id}`}
          className="p-6 rounded-lg border border-primary/20 shadow-sm bg-background
          hover:shadow-lg transition cursor-pointer"
        >
          {category.image_url && (
            <img
              src={category.image_url}
              alt={category.name}
              className="w-full h-50 object-cover rounded mb-4"
            />
          )}

          <h3 className="text-xl font-semibold">{category.name}</h3>

          {category.description && (
            <p className="text-muted-foreground mt-2">{category.description}</p>
          )}
        </div>
      ))}
    </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
