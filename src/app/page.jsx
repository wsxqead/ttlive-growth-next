"use client";

import ProgressBar from "../components/ProgressBar";
import ActiveTitle from "../components/ActiveTitle";
import { demoActivity, demoProfile, demoQuests } from "../data/sample";

/* 진행 요약 계산 */
function summarize(list = []) {
  let completed = 0,
    inProgress = 0,
    notStarted = 0,
    near = 0,
    expSum = 0;
  const nearList = [];

  for (const q of list) {
    const p = Math.min(1, (q.progress || 0) / (q.target || 1));
    const pct = Math.round(p * 100);

    if (pct >= 100) {
      completed++;
      expSum += q.rewardExp || 0;
    } else if (pct > 0) {
      inProgress++;
      if (pct >= 80) {
        near++;
        nearList.push({
          id: q.id,
          name: q.name,
          pct,
          rewardExp: q.rewardExp || 0,
        });
      }
    } else {
      notStarted++;
    }
  }
  nearList.sort((a, b) => b.pct - a.pct || b.rewardExp - a.rewardExp);
  return { completed, inProgress, notStarted, near, expSum, nearList };
}

export default function Page() {
  const pct = (demoActivity.exp / demoActivity.nextExp) * 100;
  const daily = summarize(demoQuests.daily);
  const weekly = summarize(demoQuests.weekly);
  const monthly = summarize(demoQuests.monthly);
  const topNear = [
    ...daily.nearList,
    ...weekly.nearList,
    ...monthly.nearList,
  ].slice(0, 3);

  return (
    <section className="panel">
      {/* 헤더: 좌측 타이틀 / 우측 대표 칭호 */}
      <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
        <h1 className="text-lg">프로필 & 요약</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted hidden sm:inline">대표 칭호</span>
          <ActiveTitle
            title={demoProfile.titleActive}
            onClick={() => alert("칭호 선택 모달/페이지로 이동")}
          />
        </div>
      </div>

      {/* 패널들 사이 간격 넉넉히 */}
      <div className="grid grid-cols-1 gap-5 md:gap-6">
        {/* EXP 진행도 */}
        <div className="panel">
          <div className="space-y-3 md:space-y-4">
            <h3>Activity EXP 진행도</h3>
            <div className="item">
              <div className="flex items-center gap-2">
                <span className="badge">Grade {demoActivity.grade}</span>
              </div>
              <span className="tag">
                {demoActivity.exp.toLocaleString()} /{" "}
                {demoActivity.nextExp.toLocaleString()} EXP
              </span>
            </div>
            <ProgressBar value={pct} />
          </div>
        </div>

        {/* 퀘스트 요약 */}
        <div className="panel">
          <div className="space-y-3 md:space-y-4">
            <h3>퀘스트 요약</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
              <StatusCard label="오늘(일일)" s={daily} />
              <StatusCard label="이번주(주간)" s={weekly} />
              <StatusCard label="이번달(월간)" s={monthly} />
            </div>
          </div>
        </div>
      </div>

      {/* 임박 섹션 */}
      <div className="panel mt-5 md:mt-6">
        <div className="space-y-3 md:space-y-4">
          <h3>지금 완료 가능(임박)</h3>
          {topNear.length === 0 ? (
            <div className="text-muted">임박한 퀘스트가 없습니다.</div>
          ) : (
            <div className="grid gap-2 md:gap-3">
              {topNear.map((q) => (
                <div key={q.id} className="item">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <strong className="truncate">{q.name}</strong>
                    <span className="tag shrink-0">{q.pct}%</span>
                  </div>
                  <span className="badge shrink-0">+{q.rewardExp} EXP</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─ components ─ */

function StatusCard({ label, s }) {
  return (
    <div className="item p-3 flex flex-col gap-2 md:gap-3">
      <strong className="block text-base">{label}</strong>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <Chip k="완료" v={s.completed} />
        <Chip k="진행" v={s.inProgress} />
        <Chip k="미시작" v={s.notStarted} />
        <Chip k="임박" v={s.near} />
      </div>
      <div className="pt-1">
        <span className="badge text-sm">
          완료 EXP {s.expSum.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function Chip({ k, v }) {
  return (
    <div className="tag px-2 py-1 flex items-center justify-between w-full min-w-0 leading-tight">
      <span className="truncate">{k}</span>
      <strong className="shrink-0">{v}</strong>
    </div>
  );
}
