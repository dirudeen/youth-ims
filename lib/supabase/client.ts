import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if credentials are valid
  if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith("http")) {
    console.warn("[v0] Supabase credentials not configured or invalid. Client will return null.")
    return null
  }

  return createSupabaseBrowserClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        // Get cookie from document.cookie
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop()?.split(";").shift()
      },
      set(name: string, value: string, options: any) {
        // Set cookie in document.cookie
        let cookie = `${name}=${value}`
        if (options?.maxAge) cookie += `; max-age=${options.maxAge}`
        if (options?.path) cookie += `; path=${options.path}`
        if (options?.domain) cookie += `; domain=${options.domain}`
        if (options?.sameSite) cookie += `; samesite=${options.sameSite}`
        if (options?.secure) cookie += "; secure"
        document.cookie = cookie
      },
      remove(name: string, options: any) {
        // Remove cookie by setting max-age to 0
        let cookie = `${name}=; max-age=0`
        if (options?.path) cookie += `; path=${options.path}`
        if (options?.domain) cookie += `; domain=${options.domain}`
        document.cookie = cookie
      },
    },
  })
}

export function createClient() {
  return createBrowserClient()
}
