import { useLocationAdd } from "../model/useLocationAdd";
import { PreviewModal } from "@/widgets/weather-dashboard/ui/PreviewModal";
import { type PreviewData } from "@/widgets/weather-dashboard/lib/types";

interface Props {
  previewLocation: PreviewData | null;
  onClose: () => void;
}

export const LocationPreviewModal = ({ previewLocation, onClose }: Props) => {
  const { addAndSelect } = useLocationAdd();

  const handleConfirm = () => {
    if (!previewLocation) return;
    const success = addAndSelect(
      previewLocation.lat,
      previewLocation.lng,
      previewLocation.address
    );
    if (success) {
      onClose();
    }
  };

  return (
    <PreviewModal
      isOpen={!!previewLocation}
      location={previewLocation}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
};
