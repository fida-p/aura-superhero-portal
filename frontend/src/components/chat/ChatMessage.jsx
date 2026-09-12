import { AudioLines } from 'lucide-react';

/**
 * ChatMessage — renders a single conversation bubble.
 * AURA bubbles are glass on the left with an avatar; user bubbles are a
 * filled primary pill on the right. Used by the messages array via .map().
 */
export function ChatMessage({ message }) {
  const isAura = message.author === 'aura';

  return (
    <div className={`flex items-end gap-2 ${isAura ? 'justify-start' : 'justify-end'}`}>
      {isAura && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-primary">
          <AudioLines className="h-4 w-4" />
        </span>
      )}

      <div
        className={`max-w-[80%] whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
          isAura
            ? 'rounded-2xl rounded-tl-sm border border-line bg-glass text-ink'
            : 'rounded-2xl rounded-br-sm bg-primary text-blue-950'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

/**
 * TypingIndicator — subtle three-dot animation shown while AURA "types".
 * Rendered in place of a message while `typing` is true.
 */
export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 justify-start" role="status" aria-label="AURA is typing">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-primary">
        <AudioLines className="h-4 w-4" />
      </span>

      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-glass px-4 py-3">
        <span className="h-1.5 w-1.5 animate-float rounded-full bg-muted" />
        <span className="h-1.5 w-1.5 animate-float rounded-full bg-muted" style={{ animationDelay: '0.15s' }} />
        <span className="h-1.5 w-1.5 animate-float rounded-full bg-muted" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}