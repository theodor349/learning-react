import Link from 'next/link';
import styles from './NavMenu.module.css';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { SignInButton, SignOutButton } from '@/components/ui/authButton';
import Image from 'next/image';



export default async function NavMenu() {
  const session = await getServerSession(options);

  if(session){
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
            <Link href={'/deck'}>Decks</Link>
          </li>
          <li>
            <Link href={'/card'}>Cards</Link>
          </li>
          <li>
            <SignOutButton/>
          </li>
        </ul>
      </nav>
    )
  }
  
  return (
    <nav className={styles.nav}>
      <div className='p-2'>
        <Link href={'/'}>Anki Cards</Link>
      </div>
      <ul className={styles.links}>
        <li>
          <SignInButton/>
        </li>
      </ul>
    </nav>
  );
}