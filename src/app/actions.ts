"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function submitInquiry(formData: FormData) {
  try {
    // Convertir FormData a objeto
    const data = Object.fromEntries(formData.entries());
    const parsedData = formSchema.parse(data);

    const { name, email, subject, message } = parsedData;

    // Configurar servidor SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true solo si usas 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: `"Web Cotizaciones" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL, 
      replyTo: email, 
      subject: `Nueva cotización: ${subject}`,
      html: `
        <h2>Nueva cotización recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return {
      success: true,
      message: "Mensaje enviado correctamente. Nos pondremos en contacto contigo.",
    };

  } catch (error: any) {
    console.error("Error en submitInquiry:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Datos inválidos en el formulario.",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "Ocurrió un error al enviar el mensaje.",
    };
  }
}
