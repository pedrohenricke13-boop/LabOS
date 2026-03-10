import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
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
            maxWidth: 700,
            width: "100%",
            background: "white",
            borderRadius: 16,
            padding: 32,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: 12 }}>LabOS</h1>
          <p style={{ fontSize: 18, color: "#4b5563" }}>
            Você já está autenticado no sistema.
          </p>

          <div style={{ marginTop: 24 }}>
            <Link
              href="/dashboard"
              style={{
                display: "inline-block",
                padding: "12px 20px",
                borderRadius: 10,
                background: "#0F2460",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                marginRight: 12,
              }}
            >
              Ir para o Dashboard
            </Link>

            <Link
              href="/agenda"
              style={{
                display: "inline-block",
                padding: "12px 20px",
                borderRadius: 10,
                background: "#e5e7eb",
                color: "#111827",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Ir para a Agenda
            </Link>
          </div>
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
          maxWidth: 700,
          width: "100%",
          background: "white",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: 12 }}>LabOS</h1>
        <p style={{ fontSize: 18, color: "#4b5563" }}>
          Sistema de gestão e agendamento de equipamentos do laboratório.
        </p>

        <div style={{ marginTop: 24 }}>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              padding: "12px 20px",
              borderRadius: 10,
              background: "#0F2460",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Entrar no sistema
          </Link>
        </div>
      </div>
    </main>
  );
}