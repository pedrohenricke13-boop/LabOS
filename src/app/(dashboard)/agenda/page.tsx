import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";
import BookingForm from "@/components/agenda/BookingForm";

export default async function AgendaPage() {
  const boot = await bootstrapUser();

  if (!boot) {
    return <main style={{ padding: 40 }}>Usuário não autenticado.</main>;
  }

  const supabase = await createClient();

  const { data: equipments } = await supabase
    .from("equipments")
    .select("id, name")
    .eq("lab_id", boot.labId)
    .eq("status", "active")
    .order("name");

  const { data: bookings, error } = await supabase
    .from("bookings_detailed")
    .select("*")
    .eq("lab_id", boot.labId)
    .order("start_time", { ascending: true });

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Agenda</h1>
        <p>Erro: {error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Agenda do laboratório</h1>

      <BookingForm equipments={equipments ?? []} />

      <div style={{ marginTop: 20 }}>
        {(bookings ?? []).length === 0 ? (
          <p>Nenhum agendamento registrado ainda.</p>
        ) : (
          bookings?.map((booking) => (
            <div
              key={booking.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <h3>{booking.equipment_name}</h3>
              <p><strong>Responsável:</strong> {booking.user_name}</p>
              <p><strong>Email:</strong> {booking.user_email}</p>
              <p><strong>Início:</strong> {booking.start_time}</p>
              <p><strong>Fim:</strong> {booking.end_time}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}