export default function Footer() {
  return (
    <footer>
      <p>
        Designed &amp; Built with ❤️ by <span>Saurabh Sharma</span> &nbsp;·&nbsp;{' '}
        <span>{new Date().getFullYear()}</span>
      </p>
      <p style={{ marginTop: '7px', fontSize: '.72rem' }}>
        Powered by GitHub API &nbsp;·&nbsp; Deploy on GitHub Pages or Netlify
      </p>
    </footer>
  );
}
