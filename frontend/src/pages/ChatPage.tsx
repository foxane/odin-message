export default function ChatPage({ isGroup }: { isGroup: boolean }) {
  return (
    <div>
      {isGroup ? <p>Group page placeholder</p> : <p>Chat page placeholder</p>}
    </div>
  );
}
