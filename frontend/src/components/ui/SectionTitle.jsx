/**
 * SectionTitle — reusable labelled-section heading used across product
 * sections. Matches the design-system style used on the preview page.
 */
function SectionTitle({ index, title, sub }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-sm font-semibold text-dim">{index}</span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <hr className="aura-divider flex-1" />
      </div>
      {sub ? (
        <p className="mt-3 max-w-2xl text-muted">{sub}</p>
      ) : null}
    </div>
  );
}

export default SectionTitle;