import { type LucideIcon } from "lucide-react";

interface ButtonProps {
  Icon: LucideIcon | React.ComponentType<any>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  iconClassName?: string;
  size?: number;
}

export const IconButton = ({
  Icon,
  onClick,
  className = "",
  iconClassName = "",
  ariaLabel,
  size = 24,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg active:scale-95 ${className}`}
      aria-label={ariaLabel}
    >
      <Icon size={size} className={iconClassName} />
    </button>
  );
};
