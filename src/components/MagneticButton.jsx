import { Link } from 'react-router-dom'

/* Button/link with the magnetic pointer-pull microinteraction (driven by
   the delegated handler in useInteractionEffects via the .magnetic class).
   Renders a router <Link>, an external <a>, or a <button> based on props. */
export default function MagneticButton({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn', `btn-${variant}`, 'magnetic', className].filter(Boolean).join(' ')

  if (to) return <Link className={cls} to={to} {...rest}>{children}</Link>
  if (href) return (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  )
  return <button className={cls} {...rest}>{children}</button>
}
