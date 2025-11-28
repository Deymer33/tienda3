import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(products);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newProduct = await db
      .insert(products)
      .values({
        name: body.name,
        description: body.description,
        category_id: body.categoryId,
      })
      .returning();

    return NextResponse.json(newProduct[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
