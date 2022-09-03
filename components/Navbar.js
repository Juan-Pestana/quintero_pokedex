import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.imageContainer}>
          <Image
            src="/images/TituloUniversoPokemon.png"
            layout="fixed"
            width={140}
            height={50}
          />
        </a>
      </Link>

      <nav>
        <ul className={styles.links}>
          <li>
            <Link href="/">
              <a>Busqueda</a>
            </Link>
          </li>
          <li>
            <Link href="/listado">
              <a>Listado</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
