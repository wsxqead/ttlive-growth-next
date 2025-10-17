// 숫자 안정화용 미니 유틸
const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));
const lg = (x: number) => Math.log10(Math.max(1, x));

export function computeStatScores(raw: {
  // BJ/시청자 공통 raw KPI (있으면 넣고, 없으면 0으로)
  weeklyBroadcasts?: number;
  streakDays?: number;
  sessionDonations?: number;
  uniqueDonors?: number;
  peakConcurrent?: number;
  uniqueViewers?: number;
  cheers?: number;
  fanTalks?: number;
  votes?: number;
  totalDonations?: number;
  subscribers?: number;
  visitedHosts?: number;
  categoryVariety?: number;
}) {
  const {
    weeklyBroadcasts = 0,
    streakDays = 0,
    sessionDonations = 0,
    uniqueDonors = 0,
    peakConcurrent = 0,
    uniqueViewers = 0,
    cheers = 0,
    fanTalks = 0,
    votes = 0,
    totalDonations = 0,
    subscribers = 0,
    visitedHosts = 0,
    categoryVariety = 0,
  } = raw;

  // 6축 산식 (0~100)
  const consistency = clamp(60 * Math.sqrt((weeklyBroadcasts || 0) / 5) + 40 * Math.min(streakDays / 30, 1));
  const influence   = clamp(50 * lg(sessionDonations) + 50 * lg(uniqueDonors));
  const popularity  = clamp(40 * lg(peakConcurrent) + 60 * lg(uniqueViewers));
  const affinity    = clamp(40 * lg(cheers) + 40 * lg(fanTalks) + 20 * Math.min(votes / 10, 1));
  const fanship     = clamp(60 * lg(totalDonations) + 40 * lg(subscribers));
  const explore     = clamp(50 * lg(visitedHosts) + 50 * lg(categoryVariety));

  // 종합(평균)
  const arr = [consistency, influence, popularity, affinity, fanship, explore];
  const overall = clamp(arr.reduce((a, b) => a + b, 0) / arr.length);

  return { consistency, influence, popularity, affinity, fanship, explore, overall };
}
