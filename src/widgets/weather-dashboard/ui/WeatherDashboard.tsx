import { SearchLocation } from "@/features/search-location";
import { useForecast, ForecastScroll } from "@/entities/weather";
import { IconButton, LoadingSpinner } from "@/shared/ui";
import { Menu } from "lucide-react";
import { useState } from "react";
import { BookmarkModal } from "@/entities/bookmark";
import "@egjs/react-flicking/dist/flicking.css";
import { useLocationStore } from "@/entities/location";
import { useCurrentLocation } from "@/shared";
import { type PreviewData } from "../lib/types";
import { LocationPreviewModal } from "@/features/add-location";
import { LocationSlider } from "./LocationSlider";

export const WeatherDashboard = () => {
  // 현 위치 가져오기
  useCurrentLocation(); // 위치 관련 상태와 액션

  const { myLocation, isGpsLoading, bookmarks, setCurrentIndex } =
    useLocationStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewLocation, setPreviewLocation] = useState<PreviewData | null>(
    null
  );

  const [visualIndex, setVisualIndex] = useState(0);

  const currentTarget =
    visualIndex === 0 ? myLocation : bookmarks[visualIndex - 1];

  const lat = currentTarget?.lat ?? 0;
  const lng = currentTarget?.lng ?? 0;

  const { data: forecastData, isLoading: isForecastLoading } = useForecast({
    lat,
    lng,
  });

  if (isGpsLoading && !myLocation) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-500">현재 위치를 확인하고 있습니다...</p>
        <p className="text-xs text-gray-400">
          브라우저의 위치 권한 허용이 필요합니다.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Weather-K</h1>
      <div className="flex flex-row">
        {/* 검색창 */}
        <SearchLocation
          initialValue={currentTarget?.address ?? ""}
          onLocationSelect={(lat, lng, address) =>
            setPreviewLocation({ lat, lng, address })
          }
        />
        <IconButton
          Icon={Menu}
          onClick={() => setIsModalOpen(true)}
          className="ml-2"
          ariaLabel="북마크 목록"
        />
      </div>

      {/* 메인 슬라이더 */}
      <div className="mt-6 w-full">
        <LocationSlider
          onIndexChange={(idx) => {
            setVisualIndex(idx);
            setCurrentIndex(idx);
          }}
        />
      </div>

      {/* 하단 예보 */}
      <div className="mt-8">
        {isForecastLoading ? (
          <LoadingSpinner />
        ) : (
          forecastData?.list && (
            <ForecastScroll
              key={`forecast-${lat}-${lng}`}
              data={forecastData.list}
            />
          )
        )}
      </div>

      {/* 북마크 모달 */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* 미리보기 모달 */}
      <LocationPreviewModal
        previewLocation={previewLocation}
        onClose={() => setPreviewLocation(null)}
      />
    </div>
  );
};
