import { useState, useEffect } from "react";
import { useCurrentLocation } from "@/shared/lib/hooks";
import {
  getAddressFromCoords,
  getCoordsFromAddress,
} from "@/shared/api/geocode";
import { STORAGE_KEYS } from "@/shared/lib/constants";

// 세션 스토리지 키
const STORAGE_KEY = STORAGE_KEYS.USER_ADDRESS;

export const useLocationState = () => {
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

  // 주소 변경
  const updateAddress = (address: string) => {
    setCurrentAddress(address);
    sessionStorage.setItem(STORAGE_KEY, address);
  };

  // GPS 기반 초기화 - 첫 진입
  useEffect(() => {
    if (currentAddress || !location) return;

    if (!targetLocation) {
      setTargetLocation(location);
      getAddressFromCoords(location.latitude, location.longitude).then(
        (address) => {
          if (address) updateAddress(address);
        }
      );
    }
  }, [location, currentAddress, targetLocation]);

  // 주소로 좌표 복구 - 새로고침
  useEffect(() => {
    if (currentAddress && !targetLocation) {
      getCoordsFromAddress(currentAddress).then((coords) => {
        if (coords) setTargetLocation(coords);
      });
    }
  }, [currentAddress, targetLocation]);

  // 주소 선택 시
  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setTargetLocation({ latitude: lat, longitude: lng });
    updateAddress(address);
  };

  return {
    currentAddress,
    targetLocation,
    isLoading,
    handleLocationSelect,
  };
};
