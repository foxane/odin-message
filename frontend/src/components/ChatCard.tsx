import { FaUser, FaUsers } from 'react-icons/fa';
import { Chat } from '../App';
import { useUserContext } from '../hooks/useUserContext';
import { LinkProps, Link } from 'react-router-dom';

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
      {chat.isGroup ? <FaUsers size={30} /> : <FaUser size={30} />}

      <div className="flex-1 flex flex-col items-start justify-start overflow-hidden">
        <p className="font-semibold truncate">
          {chat.isGroup ? chat.name : otherUserName?.name}
        </p>
        <p className="w-full text-sm font-light truncate">
          {latestMsg?.content}
        </p>
      </div>

      <p className="text-end me-6 font-normal">{latestMsg?.createdAt}</p>
    </Link>
  );
}

interface Props extends LinkProps {
  chat: Chat;
  active: boolean;
}
