import { type ParsedWeather, type ParsedForecast } from "./types";
import { getTodayString } from "@/shared/lib/utils/date";

interface MergeProps {
  weather: ParsedWeather;
  forecastList: ParsedForecast[];
  tmn?: number;
  tmx?: number;
}

/**
 * 공식 TMN/TMX, 시간대별 예보, 현재 기온을 모두 비교하여
 * 가장 정확한 최저/최고 기온을 주입하는 함수
 */
export const mergeMinMaxTemp = ({
  weather,
  forecastList,
  tmn,
  tmx,
}: MergeProps) => {
  if (forecastList.length === 0) return;

  const todayStr = getTodayString();

  // 오늘 날짜에 해당하는 예보 온도들 추출
  const todayTemps = forecastList
    .filter((item) => item.date === todayStr)
    .map((item) => item.temp);

  // 최저 기온 결정 (공식값, 리스트, 현재기온 중 최소값)
  const minCandidates = [
    ...(tmn !== undefined ? [tmn] : []),
    ...todayTemps,
    weather.temperature,
  ];
  weather.minTemp = Math.min(...minCandidates);

  // 최고 기온 결정 (공식값, 리스트, 현재기온 중 최대값)
  const maxCandidates = [
    ...(tmx !== undefined ? [tmx] : []),
    ...todayTemps,
    weather.temperature,
  ];
  weather.maxTemp = Math.max(...maxCandidates);
};
