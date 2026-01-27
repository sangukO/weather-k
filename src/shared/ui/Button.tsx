interface ButtonProps {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = ({ name, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-2 active:scale-95 ${className}`}
      aria-label={name}
    >
      {name}
    </button>
  );
};
