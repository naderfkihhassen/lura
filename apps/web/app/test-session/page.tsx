import { getSession } from "@/lib/session"
import Link from "next/link"

export default async function TestSession() {
  const session = await getSession()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Test</h1>

      {session && session.user ? (
        <div>
          <p className="mb-4">You are logged in as: {session.user.name}</p>
          <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4">You are not logged in.</p>
          <Link href="/auth/signin" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Sign In
          </Link>
        </div>
      )}

      <pre className="mt-8 p-4 bg-gray-100 rounded-md overflow-auto">{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

