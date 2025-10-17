"use client";

import { useRef, useState } from "react";

export default function PersonalSigCard({
  sigUrl = "https://static.flextv.co.kr/vipsignature/202510/92ae0915e4a0d4a2.webp",
  profileUrl = "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/1234844/19g61mfx2rqy1.jpg?type=w&w=180&quality=90",
  onChange,
  requiredSize = 200,
  tagline = "로맨틱 진상 갑부 ✨",
  percentile = 12,
  repScore = 82,
}) {
  const inputRef = useRef(null);
  const [mode, setMode] = useState("sig");
  const [sigPreview, setSigPreview] = useState(sigUrl);
  const [profilePreview, setProfilePreview] = useState(profileUrl);

  const preview = mode === "sig" ? sigPreview : profilePreview;

  function openPicker() {
    inputRef.current?.click();
  }

  function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 3 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      if (mode === "sig") setSigPreview(url);
      else setProfilePreview(url);
      if (onChange) onChange(file, url, mode);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="panel space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        {/* 시그 / 프로필 토글 */}
        <div
          className="rounded-full border p-1 flex gap-1"
          style={{
            borderColor: "#e6d38a",
            background: "rgba(255,255,255,0.8)",
          }}
        >
          {["sig", "profile"].map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: active ? "#fff7d6" : "transparent",
                  color: active ? "#b8860b" : "var(--txt)",
                  border: active
                    ? "1px solid #e6d38a"
                    : "1px solid transparent",
                }}
              >
                {m === "sig" ? "시그" : "프로필"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 본문 3열: 이미지 / 평판 / 한줄평 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center w-full">
        {/* ① 이미지 카드 */}
        <div
          className="relative rounded-2xl overflow-hidden mx-auto group"
          style={{
            width: requiredSize,
            height: requiredSize,
            boxShadow:
              "0 10px 30px rgba(0,0,0,.08), inset 0 0 0 1px #e6d38a, 0 0 0 6px rgba(255,221,77,.10)",
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(255,236,150,.18), transparent 55%)",
          }}
        >
          <img
            src={preview}
            alt={mode === "sig" ? "개인 시그" : "프로필 이미지"}
            className="w-full h-full object-cover"
          />

          {/* 상단 라벨 (hover 시 노출) */}
          <div className="absolute top-2 left-2">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 pointer-events-none transition
                 group-hover:opacity-100 group-hover:pointer-events-auto"
              style={{
                background: "rgba(255,255,240,.85)",
                border: "1px solid #e6d38a",
                backdropFilter: "blur(2px)",
                color: "#b8860b",
              }}
            >
              {mode === "sig" ? "Signature" : "Profile"}
            </span>
          </div>

          {/* 이미지 변경 버튼 */}
          <button
            onClick={openPicker}
            className="absolute bottom-2 right-2 px-2.5 py-1.5 rounded-lg text-xs font-medium
               opacity-0 pointer-events-none transition
               group-hover:opacity-100 group-hover:pointer-events-auto"
            style={{
              background: "rgba(0,0,0,.45)",
              color: "#fffbea",
              border: "1px solid rgba(255,221,77,.4)",
            }}
          >
            이미지 변경
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onFile}
          />
        </div>

        {/* ② 평판 지수 */}
        <div
          className="rounded-2xl border p-4 md:p-5 flex items-center justify-between gap-4"
          style={{
            borderColor: "#e6d38a",
            background: "#fffdf6",
            boxShadow: "0 4px 10px rgba(255,223,128,0.08)",
          }}
        >
          <div className="min-w-0">
            <div className="text-sm text-muted">평판 지수</div>
            <div className="mt-1 flex items-end gap-2">
              <span
                className="leading-none font-extrabold"
                style={{ fontSize: 40, color: "#b8860b" }}
              >
                {Math.round(repScore)}
              </span>
              <span className="text-xs text-muted mb-[3px]">/ 100</span>
            </div>
          </div>
        </div>

      <div>
          {/* ③ 한줄 평 */}
        <div
          className="rounded-2xl border p-5 flex flex-col items-center justify-center text-center"
          style={{
            borderColor: "#e6d38a",
            background: "linear-gradient(135deg, #fffbe6 0%, #fffef8 100%)",
            boxShadow: "0 4px 12px rgba(255,223,128,0.15)",
          }}
        >
          <div className="text-sm text-muted mb-2">한줄 평</div>
          <div
            className="font-bold leading-snug"
            style={{
              fontSize: 22,
              color: "#a07800",
              lineHeight: 1.3,
              wordBreak: "keep-all",
            }}
            title={tagline}
          >
            {tagline}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
