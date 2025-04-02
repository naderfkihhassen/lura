import type React from "react"
import Link from "next/link"

interface LuraLogoProps {
  className?: string
}

const LuraLogo: React.FC<LuraLogoProps> = ({ className = "" }) => {
  return (
    <Link href="/" className={`font-serif text-3xl font-bold text-black ${className}`}>
      Lura
    </Link>
  )
}

export default LuraLogo

