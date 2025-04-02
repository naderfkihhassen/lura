"use client"
import { BACKEND_URL } from "@/lib/constants"
import Link from "next/link"

const SignInForm = () => {
  // Since we're using Google and Magic Link auth, this form is just for reference
  // We'll redirect to the actual signin page with both options
  return (
    <div className="flex flex-col gap-4 w-full">
      <Link
        href="/auth/magic-link"
        className="block w-full mb-4 px-4 py-2 bg-black text-white rounded-md text-center hover:bg-opacity-90 transition-colors"
      >
        Sign in with Magic Link
      </Link>

      <div className="w-full flex items-center my-4">
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

export default SignInForm

