import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";

export default async function MaintenancePage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return <main style={{ padding: 40 }}>Usuário não autenticado.</main>;
  }

  const supabase = await createClient();

  const { data: items } = await supabase
    .from("maintenance_records")
    .select("id, type, description, scheduled_for, status")
    .eq("lab_id", boot.labId)
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: 40 }}>
      <h1>Manutenção</h1>

      <div style={{ marginTop: 20 }}>
        {(items ?? []).length === 0 ? (
          <p>Nenhuma manutenção registrada.</p>
        ) : (
          items?.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <p><strong>Tipo:</strong> {item.type}</p>
              <p><strong>Descrição:</strong> {item.description || "—"}</p>
              <p><strong>Agendado para:</strong> {item.scheduled_for || "—"}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}