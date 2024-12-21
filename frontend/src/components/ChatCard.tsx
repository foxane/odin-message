import { Chat } from '../App';
import { useUserContext } from '../hooks/useUserContext';
import { LinkProps, Link } from 'react-router-dom';
import { getTime } from '../lib/utils';
import { UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';

export default function ChatCard({ chat, active, ...props }: Props) {
  const { user } = useUserContext();
  const latestMsg =
    chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
  const otherUserName = chat.members.find(usr => usr.id !== user?.id);

  return (
    <Link
      {...props}
      className={`w-full flex items-center min-w-64 gap-2 p-2 border-b border-black active:bg-gray-300 hover:bg-gray-200 ${
        active ? 'bg-gray-300' : ''
      }`}>
      {chat.isGroup ? (
        <UserGroupIcon className="w-10" />
      ) : (
        <UserIcon className="w-10" />
      )}

      <div className="flex-1 flex flex-col items-start justify-start overflow-hidden">
        <p className="font-semibold truncate">
          {chat.isGroup ? chat.name : otherUserName?.name}
        </p>
        <p className="w-full text-sm font-light truncate">
          {latestMsg?.content}
        </p>
      </div>

      <p className="text-end me-6 text-sm font-light">
        {latestMsg && getTime(latestMsg.createdAt)}
      </p>
    </Link>
  );
}

interface Props extends LinkProps {
  chat: Chat;
  active: boolean;
}
