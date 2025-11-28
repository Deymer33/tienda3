"use client";

import { useState, useEffect } from "react";

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

    // Si se seleccionó una imagen, subirla
    if (imageFile) {
      const imgForm = new FormData();
      imgForm.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imgForm,
      });

      const uploadData = await uploadRes.json();
      uploadedImageUrl = uploadData.url; // /uploads/xxxxx.jpg
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
    if (!confirm("¿Seguro de eliminar?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    loadCategories();
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Categorías</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          + Nueva Categoría
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Imagen</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c: any) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.id}</td>

              <td className="p-2 border">
                {c.image_url ? (
                  <img
                    src={c.image_url}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td className="p-2 border">{c.name}</td>

              <td className="p-2 border">
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => openModal(c)}
                >
                  Editar
                </button>

                <button
                  className="text-red-500"
                  onClick={() => deleteCategory(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {form.id ? "Editar Categoría" : "Nueva Categoría"}
            </h3>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Descripción"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* Imagen */}
            <label className="block font-medium mb-1">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 mb-3"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}

            <button
              className="bg-primary text-white px-4 py-2 rounded mr-2"
              onClick={handleSave}
            >
              Guardar
            </button>

            <button className="px-4 py-2" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
