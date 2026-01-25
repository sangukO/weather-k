// 기상청 원본 아이템 타입
export interface WeatherItem {
  baseDate: string;
  baseTime: string;
  category: "T1H" | "RN1" | "UUU" | "VVV" | "REH" | "PTY" | "VEC" | "WSD";
  nx: number;
  ny: number;
  obsrValue: string;
}

// ui 데이터 타입
export interface ParsedWeather {
  temperature: number; // 기온
  humidity: number; // 습도
  rainType: number; // 강수형태
  windSpeed: number; // 풍속
  rainAmount: number; // 강수량
}

export const parseWeatherData = (items: WeatherItem[]): ParsedWeather => {
  // 초기값 설정
  const result: ParsedWeather = {
    temperature: 0,
    humidity: 0,
    rainType: 0,
    windSpeed: 0,
    rainAmount: 0,
  };

  items.forEach((item) => {
    const value = parseFloat(item.obsrValue);

    switch (item.category) {
      case "T1H": // 기온
        result.temperature = value;
        break;
      case "REH": // 습도
        result.humidity = value;
        break;
      case "PTY": // 강수형태
        result.rainType = value;
        break;
      case "WSD": // 풍속
        result.windSpeed = value;
        break;
      case "RN1": // 1시간 강수량
        result.rainAmount = value;
        break;
    }
  });

  return result;
};

// 강수 형태 코드 한글 변환
export const getPtyText = (ptyCode: number) => {
  switch (ptyCode) {
    case 0:
      return "강수 없음";
    case 1:
      return "비";
    case 2:
      return "비/눈";
    case 3:
      return "눈";
    case 4:
      return "소나기";
    case 5:
      return "빗방울";
    case 6:
      return "빗방울/눈날림";
    case 7:
      return "눈날림";
    default:
      return "";
  }
};
