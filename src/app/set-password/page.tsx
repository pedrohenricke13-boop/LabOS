"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      setMessage("As senhas não coincidem.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
      return;
    }

    setMessage("Senha alterada com sucesso. Redirecionando...");
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1200);
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
        <h1 style={{ marginBottom: 12 }}>Definir nova senha</h1>
        <p style={{ color: "#4b5563", marginBottom: 20 }}>
          Digite sua nova senha para continuar.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            required
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            placeholder="Confirmar nova senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            Salvar nova senha
          </button>
        </form>

        {message && <p style={{ marginTop: 16 }}>{message}</p>}
      </div>
    </main>
  );
}