import Link from 'next/link'

function Navigation() {
  return (
    <nav>
      <Link href="/">
        <a> Ana Sayfa</a>
      </Link>
      <Link href="/about">
        <a> Hakkimda</a>
      </Link>
    </nav>
  )
}

export default Navigation
