export default function About() {
  return (
    <div className="wrap"><h1>About MEDsync</h1>
      <div className="card"><p>MEDsync connects healthcare signals that are normally separated and uses AI to identify patterns that may indicate possible medication adherence problems.</p>
        <div className="grid g4">{[["Prescription", "What was prescribed"], ["Pharmacy", "Refill timing"], ["Clinical", "Symptoms and results"], ["Wearable", "Daily routine"]].map(([t, d]) => <div className="card" key={t}><b>{t}</b><div className="muted">{d}</div></div>)}</div>
        <p><b>Multi-signal temporal analysis, not single-signal detection.</b> One late refill alone does not create a high-risk result.</p>
        <p className="muted">MEDsync cannot prove whether a medicine was taken. The final decision always belongs to the doctor.</p></div></div>
  );
}
