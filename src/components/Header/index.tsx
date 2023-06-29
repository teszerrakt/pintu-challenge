import Link from 'next/link'
import PintuIcon from 'src/components/Icons/Pintu'

function Header() {
  return (
    <header className="flex items-center p-4 md:px-0 md:py-8">
      <Link href="/">
        <PintuIcon />
      </Link>
    </header>
  )
}

export default Header
