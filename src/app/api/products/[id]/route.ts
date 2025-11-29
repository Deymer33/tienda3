import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)));

    if (!product.length)
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });

    return NextResponse.json(product[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name, description, image_url } = await req.json();

    const result = await db
      .update(products)
      .set({ name, description, image_url })
      .where(eq(products.id, Number(id)))
      .returning();

    if (!result.length)
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await db.delete(products).where(eq(products.id, Number(id)));

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
