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
 *  일단 2시 고정
 */
export const getNearForecastTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  // const hour = now.getHours();

  return { base_date: `${year}${month}${day}`, base_time: "0200" };
};
