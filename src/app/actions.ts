"use server";

import { z } from "zod";

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
    
    return { success: true, message: "Inquiry submitted successfully." };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    if (error instanceof z.ZodError) {
        return { success: false, message: "Invalid form data.", errors: error.errors };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
}