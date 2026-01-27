import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/shared/lib/constants";

interface BookmarkData {
  id: string;
  lat: number;
  lng: number;
  address: string;
  alias: string;
}

interface LocationState {
  // 현위치 관련
  myLocation: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  isGpsLoading: boolean;
  setMyLocation: (data: { lat: number; lng: number; address: string }) => void;
  setIsGpsLoading: (loading: boolean) => void;

  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  // 북마크 관련
  bookmarks: BookmarkData[];
  addBookmark: (location: BookmarkData) => {
    success: boolean;
    message: string;
  };
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  updateBookmarkAlias: (id: string, newAlias: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      myLocation: null,
      isGpsLoading: true,
      bookmarks: [],
      currentIndex: 0,

      setMyLocation: (data) => set({ myLocation: data, isGpsLoading: false }),
      setIsGpsLoading: (loading) => set({ isGpsLoading: loading }),
      setCurrentIndex: (index) => set({ currentIndex: index }),

      addBookmark: (location) => {
        const { bookmarks } = get();
        if (bookmarks.length >= 6) {
          return {
            success: false,
            message: "북마크는 최대 6개까지만 등록 가능합니다.",
          };
        }
        if (bookmarks.some((b) => b.id === location.id)) {
          return { success: false, message: "이미 추가된 지역입니다." };
        }
        set({ bookmarks: [...bookmarks, location] });
        return { success: true, message: "북마크에 추가되었습니다." };
      },

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),

      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

      updateBookmarkAlias: (id, newAlias) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.id === id ? { ...b, alias: newAlias } : b
          ),
        })),
    }),
    {
      name: STORAGE_KEYS.BOOKMARKS, // 로컬스토리지에 저장될 키 이름
      partialize: (state) => ({ bookmarks: state.bookmarks }), // bookmarks는 로컬스토리지에 저장
    }
  )
);
