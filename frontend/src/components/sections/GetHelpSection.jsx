import AuraChatbot from '../chat/AuraChatbot.jsx';
import { chatMessages } from '../../data/chat.js';

/**
 * GetHelpSection — anchor target for #get-help (hero/navbar CTA).
 * Hosts the live AURA help chatbot, with a heading, a short explanation of
 * AURA's purpose, and a small privacy reassurance. No form or email yet.
 */
function GetHelpSection() {
  return (
    <section id="get-help" className="aura-container scroll-mt-24 pb-24 pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {chatMessages.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">{chatMessages.description}</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <AuraChatbot />
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-dim">
        {chatMessages.privacyNote}
      </p>
    </section>
  );
}

export default GetHelpSection;