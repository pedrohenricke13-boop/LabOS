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
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage("Verifique seu email e clique no link mágico.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "white",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: 12 }}>Entrar no LabOS</h1>
        <p style={{ color: "#4b5563" }}>
          Use seu email para receber um link mágico de acesso.
        </p>

        <form onSubmit={handleLogin} style={{ marginTop: 20 }}>
          <input
            type="email"
            required
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: 12,
              width: "100%",
              borderRadius: 10,
              border: "1px solid #d1d5db",
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: 16,
              padding: 12,
              width: "100%",
              borderRadius: 10,
              border: "none",
              background: "#0F2460",
              color: "white",
              fontWeight: 600,
            }}
          >
            Entrar
          </button>
        </form>

        {message && <p style={{ marginTop: 16 }}>{message}</p>}
      </div>
    </main>
  );
}