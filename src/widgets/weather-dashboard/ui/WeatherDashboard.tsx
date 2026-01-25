import { SearchLocation } from "@/features/search-location";
import {
  useWeather,
  useForecast,
  WeatherCard,
  ForecastScroll,
  mergeMinMaxTemp,
} from "@/entities/weather";
import { useLocationState } from "../model";
import { LoadingSpinner } from "@/shared/ui";

export const WeatherDashboard = () => {
  // 커스텀 훅에서 위치 관련 상태와 로직 가져옴
  const {
    currentAddress,
    targetLocation,
    isLoading: isLocationLoading,
    handleLocationSelect,
  } = useLocationState();

  // 현재 날씨 조회
  const { data: weather } = useWeather({
    lat: targetLocation?.latitude ?? null,
    lng: targetLocation?.longitude ?? null,
  });

  // 단기 예보 조회
  const { data: forecastData, isLoading: isForecastLoading } = useForecast({
    lat: targetLocation?.latitude ?? null,
    lng: targetLocation?.longitude ?? null,
  });

  // 최저/최고 기온 병합
  if (weather && forecastData) {
    mergeMinMaxTemp({
      weather,
      forecastList: forecastData.list,
      tmn: forecastData.tmn,
      tmx: forecastData.tmx,
    });
  }

  // 위치 찾는 중일 때 렌더링
  if (isLocationLoading && !currentAddress) {
    return (
      <div className="p-10 text-center text-gray-500">위치 확인 중...</div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">지역 검색</h1>
      {/* 검색창 */}
      <SearchLocation
        initialValue={currentAddress}
        onLocationSelect={handleLocationSelect}
      />
      {/* 날씨 데이터가 있으면 표시 */}
      {weather && <WeatherCard data={weather} locationName={currentAddress} />}
      {/* 단기 예보 데이터가 있으면 표시 */}
      {isForecastLoading ? (
        // 로딩 중이면 스피너 표시
        <LoadingSpinner />
      ) : (
        // 로딩 후 데이터가 있으면 예보 표시
        forecastData?.list && <ForecastScroll data={forecastData.list} />
      )}
    </div>
  );
};
