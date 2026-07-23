import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth-session";

interface GalleryBody {
  title?: string;
  alt?: string;
  category?: string;
  imageUrl?: string;
}

function readCookie(cookieHeader: string | null, name: string) {
  return cookieHeader
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export async function POST(request: Request) {
  const session = await verifySessionToken(readCookie(request.headers.get("cookie"), "mkyt_session"));

  if (session?.role !== "admin") {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  const body = (await request.json()) as GalleryBody;
  if (!body.title || !body.category || !body.imageUrl) {
    return NextResponse.json(
      { error: "Title, category and image URL are required." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("gallery").insert({
      title: body.title,
      category: body.category,
      alt_text: body.alt || body.title,
      image_url: body.imageUrl,
      is_published: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
