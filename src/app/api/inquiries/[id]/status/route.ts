import { db } from "@/db/client";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; 
    const inquiryId = Number(id);

    if (isNaN(inquiryId)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return Response.json({ error: "Estado requerido" }, { status: 400 });
    }

    await db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, inquiryId));

    return Response.json({ success: true, message: "Estado actualizado" });

  } catch (err) {
    console.error("Error updating inquiry:", err);
    return Response.json(
      { error: "Error al actualizar el estado" },
      { status: 500 }
    );
  }
}
