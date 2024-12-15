import ChatBubble from '../components/ChatBubble';
import ChatCard from '../components/ChatCard';
import ChatInput from '../components/ChatInput';
import { Button } from '../components/ui/Button';
import Input from '../components/ui/Input';

const msg = {
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, praesentium aut. Corrupti minima tempore minus ad, ipsam, corporis exercitationem molestiae hic veritatis officiis vitae repellat voluptates perferendis maiores mollitia quod.`,
  createdAt: '2024-42-52',
  user: {
    id: 1,
    name: 'foxane',
  },
};

const msg2 = {
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, praesentium aut. Corrupti minima tempore minus ad, ipsam, corporis exercitationem molestiae hic veritatis officiis vitae repellat voluptates perferendis maiores mollitia quod.`,
  createdAt: '2024-42-52',
  user: {
    id: 0,
    name: 'admin',
  },
};

const mockChat = {
  id: '66509a12-4b1c-4541-b103-5e91de0e2722',
  isGroup: false,
  editedAt: '2024-12-15T07:46:46.346Z',
  members: [
    {
      id: '425cc4ad-b4af-4e91-ab3f-bd8aeb07915f',
      name: 'User One',
    },
    {
      id: '4265a5dc-693c-4e99-9fce-43c37ba03737',
      name: 'Admin',
    },
  ],
  messages: [
    {
      id: '29ce8975-5b3f-4554-b786-4290bdb7dab8',
      content: 'Apa kabar kak',
      createdAt: '2024-12-15T07:47:44.563Z',
      isDeleted: false,
      userId: '4265a5dc-693c-4e99-9fce-43c37ba03737',
      chatId: '66509a12-4b1c-4541-b103-5e91de0e2722',
      user: {
        id: '4265a5dc-693c-4e99-9fce-43c37ba03737',
        name: 'Admin',
      },
    },
  ],
};

function CompsPage() {
  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex flex-col gap-2 items-start p-2">
        <p className="text-xl font-semibold">Buttons</p>
        <Button>Default</Button>
        <Button disabled>Default</Button>
        <Button type="outline">Outline</Button>
        <Button type="outline" disabled>
          Outline
        </Button>
      </div>

      <div className="flex flex-col gap-2 items-start p-2">
        <p className="text-xl font-semibold">Input</p>
        <Input label={'Email'} type="email" required></Input>
        <Input label={'Password'} type="password" required></Input>
      </div>

      <div className="flex flex-col gap-2 items-start p-2">
        <p className="text-xl font-semibold">Chat bubble</p>
        <ChatBubble message={msg} />
        <ChatBubble message={msg2} />
      </div>

      <div className="flex flex-col gap-2 items-start p-2">
        <p className="text-xl font-semibold">Chat input</p>
        <ChatInput />
      </div>

      <div className="flex flex-col items-start p-2">
        <p className="text-xl font-semibold">Chat card</p>
        <ChatCard chat={mockChat} active />
        <ChatCard chat={mockChat} />
      </div>
    </div>
  );
}

export default CompsPage;
