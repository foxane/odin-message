import { useRef } from 'react';
import { func, string } from 'prop-types';
import sendIcon from '../assets/send.svg';

export default function ChatInput({ value, setValue, onSend }) {
  const textareaRef = useRef(null);

  const handleInput = e => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setValue(e.target.value);
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
        rows="1"
        onInput={handleInput}
      />

      <button
        onClick={handleSend}
        className="bg-gray-500 rounded-full p-1 hover:bg-gray-700">
        <img className="w-9" src={sendIcon} alt="send icon" />
      </button>
    </>
  );
}

ChatInput.propTypes = {
  value: string,
  setValue: func,
  onSend: func,
};
