"use server";

import { z } from "zod";
import { db } from "@/db/client";
import { inquiries } from "@/db/schema";
import nodemailer from "nodemailer";

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

    const { name, email, subject, message } = parsedData;

    // Guardar en la BD
    await db.insert(inquiries).values({
      name,
      email,
      subject,
      message,
      status: "pending",
    });

    // Configurar servidor SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: `"Web Cotizaciones" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL, // correo de destino (empresa)
      subject: `Nueva cotización: ${subject}`,
      html: `
        <h2>Nueva cotización recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true, message: "Cotización enviada y guardada correctamente." };

  } catch (error: any) {
    console.error("Error en submitInquiry:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid form data.",
        errors: error.errors,
      };
    }

    return { success: false, message: "Ocurrió un error al enviar la cotización." };
  }
}
