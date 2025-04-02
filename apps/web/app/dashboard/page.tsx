import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Dashboard() {
  const session = await getSession()
  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link
              href="/workspaces"
              className="block p-3 bg-lura-light text-lura-primary rounded-md hover:bg-lura-accent hover:text-white transition-colors"
            >
              View Workspaces
            </Link>
            <Link
              href="/profile"
              className="block p-3 bg-lura-light text-lura-primary rounded-md hover:bg-lura-accent hover:text-white transition-colors"
            >
              My Profile
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {session.user.name}
            </p>
            <p>
              <span className="font-medium">Role:</span> {session.user.role}
            </p>
            <p>
              <span className="font-medium">User ID:</span> {session.user.id}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  )
}

