import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/db/client";
import { inquiries } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Guardar en la BD
    await db.insert(inquiries).values({
      name,
      email,
      subject,
      message,
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

    // Enviar correo
    await transporter.sendMail({
      from: `"Web Cotizaciones" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL, // correo de la empresa
      subject: `Nueva consulta: ${subject}`,
      html: `
        <h2>Nueva consulta recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error al enviar correo:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
