/**
 * AURA — Guardian of Voices
 * Chatbot copy + configuration. All conversational text a visitor might
 * see lives here (not in JSX) so it can be edited without touching the UI.
 */

export const chatConfig = {
  name: 'AURA',
  title: 'Guardian of Voices',
  status: 'Listening',
};

/**
 * One step per detail AURA collects, in order.
 * `key` maps into the collected `details` object; `label` is used in the
 * summary UI at the end of the conversation.
 */
export const conversationSteps = [
  {
    key: 'name',
    label: 'Name',
    question: "Let's start with your name — what should I call you?",
    placeholder: 'Your name',
  },
  {
    key: 'age',
    label: 'Age',
    question: 'And how old are you?',
    placeholder: 'Your age',
    inputType: 'number',
  },
  {
    key: 'location',
    label: 'Location',
    question: 'Where are you located?',
    placeholder: 'City / country',
  },
  {
    key: 'email',
    label: 'Email',
    question: 'What email should I use to reach you?',
    placeholder: 'you@example.com',
    inputType: 'email',
  },
  {
    key: 'request',
    label: 'How we can help',
    question: 'So... tell me. How can I help you?',
    placeholder: 'Describe your concern or request…',
    multiline: true,
  },
];

export const chatMessages = {
  heading: 'Your voice starts here.',
  description:
    "Tell AURA what's on your mind. One small question at a time — your details stay in this conversation until you choose to submit.",

  privacyNote:
    'Share only the information needed to understand and route your request.',

  inputPlaceholder: 'Type your message…',

  welcome:
    "Hi, I'm AURA — Guardian of Voices. I'm here to listen and make sure your voice is heard. I'll ask a few quick questions, one at a time.",

  submittingText: 'Submitting your request…',

  successTitle: 'Request submitted successfully',
  successMessage:
    'AURA has received your request — thank you.',

  failureTitle: "We couldn't submit your request",
  failureMessage:
    'Something went wrong on our side. Your details are still saved below — please try again.',
  retryButton: 'Try again',

  errors: {
    name: {
      required: "I still need your name to know who I'm speaking with. Could you share it?",
    },
    age: {
      required: 'I need your age to understand your situation. How old are you?',
      invalid:
        'That doesn’t look like a valid age. Please enter a whole number between 1 and 120.',
    },
    location: {
      required: 'Where are you located? I need a location to route your request.',
    },
    email: {
      required: 'I need an email address to reach you. What email can I use?',
      invalid:
        'That doesn’t look like a valid email. Please use a format like name@example.com.',
    },
    request: {
      required: 'Please share a little more so I understand how to help you.',
    },
  },
};