import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

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

  const handleFocus = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <textarea
        onKeyDown={handleFocus}
        ref={textareaRef}
        value={value}
        className="h-auto flex-1 resize-none overflow-hidden rounded-xl bg-gray-300 border-2 border-gray-600 p-2"
        rows={1}
        onInput={handleInput}
      />

      <button
        onClick={handleSend}
        className="bg-gray-500 rounded-full p-2 hover:bg-gray-700">
        <PaperAirplaneIcon className="w-8 fill-white" />
      </button>
    </>
  );
}

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSend: () => void;
}
