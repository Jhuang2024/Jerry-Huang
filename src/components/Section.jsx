/* Standard content section with the shared eyebrow / h2 / lead header.
   `num` renders the editorial numeral watermark; `screenLabel` keeps the
   original data-screen-label metadata. */
export default function Section({
  id,
  className = '',
  num,
  screenLabel,
  eyebrow,
  title,
  lead,
  headClassName = '',
  children,
}) {
  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      data-screen-label={screenLabel}
      data-num={num}
    >
      {(eyebrow || title || lead) && (
        <div className={`section-head reveal ${headClassName}`.trim()}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {lead && <p>{lead}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
