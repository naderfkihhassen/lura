"use server"

import { redirect } from "next/navigation"
import { BACKEND_URL } from "./constants"
import { z } from "zod"
import type { FormState } from "./type"

// Schema for magic link request
const MagicLinkSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  name: z.string().optional(),
})

type MagicLinkState =
  | {
      error?: string
      success?: boolean
    }
  | undefined

export async function signIn(prevState: FormState, formData: FormData): Promise<FormState> {
  // This is a stub since we're using Google and Magic Link auth
  // We'll redirect to the signin page with both options
  redirect("/auth/signin")
}

export async function signUp(prevState: FormState, formData: FormData): Promise<FormState> {
  // This is a stub since we're using Google and Magic Link auth
  // We'll redirect to the signin page with both options
  redirect("/auth/signin")
}

export async function requestMagicLink(state: MagicLinkState, formData: FormData): Promise<MagicLinkState> {
  const validatedFields = MagicLinkSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  })

  if (!validatedFields.success) {
    return {
      error: "Please enter a valid email address.",
    }
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/request-magic-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        error: errorData.message || `Error: ${response.statusText}`,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Magic link request error:", error)
    return {
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.accessToken
  } catch (error) {
    console.error("Error refreshing token:", error)
    return null
  }
}

