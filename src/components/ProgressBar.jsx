export default function ProgressBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="bar" aria-label="progress">
      <div className="fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
