import ContactSection from '../components/ContactSection'
import FaqAccordion from '../components/FaqAccordion'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Contact() {
  usePageMeta({
    title: 'Contact · Jerry Huang',
    description: "Building something technical, weird, or ambitious? Reach Jerry Huang by form, email, or LinkedIn — replies usually within 48 hours.",
    path: '/contact',
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Contact</span>
        <h1>Let's talk.</h1>
        <p className="page-lead">
          Form, email, or LinkedIn — whichever is fastest for you. Replies usually
          within 48 hours.
        </p>
      </div>
      <ContactSection />
      <FaqAccordion />
    </>
  )
}
