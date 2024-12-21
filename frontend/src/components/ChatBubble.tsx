import { Message } from '../App';
import { useUserContext } from '../hooks/useUserContext';
import { getTime } from '../lib/utils';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function ChatBubble({ message }: Props) {
  // Infer if msg is received or sent
  const { user } = useUserContext();
  const isSend = user?.id === message.user.id;

  return (
    <div className={`w-full p-1 flex ${isSend ? 'justify-end' : ''}`}>
      <div className="max-w-96 flex items-start gap-1">
        {!isSend && (
          <div className="">
            <UserCircleIcon className="w-8" />
          </div>
        )}

        <div
          className={`p-3 bg-gray-700 text-white rounded-2xl min-w-44 ${
            isSend
              ? 'rounded-tr-none'
              : 'rounded-tl-none' /* Change radius based on send */
          }`}>
          {!isSend && (
            <p className="text-xs mb-1 font-semibold">{message.user.name}</p>
          )}
          <div className="text-sm">
            <p className="break-words">{message.content}</p>
            <p className="mt-0.5 text-end font-thin text-xs">
              {getTime(message.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  message: Message;
}
