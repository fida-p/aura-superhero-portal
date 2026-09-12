import { AudioLines, Mic, ShieldCheck, Waves } from 'lucide-react';
import AuraCard from '../ui/AuraCard.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';
import { aura } from '../../data/aura.js';

const POWER_ICONS = [AudioLines, Mic, ShieldCheck, Waves];


function PowersSection() {
  return (
    <section id="powers" className="aura-container scroll-mt-24 py-16 sm:py-24">
      <SectionTitle
        index="01"
        title="Powers & abilities"
        sub="The arsenal AURA uses to hear, protect, and amplify every voice."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aura.powers.map((power, i) => {
          const [name, ...rest] = power.split(' — ');
          const Icon = POWER_ICONS[i % POWER_ICONS.length];
          return (
            <AuraCard key={power} className="p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-glass text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{name}</h3>
              <p className="mt-1.5 text-sm text-muted">{rest.join(' — ')}</p>
            </AuraCard>
          );
        })}
      </div>
    </section>
  );
}

export default PowersSection;