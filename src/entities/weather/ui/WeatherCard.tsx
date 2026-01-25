import { getPtyText, type ParsedWeather } from "../lib/parseWeather";

interface WeatherCardProps {
  data: ParsedWeather;
  locationName: string;
}

export const WeatherCard = ({ data, locationName }: WeatherCardProps) => {
  return (
    <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-xl">
      <div className="mb-2 text-gray-500">{locationName}</div>

      {/* 온도 */}
      <div className="mb-4 text-6xl font-bold text-gray-800">
        {data.temperature}°
      </div>

      {/* 강수 상태 */}
      <div className="mb-6 text-xl font-medium text-blue-600">
        {data.rainType === 0 ? "맑음 (강수없음)" : getPtyText(data.rainType)}
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
