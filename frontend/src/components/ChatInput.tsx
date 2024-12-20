import { useRef } from 'react';
import { BiSend } from 'react-icons/bi';

export default function ChatInput({ value, setValue, onSend }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight.toString()}px`;
    }
    setValue(e.currentTarget.value);
  };

  const handleSend = () => {
    if (!value) return;
    onSend();
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        className="flex-1 resize-none overflow-hidden rounded-xl bg-gray-300 border-2 border-gray-600 p-2"
        rows={1}
        onInput={handleInput}
      />

      <button
        onClick={handleSend}
        className="bg-gray-500 rounded-full p-2 -rotate-90 hover:bg-gray-700">
        <BiSend fill="white" size={35} />
      </button>
    </>
  );
}

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSend: () => void;
}
