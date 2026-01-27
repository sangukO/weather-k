import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import {
  useRef,
  useEffect,
  type ReactNode,
  type ComponentProps,
  Children,
} from "react";

type ScrollFlickingProps = ComponentProps<typeof Flicking> & {
  children: ReactNode;
  className?: string;
};
export const ScrollFlicking = ({
  children,
  className,
  ...props
}: ScrollFlickingProps) => {
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const flickingRef = useRef<Flicking | null>(null);

  const count = Children.count(children);
  const thumbWidthPercent = Math.max(15, 100 / Math.max(1, count / 3));

  useEffect(() => {
    if (flickingRef.current) {
      flickingRef.current.moveTo(0, 0).catch(() => {});
    }
    if (scrollThumbRef.current) {
      scrollThumbRef.current.style.transform = "translateX(0px)";
    }
  }, [count]);

  const updateScrollPosition = (e: any) => {
    if (!scrollThumbRef.current) return;
    const flicking = e.currentTarget;
    const camera = flicking.camera;
    const range = camera.range.max - camera.range.min;

    if (range <= 0) return;

    const progress = (camera.position - camera.range.min) / range;
    const safeProgress = Math.min(1, Math.max(0, progress));
    const trackWidth = flicking.element.clientWidth;
    const thumbWidthPx = (trackWidth * thumbWidthPercent) / 100;
    const maxTranslate = trackWidth - thumbWidthPx;
    const translateX = maxTranslate * safeProgress;

    scrollThumbRef.current.style.transform = `translateX(${translateX}px)`;
  };

  return (
    <div className={`w-full ${className}`}>
      <Flicking
        ref={flickingRef}
        bound={true}
        moveType="freeScroll"
        align="prev"
        {...props}
        onReady={updateScrollPosition}
        onMove={updateScrollPosition}
        onAfterResize={updateScrollPosition}
        onChanged={updateScrollPosition}
      >
        {children}
      </Flicking>

      {/* 커스텀 스크롤 바 트랙 */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
        {/* 스크롤 바 */}
        <div
          ref={scrollThumbRef}
          className="h-full rounded-full bg-gray-400 transition-colors hover:bg-gray-500"
          style={{
            width: `${thumbWidthPercent}%`,
            transition: "background-color 0.2s",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};
