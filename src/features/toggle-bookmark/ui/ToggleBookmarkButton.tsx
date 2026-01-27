import { Star } from "lucide-react";
import { IconButton } from "@/shared/ui";
import { useToggleBookmark } from "../model/useToggleBookmark";

interface Props {
  id: string;
  lat: number;
  lng: number;
  className?: string;
}

export const ToggleBookmarkButton = ({ id, lat, lng, className }: Props) => {
  const { isActive, toggle } = useToggleBookmark(id, lat, lng);

  return (
    <IconButton
      Icon={Star}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      size={20}
      className={`${className} ${
        isActive
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300 hover:text-yellow-400"
      }`}
      ariaLabel={isActive ? "북마크 해제" : "북마크 추가"}
    />
  );
};
