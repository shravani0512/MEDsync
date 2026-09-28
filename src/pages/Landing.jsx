export default function Landing({ go }) {
  const Arrow = () => <div className="arrow">↓</div>;
  return (
    <div className="wrap">
      <div className="hero">
        <h1>MEDsync</h1>
        <h2 style={{ color: "var(--teal)" }}>Connecting the signals behind every dose.</h2>
        <p className="muted" style={{ fontSize: "1.1rem" }}>AI-powered medication adherence intelligence for healthcare professionals.</p>
        <button className="btn" onClick={() => go("dashboard")}>Open Doctor Dashboard</button>
      </div>
      <div className="card flow">
        <div className="row">{["Prescription", "Pharmacy", "Clinical", "Wearable"].map((s, i) => <span key={s} style={{ display: "contents" }}>{i > 0 && <span className="arrow">+</span>}<span className="chip">{s}</span></span>)}</div>
        <Arrow /><span className="chip ai">MEDsync AI</span><Arrow />
        <span className="chip">Possible adherence risk</span><Arrow />
        <span className="chip">Doctor review</span>
      </div>
    </div>
  );
}
