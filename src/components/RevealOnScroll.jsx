/* Declarative wrapper for the shared `.reveal` scroll-entrance pattern.
   The page-level useRevealOnScroll hook (Layout) drives the observer, so
   this component only needs to emit the right classes/attributes, keeping
   every reveal on a page inside one IntersectionObserver. */
export default function RevealOnScroll({
  as: Tag = 'div',
  className = '',
  delay,
  blur = false,
  inView = false,
  children,
  ...rest
}) {
  const cls = [
    className,
    blur ? 'blur-in' : '',
    'reveal',
    inView ? 'in-view' : '',
  ].filter(Boolean).join(' ')
  return (
    <Tag className={cls} data-delay={delay} {...rest}>
      {children}
    </Tag>
  )
}
