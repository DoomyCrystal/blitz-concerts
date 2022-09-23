import Link from "next/link"

function Nav() {
  return (
    <nav>
      Navigation:
      <ol>
        <li>
          <Link href="/concerts">
            <a><strong>Concerts</strong></a>
          </Link>
        </li>
        <li>
          <Link href="/bands">
            <a><strong>Bands</strong></a>
          </Link>
        </li>
      </ol>
    </nav>
  )
}

export default Nav