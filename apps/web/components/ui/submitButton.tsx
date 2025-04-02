"use client"

import type React from "react"
import { useFormStatus } from "react-dom"

export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-lura-accent text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Processing..." : children}
    </button>
  )
}

