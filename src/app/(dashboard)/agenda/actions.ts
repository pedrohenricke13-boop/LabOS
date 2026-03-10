"use server";

import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";

type BookingInput = {
  equipment_id: string;
  start_time: string;
  end_time: string;
  notes?: string;
};

export async function createBooking(input: BookingInput) {
  const boot = await bootstrapUser();

  if (!boot) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const supabase = await createClient();

  const { data: trainingCheck, error: trainingError } = await supabase.rpc(
    "has_valid_training",
    {
      p_user_id: boot.userId,
      p_equipment_id: input.equipment_id,
    }
  );

  if (trainingError) {
    return { success: false, error: trainingError.message };
  }

  if (!trainingCheck) {
    return {
      success: false,
      error: "Você não possui treinamento válido para este equipamento.",
    };
  }

  const { error } = await supabase.from("bookings").insert({
    lab_id: boot.labId,
    equipment_id: input.equipment_id,
    user_id: boot.userId,
    start_time: input.start_time,
    end_time: input.end_time,
    notes: input.notes || null,
    status: "confirmed",
  });

  if (error) {
    if (error.code === "23P01") {
      return {
        success: false,
        error: "Conflito de horário: equipamento já reservado nesse período.",
      };
    }

    return { success: false, error: error.message };
  }

  await supabase.from("notifications").insert({
    user_id: boot.userId,
    lab_id: boot.labId,
    type: "booking_created",
    title: "Agendamento criado",
    body: "Seu agendamento foi criado com sucesso.",
    link: "/agenda",
  });

  return { success: true };
}