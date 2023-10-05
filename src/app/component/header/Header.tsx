
import Link from 'next/link';
import styles  from './header.module.scss';


export default function Header() {
    return (
      <header className={styles.header_container}>
        <nav className={styles.navbar}>
          <ul className={styles.nav_list}>
            <li className={styles.item}><Link className={styles.link} href='/'>Home</Link> </li>
            <li className={styles.item}><Link className={styles.link} href='/shop-cart'>cart</Link> </li>
          </ul>
        </nav>
      </header>
    )
  }