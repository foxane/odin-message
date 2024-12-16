import { object, bool } from 'prop-types';
import { getTime } from '../lib/utils';
import userIcon from '../assets/user.svg';
import groupIcon from '../assets/group.svg';
import useUser from '../hooks/useUser';

export default function ChatCard({ chat, active, ...props }) {
  const { user } = useUser();
  const latestMsg = chat.messages[chat.messages.length - 1];
  const otherUserName = chat.members.find(usr => usr.id !== user.id).name;

  return (
    <button
      {...props}
      className={`w-full flex min-h-20 items-center min-w-64 gap-2 p-2 border-b border-black active:bg-gray-300 hover:bg-gray-200 ${
        active ? 'bg-gray-300' : ''
      }`}>
      <img
        className="block w-10"
        src={chat.isGroup ? groupIcon : userIcon}
        alt="user avatar"
      />

      <div className="flex-1 flex flex-col items-start justify-start overflow-hidden">
        <p className="font-semibold truncate">
          {chat.isGroup ? chat.name : otherUserName}
        </p>
        <p className="w-full text-sm font-light truncate">
          {latestMsg.content}
        </p>
      </div>

      <p className="text-end me-6 font-normal">
        {getTime(latestMsg.createdAt)}
      </p>
    </button>
  );
}

ChatCard.propTypes = {
  chat: object,
  active: bool,
};
