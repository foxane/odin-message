import { func, object } from 'prop-types';
import useUser from '../hooks/useUser';
import backArrow from '../assets/back.svg';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { useState, useRef, useEffect } from 'react';
import useMessage from '../hooks/useMessage';

export default function Conversation({ chat, closeChat }) {
  const { user } = useUser();
  const otherUserName = chat.members.find(usr => usr.id !== user.id).name;
  const [newMsgVal, setMsgVal] = useState('');
  const messagesEndRef = useRef(null);
  const { send } = useMessage(chat.id);

  const handleSendMsg = () => {
    send(newMsgVal);
    setMsgVal('');
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-fit flex p-5 gap-6 bg-gray-600 text-gray-100">
        <button
          onClick={e => {
            e.preventDefault();
            closeChat();
          }}>
          <img src={backArrow} className="w-10" />
        </button>

        <div className="flex-1 flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 rounded-full border-2 border-gray-300 bg-gray-700">
            <path
              d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
              fill="#ffffff"
            />
            <path
              d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
              fill="#ffffff"
            />
          </svg>

          <p className="text-2xl font-semibold">
            {chat.isGroup ? chat.name : otherUserName}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6">
        {chat.messages.length > 0 &&
          chat.messages.map(msg => <ChatBubble message={msg} key={msg.id} />)}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="w-full flex items-end gap-1 mb-20 px-6">
        <ChatInput
          value={newMsgVal}
          setValue={setMsgVal}
          onSend={handleSendMsg}
        />
      </div>
    </div>
  );
}

Conversation.propTypes = {
  chat: object,
  closeChat: func,
};
