// Tiny dependency-free SVG line chart.
export default function LineChart({ data, labels, color = "#0e9aa7", title }) {
  const W = 300, H = 120, P = 24;
  const min = Math.min(...data), max = Math.max(...data), span = max - min || 1;
  const pts = data.map((v, i) => [P + (i * (W - 2 * P)) / (data.length - 1), H - P - ((v - min) / span) * (H - 2 * P)]);
  return (
    <div><div className="muted">{title}</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%">
        <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        {pts.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="4" fill={color} />
          <text x={x} y={H - 6} fontSize="10" textAnchor="middle" fill="#5b6f84">{labels[i]}</text>
          <text x={x} y={y - 8} fontSize="10" textAnchor="middle" fill="#10243a">{data[i]}</text></g>)}
      </svg></div>
  );
}
