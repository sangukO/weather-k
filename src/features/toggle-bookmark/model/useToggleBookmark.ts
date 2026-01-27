import { useLocationStore } from "@/entities/location";

export const useToggleBookmark = (id: string, lat: number, lng: number) => {
  const { addBookmark, removeBookmark, isBookmarked } = useLocationStore();

  const targetId = id;
  const isActive = isBookmarked(targetId);

  const toggle = () => {
    if (isActive) {
      removeBookmark(targetId);
    } else {
      const addressParts = targetId.split(" ");
      const newAlias =
        addressParts.length >= 2 ? addressParts.slice(-2).join(" ") : targetId;

      const result = addBookmark({
        id: targetId,
        address: targetId,
        alias: newAlias,
        lat,
        lng,
      });
      if (!result.success) alert(result.message);
    }
  };

  return { isActive, toggle };
};
