import { FaUser } from 'react-icons/fa';
import { Message } from '../App';
import { useUserContext } from '../hooks/useUserContext';

export default function ChatBubble({ message }: Props) {
  // Infer if msg is received or sent
  const { user } = useUserContext();
  const isSend = user?.id === message.user.id;

  return (
    <div className={`w-full p-1 flex ${isSend ? 'justify-end' : ''}`}>
      <div className="max-w-96 flex items-start gap-2">
        {!isSend && (
          <p className="flex-col-reverse text-sm font-semibold">
            <FaUser size={30} />
            {message.user.name}
          </p>
        )}

        <div
          className={`p-3 bg-gray-500 text-white rounded-2xl min-w-44 ${
            isSend
              ? 'rounded-tr-none'
              : 'rounded-tl-none' /* Change radius based on send */
          }`}>
          <div className="text-sm">
            <p className="whitespace-pre-wrap">{message.content}</p>
            <p className="mt-2 text-end font-thin text-xs">
              {message.createdAt}
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
