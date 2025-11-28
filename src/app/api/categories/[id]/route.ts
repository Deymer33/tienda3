import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/categories/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (result.length === 0)
      return NextResponse.json({ error: "Category not found" }, { status: 404 });

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching category" }, { status: 500 });
  }
}


// PUT /api/categories/:id
export async function PUT(req: Request, { params }: any) {
  const { name, description, image_url } = await req.json();

  const result = await db
    .update(categories)
    .set({ name, description, image_url })
    .where(eq(categories.id, Number(params.id)))
    .returning();

  return NextResponse.json(result[0]);
}

export async function DELETE(req: Request, { params }: any) {
  await db.delete(categories).where(eq(categories.id, Number(params.id)));
  return NextResponse.json({ success: true });
}