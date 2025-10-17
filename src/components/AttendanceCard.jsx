"use client";
import { useEffect, useMemo, useState } from "react";

/** ---------- 간이 저장소 ---------- */
const KEY = "ttlive.attendance.v1";
function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { days: [] };
  } catch {
    return { days: [] };
  }
}
function saveStore(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}
function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function isSameDay(a, b) {
  return a === b;
}
function weekStart(d = new Date()) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Mon=0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** ---------- 컴포넌트 ---------- */
export default function AttendanceCard({ userId = "demo-user" }) {
  const [store, setStore] = useState({ days: [] });
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setStore(loadStore());
  }, []);

  const today = dateKey();
  const checkedToday = store.days.some((k) => isSameDay(k, today));

  const streak = useMemo(() => {
    const set = new Set(store.days);
    let s = 0;
    for (let i = 0; ; i++) {
      const key = dateKey(addDays(new Date(), -i));
      if (set.has(key)) s++;
      else break;
    }
    return s;
  }, [store.days]);

  const week = useMemo(() => {
    const ws = weekStart();
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(ws, i);
      const key = dateKey(d);
      return {
        key,
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        checked: store.days.includes(key),
      };
    });
  }, [store.days]);

  const total = store.days.length;

  async function handleCheckIn() {
    if (checkedToday || checking) return;
    setChecking(true);
    const next = loadStore();
    if (!next.days.includes(today)) next.days.push(today);
    saveStore(next);
    setStore(next);
    setChecking(false);
  }

  return (
    <section
      className="panel"
      style={{
        borderColor: "#e6d38a",
        background: "linear-gradient(180deg, #fffdf6 0%, #fffbe6 100%)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: "#a07800" }}>
          출석 체크
        </h3>
        <span
          className="badge"
          style={{
            background: "#fff7d6",
            color: "#b8860b",
            borderColor: "#e6d38a",
          }}
        >
          누적 {total}회
        </span>
      </div>

      {/* 버튼 */}
      <div className="item mb-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <strong style={{ color: "#8b7500" }}>오늘</strong>
          {checkedToday ? (
            <span
              className="badge"
              style={{
                background: "#fff7d6",
                color: "#b8860b",
                borderColor: "#e6d38a",
              }}
            >
              ✔️ 출석 완료
            </span>
          ) : (
            <span
              className="tag"
              style={{
                background: "#fffbe6",
                borderColor: "#e6d38a",
                color: "#8b7500",
              }}
            >
              미출석
            </span>
          )}
        </div>

        <button
          disabled={checkedToday || checking}
          onClick={handleCheckIn}
          className="badge disabled:opacity-50 transition-all"
          title={checkedToday ? "이미 출석 완료" : "출석하기"}
          style={{
            background: checkedToday
              ? "#fff7d6"
              : checking
              ? "#fff2b8"
              : "#ffec99",
            color: "#8b7500",
            border: "1px solid #e6d38a",
            boxShadow:
              checkedToday || checking
                ? "none"
                : "0 3px 6px rgba(255,221,77,0.3)",
          }}
        >
          {checkedToday ? "완료" : checking ? "처리중…" : "출석하기"}
        </button>
      </div>

      {/* 이번 주 달력 */}
      <div
        className="panel"
        style={{
          borderColor: "#e6d38a",
          background: "#fffef8",
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <strong style={{ color: "#a07800" }}>이번 주</strong>
          <span className="text-muted text-sm">월~일 기준</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {week.map((d) => (
            <div
              key={d.key}
              className="rounded-lg border text-center py-2 transition-all"
              style={{
                borderColor: d.checked ? "#e6d38a" : "var(--line)",
                background: d.checked ? "#fff7d6" : "#fff",
                boxShadow: d.checked
                  ? "0 2px 6px rgba(255,221,77,0.25)"
                  : "none",
              }}
            >
              <div className="text-xs text-muted">{d.label}</div>
              <div
                className="text-sm font-semibold"
                style={{
                  color: d.checked ? "#b8860b" : "#aaa",
                }}
              >
                {d.checked ? "✅" : "—"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 보상 안내 */}
      <div
        className="item mt-3 rounded-xl border"
        style={{
          borderColor: "#e6d38a",
          background: "linear-gradient(135deg, #fffbe6 0%, #fffdf6 100%)",
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="badge"
            style={{
              background: "#fff7d6",
              color: "#8b7500",
              borderColor: "#e6d38a",
            }}
          >
            연속 {streak}일
          </span>
          <span
            className="tag"
            style={{
              background: "#fffbe6",
              color: "#8b7500",
              borderColor: "#e6d38a",
            }}
          >
            주간 7일 달성 시 +100 EXP / +⭐ 10
          </span>
          <span
            className="tag"
            style={{
              background: "#fffbe6",
              color: "#8b7500",
              borderColor: "#e6d38a",
            }}
          >
            일일 출석 +10 EXP / +⭐ 1
          </span>
        </div>
      </div>
    </section>
  );
}
