import AuraCard from '../ui/AuraCard.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';
import { aura } from '../../data/aura.js';

/**
 * MissionSection — anchor target for #mission. States AURA's purpose
 * and visual theme in a centered, elevated surface.
 */
function MissionSection() {
  return (
    <section id="mission" className="aura-container scroll-mt-24 py-16 sm:py-24">
      <SectionTitle index="02" title="Our mission" />
      <AuraCard className="p-8 text-center sm:p-12">
        <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-ink sm:text-xl">
          {aura.mission}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-muted">{aura.shortStory}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Object.entries(aura.theme).map(([key, value]) => (
            <span key={key} className="aura-chip">
              {key}: {value}
            </span>
          ))}
        </div>
      </AuraCard>
    </section>
  );
}

export default MissionSection;