import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, secret } = body;

    if (!email || !password || !secret) {
      return NextResponse.json(
        { error: "Email, senha e secret são obrigatórios." },
        { status: 400 }
      );
    }

    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: "Secret inválido." },
        { status: 401 }
      );
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: usersData, error: listError } = await admin.auth.admin.listUsers();

    if (listError) {
      return NextResponse.json(
        { error: listError.message },
        { status: 500 }
      );
    }

    const user = usersData.users.find(
      (u) => (u.email ?? "").toLowerCase() === String(email).toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado no Auth." },
        { status: 404 }
      );
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
    });

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao definir senha." },
      { status: 500 }
    );
  }
}