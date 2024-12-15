import { useRef } from 'react';
import { func } from 'prop-types';
import sendIcon from '../assets/send.svg';

export default function ChatInput() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="w-full flex items-end gap-1">
      <textarea
        ref={textareaRef}
        className="flex-1 resize-none overflow-hidden rounded-xl bg-gray-300 p-2"
        rows="1"
        onInput={handleInput}
      />

      <button className="bg-gray-500 rounded-full p-1 hover:bg-gray-700">
        <img className="w-9" src={sendIcon} alt="send icon" />
      </button>
    </div>
  );
}

ChatInput.propTypes = {
  onSubmit: func,
};
