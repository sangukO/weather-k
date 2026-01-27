import { useEffect, useState } from "react";
import { type BookmarkItem } from "../lib/types";
import { STORAGE_KEYS, MAX_BOOKMARKS } from "@/shared/lib/constants";

const STORAGE_KEY = STORAGE_KEYS.BOOKMARKS;

export const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // 로컬 스토리지에서 북마크 불러옴
  useEffect(() => {
    const storedBookmarks = localStorage.getItem(STORAGE_KEY);
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (e) {
        console.error("북마크 데이터 로드 실패", e);
      }
    }
  }, []);

  /** 로컬 스토리지에 북마크 저장 */
  const saveToStorage = (items: BookmarkItem[]) => {
    setBookmarks(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  /** 북마크 추가 */
  const addBookmark = (item: BookmarkItem) => {
    if (bookmarks.find((bookmark) => bookmark.id === item.id)) {
      return { success: false, message: "이미 북마크에 추가된. 장소입니다." };
    }
    if (bookmarks.length >= MAX_BOOKMARKS) {
      return {
        success: false,
        message: `북마크는 최대 ${MAX_BOOKMARKS}개까지 추가할 수 있습니다.`,
      };
    }
    saveToStorage([...bookmarks, item]);
    return { success: true, message: "북마크가 추가되었습니다." };
  };

  /** 북마크 제거 */
  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    saveToStorage(updatedBookmarks);
  };

  /** 북마크 별칭 수정 */
  const updateAlias = (id: string, alias: string) => {
    const newBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === id ? { ...bookmark, alias } : bookmark
    );
    saveToStorage(newBookmarks);
  };

  /** 북마크 여부 확인 */
  const isBookmarked = (id: string) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateAlias,
    isBookmarked,
  };
};
