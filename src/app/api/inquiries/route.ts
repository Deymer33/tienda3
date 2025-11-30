import { db } from "@/db/client";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const data = await db.select().from(inquiries).orderBy(desc(inquiries.created_at));
  return Response.json(data);
}
