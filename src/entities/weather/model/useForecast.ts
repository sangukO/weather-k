import { useQuery } from "@tanstack/react-query";
import { getTodayString } from "@/shared";
import { fetchForecast } from "@/shared/api/weather";
import { parseForecastData, type ForecastItem } from "../lib";

interface ForecastProps {
  lat: number | null;
  lng: number | null;
}

export const useForecast = ({ lat, lng }: ForecastProps) => {
  return useQuery({
    queryKey: ["forecast", lat, lng],
    queryFn: () => {
      if (lat === null || lng === null) return null;
      return fetchForecast(lat, lng);
    },
    enabled: !!lat && !!lng,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    // select 옵션을 사용하여 미리 파싱
    select: (data) => {
      if (!data) return { list: [], tmn: undefined, tmx: undefined };
      const parsed = parseForecastData(data as ForecastItem[]);

      const todayStr = getTodayString();
      const currentHour =
        new Date().getHours().toString().padStart(2, "0") + "00";

      // 미리 필터링 후 리스트 가공
      parsed.list = parsed.list.filter((item) => {
        if (item.date > todayStr) return true;
        if (item.date === todayStr && item.time >= currentHour) return true;
        return false;
      });

      return parsed;
    },
  });
};
