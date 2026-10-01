import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from './Icons'

export default function Hero() {
  return (
    <section id="home" className="hero" data-screen-label="Hero">
      <div className="hero-media" aria-hidden="true" />
      <div className="hero-topline"><span>Independent thinking. Real systems.</span><span>Based in the SF Bay Area ↗</span></div>
      <div className="hero-composition">
        <div className="hero-copy">
          <div className="hero-meta">
            <span className="hero-status"><span className="pulse" aria-hidden="true" />Founder, Helicyn</span>
            <span className="meta-item">UC Berkeley ’30</span>
          </div>
          <h1><span>Jerry</span><span>Huang<span className="name-period">.</span></span></h1>
          <p className="hero-position">Ideas into <em>working systems.</em></p>
          <p className="hero-description">AI founder &amp; builder, shipping machine-learning systems in the open.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary magnetic" to="/projects">Explore my work <ArrowRight /></Link>
            <Link className="hero-contact" to="/contact">Let’s talk <ArrowUpRight /></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbital-field">
            <div className="orbit orbit-one"><i /></div><div className="orbit orbit-two"><i /></div><div className="orbit orbit-three"><i /></div>
            <div className="orb-core"><div className="orb-latitude" /><div className="orb-longitude" /><span>JH</span></div>
            <span className="orb-label label-top">01 / INTELLIGENCE</span><span className="orb-label label-bottom">02 / IMPACT</span>
            <span className="orb-coordinate">37.87° N · 122.26° W</span>
          </div>
          <div className="hero-art-caption"><span className="art-dot" />Systems in motion<span>Always building ↗</span></div>
        </div>
      </div>
      <div className="hero-baseline"><span className="hero-index">PORTFOLIO / JERRY HUANG</span><a className="hero-scroll" href="#overview">Scroll to discover <ArrowRight /></a></div>
    </section>
  )
}
