import { FaComments } from 'react-icons/fa';
import { FaGear, FaUserGroup } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const active = useLocation().pathname;

  return (
    <nav {...props}>
      <Link to={'/chat'}>
        <FaComments
          size={35}
          className={`fill-gray-100 ${
            active.includes('/chat') ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
      <Link to={'/group'}>
        <FaUserGroup
          size={35}
          className={`fill-gray-100 ${
            active.includes('/group') ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
      <Link to={'/settings'}>
        <FaGear
          size={35}
          className={`fill-gray-100 ${
            active.includes('/setting') ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
    </nav>
  );
}
