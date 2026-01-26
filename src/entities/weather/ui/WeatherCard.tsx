import { type ParsedWeather } from "../lib";
import { getWeatherStatus } from "../lib/parseWeather";

interface WeatherCardProps {
  data: ParsedWeather;
  locationName: string;
}

export const WeatherCard = ({ data, locationName }: WeatherCardProps) => {
  const { icon: Icon, color } = getWeatherStatus(data.rainType, 1);
  return (
    <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-xl">
      <div className="relative mb-2 text-gray-500">
        {locationName}
        <div className="absolute top-0 right-0 flex flex-col items-end">
          <div className="flex w-full justify-between text-xs font-bold text-red-500">
            <p>최고</p> <p>{data.maxTemp}°</p>
          </div>
          <div className="flex w-full justify-between text-xs font-bold text-blue-500">
            <p>최저</p> <p>{data.minTemp}°</p>
          </div>
        </div>
      </div>

      {/* 강수 상태 및 기온 */}
      <div className="flex h-full flex-row items-center justify-center py-4">
        <div className={`${color}`}>
          <Icon size={80} strokeWidth={1.5} />
        </div>
        <div className="text-7xl font-black text-gray-800">
          {data.temperature}°
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="grid grid-cols-3 gap-4 border-t pt-6">
        <div>
          <div className="text-sm text-gray-400">습도</div>
          <div className="text-lg font-semibold">{data.humidity}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">풍속</div>
          <div className="text-lg font-semibold">{data.windSpeed}m/s</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">강수량</div>
          <div className="text-lg font-semibold">{data.rainAmount}mm</div>
        </div>
      </div>
    </div>
  );
};
