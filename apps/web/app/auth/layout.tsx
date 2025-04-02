import type { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center">{children}</div>
}

export default AuthLayout

