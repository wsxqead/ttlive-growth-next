"use client";
import { useEffect, useMemo, useState } from "react";

/** ---------- 간이 저장소 (나중에 API로 교체) ---------- */
const KEY = "ttlive.attendance.v1";
function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { days: [] }; // days: ["2025-10-13","2025-10-14",...]
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

/** 주의 시작(월요일) */
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

  // 연속 출석(스테이크) 계산
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

  // 이번 주 달력(월~일)
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
    // TODO: fetch("/api/attendance/checkin", { method: "POST" })
    const next = loadStore();
    if (!next.days.includes(today)) next.days.push(today);
    saveStore(next);
    setStore(next);
    setChecking(false);
  }

  return (
    <section className="panel">
      <div className="flex items-center justify-between mb-3">
        <h3>출석 체크</h3>
        <span className="badge">누적 {total}회</span>
      </div>

      {/* 버튼 */}
      <div className="item mb-3">
        <div className="flex items-center gap-2">
          <strong>오늘</strong>
          {checkedToday ? (
            <span className="badge">✔️ 출석 완료</span>
          ) : (
            <span className="tag">미출석</span>
          )}
        </div>
        <button
          disabled={checkedToday || checking}
          onClick={handleCheckIn}
          className="badge disabled:opacity-50"
          title={checkedToday ? "이미 출석 완료" : "출석하기"}
        >
          {checkedToday ? "완료" : checking ? "처리중…" : "출석하기"}
        </button>
      </div>

      {/* 이번 주 달력 */}
      <div className="panel">
        <div className="mb-2 flex items-center justify-between">
          <strong>이번 주</strong>
          <span className="text-muted">월~일 기준</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {week.map((d) => (
            <div
              key={d.key}
              className={`rounded-lg border text-center py-2 ${
                d.checked
                  ? "bg-[rgba(67,209,191,.18)] border-[var(--line2)]"
                  : "bg-[var(--surface)] border-[var(--line)]"
              }`}
            >
              <div className="text-xs text-muted">{d.label}</div>
              <div className="text-sm">{d.checked ? "✅" : "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 보상/규칙 미리 안내 */}
      <div className="item mt-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge">연속 {streak}일</span>
          <span className="tag">주간 7일 달성 시 +100 EXP / +⭐ 10</span>
          <span className="tag">일일 출석 +10 EXP / +⭐ 1</span>
        </div>
      </div>
    </section>
  );
}
