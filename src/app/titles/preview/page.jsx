"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { titlesMaster, titlesOwned } from "../../../data/sample";
import Portal from "@/components/Portal";

const ALL_TITLES = titlesMaster.map((t) => ({
  name: t.name,
  kind: mapKind(t), // growth/season/angel/devil/achievement 등
  color: t.color,
  emoji: t.emoji,
  desc: t.desc,
  owned: titlesOwned.includes(t.name),
  role: t.role,
}));

/* ───────── helpers ───────── */
function tierByGrade(min, max) {
  if (max >= 15) return "platinum";
  if (max >= 10) return "gold";
  if (max >= 5) return "silver";
  return "bronze";
}
function inferKind(name) {
  if (/천사|Angel|빛|수호자/.test(name)) return "angel";
  if (/악마|Devil|그림자|혼돈/.test(name)) return "devil";
  if (/TOP|시즌|월간|주간/i.test(name)) return "season";
  return "achievement";
}
function colorByKind(k) {
  return (
    {
      angel: "#D7FAF0", // 민트
      devil: "#EBE3FF", // 퍼플
      season: "#FFF2CC", // 골드
      achievement: "#E8F1FF",
      growth: "#E6FFF6",
    }[k] || "#E8F1FF"
  );
}
function emojiByKind(k) {
  return (
    { angel: "👼", devil: "😈", season: "🏆", achievement: "🌟", growth: "📈" }[
      k
    ] || "🌟"
  );
}

/* ───────── helpers ───────── */

// titlesMaster의 type/role을 UI 필터용 kind로 매핑
function mapKind(t) {
  // 우선순위: angel/devil/season → growth → 기타(achievement)
  if (t.type?.includes("angel")) return "angel";
  if (t.type?.includes("devil")) return "devil";
  if (t.type === "season" || t.type === "legend") return "season";
  if (t.type === "growth") return "growth";
  return "achievement";
}

const FILTERS = [
  { key: "all", label: "전체" },
  { key: "owned", label: "보유" },
  { key: "unowned", label: "미보유" },
  { key: "bj", label: "BJ" },
  { key: "viewer", label: "시청자" },
  { key: "angel", label: "엔젤" },
  { key: "devil", label: "데빌" },
  { key: "season", label: "시즌" },
  { key: "growth", label: "성장형" },
];
export default function Page() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null); // {name, ...}
  const list = useMemo(() => {
    let arr = ALL_TITLES;
    if (filter === "owned") arr = arr.filter((t) => t.owned);
    else if (filter === "unowned") arr = arr.filter((t) => !t.owned);
    else if (filter === "bj" || filter === "viewer")
      arr = arr.filter((t) => t.role?.toLowerCase() === filter);
    else if (filter !== "all") arr = arr.filter((t) => t.kind === filter);

    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter(
        (t) =>
          t.name.toLowerCase().includes(s) ||
          (t.desc ?? "").toLowerCase().includes(s)
      );
    }
    return arr;
  }, [q, filter]);

  return (
    <section className="panel">
      <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
        <h1 className="text-lg">칭호 미리보기</h1>
        <div className="flex gap-2">
          <input
            placeholder="칭호 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-3 py-1.5 rounded-lg border outline-none"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface)",
              color: "var(--txt)",
            }}
          />
          <select
            className="px-3 py-1.5 rounded-lg border"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            {FILTERS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <TitleCard key={t.name} t={t} onPreview={() => setPreview(t)} />
        ))}
      </div>

      {/* 미리보기 모달 */}
      <AnimatePresence>
        {preview && (
          <Portal>
            <PreviewModal
              title={preview}
              onClose={() => setPreview(null)}
              onSet={() => {
                alert(`'${preview.name}'을 대표 칭호로 설정 (API 연동 예정)`);
                setPreview(null);
              }}
            />
          </Portal>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────── UI components ───────── */

function TitleCard({ t, onPreview }) {
  return (
    <div className="item p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <strong className="truncate">{t.name}</strong>
        {t.owned ? (
          <span className="badge">보유</span>
        ) : (
          <span className="tag">미보유</span>
        )}
      </div>
      <div className="text-sm text-muted line-clamp-2">{t.desc}</div>
      <div
        className="rounded-lg px-3 py-2 text-sm border"
        style={{ background: t.color, borderColor: "var(--line2)" }}
      >
        <span className="mr-1">{t.emoji}</span>
        미리보기: <strong>{t.name}</strong>
      </div>
      <div className="flex gap-2">
        <button className="tag" onClick={onPreview}>
          미리보기
        </button>
        <button
          className="badge"
          onClick={() => alert("대표로 설정 (API 연동 예정)")}
        >
          대표로 설정
        </button>
      </div>
    </div>
  );
}

function PreviewModal({ title, onClose, onSet }) {
  return (
    <motion.div
      className="fixed inset-0 z-1000 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backdropFilter: "blur(2px)", background: "rgba(0,0,0,.2)" }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        className="panel max-w-lg w-full space-y-3"
      >
        <h3>칭호 미리보기</h3>
        <div
          className="rounded-xl p-4 border text-center"
          style={{ background: title.color, borderColor: "var(--line2)" }}
        >
          <div className="text-2xl mb-1">
            <span className="mr-2">{title.emoji}</span>
            <strong>{title.name}</strong>
          </div>
          <div className="text-muted">{title.desc}</div>
        </div>

        {/* 채팅 입장/프로필 미리보기 가상 샘플 */}
        <div className="grid gap-2 md:grid-cols-2">
          <div className="item">
            <strong className="block mb-1">채팅 입장 미리보기</strong>
            <div
              className="rounded-lg px-3 py-2 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--line)",
              }}
            >
              <span
                className="badge inline-flex items-center gap-1 whitespace-nowrap break-keep px-2 py-1 mr-2"
                style={{ background: title.color }}
              >
                {title.emoji} {title.name}
              </span>
              <span className="font-medium whitespace-nowrap break-keep">
                sugarcake
              </span>{" "}
              님이 입장했습니다.
            </div>
          </div>
          <div className="item">
            <strong className="block mb-1">프로필 미리보기</strong>
            <div
              className="rounded-lg px-3 py-4 text-center border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--line)",
              }}
            >
              <div className="mb-2 text-lg font-semibold whitespace-nowrap break-keep">
                sugarcake
              </div>
              <span
                className="badge inline-flex items-center gap-1 whitespace-nowrap break-keep px-2 py-1"
                style={{ background: title.color }}
              >
                {title.emoji} {title.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button className="tag" onClick={onClose}>
            닫기
          </button>
          <button className="badge" onClick={onSet}>
            대표로 설정
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
