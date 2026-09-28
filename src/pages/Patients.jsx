import PatientTable from "../components/PatientTable.jsx";
import { patients } from "../data/patients.js";
export default function Patients({ open }) {
  return <div className="wrap"><h1>Patients</h1><PatientTable list={patients} open={open} /></div>;
}
