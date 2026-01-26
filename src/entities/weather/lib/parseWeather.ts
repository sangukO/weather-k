import { type WeatherItem, type ParsedWeather } from "./types";
import {
  CloudRain,
  Sun,
  Snowflake,
  Cloudy,
  CloudHail,
  CloudSun,
} from "lucide-react";

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

// 하늘 상태 코드 한글 변환
export const getSkyText = (skyCode: number) => {
  switch (skyCode) {
    case 1:
      return "맑음";
    case 3:
      return "구름많음";
    case 4:
      return "흐림";
    default:
      return "";
  }
};

// 날씨 상태 아이콘, 텍스트 가져오기
export const getWeatherStatus = (ptyCode: number, skyCode: number) => {
  // 1. 강수(PTY)가 최우선
  if (ptyCode > 0) {
    switch (ptyCode) {
      case 1:
      case 4:
      case 5:
        return {
          text: getPtyText(ptyCode),
          icon: CloudRain,
          color: "text-blue-500",
        };
      case 2:
      case 6:
        return {
          text: getPtyText(ptyCode),
          icon: CloudHail,
          color: "text-blue-300",
        }; // 비/눈 믹스
      case 3:
      case 7:
        return {
          text: getPtyText(ptyCode),
          icon: Snowflake,
          color: "text-blue-200",
        };
      default:
        return {
          text: getPtyText(ptyCode),
          icon: CloudRain,
          color: "text-blue-500",
        };
    }
  }

  // 강수가 없을 때만 하늘 상태 확인
  switch (skyCode) {
    case 1:
      return { text: "맑음", icon: Sun, color: "text-orange-400" };
    case 3:
      return { text: "구름많음", icon: CloudSun, color: "text-gray-500" };
    case 4:
      return { text: "흐림", icon: Cloudy, color: "text-gray-500" };
    default:
      return { text: "맑음", icon: Sun, color: "text-orange-400" };
  }
};
