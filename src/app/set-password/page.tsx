"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        setMessage("Não foi possível validar seu link agora. Tente abrir o link do e-mail novamente.");
        setSessionChecked(true);
        return;
      }

      if (data.session) {
        setReady(true);
      } else {
        setMessage("Estamos validando seu acesso. Se esta tela não avançar, abra novamente o link enviado para seu e-mail.");
      }

      setSessionChecked(true);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || session) {
        setReady(true);
        setMessage("");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Sua senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      setMessage("As senhas digitadas não coincidem.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      const errorText = error.message.toLowerCase();

      if (errorText.includes("session")) {
        setMessage("Seu link de recuperação parece ter expirado. Solicite um novo link na tela de login.");
        return;
      }

      if (errorText.includes("same password")) {
        setMessage("Escolha uma senha diferente da anterior.");
        return;
      }

      setMessage("Não foi possível alterar sua senha agora. Tente novamente em instantes.");
      return;
    }

    setMessage("Senha alterada com sucesso. Redirecionando para o painel...");

    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1200);
  }

  if (!ready) {
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
          <h1 style={{ marginBottom: 12 }}>Validando seu link</h1>

          <p style={{ color: "#4b5563", marginBottom: 16 }}>
            {sessionChecked
              ? "Estamos conferindo seu acesso para permitir a redefinição da senha."
              : "Aguarde um instante enquanto preparamos sua tela de redefinição."}
          </p>

          {message && (
            <p style={{ color: "#374151", marginBottom: 16 }}>
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={() => router.push("/login")}
            style={{
              padding: 12,
              width: "100%",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "white",
              color: "#111827",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Voltar para o login
          </button>
        </div>
      </main>
    );
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
          Digite sua nova senha para concluir o acesso à sua conta.
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
            disabled={loading}
            style={{
              padding: 12,
              width: "100%",
              borderRadius: 10,
              border: "none",
              background: "#0F2460",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: 16, color: "#111827" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}