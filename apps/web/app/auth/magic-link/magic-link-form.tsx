"use client"

import { requestMagicLink } from "@/lib/auth"
import { useState } from "react"
import { useFormState } from "react-dom"

const MagicLinkForm = () => {
  const [state, formAction] = useFormState(requestMagicLink, undefined)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    await formAction(formData)
    setIsLoading(false)
  }

  return (
    <form action={handleSubmit} className="w-full">
      {state?.success ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-md mb-4">
          <p>Check your email for a magic link to sign in!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {state?.error && (
            <p className="text-sm text-red-500 p-2 bg-red-50 rounded-md border border-red-200">{state.error}</p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name (optional)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70"
          >
            {isLoading ? "Sending..." : "Send Magic Link"}
          </button>
        </div>
      )}
    </form>
  )
}

export default MagicLinkForm

