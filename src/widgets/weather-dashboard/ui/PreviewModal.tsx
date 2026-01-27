import { Modal, Button } from "@/shared";
import { WeatherCard } from "@/entities/weather";

interface PreviewData {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  location: PreviewData | null;
}

export const PreviewModal = ({
  isOpen,
  onClose,
  onConfirm,
  location,
}: Props) => {
  if (!location) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        {/* 미리보기용 카드 */}
        <div className="pointer-events-none mx-auto w-full max-w-[90%] origin-top scale-95 transform">
          <WeatherCard
            locationName={location.address} // 전체 주소 표시
            lat={location.lat}
            lng={location.lng}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            name="추가하기"
            className="flex-1 bg-blue-500 py-3 text-white hover:bg-blue-600"
          />
        </div>
      </div>
    </Modal>
  );
};
