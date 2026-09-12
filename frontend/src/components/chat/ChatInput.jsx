import { useRef } from 'react';
import { Send } from 'lucide-react';
import { chatMessages } from '../../data/chat.js';

/**
 * ChatInput — text input + send button for the chat.
 * Enter submits; Shift+Enter inserts a newline (textarea). Auto-resizes up
 * to a max height. Sending is disabled while AURA is replying or complete.
 */
function ChatInput({ value, onChange, onSubmit, disabled }) {
  const ref = useRef(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    resize();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) onSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-line bg-glass/40 p-3 sm:p-4">
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={chatMessages.inputPlaceholder}
        aria-label="Type your message"
        disabled={disabled}
        className="min-h-[44px] max-h-36 flex-1 resize-none rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-dim focus:border-primary focus:outline-none disabled:opacity-60"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        aria-label="Send message"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-blue-950 transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ChatInput;