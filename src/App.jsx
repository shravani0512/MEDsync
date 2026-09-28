import { useState } from "react";
import { Header, Footer } from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";
import Alerts from "./pages/Alerts.jsx";
import About from "./pages/About.jsx";
import PatientDetail from "./pages/PatientDetail.jsx";
import { patients } from "./data/patients.js";

export default function App() {
  const [page, setPage] = useState("home");
  const [pid, setPid] = useState(null);
  const open = (id) => { setPid(id); setPage("detail"); window.scrollTo(0, 0); };
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <>
      <Header page={page} go={go} />
      {page === "home" && <Landing go={go} />}
      {page === "dashboard" && <Dashboard open={open} />}
      {page === "patients" && <Patients open={open} />}
      {page === "alerts" && <Alerts open={open} />}
      {page === "about" && <About />}
      {page === "detail" && <PatientDetail patient={patients.find((p) => p.id === pid)} back={() => go("dashboard")} />}
      <Footer />
    </>
  );
}
