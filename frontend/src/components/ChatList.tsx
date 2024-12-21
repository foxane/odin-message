import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ChatCard from './ChatCard';
import { Chat } from '../App';

interface ChatListProps {
  isGroup: boolean;
  list: Chat[] | null;
  activeChatId?: string;
}

export function ChatList({ isGroup, list, activeChatId }: ChatListProps) {
  return (
    <div
      className={`border-r border-gray-700 ${
        activeChatId ? ' hidden' : ''
      }  lg:block lg:w-4/12 lg:bg-gray-400`}>
      <div className="bg-gray-700 h-16 ps-3 flex justify-between items-center">
        <p className="font-bold text-xl text-white">
          {isGroup ? 'Groups' : 'Chats'}
        </p>
        <button className="me-3 rounded-md p-1 hover:bg-gray-500">
          <MagnifyingGlassIcon className="w-6 stroke-white" />
        </button>
      </div>

      {list?.map(el => (
        <ChatCard
          to={`/${isGroup ? 'group' : 'chat'}/${el.id}`}
          active={el.id === activeChatId}
          chat={el}
          key={el.id}
        />
      ))}
    </div>
  );
}
