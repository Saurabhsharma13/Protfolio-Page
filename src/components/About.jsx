import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGitHub } from '../hooks/useGitHub';

export default function About() {
  const { profile, repos } = useGitHub();
  const langs = [...new Set(repos.filter(r => r.language).map(r => r.language))];

  useScrollReveal([profile]);

  return (
    <section id="about">
      <div className="section-hd reveal">
        <p className="section-tag">// about me</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="section-line" />
      </div>

      <div className="about-grid">
        <div className="about-text reveal-left">
          <h3>Building the future, one commit at a time.</h3>
          <p>
            I&apos;m <strong>Sourabh Sharma</strong>, a passionate software developer and data
            science enthusiast. I love turning complex problems into elegant, efficient solutions.
          </p>
          <p>
            My work spans <strong>full-stack web development</strong>,{' '}
            <strong>machine learning systems</strong>,{' '}
            <strong>data analytics with Power BI</strong>, and{' '}
            <strong>algorithmic problem-solving in Java</strong>.
          </p>
          <p>
            Whether it&apos;s deploying production apps on Vercel, detecting phishing threats with
            Python ML, or crafting pixel-perfect UIs — I bring the same energy to every project.
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-n">{profile?.public_repos ?? 8}</div>
              <div className="stat-l">Public Repos</div>
            </div>
            <div className="stat-card">
              <div className="stat-n">3+</div>
              <div className="stat-l">Years Coding</div>
            </div>
            <div className="stat-card">
              <div className="stat-n">5+</div>
              <div className="stat-l">Tech Stacks</div>
            </div>
            <div className="stat-card">
              <div className="stat-n">{langs.length || 5}</div>
              <div className="stat-l">Languages</div>
            </div>
          </div>
        </div>

        <div className="gh-imgs reveal-right">
          <img
            src="https://github-readme-stats.vercel.app/api?username=Saurabhsharma13&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a0a1a&title_color=00d4ff&icon_color=7b2fff&text_color=c8d6e5&count_private=true"
            alt="GitHub Stats"
            loading="lazy"
          />
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=Saurabhsharma13&theme=tokyonight&hide_border=true&background=0a0a1a&stroke=00d4ff&ring=7b2fff&fire=ff2d78&currStreakLabel=00d4ff&sideLabels=c8d6e5"
            alt="GitHub Streak"
            loading="lazy"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=Saurabhsharma13&layout=compact&theme=tokyonight&hide_border=true&bg_color=0a0a1a&title_color=00d4ff&text_color=c8d6e5"
            alt="Top Languages"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
