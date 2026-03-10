import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";

export default async function ReagentsPage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return <main style={{ padding: 40 }}>Usuário não autenticado.</main>;
  }

  const supabase = await createClient();

  const { data: reagents } = await supabase
    .from("reagents")
    .select("id, name, category, supplier, quantity, unit, expiry_date, storage_location")
    .eq("lab_id", boot.labId)
    .order("name");

  return (
    <main style={{ padding: 40 }}>
      <h1>Reagentes</h1>

      <div style={{ marginTop: 20 }}>
        {(reagents ?? []).length === 0 ? (
          <p>Nenhum reagente cadastrado.</p>
        ) : (
          reagents?.map((reagent) => (
            <div
              key={reagent.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <h3>{reagent.name}</h3>
              <p>Categoria: {reagent.category || "—"}</p>
              <p>Fornecedor: {reagent.supplier || "—"}</p>
              <p>Quantidade: {reagent.quantity} {reagent.unit || ""}</p>
              <p>Validade: {reagent.expiry_date || "—"}</p>
              <p>Armazenamento: {reagent.storage_location || "—"}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}