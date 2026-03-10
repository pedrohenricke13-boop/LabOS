import { createClient } from "@/lib/supabase/server";

const INTERNAL_ADMIN_EMAILS = [
  "pedrohenricke13@gmail.com",
];

export async function bootstrapUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const email = user.email ?? "";
  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    email.split("@")[0] ||
    "Usuário";

  await supabase.from("users").upsert({
    id: user.id,
    full_name: fullName,
    email,
    avatar_url: user.user_metadata?.avatar_url ?? null,
  });

  const { data: internalLab } = await supabase
    .from("labs")
    .select("id")
    .eq("slug", "biotecfarm-ufpb")
    .single();

  if (!internalLab) return null;

  const desiredRole = INTERNAL_ADMIN_EMAILS.includes(email.toLowerCase())
    ? "admin"
    : "researcher";

  const { data: existingMember } = await supabase
    .from("lab_members")
    .select("id, role")
    .eq("lab_id", internalLab.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!existingMember) {
    await supabase.from("lab_members").insert({
      lab_id: internalLab.id,
      user_id: user.id,
      role: desiredRole,
      active: true,
    });
  }

  return {
    userId: user.id,
    labId: internalLab.id,
    role: existingMember?.role ?? desiredRole,
    email,
  };
}