import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { comparePassword, signToken } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Buscar el usuario con Drizzle
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const user = result[0];

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // Comparar contraseña
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Crear token JWT
    const token = signToken({
      id: user.id,
      email: user.email,
      role: "admin", 
    });

    return NextResponse.json({ token });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
