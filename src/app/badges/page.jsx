"use client";
import { useMemo, useState } from "react";
import { demoBadges } from "../../data/sample";

const tabs = [
  { key: "all", label: "전체" },
  { key: "season", label: "시즌" },
  { key: "community", label: "커뮤니티" },
  { key: "support", label: "후원" },
];

export default function Page() {
  const [tab, setTab] = useState("all");
  const list = useMemo(() => {
    if (tab === "all") return demoBadges;
    return demoBadges.filter((b) => b.kind === tab);
  }, [tab]);

  return (
    <section className="panel">
      <h1 className="text-lg mb-2">배지</h1>

      {/* 탭: 파스텔 민트 */}
      <div
        className="flex gap-2 border-b mb-3"
        style={{ borderColor: "var(--line)" }}
        aria-label="배지 필터"
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
                color: active ? "#166e64" : "var(--txt)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {list.map((b, i) => (
          <div key={i} className="item">
            <div className="flex items-center gap-2 flex-wrap">
              <strong>{b.name}</strong>
              <span className="text-muted">{b.desc}</span>
            </div>
            <span className="badge">{b.owned ? "획득" : "미획득"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
