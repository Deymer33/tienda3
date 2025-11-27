"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// -----------------------------
// Datos de ejemplo por categoría
// -----------------------------
const categoryData: Record<string, {
  name: string;
  products: { id: number; name: string; image: string; description: string }[];
}> = {
  "1": {
    name: "Abrillantador de Muebles",
    products: [
      { id: 101, name: "Mueble Shine Pro", image: "/prod1.jpg", description: "Abrillantador premium para madera." },
      { id: 102, name: "Wood Gloss", image: "/prod2.jpg", description: "Protector con acabado brillante." },
      { id: 103, name: "Furniture Care Plus", image: "/prod3.jpg", description: "Cuidado intensivo para muebles." },
      { id: 104, name: "Deep Clean Polish", image: "/prod4.jpg", description: "Limpieza y brillo 2 en 1." },
      { id: 105, name: "Deep Clean Polish", image: "/prod4.jpg", description: "Limpieza y brillo 2 en 1." },
      { id: 106, name: "Deep Clean Polish", image: "/prod4.jpg", description: "Limpieza y brillo 2 en 1." },
      { id: 107, name: "Deep Clean Polish", image: "/prod4.jpg", description: "Limpieza y brillo 2 en 1." },
      { id: 108, name: "Deep Clean Polish", image: "/prod4.jpg", description: "Limpieza y brillo 2 en 1." },
    ],
  },
  "2": {
    name: "Accesorios para Baño",
    products: [
      { id: 201, name: "Porta Toallas Pro", image: "/prod1.jpg", description: "Acero inoxidable resistente." },
      { id: 202, name: "Dispensador Elegance", image: "/prod2.jpg", description: "Diseño minimalista premium." },
    ],
  },
  "3": {
    name: "Aromatizantes",
    products: [
      { id: 301, name: "AROMATIZANTE AIR WICK ELECTRICO", image: "/AROMATIZANTE-AIR-WICK-ELECTRICO.webp", description: "Fragancia fresca y duradera." },
      { id: 302, name: "REPUESTO GOTEADOR WIESE", image: "/REPUESTO-GOTEADOR-WIESE.png", description: "Aromas relajantes para espacios." },
      { id: 303, name: "AROMATIZANTE FEBREZE 250 GRS", image: "/AROMATIZANTE-FEBREZE 250-GRS.webp", description: "Notas cítricas energizantes." },
      { id: 304, name: "AROMATIZANTE GLADE (REPUESTO) 175 GRS", image: "/AROMATIZANTE-GLADE-(REPUESTO)-175 GRS.jpg", description: "Sensación marina revitalizante." },
    ],
  },
};



export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  const category = categoryData[categoryId];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-3xl font-bold">Categoría no encontrada</h1>
          <Link href="/catalogo" className="text-primary underline mt-4 block">
            Volver a catalogo
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-16">
        {/* Título */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold" data-aos="fade-up">
            {category.name}
          </h1>

          {/* Botón cambiar vista */}
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="px-4 py-2 rounded-md border bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Cambiar a vista {viewMode === "grid" ? "Lista" : "Grid"}
          </button>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {category.products.map((product) => (
              <div
                key={product.id}
                data-aos="fade-up"
                className="p-5 border rounded-lg shadow-sm hover:shadow-lg transition bg-background"
              >
                <Image
                  src={product.image}
                  width={400}
                  height={300}
                  alt={product.name}
                  className="rounded-md mb-4 object-cover h-48 w-full"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-muted-foreground mt-2">{product.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {category.products.map((product) => (
              <div
                key={product.id}
                data-aos="fade-up"
                className="p-4 rounded-md border bg-background hover:bg-muted/30 transition flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
