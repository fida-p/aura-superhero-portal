import { AlertTriangle, CheckCircle2, LoaderCircle } from 'lucide-react';
import { conversationSteps, chatMessages } from '../../data/chat.js';
import AuraButton from '../ui/AuraButton.jsx';

/**
 * ChatSummary — status panel shown after the conversation completes.
 * Reflects the live submission state:
 *  - "submitting": spinner + explanatory text
 *  - "success":    confirmation + the collected details
 *  - "error":      friendly message + retry, details preserved
 */
function ChatSummary({ details, submission, onRetry }) {
  const rows = conversationSteps
    .map((s) => ({ label: s.label, value: details[s.key] }))
    .filter((r) => r.value != null && r.value !== '');

  if (submission === 'submitting') {
    return (
      <div className="flex items-center gap-3 border-t border-line bg-bg-elevated/60 px-4 py-4 text-sm text-muted sm:px-5">
        <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
        {chatMessages.submittingText}
      </div>
    );
  }

  if (submission === 'error') {
    return (
      <div className="border-t border-line bg-bg-elevated/60 px-4 py-4 sm:px-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-rose-400">
          <AlertTriangle className="h-5 w-5" />
          {chatMessages.failureTitle}
        </p>
        <p className="mt-1 text-sm text-muted">{chatMessages.failureMessage}</p>
        <AuraButton onClick={onRetry} size="md" className="mt-3">
          {chatMessages.retryButton}
        </AuraButton>
      </div>
    );
  }

  if (submission === 'success') {
    return (
      <div className="border-t border-line bg-bg-elevated/60 px-4 py-4 sm:px-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
          {chatMessages.successTitle}
        </p>
        <p className="mt-1 text-sm text-muted">{chatMessages.successMessage}</p>

        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col">
              <dt className="text-[11px] uppercase tracking-wider text-dim">{row.label}</dt>
              <dd className="truncate text-sm text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return null;
}

export default ChatSummary;