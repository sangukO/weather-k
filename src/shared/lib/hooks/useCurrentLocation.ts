import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 브라우저 지원 여부 확인
    if (!navigator.geolocation) {
      setError("위치 정보 사용을 지원하지 않는 브라우저입니다.");
      setIsLoading(false);
      return;
    }

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        // 실패 시
        setError(err.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true, // 높은 정확도
        timeout: 5000, // 5초 안에 응답 없으면 에러 처리
        maximumAge: 0, // 캐시된 위치 정보 사용 안 함
      }
    );
  }, []);

  return { location, error, isLoading };
};
