import Link from "next/link"

const CheckEmailPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
      <h1 className="text-center text-2xl font-bold mb-6 text-black">Check Your Email</h1>
      <p className="text-center mb-4 text-gray-600">
        We've sent a magic link to your email address. Click the link in the email to sign in.
      </p>
      <p className="text-center text-sm text-gray-500 mb-6">If you don't see the email, check your spam folder.</p>
      <div className="flex justify-center">
        <Link
          href="/auth/magic-link"
          className="px-4 py-2 border border-lura-accent text-lura-accent rounded-md hover:bg-lura-accent hover:text-white transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}

export default CheckEmailPage

