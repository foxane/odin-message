import { useOutletContext, useParams } from 'react-router-dom';
import { ChatOutletContext } from '../App';
import ChatCard from '../components/ChatCard';
import ChatBubble from '../components/ChatBubble';
import { FaArrowLeft, FaUser, FaUsers } from 'react-icons/fa';
import { useUserContext } from '../hooks/useUserContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import ChatInput from '../components/ChatInput';

export default function ChatPage({ isGroup }: { isGroup: boolean }) {
  const { user } = useUserContext();
  const { groupList, chatList, addMessage } =
    useOutletContext<ChatOutletContext>();
  const { chatId } = useParams();

  const list = isGroup ? groupList : chatList;
  const activeChat = useMemo(() => {
    return chatId && list ? list.find(el => el.id === chatId) : null;
  }, [chatId, list]);

  const otherUser = activeChat?.members.find(usr => usr.id !== user?.id);

  const [messageInput, setMessageInput] = useState('');
  const handleSend = () => {
    if (!activeChat || !user) return;

    // This is temporary debug, adding new message will listen to socket
    // Maybe keeping it to show update directly to sender, without waiting server response
    addMessage({
      chatId: activeChat.id,
      content: messageInput,
      createdAt: new Date().toString(),
      id: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
      },
    });
    setMessageInput('');
  };

  const msgEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <section>
      <div className={activeChat ? ' hidden' : ''}>
        {list?.map(el => (
          <ChatCard
            to={`/${isGroup ? 'group' : 'chat'}/${el.id}`}
            active={el.id === activeChat?.id}
            chat={el}
            key={el.id}
          />
        ))}
      </div>

      {/* Conversation */}
      {activeChat && (
        <div className="h-dvh flex flex-col justify-between">
          {/* Conversation header */}
          <div className="flex items-center gap-2 p-5 bg-gray-600 fill-white text-white">
            <Link to={isGroup ? '/group' : '/chat'}>
              <FaArrowLeft size={35} fill="white" />
            </Link>
            {isGroup ? <FaUsers size={35} /> : <FaUser size={35} />}
            <p className="font-semibold">
              {isGroup ? activeChat.name : otherUser?.name}
            </p>
          </div>

          {/* Messages */}
          <div className="overflow-y-scroll">
            {activeChat.messages.map(el => (
              <ChatBubble key={el.id} message={el} />
            ))}
            <div ref={msgEndRef} />
          </div>

          <div className="flex gap-2 p-4">
            <ChatInput
              value={messageInput}
              setValue={setMessageInput}
              onSend={handleSend}
            />
          </div>
        </div>
      )}
    </section>
  );
}
