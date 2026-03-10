import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";

export default async function EquipmentsPage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return <main style={{ padding: 40 }}>Usuário não autenticado.</main>;
  }

  const supabase = await createClient();

  const { data: equipments, error } = await supabase
    .from("equipments")
    .select("id, name, type, status, location, requires_training")
    .eq("lab_id", boot.labId)
    .order("name");

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Equipamentos</h1>
        <p>Erro: {error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Equipamentos</h1>

      <div style={{ marginTop: 20 }}>
        {(equipments ?? []).map((equipment) => (
          <div
            key={equipment.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <h3>{equipment.name}</h3>
            <p>Tipo: {equipment.type}</p>
            <p>Status: {equipment.status}</p>
            <p>Local: {equipment.location || "Não informado"}</p>
            <p>
              Treinamento: {equipment.requires_training ? "Obrigatório" : "Não obrigatório"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}