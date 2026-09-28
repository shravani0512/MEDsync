import PatientTable from "../components/PatientTable.jsx";
import { patients } from "../data/patients.js";
import { assess } from "../services/analyzePatient.js";
export default function Dashboard({ open }) {
  const count = (r) => patients.filter((p) => assess(p).risk === r).length;
  const cards = [["Total Patients", patients.length, "var(--ink)"], ["High Possible Risk", count("High"), "var(--hi)"],
    ["Moderate Possible Risk", count("Moderate"), "var(--mod)"], ["Low Possible Risk", count("Low"), "var(--lo)"]];
  return (
    <div className="wrap">
      <h1>Doctor Dashboard</h1>
      <p className="muted">MEDsync connects prescription, pharmacy, clinical and wearable signals for doctor review.</p>
      <div className="grid g4" style={{ margin: "1rem 0" }}>
        {cards.map(([l, v, c]) => <div className="card" key={l}><div className="muted">{l}</div><div className="stat" style={{ color: c }}>{v}</div></div>)}
      </div>
      <PatientTable list={patients} open={open} />
    </div>
  );
}
