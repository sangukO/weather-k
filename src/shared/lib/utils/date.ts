import { FORECAST_BASE_TIMES } from "../constants";

/** 초단기실황
 *  현재 시간 기준으로 연월일과 45분 전 시간 반환
 */
export const getCurrentBaseTime = () => {
  const now = new Date();

  const t = new Date(now.getTime() - 45 * 60 * 1000);

  const year = t.getFullYear();
  const month = (t.getMonth() + 1).toString().padStart(2, "0");
  const day = t.getDate().toString().padStart(2, "0");

  const hour = t.getHours().toString().padStart(2, "0");

  // YYYYMMDD
  const base_date = `${year}${month}${day}`;

  // HH00
  const base_time = `${hour}00`;

  return { base_date, base_time };
};

/** 단기예보
 *  현재 시간보다 이전이면서
 *  발표 시간인 2, 5, 8, 11, 14, 17, 20, 23시에 가까운 시간 찾기
 */
export const getNearForecastTime = () => {
  const now = new Date();

  // 기상청 API 제공은 10분 이후
  const checkTime = new Date(now.getTime() - 10 * 60 * 1000);

  let year = checkTime.getFullYear();
  let month = (checkTime.getMonth() + 1).toString().padStart(2, "0");
  let day = checkTime.getDate().toString().padStart(2, "0");
  const hour = checkTime.getHours();

  // 단기예보 발표 시간 리스트
  const baseTimes = FORECAST_BASE_TIMES;

  // 현재 시간보다 작거나 같은 발표 시간 중 가장 큰 값 찾기
  let nearTime = baseTimes.filter((t: number) => t <= hour).reverse()[0];

  // 현재 시간이 2시 이전이라면 어제 23시 데이터
  if (nearTime === undefined) {
    const yesterday = new Date(checkTime.getTime() - 24 * 60 * 60 * 1000);
    year = yesterday.getFullYear();
    month = (yesterday.getMonth() + 1).toString().padStart(2, "0");
    day = yesterday.getDate().toString().padStart(2, "0");
    nearTime = 23;
  }

  const base_date = `${year}${month}${day}`;
  const base_time = `${nearTime.toString().padStart(2, "0")}00`;

  return { base_date, base_time };
};

/**
 * HHMM 문자열을 "H시" 포맷으로 변환
 */
export const formatTime = (timeStr: string) => {
  const hour = parseInt(timeStr.slice(0, 2));
  return `${hour}시`;
};

/**
 * YYYYMMDD 문자열을 "오늘", "내일", "모레" 또는 "MM.DD"로 변환
 */
export const formatDate = (dateStr: string) => {
  const today = new Date();
  const target = new Date(
    parseInt(dateStr.slice(0, 4)),
    parseInt(dateStr.slice(4, 6)) - 1,
    parseInt(dateStr.slice(6, 8))
  );

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "내일";
  if (diffDays === 2) return "모레";

  return `${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
};

/**
 * 현재 날짜를 YYYYMMDD 문자열로 변환
 */
export const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
};
