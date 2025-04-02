import { getSession } from "@/lib/session"
import Link from "next/link"

const SignInButton = async () => {
  const session = await getSession()

  if (!session || !session.user) {
    return (
      <Link
        href="/auth/signin"
        className="px-6 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard" className="text-black hover:text-black">
        Dashboard
      </Link>
      <Link href="/workspaces" className="text-black hover:text-black">
        Workspaces
      </Link>
      <span className="text-black">{session.user.name}</span>
      <a
        href="/api/auth/signout"
        className="px-4 py-1 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
      >
        Logout
      </a>
    </div>
  )
}

export default SignInButton

