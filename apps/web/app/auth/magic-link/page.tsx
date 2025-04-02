import MagicLinkForm from "./magic-link-form"
import { BACKEND_URL } from "@/lib/constants"

const MagicLinkPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
      <h1 className="text-center text-2xl font-bold mb-4 text-black">Sign In to Lura</h1>
      <p className="text-center mb-6 text-gray-600">
        Enter your email address and we'll send you a magic link to sign in.
      </p>
      <MagicLinkForm />

      <div className="w-full flex items-center my-6">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <a
        className="block w-full px-4 py-2 rounded-md border border-gray-200 text-black text-center hover:bg-gray-50 transition-colors"
        href={`${BACKEND_URL}/auth/google/login`}
      >
        Sign In With Google
      </a>
    </div>
  )
}

export default MagicLinkPage

