import { Navigation } from "lucide-react";

interface Props {
  count: number;
  currentIndex: number;
}

export const LocationPagination = ({ count, currentIndex }: Props) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = currentIndex === index;

        // 현 위치 Navigation 아이콘 렌더링
        if (index === 0) {
          return (
            <button
              key="nav-icon"
              className={`transition-colors duration-200 ${
                isActive ? "text-blue-500" : "text-gray-300"
              }`}
              aria-label="현재 위치"
            >
              <Navigation size={20} fill={isActive ? "currentColor" : "none"} />
            </button>
          );
        }

        // 나머지 인덱스일 때 점 렌더링
        return (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-200 ${
              isActive ? "w-4 bg-blue-500" : "bg-gray-300"
            }`}
            aria-label={`${index}`}
          />
        );
      })}
    </div>
  );
};
