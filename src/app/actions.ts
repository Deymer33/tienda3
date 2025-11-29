"use server";

import { z } from "zod";
import { db } from "@/db/client";
import { inquiries } from "@/db/schema";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function submitInquiry(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsedData = formSchema.parse(data);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    await db.insert(inquiries).values({
      name,
      email,
      subject,
      message,
      status: "pending",
    });

    return { success: true, message: "Cotización guardada correctamente" };
  } catch (error) {
    console.error("Error al guardar la cotización:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid form data.", errors: error.errors };
    }
    return { success: false, message: "Error al guardar la cotización" };
  }
}