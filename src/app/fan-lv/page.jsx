import { demoFanLv } from "../../data/sample";

export default function Page() {
  // 방어: demoFanLv가 없거나 breakdown이 비어 있어도 깨지지 않도록
  const hasData = !!(demoFanLv && Array.isArray(demoFanLv.breakdown));

  return (
    <section className="panel">
      <h1 className="text-lg mb-2">Fan Lv (후원 기반)</h1>
      <p className="text-muted mb-3">
        누적 후원 금액/개수 기반의 <strong>영구 등급</strong>입니다.
      </p>

      {!hasData ? (
        <div className="panel text-muted">
          Fan Lv 데이터가 없습니다. <span className="tag">sample.js</span>에서
          <span className="tag">demoFanLv</span>를 확인해 주세요.
        </div>
      ) : (
        <>
          <div className="item mb-3">
            <div className="flex items-center gap-2">
              <strong>현재 Lv.</strong>
              <span className="badge">Lv. {demoFanLv.current}</span>
            </div>
            <span className="text-muted">누적 기준</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {demoFanLv.breakdown.map((row, i) => (
              <div key={i} className="item">
                <div className="flex items-center gap-2">
                  <strong>{row.label}</strong>
                </div>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
