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
  values, // {consistency:70, influence:55, ...} (0~100)
  overall, // 0~100
  title = "스탯 요약",
}) {
  const size = 300; // SVG 사이즈
  const rMax = 110; // 반지름
  const cx = size / 2,
    cy = size / 2;
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
    <div className="subpanel  space-y-3 md:space-y-4">
      {/* 본문 레이아웃: [차트] [토탈카드] [항목리스트] */}
      <div className="grid gap-1.5 md:gap-2 w-full max-w-[320px] xl:max-w-[380px]">
        {/* 1) Chart */}
        <div className="flex items-center justify-center">
          <svg width={size} height={size}>
            {[0.25, 0.5, 0.75, 1].map((t) => (
              <polygon
                key={t}
                points={ring(t)}
                fill="none"
                stroke="var(--line)"
                strokeDasharray="4 4"
              />
            ))}
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
            <polygon
              points={polyPoints}
              fill="rgba(255, 221, 77, 0.3)"
              stroke="rgba(255, 208, 0, 0.9)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* 2) 가운데: 큰 토탈 카드 */}
        <div className="h-full">
          <div
            className="rounded-2xl border p-4 h-full flex flex-col items-center justify-center text-center"
            style={{
              borderColor: "var(--line2)",
              background: "var(--brand-soft)",
            }}
          >
            <div className="text-xs text-muted mb-1">총합 등급</div>
            <div
              className="leading-none"
              style={{ fontSize: 48, fontWeight: 800, color: "#e6d38a" }}
            >
              {overallGrade}
            </div>
            <div className="mt-1 badge" style={{ fontSize: 14 }}>
              {Math.round(overall ?? 0)}
            </div>
          </div>
        </div>

        {/* 3) 오른쪽: 개별 지수 리스트 */}
        <div className="grid gap-2">
          {AXES.map((a) => {
            const v = Math.round(values[a.key] ?? 0);
            return (
              <div key={a.key} className="item">
                <div className="flex items-center gap-2">
                  <strong>{a.label}</strong>
                </div>
                <span className="badge">
                  {gradeLetter(v)} · {v}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
