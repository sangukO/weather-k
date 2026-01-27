import { useState, useEffect } from "react";
import { Button, Modal } from "@/shared";
import { type BookmarkItem } from "../lib/types";
import { BookmarkCard } from "./BookmarkCard";
import { useLocationStore } from "@/entities/location";

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkModal = ({ isOpen, onClose }: BookmarkModalProps) => {
  const {
    myLocation,
    bookmarks,
    removeBookmark,
    setCurrentIndex,
    updateBookmarkAlias,
  } = useLocationStore();

  const [isAllEditing, setIsAllEditing] = useState(false);

  // 임시 수정을 위한 로컬 상태 생성
  const [localBookmarks, setLocalBookmarks] = useState<BookmarkItem[]>([]);

  // 모달이 열리거나 스토어 데이터가 바뀌면 로컬 상태 동기화
  useEffect(() => {
    if (isOpen) {
      setLocalBookmarks(bookmarks);
    }
  }, [isOpen, bookmarks]);

  // 닫기 처리
  const handleClose = () => {
    setIsAllEditing(false);
    setLocalBookmarks(bookmarks); // 닫을 때 스토어 값으로 리셋
    onClose();
  };

  // 로컬 상태만 업데이트하는 함수, 타이핑 시 실행
  const handleLocalAliasUpdate = (id: string, newAlias: string) => {
    setLocalBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, alias: newAlias } : b))
    );
  };

  // 완료 버튼 클릭 시 스토어에 저장
  const toggleEditMode = () => {
    if (isAllEditing) {
      // 완료를 눌렀을 때 스토어에 반영
      localBookmarks.forEach((b) => {
        // 기존 값과 다를 때만 업데이트
        const original = bookmarks.find((origin) => origin.id === b.id);
        if (original && original.alias !== b.alias) {
          updateBookmarkAlias(b.id, b.alias);
        }
      });
    }
    setIsAllEditing(!isAllEditing);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="위치">
      <div className="mb-4 flex flex-col border-b border-gray-200 pb-4">
        {myLocation ? (
          <BookmarkCard
            item={
              {
                id: "current-location",
                lat: myLocation.lat,
                lng: myLocation.lng,
                address: myLocation.address,
                alias: "현재 위치",
              } as BookmarkItem
            }
            onRemove={() => {}}
            onUpdateAlias={() => {}}
            onClick={() => handleCardClick(0)}
            isCurrentLocation={true}
            isEditing={false}
          />
        ) : (
          <div className="py-4 text-center text-sm text-gray-400">
            현재 위치를 찾을 수 없습니다.
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">즐겨찾기</h3>
          {/* 북마크가 있을 때만 편집 버튼 표시 */}
          {bookmarks.length > 0 && (
            <Button
              onClick={toggleEditMode}
              name={isAllEditing ? "완료" : "편집"}
              className="bg-gray-100 text-sm text-blue-600"
            />
          )}
        </div>
        <div className="flex max-h-96 flex-col gap-3 overflow-auto">
          {localBookmarks.length > 0 ? ( // bookmarks 대신 localBookmarks 렌더링
            localBookmarks.map((bookmark, index) => (
              <BookmarkCard
                key={bookmark.id}
                item={bookmark}
                isEditing={isAllEditing}
                // 삭제는 즉시 반영
                onRemove={() => removeBookmark(bookmark.id)}
                // 별칭 수정은 로컬 함수로 연결
                onUpdateAlias={handleLocalAliasUpdate}
                onClick={() => handleCardClick(index + 1)}
              />
            ))
          ) : (
            <div className="py-10 text-center text-sm text-slate-400">
              즐겨찾는 위치가 아직 없어요
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
