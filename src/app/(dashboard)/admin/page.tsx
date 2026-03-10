import { bootstrapUser } from "@/lib/bootstrap-user";

export default async function AdminPage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return <main style={{ padding: 40 }}>Usuário não autenticado.</main>;
  }

  if (boot.role !== "admin") {
    return (
      <main style={{ padding: 40 }}>
        <h1>Admin</h1>
        <p>Acesso restrito a administradores.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Painel Admin</h1>
      <p>Você está logado como administrador.</p>

      <ul style={{ marginTop: 20 }}>
        <li>
          <a href="/admin/trainings">Registrar treinamentos</a>
        </li>
        <li>
          <a href="/reagents">Gerenciar reagentes</a>
        </li>
        <li>
          <a href="/maintenance">Gerenciar manutenção</a>
        </li>
      </ul>
    </main>
  );
}