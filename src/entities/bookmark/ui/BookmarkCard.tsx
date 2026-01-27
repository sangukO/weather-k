import { useState } from "react";
import { MinusCircle, Navigation } from "lucide-react";
import { type BookmarkItem } from "../lib/types";
import { IconButton } from "@/shared";
import { useWeather, useForecast, mergeMinMaxTemp } from "@/entities/weather";

interface BookmarkCardProps {
  item: BookmarkItem;
  isEditing: boolean;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, newAlias: string) => void;
  onClick: (item: BookmarkItem) => void;
  isCurrentLocation?: boolean;
}

export const BookmarkCard = ({
  item,
  isEditing,
  onRemove,
  onUpdateAlias,
  onClick,
  isCurrentLocation = false,
}: BookmarkCardProps) => {
  const [tempAlias, setTempAlias] = useState(item.alias);

  const { data: weather } = useWeather({ lat: item.lat, lng: item.lng });
  const { data: forecastData } = useForecast({ lat: item.lat, lng: item.lng });

  let mergedData = weather;
  if (weather && forecastData) {
    mergedData = { ...weather };
    mergeMinMaxTemp({
      weather: mergedData,
      forecastList: forecastData.list,
      tmn: forecastData.tmn,
      tmx: forecastData.tmx,
    });
  }

  // 별칭 변경 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempAlias(value);
    onUpdateAlias(item.id, value);
  };

  return (
    <div className="relative">
      <div
        className={`absolute top-0 left-0 flex h-full w-12 items-center justify-center ${
          isEditing && !isCurrentLocation ? "opacity-100" : "opacity-0"
        }`}
      >
        <IconButton
          Icon={MinusCircle}
          onClick={(e) => {
            e?.stopPropagation();
            onRemove(item.id);
          }}
          size={22}
          className="flex items-center justify-center p-0"
          iconClassName="fill-red-500 text-white"
          ariaLabel="삭제"
        />
      </div>
      <div
        onClick={() => !isEditing && onClick(item)}
        className={`group flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-1 hover:border-blue-200 hover:shadow-xs ${!isCurrentLocation && isEditing ? "ml-12" : "ml-0"} `}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {!isCurrentLocation && isEditing ? (
            <div
              className="flex w-full min-w-0 flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                value={tempAlias}
                onChange={handleChange}
                className="w-full border-b border-blue-500 bg-transparent outline-none"
              />
              {/* 주소 영역 */}
              <span className="truncate text-xs text-slate-400">
                {item.address}
              </span>
            </div>
          ) : (
            <>
              <div className="flex min-w-0 flex-row items-center">
                {isCurrentLocation && (
                  <Navigation
                    size={30}
                    className="mr-2 -ml-2 shrink-0 rounded-full bg-blue-100/60 fill-blue-300 p-1.5 text-blue-300"
                  />
                )}
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-black">
                      {isCurrentLocation ? "현재 위치" : item.alias}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 overflow-hidden">
                    <span className="truncate text-xs text-slate-400">
                      {item.address}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 날씨 정보 영역 */}
        <div className="flex items-center gap-3">
          {/* 기온 정보 */}
          {mergedData ? (
            <div className="text-right">
              <div className="text-lg font-bold text-slate-900">
                {mergedData.temperature}°
              </div>
              <div className="text-[10px] text-slate-400">
                <span className="text-blue-400">
                  최저 {mergedData.minTemp}°
                </span>{" "}
                /{" "}
                <span className="text-red-400">최고 {mergedData.maxTemp}°</span>
              </div>
            </div>
          ) : (
            // 로딩 중 또는 데이터 없음
            <div className="text-right">
              <div className="text-lg font-bold text-slate-200">-.-°</div>
              <div className="text-[10px] text-slate-200">-- / --</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
