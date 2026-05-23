import { NextResponse } from "next/server";
import { contactSchema, sanitizeHtml, checkRateLimit } from "@/lib/security";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`contact:${ip}`, 3, 60000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();

    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.issues }, { status: 400 });
    }

    const sanitized = {
      name: sanitizeHtml(result.data.name),
      email: sanitizeHtml(result.data.email),
      subject: sanitizeHtml(result.data.subject),
      message: sanitizeHtml(result.data.message),
    };

    const supabase = await createAdminClient();
    const { error } = await supabase.from("contact_messages").insert([
      { ...sanitized, created_at: new Date().toISOString() },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
