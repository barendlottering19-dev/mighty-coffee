import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { loginSchema, checkRateLimit } from "@/lib/security";
import { createAdminClient } from "@/lib/supabase/server";

function hashPassword(password: string): string {
  return createHash("sha256").update(password + (process.env.ADMIN_SECRET || "secret")).digest("hex");
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`auth:${ip}`, 5, 60000)) {
      return NextResponse.json({ error: "Too many login attempts." }, { status: 429 });
    }

    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid credentials format" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", result.data.email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const hashed = hashPassword(result.data.password);
    if (hashed !== user.password_hash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const { error: logError } = await supabase.from("audit_logs").insert([
      {
        user_id: user.id,
        action: "login",
        details: "Admin login",
        ip_address: ip,
        created_at: new Date().toISOString(),
      },
    ]);

    if (logError) console.error("Audit log error:", logError);

    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
    response.cookies.set("admin_session", btoa(JSON.stringify({ userId: user.id, email: user.email, role: user.role })), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4,
    });

    return response;
  } catch (err) {
    console.error("Auth API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("admin_session")?.value;
  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  try {
    const session = JSON.parse(atob(sessionCookie));
    return NextResponse.json({ authenticated: true, user: session });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
