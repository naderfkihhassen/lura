import { getSession } from "@/lib/session"
import Link from "next/link"

export default async function Home() {
  const session = await getSession()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Lura</h1>
        <p className="text-xl text-gray-600 mb-8">The intelligent legal platform that streamlines your workflow</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session && session.user ? (
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-black text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="px-8 py-3 bg-black text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
          )}
          <Link
            href="/features"
            className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

