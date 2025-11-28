"use client";

import { useEffect, useState } from "react";

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
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Campos de formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // Cargar datos
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
    setEditProduct(null);
    setName("");
    setDescription("");
    setCategoryId(null);
    setOpenModal(true);
  }

  function openEditModal(product: Product) {
    setEditProduct(product);
    setName(product.name);
    setDescription(product.description || "");
    setCategoryId(product.category_id);
    setOpenModal(true);
  }

  async function handleSave(e: any) {
    e.preventDefault();

    const body = { name, description, categoryId };

    if (editProduct) {
      await fetch(`/api/products/${editProduct.id}`, {
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

    setOpenModal(false);
    loadProducts();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  return (
    <div className="p-6 bg-white rounded shadow">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Productos</h2>
        <button
          onClick={openCreateModal}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">
                {categories.find((c) => c.id === p.category_id)?.name || "—"}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => openEditModal(p)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {editProduct ? "Editar Producto" : "Nuevo Producto"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">

              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input
                  className="w-full border p-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Descripción</label>
                <textarea
                  className="w-full border p-2 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm mb-1">Categoría</label>
                <select
                  className="w-full border p-2 rounded"
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

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-3 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-3 py-2 bg-green-600 text-white rounded"
                >
                  Guardar
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
