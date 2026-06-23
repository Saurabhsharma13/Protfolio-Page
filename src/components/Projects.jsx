import { useState, useEffect } from 'react';
import { useGitHub } from '../hooks/useGitHub';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROJECT_META, LANG_COLORS } from '../data/constants';

const GH_SVG = (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const FILTERS = ['All', 'Python', 'JavaScript', 'CSS', 'Java'];

function ProjectCard({ repo, index }) {
  const meta  = PROJECT_META[repo.name] || {};
  const icon  = meta.icon || '💻';
  const desc  = meta.desc || repo.description || 'A development project showcasing programming skills.';
  const lc    = LANG_COLORS[repo.language] || '#888';
  const live  = repo.homepage?.length > 0;
  const name  = repo.name.replace(/---/g, ' - ').replace(/-/g, ' ');
  const delay = (index % 6) * 80;

  return (
    <div className="project-card reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="card-top">
        <span className="card-icon">{icon}</span>
        <div className="card-links">
          {live && (
            <a className="live-badge" href={repo.homepage} target="_blank" rel="noopener">
              LIVE
            </a>
          )}
          <a className="card-link" href={repo.html_url} target="_blank" rel="noopener" title="GitHub">
            {GH_SVG}
          </a>
        </div>
      </div>
      <div className="card-name">{name}</div>
      <div className="card-desc">{desc}</div>
      <div className="card-footer">
        <div className="card-lang">
          {repo.language
            ? <><span className="lang-dot" style={{ background: lc }} /><span>{repo.language}</span></>
            : <span>—</span>}
        </div>
        <span className="card-stars">⭐ {repo.stargazers_count}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { repos, loading, error } = useGitHub();
  const [filter, setFilter]       = useState('All');

  const filtered = repos.filter(r =>
    filter === 'All' ? true : r.language === filter
  );

  useScrollReveal([filter, repos]);

  return (
    <section id="projects">
      <div className="section-hd reveal">
        <p className="section-tag">// featured work</p>
        <h2 className="section-title">My Projects</h2>
        <div className="section-line" />
      </div>

      <div className="filter-bar reveal">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {loading && (
          <div className="projects-loading">
            <span style={{ color: 'var(--primary)' }}>$</span> fetching repositories...
          </div>
        )}
        {error && (
          <div className="projects-loading" style={{ color: 'var(--accent)' }}>
            Could not load projects.{' '}
            <a href="https://github.com/Saurabhsharma13" target="_blank" rel="noopener" style={{ color: 'var(--primary)' }}>
              View on GitHub →
            </a>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="projects-loading">No projects for this filter.</div>
        )}
        {!loading && !error && filtered.map((repo, i) => (
          <ProjectCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </section>
  );
}
