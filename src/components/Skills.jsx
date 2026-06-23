import { useScrollReveal } from '../hooks/useScrollReveal';
import { SKILLS } from '../data/constants';

export default function Skills() {
  useScrollReveal();

  return (
    <section id="skills">
      <div className="section-hd reveal">
        <p className="section-tag">// expertise</p>
        <h2 className="section-title">Skills &amp; Tools</h2>
        <div className="section-line" />
      </div>

      <div className="skills-wrap">
        {SKILLS.map(({ category, items }) => (
          <div className="skill-cat reveal" key={category}>
            <h4>{category}</h4>
            <div className="skill-tags">
              {items.map(({ name, color }) => (
                <span className="skill-tag" key={name}>
                  <span className="sk-dot" style={{ background: color }} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
