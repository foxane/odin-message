import { useOutletContext, useParams } from 'react-router-dom';
import { ChatOutletContext } from '../App';
import { useUserContext } from '../hooks/useUserContext';
import { useEffect, useRef, useState, useMemo } from 'react';
import ChatInput from '../components/ChatInput';
import { ChatHeader } from '../components/ChatHeader';
import { MessageList } from '../components/MessageList';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ChatCard from '../components/ChatCard';
import SearchUserSection from '../components/SearchUserSection';

export default function ChatPage({ isGroup }: { isGroup: boolean }) {
  const { user } = useUserContext();
  const { groupList, chatList, addMessage, loading, error, sendMessage } =
    useOutletContext<ChatOutletContext>();
  const { chatId } = useParams();

  const list = isGroup ? groupList : chatList;
  const activeChat = useMemo(() => {
    return chatId && list ? list.find(el => el.id === chatId) : null;
  }, [chatId, list]);

  const otherUser = activeChat?.members.find(usr => usr.id !== user?.id);

  const [searchUser, setSearchUser] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const handleSend = () => {
    if (!activeChat || !user) return;

    const newMsg = {
      chatId: activeChat.id,
      content: messageInput,
      createdAt: new Date().toString(),
      id: new Date().toISOString(),
      user,
    };
    addMessage(newMsg); // Update ui
    sendMessage(newMsg); // Send new message to server
    setMessageInput('');
  };

  const msgEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <section className="w-full lg:flex">
      {/* Left section, hidden when chat active and screen is small*/}
      {!searchUser ? (
        <div
          className={`${
            activeChat ? ' hidden' : ''
          }  lg:block lg:w-4/12 lg:bg-gray-300`}>
          <div className="bg-gray-700 h-16 ps-3 flex justify-between items-center">
            <p className="font-bold text-xl text-white">
              {isGroup ? 'Groups' : 'Chats'}
            </p>
            <button
              className="me-3 rounded-md p-1 hover:bg-gray-500"
              onClick={() => {
                setSearchUser(!searchUser);
              }}>
              <MagnifyingGlassIcon className="w-6 stroke-white" />
            </button>
          </div>

          {/* Chat list */}
          {list && list.filter(el => el.messages.length > 0).length > 0 ? (
            list
              .filter(el => el.messages.length > 0)
              .map(el => (
                <ChatCard
                  to={`/${isGroup ? 'group' : 'chat'}/${el.id}`}
                  active={el.id === activeChat?.id}
                  chat={el}
                  key={el.id}
                />
              ))
          ) : (
            <div className="text-center m-5 font-semibold">
              <p>Click search button above to start a conversation</p>
              <p>or go to global chat in group section</p>
            </div>
          )}
        </div>
      ) : (
        <SearchUserSection
          handleClose={() => {
            setSearchUser(false);
          }}
        />
      )}

      {/* Conversation */}
      {activeChat && (
        <div className="h-dvh grid lg:w-8/12">
          <ChatHeader
            isGroup={isGroup}
            chatName={isGroup ? activeChat.name ?? '' : otherUser?.name ?? ''}
            showBackButton
          />

          <MessageList messages={activeChat.messages} />

          <div className="w-full flex items-end gap-1 pb-4 pt-2 px-6">
            <ChatInput
              value={messageInput}
              setValue={setMessageInput}
              onSend={handleSend}
            />
            <div ref={msgEndRef} />
          </div>
        </div>
      )}

      {/* Filler when no chat is active */}
      {!activeChat && (
        <div className="hidden h-dvh lg:w-8/12 lg:grid">
          <ChatHeader isGroup={isGroup} chatName="" />
          <p className="text-center text-3xl font-bold font-serif">
            {loading
              ? 'Fetching messages...'
              : error
              ? error + ':('
              : 'Checkout the global chat in groups :)'}
          </p>
        </div>
      )}
    </section>
  );
}
