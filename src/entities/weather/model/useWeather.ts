import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "@/shared/api/weather";
import { parseWeatherData, type WeatherItem } from "../lib";

interface WeatherProps {
  lat: number | null;
  lng: number | null;
}

export const useWeather = ({ lat, lng }: WeatherProps) => {
  return useQuery({
    //n좌표가 바뀔 때마다 쿼리 키가 변경됨
    queryKey: ["weather", lat, lng],

    // 실제 API 호출 함수 실행
    queryFn: () => {
      if (lat === null || lng === null) return null;
      return fetchCurrentWeather(lat, lng);
    },

    // 좌표가 있을 때만 쿼리 실행
    enabled: !!lat && !!lng,

    // 데이터 캐싱
    staleTime: 1000 * 60 * 5,

    // select 옵션을 사용하여 미리 파싱
    select: (data) => {
      if (!data) return null;
      return parseWeatherData(data as WeatherItem[]);
    },
  });
};
