# MEDsync — Connecting the signals behind every dose.

## Problem
Doctors cannot always know how medicines are being taken between visits. Prescription, pharmacy, clinical and daily-activity data live in separate places.

## Solution
MEDsync connects these signals and highlights patterns that may indicate a **possible adherence risk**, with the evidence shown. The doctor always decides.

## Features
Landing page, doctor dashboard, patient list, alerts view, patient detail (4 signal sections, timeline, 3 charts), "Analyze with MEDsync AI" with explainable output, About page. All data is simulated.

## How MEDsync works
Multi-signal temporal analysis, not single-signal detection. Refill delays, clinical response trend and wearable changes are combined over time.
- One late refill only: Low / uncertain concern
- Repeated refill gaps + declining response: higher possible risk
- Good response + irregular pharmacy data: not classified as high

## Technology stack
React 18, Vite, plain CSS, dependency-free SVG charts.

## AI usage / AI architecture
`src/services/analyzePatient.js` exposes `analyzePatient()`. It receives prescription, pharmacy, clinical and wearable data and returns risk, confidence, evidence, possible explanations and follow-up. To connect a real AI model, set `DEMO_MODE = false` and add a small backend at `/api/analyze` that keeps the API key secret. Never put an API key in frontend code.

## Demo mode
Enabled by default. Rule-based multi-signal logic runs locally; no API key or database needed.

## How to run
```
npm install
npm run dev
```
Open the link shown (usually http://localhost:5173).

## Future improvements
Real AI model behind a secure backend, EHR/pharmacy integrations, doctor feedback loop, authentication and privacy compliance, clinical validation.

## Medical safety limitations
MEDsync cannot prove a patient took a medicine, never labels a patient "non-compliant", gives no diagnosis or treatment instructions, and is AI-assisted decision support only. Final decisions belong to the doctor.

## How AI Was Used to Build MEDsync
AI was used for: **Architecture** (folder structure, service design), **UI generation**, **Code generation**, **Debugging**, **Documentation**, **Testing** (checking the demo cases behave as intended) and **Refinement** (safer medical wording).
