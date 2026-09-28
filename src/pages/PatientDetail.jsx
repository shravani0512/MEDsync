import { useState } from "react";
import LineChart from "../components/LineChart.jsx";
import RiskBadge from "../components/RiskBadge.jsx";
import { analyzePatient } from "../services/analyzePatient.js";

const Section = ({ title, rows }) => (
  <div className="card"><h3>{title}</h3>
    {rows.map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: ".3rem 0" }}><span className="muted">{k}</span><span style={{ textAlign: "right" }}>{v}</span></div>)}</div>
);

export default function PatientDetail({ patient: p, back }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const run = async () => { setLoading(true); setResult(null); setResult(await analyzePatient(p)); setLoading(false); };
  const { prescription: rx, pharmacy: ph, clinical: c, wearable: w } = p;
  return (
    <div className="wrap">
      <button className="btn ghost" onClick={back}>← Back</button>
      <h1 style={{ marginTop: "1rem" }}>{p.name}</h1>
      <p className="muted">Age {p.age} · {p.medicine} · DEMO / SIMULATED data</p>
      <div className="grid g2">
        <Section title="Prescription" rows={[["Medicine", rx.medicine], ["Dose", rx.dose], ["Frequency", rx.frequency], ["Duration", rx.duration]]} />
        <Section title="Pharmacy" rows={[["Last refill", ph.last], ["Expected refill", ph.expected], ["Refill gap", ph.gap], ["Previous pattern", ph.pattern]]} />
        <Section title="Clinical" rows={[["Symptoms", c.symptoms], [c.metric, c.trend.join(" → ")], ["Treatment response", c.note]]} />
        <Section title="Wearable" rows={[["Activity", `${w.activity[3]} steps/day`], ["Sleep", w.sleep], ["Heart rate", w.hr], ["SpO2", w.spo2]]} />
      </div>
      <div className="grid g2" style={{ margin: "1rem 0" }}>
        <div className="card"><h3>Timeline</h3><div className="tl">{p.timeline.map((t) => <div key={t}>{t}</div>)}</div></div>
        <div className="card grid">
          <LineChart title="Refill delay (days late)" labels={p.refills.map((r) => r.date)} data={p.refills.map((r) => r.late)} color="#1d5fd1" />
          <LineChart title={`Clinical trend: ${c.metric}`} labels={c.labels} data={c.trend} />
          <LineChart title={`Wearable: ${w.metric}`} labels={c.labels} data={w.activity} color="#7a5cd6" />
        </div>
      </div>
      <button className="btn" onClick={run} disabled={loading} style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}>
        {loading ? "MEDsync AI is connecting the signals…" : "Analyze with MEDsync AI"}</button>
      {result && (
        <div className="card result" style={{ marginTop: "1rem" }}>
          <div className="muted">POSSIBLE ADHERENCE RISK</div>
          <h2><RiskBadge risk={result.risk} /></h2>
          <p><b>Signal strength:</b> {result.confidence}. {result.reasoning}</p>
          <h3>Why was this patient flagged?</h3><ul>{result.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
          <h3>Possible explanations</h3><ul>{result.possibleExplanations.map((e) => <li key={e}>{e}</li>)}</ul>
          <h3>Recommended next step</h3><p>{result.followUp}</p>
          <p className="muted">AI-assisted decision support. Not a medical diagnosis. This output may indicate a pattern and requires doctor review.</p>
        </div>)}
    </div>
  );
}
