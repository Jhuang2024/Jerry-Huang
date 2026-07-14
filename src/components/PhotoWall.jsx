import { PHOTOGRAPHY } from '../data/photography'
import Section from './Section'

/* Amateur-photography wall: a uniform 4:5 grid in the site's monochrome
   treatment, color on hover. */
export default function PhotoWall() {
  return (
    <Section
      id="photo-wall"
      screenLabel="Photo Wall"
      num="01"
      eyebrow="Selected frames"
      title="Sixteen favorites."
      lead="Shot mostly on a phone, edited on it too. Hover a frame for color."
    >
      <div className="photo-wall reveal">
        {PHOTOGRAPHY.map((photo) => (
          <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
        ))}
      </div>
    </Section>
  )
}
