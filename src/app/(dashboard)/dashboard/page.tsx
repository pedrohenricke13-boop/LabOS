import Link from "next/link";
import { bootstrapUser } from "@/lib/bootstrap-user";

export default async function DashboardPage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Dashboard do LabOS</h1>
        <p>Usuário não autenticado.</p>
      </main>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Dashboard do LabOS</h1>
      <p style={{ color: "#4b5563", marginBottom: 24 }}>
        Bem-vindo, {boot.email}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <Link
          href="/agenda"
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            textDecoration: "none",
            color: "#111827",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3>Agenda</h3>
          <p>Agende equipamentos e veja reservas do laboratório.</p>
        </Link>

        <Link
          href="/equipments"
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            textDecoration: "none",
            color: "#111827",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3>Equipamentos</h3>
          <p>Veja os equipamentos disponíveis e seus status.</p>
        </Link>

        <Link
          href="/reagents"
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            textDecoration: "none",
            color: "#111827",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3>Reagentes</h3>
          <p>Consulte reagentes e informações de validade.</p>
        </Link>

        <Link
          href="/maintenance"
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            textDecoration: "none",
            color: "#111827",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3>Manutenção</h3>
          <p>Acompanhe registros de manutenção dos equipamentos.</p>
        </Link>

        <Link
          href="/admin"
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            textDecoration: "none",
            color: "#111827",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3>Admin</h3>
          <p>Gerencie treinamentos, usuários e configurações.</p>
        </Link>
      </div>

      <div style={{ marginTop: 24, color: "#6b7280", fontSize: 14 }}>
        <p><strong>Lab ID:</strong> {boot.labId}</p>
        <p><strong>User ID:</strong> {boot.userId}</p>
        <p><strong>Role:</strong> {boot.role}</p>
      </div>
    </div>
  );
}