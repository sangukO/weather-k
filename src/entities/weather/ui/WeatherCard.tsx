import { getWeatherStatus } from "../lib/parseWeather";
import { useWeather, useForecast } from "../model";
import { mergeMinMaxTemp } from "../lib/weatherUtils";

// 헤더
const CardHeader = ({
  name,
  action,
}: {
  name: string;
  action?: React.ReactNode;
}) => (
  <div className="relative mb-2 text-gray-500">
    <div className="flex w-full items-center justify-center">{name}</div>
    {action && <div className="absolute top-0 right-0">{action}</div>}
  </div>
);

// 메인 날씨
const MainStatus = ({ displayData, Icon, color }: any) => (
  <div className="flex h-full flex-col items-center justify-center py-4">
    <div className="mb-4 flex w-full items-center justify-center gap-2">
      <div className={`${color} flex items-center`}>
        <Icon className="h-15 w-15 sm:h-20 sm:w-20" strokeWidth={1.5} />
      </div>

      <div className="text-5xl font-black text-gray-800 sm:text-7xl">
        {displayData.temperature}°
      </div>
    </div>
    <div className="flex w-full flex-row items-end justify-center gap-2">
      <div className="flex text-xs font-bold text-blue-500">
        <p>최저: {displayData.minTemp}°</p>
      </div>
      <div className="flex text-xs font-bold text-red-500">
        <p>최고: {displayData.maxTemp}°</p>
      </div>
    </div>
  </div>
);

// 상세 정보 그리드
const DetailGrid = ({ displayData }: any) => (
  <div className="grid grid-cols-3 gap-4 border-t pt-8">
    <div>
      <div className="text-sm text-gray-400">습도</div>
      <div className="text-lg font-semibold">{displayData.humidity}%</div>
    </div>
    <div>
      <div className="text-sm text-gray-400">풍속</div>
      <div className="text-lg font-semibold">{displayData.windSpeed}m/s</div>
    </div>
    <div>
      <div className="text-sm text-gray-400">강수량</div>
      <div className="text-lg font-semibold">{displayData.rainAmount}mm</div>
    </div>
  </div>
);

interface WeatherCardProps {
  locationName: string; // UI 표시용 이름
  lat?: number;
  lng?: number;
  actionSlot?: React.ReactNode;
}

export const WeatherCard = ({
  locationName,
  lat = 0,
  lng = 0,
  actionSlot,
}: WeatherCardProps) => {
  const { data: weather } = useWeather({ lat, lng });
  const { data: forecastData } = useForecast({ lat, lng });

  // 최저/최고 기온 데이터 병합
  let displayData = weather;

  if (weather && forecastData) {
    displayData = { ...weather };
    mergeMinMaxTemp({
      weather: displayData,
      forecastList: forecastData.list,
      tmn: forecastData.tmn,
      tmx: forecastData.tmx,
    });
  }

  if (!displayData) return null;

  const { icon: Icon, color } = getWeatherStatus(displayData.rainType, 1);

  return (
    <div className="my-3 rounded-3xl bg-white p-8 text-center shadow-md">
      <CardHeader name={locationName} action={actionSlot} />

      {/* 강수 상태 및 기온 */}
      <MainStatus displayData={displayData} Icon={Icon} color={color} />

      {/* 상세 정보 */}
      <DetailGrid displayData={displayData} />
    </div>
  );
};
