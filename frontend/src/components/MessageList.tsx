import { Fragment } from 'react';
import ChatBubble from './ChatBubble';
import { formatDate } from '../lib/utils';
import { Message } from '../App';

interface MessageListProps {
  messages: Message[] | null;
}

export function MessageList({ messages }: MessageListProps) {
  const groupedMessages = messages?.reduce<Record<string, Message[]>>(
    (acc, message) => {
      const dateKey = formatDate(message.createdAt);
      (acc[dateKey] ??= []).push(message);
      return acc;
    },
    {},
  );

  if (!groupedMessages) return <p>Loading..</p>;
  return (
    <div className="overflow-y-scroll">
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <Fragment key={date}>
          <div className="text-center text-sm text-black my-4">{date}</div>
          {messages.map(message => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
