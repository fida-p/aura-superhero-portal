import { AudioLines } from 'lucide-react';
import { chatConfig } from '../../data/chat.js';

/**
 * ChatHeader — AURA identity bar at the top of the chat panel:
 * avatar/signal icon, name + title, and a "Listening" status pill.
 */
function ChatHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-glass/60 px-4 py-3 sm:px-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-primary aura-glow-primary">
        <AudioLines className="h-5 w-5" />
      </span>

      <div className="min-w-0">
        <p className="text-sm font-bold text-ink">{chatConfig.name}</p>
        <p className="truncate text-xs text-dim">{chatConfig.title}</p>
      </div>

      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-glass px-3 py-1 text-xs font-medium text-emerald-400">
        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-400" />
        {chatConfig.status}
      </span>
    </div>
  );
}

export default ChatHeader;