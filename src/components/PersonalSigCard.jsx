"use client";

import { useRef, useState } from "react";

export default function PersonalSigCard({
  value, // 초기 URL (기존 시그 이미지)
  onChange, // 파일 또는 dataURL 전달
  requiredSize = 200, // 프리뷰 기준 px
  tagline = "로맨틱 진상 갑부 ✨",
  percentile = 12, // 상위 12% → 숫자(0~100), 낮을수록 상위
}) {
  // 인지도 게이지: "상위 x%" → 게이지는 (100-x)%
  const gauge = Math.max(0, Math.min(100, 100 - percentile));

  return (
    <div className="panel space-y-3 md:space-y-4">
      <h3>프로필</h3>

      {/* 시그 + 평판지수 + 한줄평 (3열 구성) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center w-full">
        {/* ① 시그 이미지 */}
        <div
          className="border rounded-2xl overflow-hidden mx-auto"
          style={{
            width: requiredSize,
            height: requiredSize,
            borderColor: "var(--line)",
            background: "var(--surface)",
          }}
        >
          {value ? (
            <img
              src={value}
              alt="개인 시그"
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              {requiredSize}×{requiredSize} 이미지 업로드
            </div>
          )}
        </div>

        {/* ② 평판 지수 + 게이지 */}
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted">평판 지수</span>
            <strong className="text-sm">상위 {percentile}%</strong>
          </div>
          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${Math.max(0, Math.min(100, 100 - percentile))}%`,
              }}
            />
          </div>
        </div>

        {/* ③ 한줄 평 */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm text-muted mb-1">한줄 평</span>
          <span className="badge text-center max-w-[240px]">{tagline}</span>
        </div>
      </div>
    </div>
  );
}
