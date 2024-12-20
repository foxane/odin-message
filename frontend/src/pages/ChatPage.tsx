import { useOutletContext, useParams } from 'react-router-dom';
import { ChatOutletContext, Message } from '../App';
import ChatCard from '../components/ChatCard';
import ChatBubble from '../components/ChatBubble';
import { FaArrowLeft, FaUser, FaUsers } from 'react-icons/fa';
import { useUserContext } from '../hooks/useUserContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import ChatInput from '../components/ChatInput';
import { formatDate } from '../lib/utils';
import { Fragment } from 'react';
import ScreenSize from '../components/ui/ScreenSize';
import { BiSearch } from 'react-icons/bi';

export default function ChatPage({ isGroup }: { isGroup: boolean }) {
  const { user } = useUserContext();
  const { groupList, chatList, addMessage, loading, error } =
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

  // Group message by date
  const groupedMessages = activeChat?.messages.reduce((acc, message) => {
    const dateKey = formatDate(message.createdAt);
    (acc[dateKey] ??= []).push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const msgEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'instant' });
  });

  return (
    <section className="w-full lg:flex">
      <div
        className={`border-r border-gray-700 ${
          activeChat ? ' hidden' : ''
        }  lg:block lg:w-4/12 lg:bg-gray-400`}>
        <div className="bg-gray-700 h-16 ps-3 flex justify-between items-center">
          <p className="font-bold text-xl text-white">
            {isGroup ? 'Groups' : 'Chats'}
          </p>
          <button className="me-3 rounded-md p-1 hover:bg-gray-500">
            <BiSearch fill="white" size={25} />
          </button>
        </div>

        {/* Chat lists */}
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
        <div className="h-dvh grid lg:w-8/12">
          {/* Conversation header */}
          <div className="flex items-center gap-2 h-16 ps-10 bg-gray-700 fill-white text-white">
            <Link to={isGroup ? '/group' : '/chat'} className="pe-5 lg:hidden">
              <FaArrowLeft size={35} fill="white" />
            </Link>
            {isGroup ? <FaUsers size={35} /> : <FaUser size={35} />}
            <p className="font-semibold">
              {isGroup ? activeChat.name : otherUser?.name}
            </p>
          </div>

          {/* Messages */}
          <div className="overflow-y-scroll">
            {Object.entries(groupedMessages ?? {}).map(([date, messages]) => (
              <Fragment key={date}>
                <div className="text-center text-sm text-black my-4">
                  {date}
                </div>
                {messages.map(message => (
                  <ChatBubble key={message.id} message={message} />
                ))}
              </Fragment>
            ))}
            <div ref={msgEndRef} />
          </div>

          <div className="w-full flex items-end gap-1 pb-4 pt-2 px-6">
            <ChatInput
              value={messageInput}
              setValue={setMessageInput}
              onSend={handleSend}
            />
          </div>
        </div>
      )}

      {!activeChat && (
        <div className="hidden h-dvh lg:w-8/12 lg:grid">
          <div className="flex items-center gap-2 h-16 ps-10 bg-gray-700 fill-white text-white">
            <Link to={isGroup ? '/group' : '/chat'} className="pe-5 lg:hidden">
              <FaArrowLeft size={35} fill="white" />
            </Link>
            {isGroup ? <FaUsers size={35} /> : <FaUser size={35} />}
          </div>
          <p className="text-center text-3xl font-bold font-serif">
            {loading ? (
              <svg
                className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : error ? (
              error + ':('
            ) : (
              'Hewwo :)'
            )}
          </p>
        </div>
      )}

      <ScreenSize />
    </section>
  );
}
