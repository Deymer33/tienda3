import 'dotenv/config';
import { db } from "./client";
import { users } from "./schema";
import bcrypt from "bcrypt";

async function main() {
  const passwordAlice = await bcrypt.hash("alice123", 10);
  const passwordBob = await bcrypt.hash("bob456", 10);

  await db.insert(users).values([
    {
      email: "alice@example.com",
      name: "Alice",
      password: passwordAlice,
    },
    {
      email: "bob@example.com",
      name: "Bob",
      password: passwordBob,
    },
  ]);

  console.log("Seed ejecutado correctamente con contraseñas hasheadas.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error en seed:", err);
    process.exit(1);
  });
