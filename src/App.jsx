import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './routes/About'
import Contact from './routes/Contact'
import Experience from './routes/Experience'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Photography from './routes/Photography'
import Projects from './routes/Projects'
import Speaking from './routes/Speaking'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
