// AI analysis service. DEMO_MODE uses local multi-signal rules (no API key needed).
// To use a real AI later: set DEMO_MODE=false and build a small backend at /api/analyze
// that holds the secret API key. NEVER put a secret key in frontend code.
const DEMO_MODE = true;

export function assess(p) {
  const late = p.refills.filter((r) => r.late > 7).length;
  const resp = p.clinical.response, wear = p.wearable.change;
  const score = (late >= 2 ? 2 : late === 1 ? 1 : 0) + (resp === "worsening" ? 2 : resp === "mixed" ? 1 : -1) + (wear ? 1 : 0);
  const risk = score >= 4 ? "High" : score >= 2 ? "Moderate" : "Low";
  const n = (late >= 2) + (resp !== "good") + wear;
  const confidence = n >= 3 ? "Strong signal alignment" : n === 2 ? "Moderate signal alignment" : "Limited signal (uncertain)";
  const evidence = [];
  if (late >= 2) evidence.push(`Repeated refill gaps detected (${late} refills more than 7 days late)`);
  else if (late === 1) evidence.push("One late refill only. A single late refill does not raise the risk level by itself");
  if (resp === "worsening") evidence.push(`Treatment response has declined (${p.clinical.metric} trend worsening)`);
  else if (resp === "mixed") evidence.push(`Treatment response is mixed (${p.clinical.note.toLowerCase()})`);
  else evidence.push(`Treatment response appears good (${p.clinical.note.toLowerCase()}), which lowers concern`);
  if (wear) evidence.push("Recent routine changes detected in wearable activity and sleep");
  const possibleExplanations = ["Delayed refill for practical reasons", "Medicine obtained elsewhere (data not visible to MEDsync)", "Missing or incomplete data"];
  if (resp !== "good") possibleExplanations.push("Treatment change or need for review by the doctor");
  return { risk, confidence, evidence, possibleExplanations,
    followUp: "Doctor review and follow-up may be considered.",
    reasoning: risk === "High" ? "Several independent signals point in the same direction over time." :
      risk === "Moderate" ? "Some signals suggest a pattern, but others are not aligned." :
      "Pharmacy timing alone is not enough to indicate a concern." };
}

export async function analyzePatient(p) {
  if (!DEMO_MODE) {
    const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    return res.json();
  }
  await new Promise((r) => setTimeout(r, 1200)); // simulate AI thinking
  return assess(p);
}
