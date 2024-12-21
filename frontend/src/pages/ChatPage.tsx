import { useOutletContext, useParams } from 'react-router-dom';
import { ChatOutletContext } from '../App';
import { useUserContext } from '../hooks/useUserContext';
import { useEffect, useRef, useState, useMemo } from 'react';
import ChatInput from '../components/ChatInput';
import ScreenSize from '../components/ui/ScreenSize';
import { ChatHeader } from '../components/ChatHeader';
import { ChatList } from '../components/ChatList';
import { MessageList } from '../components/MessageList';

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

  const [messageInput, setMessageInput] = useState('');
  const handleSend = () => {
    if (!activeChat || !user) return;

    const newMsg = {
      chatId: activeChat.id,
      content: messageInput,
      createdAt: new Date().toString(),
      id: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
      },
    };
    addMessage(newMsg); // Update ui
    sendMessage(newMsg); // Send new message to server
    setMessageInput('');
  };

  const msgEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'instant' });
  });

  return (
    <section className="w-full lg:flex">
      <ChatList isGroup={isGroup} list={list} activeChatId={activeChat?.id} />

      {/* Conversation */}
      {activeChat && (
        <div className="h-dvh grid lg:w-8/12">
          <ChatHeader
            isGroup={isGroup}
            chatName={isGroup ? activeChat.name ?? '' : otherUser?.name ?? ''}
            showBackButton
          />

          <MessageList messages={activeChat.messages} endRef={msgEndRef} />

          <div className="w-full flex items-end gap-1 pb-4 pt-2 px-6">
            <ChatInput
              value={messageInput}
              setValue={setMessageInput}
              onSend={handleSend}
            />
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

      <ScreenSize />
    </section>
  );
}
