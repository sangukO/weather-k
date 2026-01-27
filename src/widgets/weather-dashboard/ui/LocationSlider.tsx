import Flicking from "@egjs/react-flicking";
import { useRef, useState, useEffect } from "react";
import { WeatherCard } from "@/entities/weather";
import { ToggleBookmarkButton } from "@/features/toggle-bookmark";
import { useLocationStore } from "@/entities/location";
import { getShortAddress } from "../lib/utils";
import { LocationPagination } from "../ui/LocationPagination";

interface LocationSliderProps {
  onIndexChange: (index: number) => void;
}

export const LocationSlider = ({ onIndexChange }: LocationSliderProps) => {
  const { myLocation, bookmarks, currentIndex } = useLocationStore();
  const flickingRef = useRef<Flicking | null>(null);
  const [visualIndex, setVisualIndex] = useState(currentIndex);

  // 북마크 추가 시 이동 로직
  useEffect(() => {
    if (flickingRef.current && currentIndex !== visualIndex) {
      flickingRef.current.moveTo(currentIndex).catch(() => {});
      setVisualIndex(currentIndex);
    }
  }, [currentIndex]);

  const totalCount = 1 + bookmarks.length;

  return (
    <>
      <Flicking
        ref={flickingRef}
        align="center"
        circular={false}
        bound={true}
        moveType="strict"
        threshold={40}
        className="w-full"
        onWillChange={(e) => setVisualIndex(e.index)}
        onChanged={(e) => {
          setVisualIndex(e.index);
          onIndexChange(e.index);
        }}
      >
        {/* 현 위치 */}
        <div className="mx-2 w-[90%]">
          {myLocation && (
            <WeatherCard
              locationName={getShortAddress(myLocation.address)}
              lat={myLocation.lat}
              lng={myLocation.lng}
            />
          )}
        </div>

        {/* 북마크 리스트 */}
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="mx-2 w-[90%]">
            <WeatherCard
              locationName={bookmark.alias}
              lat={bookmark.lat}
              lng={bookmark.lng}
              actionSlot={
                <ToggleBookmarkButton
                  id={bookmark.id}
                  lat={bookmark.lat}
                  lng={bookmark.lng}
                />
              }
            />
          </div>
        ))}
      </Flicking>

      {/* 페이지 네비게이션 */}
      <LocationPagination count={totalCount} currentIndex={visualIndex} />
    </>
  );
};
