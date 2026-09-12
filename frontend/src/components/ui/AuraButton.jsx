/**
 * AuraButton — reusable, variant-driven button.
 * Currently supports button/anchor rendering with soft interactive styles.
 * Extend `variants` here rather than scattering styling per usage.
 */

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
  'transition-all duration-200 ease-out focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 cursor-pointer select-none';

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variants = {
  primary:
    'bg-primary text-blue-950 hover:bg-primary-strong hover:shadow-[0_10px_30px_-10px_var(--aura-glow-primary)]',
  accent:
    'bg-accent text-white hover:bg-accent-soft hover:shadow-[0_10px_30px_-10px_var(--aura-glow-accent)]',
  ghost:
    'border border-line bg-glass text-ink hover:border-line-strong hover:bg-surface-raised',
};

function AuraButton({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}

export default AuraButton;