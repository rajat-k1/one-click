// src/components/Navigation.js
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About Us</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        {/* Remove the Post link */}
        {/* <li className={styles.navItem}>
          <Link href="/post">Post</Link>
        </li> */}
      </ul>
    </nav>
  );
}
