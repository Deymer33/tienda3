"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin";
    } else {
      alert(data.error || "Error desconocido");
    }
  }

  return (
  <div>
    <Header />

    <div className="py-16 md:py-24 bg-secondary flex justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/80 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>

    <Footer />
  </div>
  );
}
