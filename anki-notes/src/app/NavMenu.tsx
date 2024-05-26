import Link from 'next/link';
import styles from './NavMenu.module.css';
import Image from 'next/image';

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <div className='p-2'>
        <Link href={'/'}>Anki Cards</Link>
      </div>
      <ul className={styles.links}>
        <li>
          <Link href={'/practice'}>Practice</Link>
        </li>
        <li>
          <Link href={'/decks'}>Decks</Link>
        </li>
        <li>
          <Link href={'/cards'}>Cards</Link>
        </li>
      </ul>
    </nav>
  );
}