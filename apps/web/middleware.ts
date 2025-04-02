import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "./lib/session"

export async function middleware(req: NextRequest) {
  // Skip authentication for the workspace page
  if (req.nextUrl.pathname === "/workspaces") {
    return NextResponse.next()
  }

  const session = await getSession()

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/auth/signin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/profile", "/workspaces"],
}

