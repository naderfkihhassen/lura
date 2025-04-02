import Link from "next/link"
import SignInButton from "../SignInButton"
import LuraLogo from "../LuraLogo"

const AppBar = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <LuraLogo />

      <div className="flex items-center space-x-8">
        <Link href="/" className="text-black hover:text-lura-accent transition-colors">
          Home
        </Link>
        <Link href="/features" className="text-black hover:text-lura-accent transition-colors">
          Features
        </Link>
        <Link href="/demo" className="text-black hover:text-lura-accent transition-colors">
          Demo
        </Link>
        <Link href="/pricing" className="text-black hover:text-lura-accent transition-colors">
          Pricing
        </Link>
        <Link href="/workspaces" className="text-black hover:text-lura-accent transition-colors">
          Workspaces
        </Link>
      </div>

      <SignInButton />
    </div>
  )
}

export default AppBar

