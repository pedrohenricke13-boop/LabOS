import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";

export default async function AdminTrainingsPage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return <main style={{ padding: 40 }}>Usuário não autenticado.</main>;
  }

  if (boot.role !== "admin") {
    return (
      <main style={{ padding: 40 }}>
        <h1>Treinamentos</h1>
        <p>Acesso restrito a administradores.</p>
      </main>
    );
  }

  const supabase = await createClient();

  const { data: users } = await supabase
    .from("users")
    .select("id, full_name, email")
    .order("full_name");

  const { data: equipments } = await supabase
    .from("equipments")
    .select("id, name")
    .eq("lab_id", boot.labId)
    .order("name");

  return (
    <main style={{ padding: 40 }}>
      <h1>Registrar Treinamento</h1>

      <form
        action="/admin/trainings/create"
        method="post"
        style={{
          marginTop: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          maxWidth: 500,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <label>Usuário</label>
          <br />
          <select name="user_id" required style={{ padding: 10, width: "100%" }}>
            <option value="">Selecione</option>
            {(users ?? []).map((user) => (
              <option key={user.id} value={user.id}>
                {user.full_name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Equipamento</label>
          <br />
          <select name="equipment_id" required style={{ padding: 10, width: "100%" }}>
            <option value="">Selecione</option>
            {(equipments ?? []).map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                {equipment.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Instrutor</label>
          <br />
          <input name="instructor_name" style={{ padding: 10, width: "100%" }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Data do treinamento</label>
          <br />
          <input type="date" name="trained_at" required style={{ padding: 10, width: "100%" }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Válido até</label>
          <br />
          <input type="date" name="valid_until" style={{ padding: 10, width: "100%" }} />
        </div>

        <button type="submit" style={{ padding: 10 }}>
          Registrar treinamento
        </button>
      </form>
    </main>
  );
}