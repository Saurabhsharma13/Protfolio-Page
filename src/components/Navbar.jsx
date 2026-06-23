import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="#hero">&lt;<em>SS</em>&gt;</a>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><a href="#about"   onClick={close}>About</a></li>
        <li><a href="#skills"  onClick={close}>Skills</a></li>
        <li><a href="#projects" onClick={close}>Projects</a></li>
        <li><a href="#contact" onClick={close} className="nav-cta">Contact</a></li>
      </ul>

      <div
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </div>
    </nav>
  );
}
