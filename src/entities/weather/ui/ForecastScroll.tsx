import { type ParsedForecast } from "../lib/types";
import { getWeatherStatus } from "../lib/parseWeather";
import { formatTime, formatDate, ScrollFlicking } from "@/shared";
import "@egjs/react-flicking/dist/flicking.css";

interface Props {
  data: ParsedForecast[];
}

export const ForecastScroll = ({ data }: Props) => {
  return (
    <div className="mt-6 w-full">
      <h3 className="mb-3 text-left text-lg font-bold text-gray-700">
        시간대별 예보
      </h3>

      <ScrollFlicking>
        {data.map((item) => {
          const {
            text,
            icon: Icon,
            color,
          } = getWeatherStatus(item.ptyCode, item.skyCode);

          return (
            <div
              key={`${item.date}-${item.time}`}
              className="mr-3 flex min-w-20 flex-col items-center justify-center rounded-xl bg-white p-3 shadow-sm"
            >
              <div className="mb-1 text-xs font-bold text-gray-400">
                {formatDate(item.date)}
              </div>
              <div className="mb-2 text-sm text-gray-500">
                {formatTime(item.time)}
              </div>
              <div className={`mb-2 ${color}`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div className="mb-1 text-xs font-medium text-gray-600">
                {text}
              </div>
              <div className="text-lg font-bold text-gray-800">
                {item.temp}°
              </div>
            </div>
          );
        })}
      </ScrollFlicking>
    </div>
  );
};
