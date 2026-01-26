// 기상청 원본 아이템 -초단기실황
export interface WeatherItem {
  baseDate: string; // 기준 날짜
  baseTime: string; // 기준 시각
  category: "T1H" | "RN1" | "UUU" | "VVV" | "REH" | "PTY" | "VEC" | "WSD";
  nx: number;
  ny: number;
  obsrValue: string;
}

// UI 데이터 타입 - 현재 날씨
export interface ParsedWeather {
  temperature: number; // 기온
  humidity: number; // 습도
  rainType: number; // 강수형태
  windSpeed: number; // 풍속
  rainAmount: number; // 강수량
  // 최저/최고 기온
  minTemp?: number;
  maxTemp?: number;
}

// 기상청 원본 아이템 - 단기예보
export interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: "TMP" | "SKY" | "PTY" | "POP" | "TMN" | "TMX";
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

// UI 데이터 타입 - 단기 예보
export interface ParsedForecast {
  date: string; // 날짜
  time: string; // 시간
  temp: number; // 기온
  skyCode: number; // 하늘 상태
  ptyCode: number; // 강수형태
  rainProb: number; // 강수확률
}
