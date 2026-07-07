/* Renders the light rich-text arrays used in data files:
   strings, { b: '…' } bold spans, and { link, label } external links. */
export default function Rich({ parts }) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return p
    if (p.b) return <b key={i}>{p.b}</b>
    if (p.link) return (
      <a key={i} className="lead-link" href={p.link} target="_blank" rel="noopener noreferrer">{p.label}</a>
    )
    return null
  })
}
