"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Erro: ${error.message}`);
        return;
      }

      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
      return;
    }

    setMessage("Conta criada com sucesso. Agora faça login.");
    setMode("login");
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
        <p style={{ color: "#4b5563", marginBottom: 20 }}>
          {mode === "login"
            ? "Entre com email e senha."
            : "Crie sua conta para acessar o sistema."}
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: mode === "login" ? "#0F2460" : "white",
              color: mode === "login" ? "white" : "#111827",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: mode === "signup" ? "#0F2460" : "white",
              color: mode === "signup" ? "white" : "#111827",
              cursor: "pointer",
            }}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
              marginBottom: 12,
            }}
          />

          <input
            type="password"
            required
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: 12,
              width: "100%",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              marginBottom: 16,
            }}
          />

          <button
            type="submit"
            style={{
              padding: 12,
              width: "100%",
              borderRadius: 10,
              border: "none",
              background: "#0F2460",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        {message && <p style={{ marginTop: 16 }}>{message}</p>}
      </div>
    </main>
  );
}