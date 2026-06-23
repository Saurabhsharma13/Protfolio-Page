import { useState, useEffect } from 'react';
import Cursor     from './components/Cursor';
import Preloader  from './components/Preloader';
import Background from './components/Background';
import Navbar     from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Skills    from './components/Skills';
import Projects  from './components/Projects';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />
      <Preloader loaded={loaded} />
      <div className="bg-grid" />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
