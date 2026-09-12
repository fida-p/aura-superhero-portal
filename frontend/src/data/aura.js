/**
 * AURA — Guardian of Voices
 * Central identity + content data. Everything about AURA that may change
 * later (identity, navigation, hero copy, visual labels) lives here so the
 * UI components stay thin, reusable, and easy to edit.
 */

export const aura = {
  name: 'AURA',
  title: 'Guardian of Voices',
  tagline:
    'A superhero who listens to your concerns and makes sure every voice is heard.',
  shortStory:
    'Born from the quiet echoes of those who were never heard, AURA channels focused sound and light to protect and amplify the voices of the voiceless.',
  powers: [
    'Sonic Resonance — hears the faintest call for help',
    'Voice Amplification — turns whispers into clarity',
    'Guardian Shield — deflects harm with sound waves',
    'Echo Sense — detects distress in real time',
  ],
  mission:
    'To make sure no one—regardless of age, location, or background—has to face their struggles unheard.',
  theme: {
    primary: 'electric cyan',
    accent: 'violet',
    surface: 'deep navy',
  },
};

/** Primary navigation — rendered by Navbar (desktop + mobile). */
export const nav = {
  links: [
    { label: 'About AURA', href: '#about' },
    { label: 'Powers', href: '#powers' },
    { label: 'Mission', href: '#mission' },
    { label: 'Get Help', href: '#get-help' },
  ],
  cta: { label: 'Talk to AURA', href: '#get-help' },
};

/** Hero section copy + visual configuration — rendered by HeroSection. */
export const hero = {
  badge: 'A new kind of guardian',
  headlineBefore: 'Every voice', // preceding, non-highlighted line
  headlineHighlight: 'deserves a guardian.',
  tagline: 'Every voice matters. Every signal deserves to be heard.',
  description:
    'AURA listens to your concerns, understands your requests, and helps direct you toward the right support — so no one ever has to face their struggles unheard.',
  primaryCta: { label: 'Talk to AURA', href: '#get-help' },
  secondaryCta: { label: 'Explore the Mission', href: '#mission' },
  visual: {
    ariaLabel: 'Animated AURA guardian core with concentric signal rings',
    chips: [
      { label: 'Protected', icon: 'shield', position: 'right-0 top-8', delay: '0s' },
      { label: 'Heard', icon: 'mic', position: 'bottom-10 left-1', delay: '1.2s' },
      { label: 'Amplified', icon: 'waves', position: '-left-2 top-1/2', delay: '2s' },
    ],
  },
};