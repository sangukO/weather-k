import {
  getCurrentBaseTime,
  dfs_xy_conv,
  getNearForecastTime,
} from "@/shared/lib/utils";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// 초단기실황
export const fetchCurrentWeather = async (lat: number, lng: number) => {
  // 위경도를 격자로 변환
  const { x, y } = dfs_xy_conv("toXY", lat, lng);

  const { base_date, base_time } = getCurrentBaseTime();

  const params = new URLSearchParams({
    serviceKey: WEATHER_API_KEY,
    pageNo: "1",
    numOfRows: "1000",
    dataType: "JSON",
    base_date,
    base_time,
    nx: x.toString(),
    ny: y.toString(),
  });

  try {
    const response = await fetch(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?${params}`
    );

    if (!response.ok) throw new Error("초단기실황 API 실패");

    const data = await response.json();

    // 정상 응답인지 체크
    if (data.response?.header?.resultCode === "00") {
      return data.response.body.items.item;
    } else {
      throw new Error(data.response?.header?.resultMsg);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 단기예보
export const fetchForecast = async (lat: number, lng: number) => {
  const { x, y } = dfs_xy_conv("toXY", lat, lng);
  const { base_date, base_time } = getNearForecastTime();

  const params = new URLSearchParams({
    serviceKey: import.meta.env.VITE_WEATHER_API_KEY,
    pageNo: "1",
    numOfRows: "1000", // 하루 예보 전부 받기 위함
    dataType: "JSON",
    base_date,
    base_time,
    nx: x.toString(),
    ny: y.toString(),
  });

  try {
    const response = await fetch(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${params}`
    );

    if (!response.ok) throw new Error("단기예보 API 실패");

    const data = await response.json();

    // 정상 응답인지 체크
    if (data.response?.header?.resultCode === "00") {
      return data.response.body.items.item;
    } else {
      throw new Error(data.response?.header?.resultMsg);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
