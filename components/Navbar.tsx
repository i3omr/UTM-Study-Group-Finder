import Link from 'next/link';
import { buttonVariants } from './ui/button';
const Navbar = () => {
  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;

/*<Link className={buttonVariants()} href='/auth/login'>
          login
        </Link>*/