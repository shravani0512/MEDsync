import RiskBadge from "./RiskBadge.jsx";
import { assess } from "../services/analyzePatient.js";
export default function PatientTable({ list, open }) {
  return (
    <div className="card"><table>
      <thead><tr><th>Patient</th><th>Age</th><th>Medicine</th><th>Possible adherence risk</th></tr></thead>
      <tbody>{list.map((p) => (
        <tr key={p.id} className="click" onClick={() => open(p.id)}>
          <td><b>{p.name}</b></td><td>{p.age}</td><td>{p.medicine}</td><td><RiskBadge risk={assess(p).risk} /></td>
        </tr>))}</tbody>
    </table><p className="muted">All patient information is DEMO / SIMULATED data. Click a patient to review.</p></div>
  );
}
