import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader.jsx';
import { ChatMessage, TypingIndicator } from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import ChatSummary from './ChatSummary.jsx';
import { useAuraChat } from '../../hooks/useAuraChat.js';

/**
 * AuraChatbot — the full AURA help-request chat panel. Composes the header,
 * scrollable message list, optional summary, and input. Conversation state
 * is owned by useAuraChat (separate from presentation).
 */
function AuraChatbot({ className = '' }) {
  const {
    messages,
    typing,
    input,
    setInput,
    submit,
    retrySubmit,
    details,
    done,
    submission,
  } = useAuraChat();
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Disable input while AURA is replying or once the conversation is done
  // (submitting, success, or error all disable further chat).
  const disabled = typing || done;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/85 shadow-[0_24px_60px_-30px_rgba(2,6,16,0.95)] backdrop-blur-md ${className}`}
      style={{ height: 'min(620px, 72vh)' }}
    >
      <ChatHeader />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          {typing ? <TypingIndicator /> : null}
        </div>
      </div>

      {submission !== 'idle' ? (
        <ChatSummary details={details} submission={submission} onRetry={retrySubmit} />
      ) : null}

      <ChatInput value={input} onChange={setInput} onSubmit={() => submit(input)} disabled={disabled} />
    </div>
  );
}

export default AuraChatbot;