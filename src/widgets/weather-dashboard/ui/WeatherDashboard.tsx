import { useEffect, useState } from "react";
import { SearchLocation } from "@/features/search-location/ui/SearchLocation";
import { useCurrentLocation } from "@/shared/lib/hooks";
import {
  getAddressFromCoords,
  getCoordsFromAddress,
} from "@/shared/api/geocode";
import {
  useWeather,
  WeatherCard,
  parseWeatherData,
  type WeatherItem,
} from "@/entities/weather";

// 세션 스토리지 키
const STORAGE_KEY = "USER_ADDRESS";

export const WeatherDashboard = () => {
  // 초기값을 세션 스토리지에서 가져옴
  const [currentAddress, setCurrentAddress] = useState<string>(() => {
    return sessionStorage.getItem(STORAGE_KEY) || "";
  });

  // 날씨를 조회할 좌표
  const [targetLocation, setTargetLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const { location, isLoading } = useCurrentLocation();

  // 날씨 데이터 조회 및 파싱
  const { data: weatherData } = useWeather({
    lat: targetLocation?.latitude ?? null,
    lng: targetLocation?.longitude ?? null,
  });

  const weather = weatherData
    ? parseWeatherData(weatherData as WeatherItem[])
    : null;

  // 세션 스토리지 로드 이후 좌표가 없다면 주소로 위경도 API 요청
  useEffect(() => {
    if (currentAddress && !targetLocation) {
      const restoreCoords = async () => {
        const coords = await getCoordsFromAddress(currentAddress);

        // 이후 날씨 API 요청
        if (coords) {
          setTargetLocation(coords);
        }
      };

      restoreCoords();
    }
  }, [currentAddress, targetLocation]);

  // GPS 초기화 로직
  useEffect(() => {
    // 이미 주소가 있거나 로딩 중이면 스킵
    if (currentAddress || !location) return;

    if (!targetLocation) {
      // 좌표 설정
      setTargetLocation(location);

      // 좌표를 주소로 변환
      const initAddress = async () => {
        const address = await getAddressFromCoords(
          location.latitude,
          location.longitude
        );

        if (address) {
          setCurrentAddress(address);
          sessionStorage.setItem(STORAGE_KEY, address);
        }
      };

      initAddress();
    }
  }, [location, currentAddress, targetLocation]);

  // 주소 선택시 핸들러 실행
  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setTargetLocation({ latitude: lat, longitude: lng });
    setCurrentAddress(address);
    sessionStorage.setItem(STORAGE_KEY, address);
  };

  if (isLoading && !currentAddress) return <div>위치 확인 중...</div>;

  return (
    <div className="relative w-full max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">지역 검색</h1>
      {/* 핸들러 전달 */}
      <SearchLocation
        initialValue={currentAddress}
        onLocationSelect={handleLocationSelect}
      />
      {/* 날씨 데이터가 있으면 표시 */}
      {weather && <WeatherCard data={weather} locationName={currentAddress} />}
    </div>
  );
};
