import { demoTitles } from "../../data/sample";

export default function Page() {
  return (
    <section className="panel">
      <h1 className="text-lg mb-3">칭호</h1>

      <div className="grid gap-4 md:grid-cols-2">
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
                <button className="tag">대표 설정</button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="mb-2">테마형 (업적/성향)</h3>
          <div className="grid gap-2">
            {demoTitles.theme.map((t, i) => (
              <div key={i} className="item">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong>{t.name}</strong>
                  <span className="text-muted">{t.condition}</span>
                </div>
                <button className="tag">대표 설정</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel mt-4">
        <h3 className="mb-2">보유한 칭호</h3>
        <div className="grid gap-2">
          {demoTitles.owned.map((t, i) => (
            <div key={i} className="item">
              <div className="flex items-center gap-2">
                <strong>{t.name}</strong>
              </div>
              <span className="badge">보유</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
