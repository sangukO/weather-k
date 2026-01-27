import { useLocationStore } from "@/entities/location";

export const useLocationAdd = () => {
  const { addBookmark, bookmarks, setCurrentIndex } = useLocationStore();

  const addAndSelect = (lat: number, lng: number, address: string) => {
    const exists = bookmarks.some((b) => b.id === address);
    if (exists) {
      return false;
    }

    const parts = address.split(" ");
    const alias = parts.length >= 2 ? parts.slice(-2).join(" ") : address;

    const result = addBookmark({
      id: address,
      address,
      alias,
      lat,
      lng,
    });

    if (result.success) {
      setCurrentIndex(bookmarks.length + 1);
    } else {
      alert(result.message);
    }

    return result.success;
  };

  return { addAndSelect };
};
