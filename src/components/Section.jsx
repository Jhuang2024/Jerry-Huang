/* Standard content section with the shared eyebrow / h2 / lead header.
   `num` renders as a small index inside the eyebrow; `screenLabel` keeps
   the original data-screen-label metadata. */
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
    >
      {(eyebrow || title || lead) && (
        <div className={`section-head reveal ${headClassName}`.trim()}>
          {eyebrow && (
            <span className="eyebrow">
              {num && <span className="sec-num">({num})</span>}
              {eyebrow}
            </span>
          )}
          {title && <h2>{title}</h2>}
          {lead && <p>{lead}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
