import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === 'admin'
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

    // Protect admin routes
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        // Allow access to admin routes only if user is logged in
        // Role check happens in the middleware function above
        return isAdminRoute ? !!token : true
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
