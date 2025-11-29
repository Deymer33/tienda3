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
