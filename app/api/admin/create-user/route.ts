import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json()

    const trimmedEmail = email.trim()

    // Create admin client with service role key (bypasses RLS)
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const authUserExists = existingUsers?.users?.find((u) => u.email === trimmedEmail)

    const { data: existingProfile } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", trimmedEmail)
      .maybeSingle()

    if (authUserExists && existingProfile) {
      return NextResponse.json(
        { error: `A user with email "${trimmedEmail}" already exists. Please use a different email address.` },
        { status: 409 },
      )
    }

    let userId: string

    if (authUserExists && !existingProfile) {
      console.log("[v0] Auth user exists but profile missing, creating profile for existing user")
      userId = authUserExists.id
    } else {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: trimmedEmail,
        password,
        email_confirm: true,
        user_metadata: {
          name,
          role,
        },
      })

      if (authError) {
        console.error("[v0] Admin create user error:", authError)
        if (authError.message.includes("email_exists") || authError.message.includes("already been registered")) {
          return NextResponse.json(
            { error: `A user with email "${trimmedEmail}" already exists. Please use a different email address.` },
            { status: 409 },
          )
        }
        return NextResponse.json({ error: authError.message }, { status: 400 })
      }

      userId = authData.user.id
    }

    const { error: profileError } = await supabaseAdmin.from("users").upsert(
      {
        id: userId,
        email: trimmedEmail,
        name,
        role,
      },
      {
        onConflict: "id",
      },
    )

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId })
  } catch (error: any) {
    console.error("[v0] Create user API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
