"use client";
import React from "react";

const AXES = [
  { key: "consistency", label: "성실도" },
  { key: "influence", label: "영향력" },
  { key: "popularity", label: "인기도" },
  { key: "affinity", label: "호감도" },
  { key: "fanship", label: "팬심" },
  { key: "explore", label: "탐험력" },
];

export function gradeLetter(score) {
  if (score >= 95) return "SSS";
  if (score >= 85) return "SS";
  if (score >= 70) return "S";
  if (score >= 55) return "A";
  if (score >= 40) return "B";
  if (score >= 25) return "C";
  if (score >= 10) return "D";
  return "F";
}

export default function RadarHex({
  values,           // {consistency:70, influence:55, ...} (0~100)
  overall,          // 0~100
  title = "스탯 요약",
}) {
  const size = 300;         // SVG 사이즈
  const rMax = 110;         // 반지름
  const cx = size / 2, cy = size / 2;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const angles = AXES.map((_, i) => -90 + (360 / AXES.length) * i);

  const polyPoints = AXES.map((a, i) => {
    const v = Math.max(0, Math.min(100, values[a.key] ?? 0));
    const r = (v / 100) * rMax;
    const x = cx + r * Math.cos(toRad(angles[i]));
    const y = cy + r * Math.sin(toRad(angles[i]));
    return `${x},${y}`;
  }).join(" ");

  const ring = (t) =>
    AXES.map((_, i) => {
      const r = rMax * t;
      const x = cx + r * Math.cos(toRad(angles[i]));
      const y = cy + r * Math.sin(toRad(angles[i]));
      return `${x},${y}`;
    }).join(" ");

  const overallGrade = gradeLetter(overall ?? 0);

  return (
    <div className="panel mt-5 md:mt-6 space-y-3 md:space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3>{title}</h3>
        <span className="badge">{overallGrade} · {Math.round(overall ?? 0)}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 items-center">
        {/* Chart */}
        <div className="flex items-center justify-center">
          <svg width={size} height={size}>
            {/* guide rings */}
            {[0.25, 0.5, 0.75, 1].map((t) => (
              <polygon
                key={t}
                points={ring(t)}
                fill="none"
                stroke="var(--line)"
                strokeDasharray="4 4"
              />
            ))}

            {/* axes */}
            {AXES.map((a, i) => {
              const x = cx + rMax * Math.cos(toRad(angles[i]));
              const y = cy + rMax * Math.sin(toRad(angles[i]));
              return (
                <g key={a.key}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="var(--line2)"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={y}
                    fontSize="11"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--txt)"
                    style={{ transform: "translateY(-10px)" }}
                  >
                    {a.label}
                  </text>
                </g>
              );
            })}

            {/* filled area */}
            <polygon
              points={polyPoints}
              fill="rgba(67,209,191, .28)"     // 파스텔 민트
              stroke="rgba(67,209,191, .75)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* legend */}
        <div className="grid gap-2">
          {AXES.map((a) => {
            const v = Math.round(values[a.key] ?? 0);
            return (
              <div key={a.key} className="item">
                <div className="flex items-center gap-2">
                  <strong>{a.label}</strong>
                </div>
                <span className="badge">{gradeLetter(v)} · {v}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
