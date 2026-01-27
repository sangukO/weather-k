import { useEffect } from "react";
import { useLocationStore } from "@/entities/location";
import { getAddressFromCoords } from "@/shared/api";

export const useCurrentLocation = () => {
  // 스토어에서 상태와 액션 가져오기
  const { setMyLocation, setIsGpsLoading } = useLocationStore();

  useEffect(() => {
    // 브라우저 지원 여부 확인
    if (!navigator.geolocation) {
      // 에러 처리를 위해 로딩 종료
      setIsGpsLoading(false);
      return;
    }

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);

        // 스토어에 위치 정보 저장
        setMyLocation({
          lat: latitude,
          lng: longitude,
          address: address || "현재 위치",
        });
      },
      (_) => {
        // 실패 시 로딩 종료
        setIsGpsLoading(false);
      },
      {
        enableHighAccuracy: true, // 높은 정확도
        timeout: 5000, // 5초 안에 응답 없으면 에러 처리
        maximumAge: 0, // 캐시된 위치 정보 사용 안 함
      }
    );
  }, [setMyLocation, setIsGpsLoading]);
};
