export default function Preloader({ loaded }) {
  return (
    <div id="preloader" className={loaded ? 'hide' : ''}>
      <div className="pre-logo">&lt;SS /&gt;</div>
      <div className="pre-bar"><div className="pre-fill" /></div>
      <div className="pre-text">initializing...</div>
    </div>
  );
}
