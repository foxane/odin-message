import { FaComments } from 'react-icons/fa';
import { FaGear, FaUserGroup } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const active = useLocation().pathname;

  return (
    <nav className="h-full flex justify-evenly items-center">
      <Link to={'/chat'}>
        <FaComments
          size={35}
          className={`fill-gray-100 ${
            active === '/chat' ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
      <Link to={'/group'}>
        <FaUserGroup
          size={35}
          className={`fill-gray-100 ${
            active === '/group' ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
      <Link to={'/settings'}>
        <FaGear
          size={35}
          className={`fill-gray-100 ${
            active === '/settings' ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
    </nav>
  );
}
