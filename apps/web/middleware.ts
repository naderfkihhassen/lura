import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "./lib/session"

export async function middleware(req: NextRequest) {
  // Remove the exception for workspaces - now it requires authentication
  const session = await getSession()

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/auth/signin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/profile", "/workspaces"],
}

