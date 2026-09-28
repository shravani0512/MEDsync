const items = [["dashboard", "Dashboard"], ["patients", "Patients"], ["alerts", "Alerts / Risk"], ["about", "About MEDsync"]];
export function Header({ page, go }) {
  return (
    <div className="header"><div className="wrap">
      <div className="logo" onClick={() => go("home")}>MED<b>sync</b></div>
      <div className="nav">{items.map(([k, l]) => <button key={k} className={page === k ? "on" : ""} onClick={() => go(k)}>{l}</button>)}</div>
      <span className="demo">Demo Mode — Simulated Patient Data</span>
    </div></div>
  );
}
export const Footer = () => (
  <div className="footer">
    <div>MEDsync — Connecting the signals behind every dose.</div>
    <div>AI-assisted decision support. Not a medical diagnosis.</div>
  </div>
);
