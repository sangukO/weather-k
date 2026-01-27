import { type ForecastItem, type ParsedForecast } from "./types";

export const parseForecastData = (items: ForecastItem[]) => {
  const grouped = new Map<string, ParsedForecast>();

  let tmn: number | undefined;
  let tmx: number | undefined;

  items.forEach((item) => {
    // 최저, 최고 기온은 따로 보관
    if (item.category === "TMN") tmn = parseFloat(item.fcstValue);
    if (item.category === "TMX") tmx = parseFloat(item.fcstValue);

    if (!["TMP", "SKY", "PTY", "POP"].includes(item.category)) return;

    // 시간대별 목록 생성 로직
    const key = `${item.fcstDate}${item.fcstTime}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        date: item.fcstDate,
        time: item.fcstTime,
        temp: 0,
        skyCode: 1,
        ptyCode: 0,
        rainProb: 0,
      });
    }

    const obj = grouped.get(key)!;
    const value = parseFloat(item.fcstValue);

    switch (item.category) {
      case "TMP":
        obj.temp = value;
        break;
      case "SKY":
        obj.skyCode = value;
        break;
      case "PTY":
        obj.ptyCode = value;
        break;
      case "POP":
        obj.rainProb = value;
        break;
    }
  });

  // Map > 배열 변환 및 시간순 정렬
  const list = Array.from(grouped.values()).sort(
    (a, b) => parseInt(a.date + a.time) - parseInt(b.date + b.time)
  );

  // 리스트와 최저, 최고 기온 반환
  return { list, tmn, tmx };
};
