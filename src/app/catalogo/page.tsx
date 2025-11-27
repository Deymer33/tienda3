"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";

const categories = [
  {
    categoryId: 1,
    categoryname: "Abrillantador de muebles",
    productIds: [101, 102, 103],
  },
  {
    categoryId: 2,
    categoryname: "Accesorios para Baño",
    productIds: [201, 202],
  },
  {
    categoryId: 3,
    categoryname: "Aromatizantes",
    productIds: [301, 302, 303, 304],
  },
];

export default function ProductosPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              data-aos="fade-up"
              className="p-6 rounded-lg border border-primary/20 shadow-sm bg-background
                         hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold">{category.categoryname}</h3>
              <p className="text-muted-foreground mt-2">
                Productos disponibles: {category.productIds.length}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
