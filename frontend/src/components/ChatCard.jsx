import { object, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.svg';
import { shortenString } from '../lib/utils';

export default function ChatCard({ chat, active }) {
  const message = chat.messages[0];

  return (
    <Link
      className={`flex w-full min-w-64 gap-2 p-2 border-b border-black active:bg-gray-300 ${
        active ? ' bg-gray-300' : ''
      }`}>
      <img className="block w-10" src={userIcon} alt="user avatar" />
      <div className="flex flex-col">
        <p className="font-semibold">{shortenString(message.user.name)}</p>
        <p className="text-sm font-light">{shortenString(message.content)}</p>
      </div>
    </Link>
  );
}

ChatCard.propTypes = {
  chat: object,
  active: bool,
};
