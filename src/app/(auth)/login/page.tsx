"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("Enviando link de acesso...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage("Verifique seu email e clique no link mágico.");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Entrar no LabOS</h1>

      <form onSubmit={handleLogin} style={{ marginTop: 20 }}>
        <input
          type="email"
          required
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, width: 300 }}
        />

        <button type="submit" style={{ marginLeft: 10, padding: 10 }}>
          Entrar
        </button>
      </form>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </main>
  );
}