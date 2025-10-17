"use client";
import { useMemo, useState } from "react";
import { demoQuests, metricLabels } from "../../data/sample";
import ProgressBar from "../../components/ProgressBar";

const scopeTabs = [
  { key: "daily", label: "일일" },
  { key: "weekly", label: "주간" },
  { key: "monthly", label: "월간" },
  { key: "total", label: "누적" },
];

const categoryTabs = [
  { key: "all", label: "전체" },
  { key: "consistency", label: "성실도(BJ)" },
  { key: "influence", label: "영향력(BJ)" },
  { key: "popularity", label: "인기도(BJ)" },
  { key: "affinity", label: "호감도(BJ)" },
  { key: "engagement", label: "참여도(시청자)" },
  { key: "fanship", label: "팬심(시청자)" },
  { key: "angel", label: "엔젤지수(시청자)" },
  { key: "devil", label: "데빌지수(시청자)" },
  { key: "explore", label: "탐험력(시청자)" },
];

export default function Page() {
  const [scope, setScope] = useState("daily");
  const [cat, setCat] = useState("all");

  const raw = demoQuests[scope] || [];
  const list = useMemo(() => {
    if (cat === "all") return raw;
    return raw.filter((q) => q.stat === cat);
  }, [scope, cat]);

  return (
    <section className="panel">
      <h1 className="text-lg mb-2">퀘스트 (일/주/월/누적)</h1>

      {/* 상단: 기간 탭 */}
      <div
        className="flex gap-2 border-b mb-3"
        style={{ borderColor: "var(--line)" }}
      >
        {scopeTabs.map((t) => {
          const active = scope === t.key;
          return (
            <button
              key={t.key}
              aria-selected={active}
              onClick={() => setScope(t.key)}
              className={[
                "px-3 py-2 rounded-lg border transition-colors outline-none",
                "focus-visible:ring-2 focus-visible:ring-[rgba(67,209,191,.35)] focus-visible:ring-offset-2",
                active
                  ? "shadow-[0_4px_14px_rgba(67,209,191,.18)]"
                  : "hover:translate-y-[-1px] transition-transform",
              ].join(" ")}
              style={{
                borderColor: active ? "var(--line2)" : "transparent",
                background: active ? "var(--brand-soft)" : "transparent",
                color: active ? "#e6d38a" : "var(--txt)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 카테고리 필터 */}
      <div
        className="flex flex-wrap gap-2 border-b mb-3 pb-2"
        style={{ borderColor: "var(--line)" }}
      >
        {categoryTabs.map((t) => {
          const active = cat === t.key;
          return (
            <button
              key={t.key}
              aria-selected={active}
              onClick={() => setCat(t.key)}
              className={[
                "px-2.5 py-1.5 rounded-md border text-xs transition-colors",
                active
                  ? "shadow-[0_2px_10px_rgba(67,209,191,.14)]"
                  : "hover:translate-y-[-1px] transition-transform",
              ].join(" ")}
              style={{
                borderColor: active ? "var(--line2)" : "transparent",
                background: active ? "var(--brand-soft)" : "transparent",
                color: active ? "#e6d38a" : "var(--txt)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 리스트 */}
      <div className="grid gap-3">
        {list.length === 0 && (
          <div className="panel text-muted">해당 조건의 퀘스트가 없습니다.</div>
        )}
        {list.map((q) => {
          const pct = Math.min(100, (q.progress / q.target) * 100);
          return (
            <div key={q.id} className="panel">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>{q.name}</strong>
                  <span className="tag">
                    {q.role === "BJ" ? "BJ" : "Viewer"}
                  </span>
                  <span className="tag">{labelForStat(q.stat)}</span>
                </div>
                <span className="badge">+{q.rewardExp} EXP</span>
              </div>

              <div className="item mb-2">
                <div className="flex items-center gap-2">
                  <span className="tag">
                    {q.progress} / {q.target}
                  </span>
                  <span className="text-muted">
                    {metricLabels[q.metricKey] ?? q.metricKey}
                  </span>
                </div>
                <span className="text-muted">{Math.round(pct)}%</span>
              </div>

              <ProgressBar value={pct} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function labelForStat(stat) {
  switch (stat) {
    case "consistency":
      return "성실도";
    case "influence":
      return "영향력";
    case "popularity":
      return "인기도";
    case "affinity":
      return "호감도";
    case "engagement":
      return "참여도";
    case "fanship":
      return "팬심";
    case "angel":
      return "엔젤지수";
    case "devil":
      return "데빌지수";
    case "explore":
      return "탐험력";
    default:
      return stat;
  }
}
