import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { bootstrapUser } from "@/lib/bootstrap-user";

export async function POST(request: Request) {
  const boot = await bootstrapUser();

  if (!boot || boot.role !== "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const supabase = await createClient();
  const formData = await request.formData();

  const user_id = String(formData.get("user_id") || "");
  const equipment_id = String(formData.get("equipment_id") || "");
  const instructor_name = String(formData.get("instructor_name") || "");
  const trained_at = String(formData.get("trained_at") || "");
  const valid_untilRaw = String(formData.get("valid_until") || "");
  const valid_until = valid_untilRaw || null;

  await supabase.from("trainings").upsert({
    lab_id: boot.labId,
    user_id,
    equipment_id,
    instructor_name: instructor_name || null,
    trained_at,
    valid_until,
  });

  return NextResponse.redirect(new URL("/admin/trainings", request.url));
}