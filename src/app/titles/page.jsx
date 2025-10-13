"use client";
import { useState } from "react";
import { demoTitles } from "../../data/sample";

export default function Page() {
  // 데모용: 대표 칭호 로컬 상태 (실서비스는 API 연동)
  const [activeTitle, setActiveTitle] = useState("꾸준한 스트리머");

  const handleSetActive = (name) => {
    setActiveTitle(name);
    alert(`'${name}'을 대표 칭호로 설정 (API 연동 예정)`);
  };

  return (
    <section className="panel">
      <h1 className="text-lg mb-3">칭호</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 성장형 */}
        <div className="panel">
          <h3 className="mb-2">성장형 (Grade 구간)</h3>
          <div className="grid gap-2">
            {demoTitles.growth.map((t, i) => (
              <div key={i} className="item">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>
                    Grade {t.gradeMin}–{t.gradeMax}
                  </strong>
                  <span className="badge">BJ: {t.nameBJ}</span>
                  <span className="badge">Viewer: {t.nameViewer}</span>
                </div>
                <button
                  className="tag"
                  onClick={() => handleSetActive(t.nameBJ)}
                >
                  대표 설정
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 테마형 */}
        <div className="panel">
          <h3 className="mb-2">테마형 (업적/성향)</h3>
          <div className="grid gap-2">
            {demoTitles.theme.map((t, i) => (
              <div key={i} className="item">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>{t.name}</strong>
                  <span className="text-muted">{t.condition}</span>
                </div>
                <button className="tag" onClick={() => handleSetActive(t.name)}>
                  대표 설정
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 보유한 칭호 */}
      <div className="panel mt-4">
        <h3 className="mb-2">보유한 칭호</h3>
        <div className="grid gap-2">
          {demoTitles.owned.map((t, i) => {
            const isActive = t.name === activeTitle;
            return (
              <div key={i} className="item">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>{t.name}</strong>
                  {isActive && <span className="badge">대표</span>}
                </div>
                {isActive ? (
                  <span className="tag">선택됨</span>
                ) : (
                  <button
                    className="tag"
                    onClick={() => handleSetActive(t.name)}
                  >
                    대표로 설정
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
