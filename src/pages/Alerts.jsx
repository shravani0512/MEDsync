import PatientTable from "../components/PatientTable.jsx";
import { patients } from "../data/patients.js";
import { assess } from "../services/analyzePatient.js";
export default function Alerts({ open }) {
  const flagged = patients.filter((p) => assess(p).risk !== "Low");
  return (
    <div className="wrap"><h1>Alerts / Risk</h1>
      <p className="muted">Patients with moderate or high possible adherence risk. These are signals for review, not conclusions.</p>
      <PatientTable list={flagged} open={open} /></div>
  );
}
