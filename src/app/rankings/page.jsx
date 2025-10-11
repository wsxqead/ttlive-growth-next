"use client";
import { useState } from "react";
import { demoRankings } from "../../data/sample";

const tabs = [
  { key: "weekly", label: "주간" },
  { key: "monthly", label: "월간" },
];

export default function Page() {
  const [scope, setScope] = useState("weekly");
  const bj = demoRankings[scope]?.bj || [];
  const viewer = demoRankings[scope]?.viewer || [];

  return (
    <section className="panel">
      <h1 className="text-lg mb-2">랭킹 (주간/월간)</h1>

      {/* 탭: 라이트/민트 테마 */}
      <div
        className="flex gap-2 border-b"
        style={{ borderColor: "var(--line)" }}
        aria-label="랭킹 주기"
      >
        {tabs.map((t) => {
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
                color: active ? "#166e64" : "var(--txt)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-3">
        <div className="panel">
          <h2 className="mb-2">BJ 랭킹</h2>
          <List data={bj} />
        </div>
        <div className="panel">
          <h2 className="mb-2">시청자 랭킹</h2>
          <List data={viewer} />
        </div>
      </div>

      <div className="panel mt-4">
        <h2 className="mb-2">랭킹 규칙</h2>
        <div className="grid gap-2">
          <Row
            l={
              <>
                <strong>집계 기준</strong>
                <span className="badge">Activity EXP 합산</span>
              </>
            }
            r="후원 레벨(Fan Lv)은 별도 시스템"
          />
          <Row
            l={
              <>
                <strong>리셋</strong>
                <span className="badge">주간/월간 종료 시</span>
              </>
            }
            r="시즌 보상은 별도 운영"
          />
        </div>
      </div>
    </section>
  );
}

function List({ data }) {
  if (!data.length)
    return <div className="panel text-muted">데이터가 없습니다.</div>;
  return (
    <div className="grid gap-2">
      {data.map((row, i) => (
        <div key={i} className="item">
          <div className="flex items-center gap-2">
            <strong>#{i + 1}</strong>
            <span>{row.name}</span>
          </div>
          <span className="badge">EXP {row.exp.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function Row({ l, r }) {
  return (
    <div className="item">
      <div className="flex items-center gap-2 flex-wrap">{l}</div>
      <span className="text-muted">{r}</span>
    </div>
  );
}
