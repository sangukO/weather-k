import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // 외부 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // body 아래로 렌더링
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="animate-in fade-in zoom-in w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <header className="mb-6 flex items-center justify-between">
          {/* 제목 중앙 정렬을 위한 더미 요소 */}
          <div className="w-10" aria-hidden="true" />

          {/* 중앙 정렬 */}
          <h2 className="flex-1 text-center text-xl font-bold text-slate-800">
            {title}
          </h2>

          {/* 우측 닫기 버튼 */}
          <IconButton Icon={X} onClick={onClose} ariaLabel="닫기" />
        </header>

        <div className="w-full">{children}</div>
      </div>
    </div>,
    document.body
  );
};
