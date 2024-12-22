import { XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useGetUsers from '../hooks/useGetUsers';
import { UserIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { Chat, ChatOutletContext } from '../App';

export default function SearchUserSection({ handleClose }: Props) {
  const { users, loading, error } = useGetUsers();
  const { chatList, createChat } = useOutletContext<ChatOutletContext>();
  const navigate = useNavigate();

  // Filter users based on the search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const createOrOpenChat = (userId: string) => {
    const chat: Chat | undefined = chatList?.find(el =>
      el.members.some(usr => usr.id === userId),
    );

    if (chat) {
      handleClose();
      void navigate(`/chat/${chat.id}`);
      return;
    }

    // Create new chat
    handleClose();
    createChat(userId);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className="lg:w-4/12 lg:bg-gray-300">
      <div className="bg-gray-700 h-16 ps-3 flex justify-between items-center">
        <input
          ref={inputRef}
          type="search"
          className="w-full text-lg p-1 rounded"
          placeholder="Search users..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
        />
        <button className="me-3 rounded-md p-1 hover:bg-gray-500">
          <XCircleIcon className="w-10 stroke-white" onClick={handleClose} />
        </button>
      </div>

      {/* User list*/}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {filteredUsers?.map(el => (
        <button
          onClick={() => {
            createOrOpenChat(el.id);
          }}
          key={el.id}
          className="w-full flex items-center min-w-64 gap-2 p-2 border-b border-black active:bg-gray-300 hover:bg-gray-200">
          <UserIcon className="w-10" />

          <div className="flex-1 flex flex-col items-start justify-start overflow-hidden">
            <p className="font-semibold truncate">{el.name}</p>
            <p className="font-thin truncate">{el.email}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

interface Props {
  handleClose: () => void;
}
