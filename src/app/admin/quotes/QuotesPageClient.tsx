"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/admin/header";
import { Footer } from "@/components/footer";
import { Mail, Eye, CheckCircle, Clock, Loader2 } from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "pending" | "resolved";
  created_at: string;
};

export default function QuotesPageClient() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/inquiries");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  async function changeStatus(id: number, newStatus: Inquiry["status"]) {
    setUpdating(id);

    await fetch(`/api/inquiries/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    await loadData();
    setUpdating(null);
  }

  function StatusBadge({ status }: { status: Inquiry["status"] }) {
    const map = {
      new: "bg-blue-100 text-blue-700",
      pending: "bg-yellow-100 text-yellow-700",
      resolved: "bg-green-100 text-green-700",
    };

    const text = {
      new: "Nuevo",
      pending: "Pendiente",
      resolved: "Resuelto",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${map[status]}`}>
        {text[status]}
      </span>
    );
  }

  return (
    <div>
      <Header />

      <div className="p-16 md:py-10 min-h-screen bg-secondary">
        <h1 className="text-2xl font-semibold mb-6">Gestión de Cotizaciones</h1>

        {loading ? (
          <p>Cargando cotizaciones...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No hay cotizaciones aún.</p>
        ) : (
          <div className="overflow-x-auto shadow border rounded-lg">
            <table className="w-full bg-white">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Asunto</th>
                  <th className="p-3 text-left">Estado</th>
                  <th className="p-3 text-left">Fecha</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {items.map((cot) => (
                  <tr key={cot.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{cot.name}</td>
                    <td className="p-3 flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      {cot.email}
                    </td>
                    <td className="p-3">{cot.subject || "—"}</td>
                    <td className="p-3">
                      <StatusBadge status={cot.status} />
                    </td>
                    <td className="p-3">
                      {new Date(cot.created_at).toLocaleString()}
                    </td>

                    <td className="p-3 space-x-2 flex">
                      {/* Ver detalle */}
                      <button
                        onClick={() => setSelected(cot)}
                        className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Cambiar estado */}
                      <button
                        disabled={updating === cot.id}
                        onClick={() =>
                          changeStatus(
                            cot.id,
                            cot.status === "resolved"
                              ? "pending"
                              : cot.status === "pending"
                              ? "new"
                              : "resolved"
                          )
                        }
                        className="p-2 rounded bg-primary text-white hover:opacity-90 transition"
                      >
                        {updating === cot.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <CheckCircle size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de detalle */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg relative animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4">Detalle de Cotización</h2>

              <p><strong>Nombre:</strong> {selected.name}</p>
              <p className="mt-1 flex items-center gap-2">
                <Mail size={16} className="text-gray-600" />
                <strong>Email:</strong> {selected.email}
              </p>

              <p className="mt-2"><strong>Asunto:</strong> {selected.subject || "—"}</p>

              <p className="mt-3"><strong>Mensaje:</strong></p>
              <div className="mt-1 p-3 border rounded bg-gray-50 whitespace-pre-wrap">
                {selected.message}
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                {new Date(selected.created_at).toLocaleString()}
              </p>

              <button
                onClick={() => setSelected(null)}
                className="mt-5 w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
              >
                Cerrar
              </button>
            </div>

            {/* Animación */}
            <style jsx>{`
              .animate-fadeIn {
                animation: fadeIn 0.2s ease-out;
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(4px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
