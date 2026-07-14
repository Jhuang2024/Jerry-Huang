import PhotoWall from '../components/PhotoWall'
import SectionCta from '../components/SectionCta'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Photography() {
  usePageMeta({
    title: 'Photography · Jerry Huang',
    description: 'Amateur photography by Jerry Huang: landscapes, coastlines, and city lights collected between meets, forums, and flights.',
    path: '/photography',
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Photography</span>
        <h1>Through the lens.</h1>
        <p className="page-lead">
          Amateur photographer between everything else. Landscapes, coastlines,
          and city lights collected between meets, forums, and flights.
        </p>
      </div>
      <PhotoWall />
      <SectionCta to="/about">More about me</SectionCta>
    </>
  )
}
