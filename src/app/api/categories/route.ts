import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/categories
export async function GET() {
  try {
    const result = await db.select().from(categories);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error GET categories:", error);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
}


// POST /api/categories
export async function POST(req: Request) {
  try {
    const { name, description, image_url } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

     const result = await db
    .insert(categories)
    .values({ name, description, image_url })
    .returning();

  return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error POST categories:", error);
    return NextResponse.json({ error: "Error creating category" }, { status: 500 });
  }
}
