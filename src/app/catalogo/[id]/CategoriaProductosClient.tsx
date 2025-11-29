"use client";


import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";

type Product = {
  id: number;
  name: string;
  description?: string;
  category_id: number;
};

export default function CategoriaProductosClient({ id }: { id: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {

    AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
        });

    let mounted = true;

    const fetchProductos = async () => {
      try {
        const resProducts = await fetch(`/api/categories/${id}?products=true`);
        const dataProducts = await resProducts.json();

        const resCategory = await fetch(`/api/categories/${id}`);
        const dataCategory = await resCategory.json();

        if (!mounted) return;
        setProducts(Array.isArray(dataProducts) ? dataProducts : []);
        setCategory(dataCategory);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProductos();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-10 text-center">Cargando productos...</div>;

  return (
    <>
      <Header />

      {/* ancho y alineado a la izquierda */}
      <div className=" container py-20 max-w-5xl" data-aos="fade-up">
        

        <h1 className="text-4xl font-bold mb-10">
          Productos de {category?.name}
        </h1>

        {products.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          <div className="space-y-4">
            <ul className="rounded-xl border divide-y bg-white shadow-sm">
              {paginatedProducts.map((product) => (
                <li key={product.id} className="p-6 hover:bg-gray-50 transition">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  )}
                </li>
              ))}
            </ul>

            {/* Paginación */}
            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                ← Anterior
              </button>

              <span className="text-sm text-gray-700">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
