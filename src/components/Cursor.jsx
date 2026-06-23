import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const onMove = e => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = (e.clientX - 5) + 'px';
        dotRef.current.style.top  = (e.clientY - 5) + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx - 18) * 0.12;
      p.ry += (p.my - p.ry - 18) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + 'px';
        ringRef.current.style.top  = p.ry + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const grow = () => {
      if (!dotRef.current || !ringRef.current) return;
      dotRef.current.style.transform  = 'scale(2.2)';
      ringRef.current.style.width     = '52px';
      ringRef.current.style.height    = '52px';
      ringRef.current.style.opacity   = '.25';
    };
    const shrink = () => {
      if (!dotRef.current || !ringRef.current) return;
      dotRef.current.style.transform  = 'scale(1)';
      ringRef.current.style.width     = '36px';
      ringRef.current.style.height    = '36px';
      ringRef.current.style.opacity   = '.55';
    };

    const targets = 'a, button, .skill-tag, .project-card, .filter-btn, .contact-card';
    const els = document.querySelectorAll(targets);
    els.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      els.forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink); });
    };
  }, []);

  return (
    <>
      <div id="cursor"      ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
