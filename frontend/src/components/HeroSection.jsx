import { motion } from 'framer-motion';
import {
  ArrowRight,
  AudioLines,
  MessageCircle,
  Mic,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import AuraButton from './ui/AuraButton.jsx';
import { aura, hero } from '../data/aura.js';
import auraGuardian from '../assets/aura-guardian.svg';

/** Shared gentle entrance for the hero copy block. */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/** Resolve a data-string icon key to a Lucide component. */
const CHIP_ICONS = {
  shield: ShieldCheck,
  mic: Mic,
  waves: Waves,
  audio: AudioLines,
};


function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="aura-container grid items-center gap-12 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:grid-cols-2 lg:gap-10 lg:pt-40 lg:pb-28">
        {/* Copy */}
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-xl">
          <span className="aura-chip text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {hero.badge}
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {aura.title}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headlineBefore}
            <br />
            <span className="aura-text-gradient">{hero.headlineHighlight}</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">{hero.tagline}</p>
          <p className="mt-3 text-muted">{hero.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AuraButton as="a" href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} <MessageCircle className="h-4 w-4" />
            </AuraButton>
            <AuraButton as="a" href={hero.secondaryCta.href} variant="ghost" size="lg">
              {hero.secondaryCta.label} <ArrowRight className="h-4 w-4" />
            </AuraButton>
          </div>
        </motion.div>

        {/* Hero visual — original AURA illustration over soft signal rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Soft resonance rings behind the guardian */}
          <div className="absolute inset-6 rounded-full border border-line/70 aura-glow-primary animate-glow" />
          <div
            className="absolute inset-16 rounded-full border border-line/50 animate-float"
            style={{ animationDelay: '0.4s' }}
          />
          <div
            className="absolute inset-28 rounded-full border border-primary/20 animate-float"
            style={{ animationDelay: '0.9s' }}
          />

          {/* Original AURA guardian illustration (local, optimized SVG) */}
          <img
            src={auraGuardian}
            alt={hero.visual.image.alt}
            width={480}
            height={600}
            loading="eager"
            decoding="async"
            className="relative z-10 mx-auto h-auto w-full max-w-[320px] animate-float drop-shadow-[0_18px_50px_rgba(34,211,238,0.25)] sm:max-w-[360px] lg:max-w-[400px]"
          />

          {/* Floating status chips (data-driven) */}
          {hero.visual.chips.map((chip) => {
            const Icon = CHIP_ICONS[chip.icon] || AudioLines;
            return (
              <span
                key={chip.label}
                className={`aura-chip absolute z-20 ${chip.position} animate-float`}
                style={{ animationDelay: chip.delay }}
              >
                <Icon className="h-3.5 w-3.5" /> {chip.label}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;