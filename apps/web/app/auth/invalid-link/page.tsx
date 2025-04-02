import Link from "next/link"

const InvalidLinkPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
      <h1 className="text-center text-2xl font-bold mb-6 text-black">Invalid or Expired Link</h1>
      <p className="text-center mb-6 text-gray-600">
        The magic link you used is invalid or has expired. Please request a new one.
      </p>
      <div className="flex justify-center">
        <Link
          href="/auth/magic-link"
          className="px-4 py-2 border border-lura-accent text-lura-accent rounded-md hover:bg-lura-accent hover:text-white transition-colors"
        >
          Request New Link
        </Link>
      </div>
    </div>
  )
}

export default InvalidLinkPage

