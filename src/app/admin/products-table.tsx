"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string | null;
  category_id: number | null;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // Search state
  const [search, setSearch] = useState("");

  // Load data
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function loadCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  function openCreateModal() {
    setEditingProduct(null);
    setName("");
    setDescription("");
    setCategoryId(null);
    setModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description || "");
    setCategoryId(product.category_id);
    setModalOpen(true);
  }

  async function handleSave(e: any) {
    e.preventDefault();

    const body = { name, description, categoryId };

    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setModalOpen(false);
    loadProducts();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  // === 🔍 FILTER PRODUCTS ===
  const filteredProducts = products.filter((p) => {
    const productName = p.name.toLowerCase();
    const categoryName =
      categories.find((c) => c.id === p.category_id)?.name.toLowerCase() || "";

    const term = search.toLowerCase();

    return (
      productName.includes(term) ||
      categoryName.includes(term)
    );
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Title + Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Productos</h2>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-2 mb-4 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
        <Search size={18} className="text-gray-500" />
        <input
          className="flex-1 bg-transparent outline-none text-sm"
          placeholder="Buscar por nombre o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Nombre</th>
              <th className="p-3 text-left border-b">Categoría</th>
              <th className="p-3 text-left border-b">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 border-b last:border-none transition"
              >
                <td className="p-3">{p.id}</td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">
                  {
                    categories.find((c) => c.id === p.category_id)?.name ||
                    <span className="text-gray-400">Sin categoría</span>
                  }
                </td>

                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-6 text-gray-500 italic"
                >
                  No se encontraron productos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 animate-scaleIn">
            <h3 className="text-xl font-semibold mb-4">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 font-medium">Nombre</label>
                <input
                  className="w-full border p-2 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  Descripción
                </label>
                <textarea
                  className="w-full border p-2 rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  Categoría
                </label>
                <select
                  className="w-full border p-2 rounded-lg"
                  value={categoryId ?? ""}
                  onChange={(e) =>
                    setCategoryId(e.target.value ? Number(e.target.value) : null)
                  }
                >
                  <option value="">Sin categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
