import {
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const active = useLocation().pathname;

  return (
    <nav {...props}>
      <Link to={'/chat'}>
        <ChatBubbleLeftIcon
          className={`fill-gray-100 w-8 ${
            active.includes('/chat') ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
      <Link to={'/group'}>
        <UserGroupIcon
          className={`fill-gray-100 w-8 ${
            active.includes('/group') ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
      <Link to={'/settings'}>
        <Cog6ToothIcon
          className={`fill-gray-100 w-8 ${
            active.includes('/setting') ? ' fill-sky-400' : ''
          }`}
        />
      </Link>
    </nav>
  );
}
