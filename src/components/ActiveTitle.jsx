// /src/components/ActiveTitle.jsx
"use client";

export default function ActiveTitle({ title, onClick }) {
  if (!title) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border shadow-sm
                 transition-colors hover:brightness-105 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-[rgba(67,209,191,.35)]"
      style={{
        background: title.color || "var(--brand-soft)",
        borderColor: "var(--line2)",
        color: "#166e64",
      }}
      title="대표 칭호 변경"
    >
      <span className="text-sm leading-none">{title.emoji ?? "🏅"}</span>
      <span className="text-sm font-medium">{title.name}</span>
    </button>
  );
}
