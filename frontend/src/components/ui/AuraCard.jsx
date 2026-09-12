/**
 * AuraCard — reusable elevated surface container.
 * Composes the .aura-card utility and folds in any extra classes.
 */
function AuraCard({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`aura-card ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default AuraCard;