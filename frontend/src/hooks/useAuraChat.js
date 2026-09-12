import { useState } from 'react';
import { conversationSteps, chatMessages } from '../data/chat.js';
import { validateField } from '../utils/validation.js';
import { submitHelpRequest } from '../utils/api.js';

let counter = 0;
const uid = () => `${Date.now()}-${counter++}`;

/**
 * useAuraChat — conversation state + flow for the AURA help chatbot.
 *
 * Collects name → age → location → email → grievance one at a time, then
 * automatically submits the collected data to POST /api/requests.
 *
 * Submission lifecycle: 'idle' → 'submitting' → 'success' | 'error'.
 * On failure the details are preserved and a retry is available. Success
 * is only reported after the backend confirms delivery.
 */
export function useAuraChat() {
  // Boot with AURA's welcome plus the first question.
  const [messages, setMessages] = useState(() => [
    { id: uid(), author: 'aura', text: chatMessages.welcome },
    { id: uid(), author: 'aura', text: conversationSteps[0].question },
  ]);
  const [step, setStep] = useState(0); // index of the question awaiting an answer
  const [details, setDetails] = useState({});
  const [done, setDone] = useState(false); // conversation finished, submission may be in flight
  const [submission, setSubmission] = useState('idle'); // idle | submitting | success | error
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');

  const push = (m) => setMessages((prev) => [...prev, m]);

  // Queues an AURA reply behind a brief, subtle typing indicator.
  const auraReply = (text) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      push({ id: uid(), author: 'aura', text });
    }, 480);
  };

  const sendToBackend = async (payload) => {
    setSubmission('submitting');
    try {
      await submitHelpRequest(payload);
      setSubmission('success');
      push({ id: uid(), author: 'aura', text: chatMessages.successMessage });
    } catch {
      // Never surface raw server/credential details to the visitor.
      setSubmission('error');
      push({ id: uid(), author: 'aura', text: chatMessages.failureMessage });
    }
  };

  // Retry a failed submission with the already-collected details.
  const retrySubmit = () => {
    if (submission !== 'error' || Object.keys(details).length === 0) return;
    sendToBackend(details);
  };

  const submit = (raw) => {
    const value = String(raw ?? '');
    if (typing || done || !value.trim()) return;

    // The visitor's words always appear as a user bubble.
    push({ id: uid(), author: 'user', text: value });
    setInput('');

    const def = conversationSteps[step];
    const { valid, message } = validateField(def.key, value);

    // Invalid: do not advance — let AURA ask them to correct it.
    if (!valid) {
      auraReply(message);
      return;
    }

    const collected = { ...details, [def.key]: value.trim() };
    setDetails(collected);

    const next = step + 1;
    setStep(next);

    if (next >= conversationSteps.length) {
      setDone(true);
      sendToBackend(collected);
    } else {
      auraReply(conversationSteps[next].question);
    }
  };

  return { messages, typing, input, setInput, submit, retrySubmit, details, done, submission };
}