import { PHOTOGRAPHY } from '../data/photography'
import Section from './Section'

/* Amateur-photography wall: a uniform 4:5 grid in the site's monochrome
   treatment, color on hover. */
export default function PhotoWall() {
  return (
    <Section
      id="photography"
      screenLabel="Photography"
      num="03"
      eyebrow="Amateur photographer"
      title="Through the lens."
      lead="One more lens, literally. Landscapes, coastlines, and city lights collected between meets, forums, and flights."
    >
      <div className="photo-wall reveal">
        {PHOTOGRAPHY.map((photo) => (
          <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
        ))}
      </div>
    </Section>
  )
}
