import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

if (!process.env.JWT_SECRET) {
  throw new Error("Falta JWT_SECRET en el .env");
}

const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------
// JWT
// ------------------------------

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}

// ------------------------------
// Password hashing
// ------------------------------

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10); // más corto y secure
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
