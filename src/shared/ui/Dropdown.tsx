import { cn } from "@/shared/lib/utils";

interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  className?: string;
}

export const Dropdown = ({ items, onSelect, className }: DropdownProps) => {
  // 데이터가 없으면 렌더링하지 않음, ui만 존재
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        "absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg",
        className
      )}
    >
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          onClick={() => onSelect(item)}
          className="cursor-pointer px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:font-bold"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

Dropdown.displayName = "Dropdown";
