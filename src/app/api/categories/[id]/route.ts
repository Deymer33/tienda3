import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { categories, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔥 params AHORA ES UNA PROMESA
    const { id } = await context.params;
    const categoryId = Number(id);

    // Verificar si se solicitan productos
    const url = new URL(req.url);

    if (url.searchParams.get("products") === "true") {
      const data = await db
        .select()
        .from(products)
        .where(eq(products.category_id, categoryId));

      return NextResponse.json(data);
    }

    // Obtener la categoría
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId));

    if (result.length === 0)
      return NextResponse.json({ error: "Category not found" }, { status: 404 });

    return NextResponse.json(result[0]);

  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const categoryId = Number(id);

    const body = await req.json();

    const { name, description, image_url } = body;

    // Validar
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Actualizar
    const result = await db
      .update(categories)
      .set({
        name,
        description,
        image_url,
      })
      .where(eq(categories.id, categoryId))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error PUT category:", error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}