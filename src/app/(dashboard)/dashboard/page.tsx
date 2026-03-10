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
    <main style={{ padding: 40 }}>
      <h1>Dashboard do LabOS</h1>
      <p>Você entrou com sucesso.</p>

      <div style={{ marginTop: 20 }}>
        <p><strong>Lab ID:</strong> {boot.labId}</p>
        <p><strong>User ID:</strong> {boot.userId}</p>
        <p><strong>Role:</strong> {boot.role}</p>
        <p><strong>Email:</strong> {boot.email}</p>
      </div>
    </main>
  );
}