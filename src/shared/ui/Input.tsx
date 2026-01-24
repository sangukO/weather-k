import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

// 기본 HTML Input 속성 상속
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-all",
          "placeholder:text-gray-400",
          "focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      ></input>
    );
  }
);

// forwardRef, 컴포넌트 이름 명시
Input.displayName = "Input";
