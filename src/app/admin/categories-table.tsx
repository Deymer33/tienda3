"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash } from "lucide-react";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function loadCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openModal(category: any = null) {
    if (category) {
      setForm(category);
      setImagePreview(category.image_url || null);
    } else {
      setForm({ id: null, name: "", description: "", image_url: "" });
      setImagePreview(null);
    }

    setImageFile(null);
    setModalOpen(true);
  }

  async function handleSave() {
    let uploadedImageUrl = form.image_url;

    if (imageFile) {
      const imgForm = new FormData();
      imgForm.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imgForm,
      });

      const uploadData = await uploadRes.json();
      uploadedImageUrl = uploadData.url;
    }

    const body = {
      name: form.name,
      description: form.description,
      image_url: uploadedImageUrl,
    };

    if (form.id) {
      await fetch(`/api/categories/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setModalOpen(false);
    loadCategories();
  }

  function handleImageChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function deleteCategory(id: number) {
    if (!confirm("¿Seguro de eliminar esta categoría?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    loadCategories();
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Categorías
        </h2>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          <Plus size={18} /> Nueva Categoría
        </button>
      </div>

      {/* Tabla mejorada */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Imagen</th>
              <th className="p-3 text-left border-b">Nombre</th>
              <th className="p-3 text-left border-b">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {categories.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-50 transition border-b last:border-none"
              >
                <td className="p-3">{c.id}</td>

                <td className="p-3">
                  {c.image_url ? (
                    <img
                      src={c.image_url}
                      className="w-12 h-12 object-cover rounded-md shadow"
                    />
                  ) : (
                    <span className="text-gray-400">Sin imagen</span>
                  )}
                </td>

                <td className="p-3 font-medium">{c.name}</td>

                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => openModal(c)}
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => deleteCategory(c.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 animate-scaleIn">
            <h3 className="text-xl font-semibold mb-4">
              {form.id ? "Editar Categoría" : "Nueva Categoría"}
            </h3>

            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded-lg"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <textarea
                className="w-full border p-2 rounded-lg"
                placeholder="Descripción"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              {/* Imagen */}
              <label className="block font-medium">Imagen</label>
              <input
                type="file"
                className="w-full border p-2 rounded-lg"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-32 h-32 object-cover rounded-lg shadow mx-auto mt-3"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition"
                onClick={handleSave}
              >
                Guardar
              </button>

              <button
                className="px-4 py-2 rounded-lg border"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animaciones */}
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
