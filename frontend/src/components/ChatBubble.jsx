import { object } from 'prop-types';
import userIcon from '../assets/user.svg';
import useUser from '../hooks/useUser';

export default function ChatBubble({ message }) {
  // Infer if msg is received or sent
  const { user } = useUser();
  const isSend = user.id === message.user.id;

  return (
    <div className={`w-full p-2 flex ${isSend ? 'justify-end' : ''}`}>
      <div className="max-w-96 flex items-start gap-2">
        {!isSend && (
          <img
            src={userIcon}
            className="w-10 border rounded-full border-gray-700"
            alt="user icon"
          />
        )}

        <div
          className={`p-3 bg-gray-500 text-white rounded-2xl min-w-44 ${
            isSend
              ? 'rounded-tr-none'
              : 'rounded-tl-none' /* Change radius based on send */
          }`}>
          {/* Remove  user name if send*/}
          {!isSend && (
            <div className="mb-2 text-sm">
              <p className="font-bold">{message.user.name}</p>
            </div>
          )}

          <div className="text-sm">
            <p className="whitespace-pre-wrap">{message.content}</p>
            <p className="mt-2 text-end text-xs">{message.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  message: object,
};
