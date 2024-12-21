import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

interface ChatHeaderProps {
  isGroup: boolean;
  chatName: string;
  showBackButton?: boolean;
}

export function ChatHeader({
  isGroup,
  chatName,
  showBackButton = false,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-2 h-16 ps-10 bg-gray-700 fill-white text-white">
      {showBackButton && (
        <Link to={isGroup ? '/group' : '/chat'} className="pe-5 lg:hidden">
          <ArrowLeftIcon className="w-9" />
        </Link>
      )}
      {isGroup ? (
        <UserGroupIcon className="w-8 fill-white" />
      ) : (
        <UserIcon className="w-8 fill-white" />
      )}
      <p className="font-semibold">{chatName}</p>
    </div>
  );
}
