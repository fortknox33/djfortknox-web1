import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Skipping session update.')
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh the session if it's expired
  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // Route protection
  if (url.pathname.startsWith('/admin')) {
    if (!user) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Secondary check for restricted email if configured
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@djfortknox.de'
    if (user.email !== adminEmail) {
      // Sign out and redirect if email doesn't match
      await supabase.auth.signOut()
      url.pathname = '/login'
      url.searchParams.set('error', 'Unauthorized')
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from login page
  if (url.pathname === '/login' && user) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@djfortknox.de'
    if (user.email === adminEmail) {
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
