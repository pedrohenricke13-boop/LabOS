"use client";

import { useState, type FormEvent } from "react";
import { createBooking } from "@/app/(dashboard)/agenda/actions";

type Equipment = {
  id: string;
  name: string;
};

export default function BookingForm({ equipments }: { equipments: Equipment[] }) {
  const [equipmentId, setEquipmentId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await createBooking({
      equipment_id: equipmentId,
      start_time: startTime,
      end_time: endTime,
      notes,
    });

    if (result.success) {
      setMessage("Agendamento criado com sucesso.");
      setEquipmentId("");
      setStartTime("");
      setEndTime("");
      setNotes("");
      location.reload();
    } else {
      setMessage(result.error ?? "Erro ao criar agendamento.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
      }}
    >
      <h2>Novo agendamento</h2>

      <div style={{ marginTop: 12 }}>
        <select
          required
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          style={{ padding: 10, width: 320 }}
        >
          <option value="">Selecione o equipamento</option>
          {equipments.map((equipment) => (
            <option key={equipment.id} value={equipment.id}>
              {equipment.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Início</label>
        <br />
        <input
          type="datetime-local"
          required
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={{ padding: 10, width: 320 }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Fim</label>
        <br />
        <input
          type="datetime-local"
          required
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={{ padding: 10, width: 320 }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Observações</label>
        <br />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ padding: 10, width: 320, minHeight: 100 }}
        />
      </div>

      <button type="submit" style={{ marginTop: 16, padding: 10 }}>
        Criar agendamento
      </button>

      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </form>
  );
}