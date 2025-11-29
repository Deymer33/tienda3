import "dotenv/config";
import { db } from "./client";
import { users } from "./schema";
import bcrypt from "bcrypt";

async function main() {
  
  const plainPassword = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL;
  const name = process.env.ADMIN_NAME;


  if (!plainPassword) throw new Error("ADMIN_PASSWORD no está definida en .env");
  if (!email) throw new Error("ADMIN_EMAIL no está definida en .env");
  if (!name) throw new Error("ADMIN_NAME no está definida en .env");


  const password = await bcrypt.hash(plainPassword, 10);

 
  await db.insert(users).values([
    {
      email,
      name,
      password,
    },
  ]);

  console.log("Seed ejecutado correctamente con credenciales desde variables de entorno.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error en seed:", err);
    process.exit(1);
  });
