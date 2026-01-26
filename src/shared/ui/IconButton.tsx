import { type LucideIcon } from "lucide-react";

interface ButtonProps {
  Icon: LucideIcon | React.ComponentType<any>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
}

export const IconButton = ({
  Icon,
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg active:scale-95 ${className}`}
      aria-label={ariaLabel}
    >
      <Icon size={24} className="text-slate-700" />
    </button>
  );
};
