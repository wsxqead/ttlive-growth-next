"use client";
import { useState } from "react";
import { demoActivity } from "../../data/sample";

const tabs = [
  { key: "bj", label: "BJ" },
  { key: "viewer", label: "시청자" },
  { key: "shared", label: "공통" },
];

export default function Page() {
  const [tab, setTab] = useState("bj");
  const list = demoActivity.events[tab] || [];

  return (
    <section className="panel">
      <h1 className="text-lg mb-2">Activity Grade (활동 기반)</h1>

      {/* 탭: 파스텔 민트 톤 */}
      <div
        className="flex gap-2 border-b mb-3"
        style={{ borderColor: "var(--line)" }}
        aria-label="활동 분류"
      >
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              aria-selected={active}
              onClick={() => setTab(t.key)}
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

      <div className="grid gap-3 md:grid-cols-3">
        {list.map((ev, i) => (
          <div key={i} className="item">
            <div className="flex items-center gap-2 flex-wrap">
              <strong>{ev.name}</strong>
              <span className="badge">+{ev.exp} EXP</span>
            </div>
            <span className="text-muted">{ev.limit}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
