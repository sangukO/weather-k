import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchLocation } from "@/features/search-location/ui/SearchLocation";
import { useCurrentLocation } from "@/shared/lib/hooks";
import { getAddressFromCoords } from "@/shared/api/geocode";

// tanstack query
// 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 캐싱 시간 설정
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// 세션 스토리지 키
const STORAGE_KEY = "USER_ADDRESS";

function App() {
  // 초기값을 세션 스토리지에서 가져옴
  const [currentAddress, setCurrentAddress] = useState<string>(() => {
    return sessionStorage.getItem(STORAGE_KEY) || "";
  });

  const { location, isLoading } = useCurrentLocation();

  useEffect(() => {
    // 이미 주소가 있다면 API 호출 x
    if (currentAddress) return;

    const initLocation = async () => {
      if (location) {
        // 좌표를 주소로 변환
        const address = await getAddressFromCoords(
          location.latitude,
          location.longitude
        );

        if (address) {
          setCurrentAddress(address);
          // 주소 변환 성공 시 세션 스토리지에 저장
          sessionStorage.setItem(STORAGE_KEY, address);
        }
      }
    };

    initLocation();
  }, [location]);

  if (isLoading && !currentAddress) return <div>위치 확인 중...</div>;

  return (
    // 전역으로 동작
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
        <div className="relative w-full">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">지역 검색</h1>
          <SearchLocation initialValue={currentAddress} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
