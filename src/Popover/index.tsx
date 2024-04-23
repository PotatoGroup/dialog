import React, {
  useState,
  useMemo,
  CSSProperties,
  type ReactElement,
  JSXElementConstructor,
  useRef,
  cloneElement,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { debounce } from "../utils/debounce";
import styles from "./index.module.less";

export interface PopoverProps {
  width?: CSSProperties["width"];
  className?: string;
  trigger?: "hover" | "click";
  content: React.ReactNode;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

type Position = Partial<{
  left: CSSProperties["left"];
  top: CSSProperties["top"];
}>;

const Popover = ({
  width = 600,
  trigger,
  content,
  children,
  className,
}: PopoverProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position>();
  const [arrowPosition, setArrowPosition] = useState<Position>();

  const triggerEvents = useMemo(() => {
    if (trigger === "hover") {
      return {
        onMouseOver: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
      };
    }
    return {
      onClick: () => setVisible((pre) => !pre),
    };
  }, [trigger]);

  //@ts-ignore
  const triggerElement = cloneElement(children, {
    ...children.props,
    ...triggerEvents,
  });

  useLayoutEffect(() => {
    calcPosition();
  }, [width]);

  const calcPosition = useCallback(() => {
    const triggerElement = ref.current?.firstChild;
    if (!triggerElement) return {};
    const { top, left: triggerLeft } = (
      triggerElement as HTMLElement
    ).getBoundingClientRect();
    const eleWidth = parseFloat(width.toString());
    const left = Math.min(
      document.body.clientWidth - eleWidth,
      triggerLeft - parseFloat(width.toString()) / 2
    );
    const arrowLeft = triggerLeft - left;
    setPosition({ left, top: top + 25 });
    setArrowPosition({ left: arrowLeft, top: -10 });
  }, [width, visible]);

  const bodyClick = useCallback((e: MouseEvent) => {
    //@ts-ignore
    if (ref.current?.contains(e.target)) return;
    setVisible(false);
  }, []);

  const resize = useCallback(debounce(calcPosition, 200), []);

  useEffect(() => {
    document.body.addEventListener("click", bodyClick);
    window.addEventListener("resize", resize);
    return () => {
      document.body.removeEventListener("click", bodyClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={ref}>
      {triggerElement}
      <div
        style={{ width, display: visible ? "block" : "none", ...position }}
        className={`${styles.popover} ${className ?? ""}`}
      >
        <div className={styles.arrow} style={{ ...arrowPosition }} />
        {content}
      </div>
    </div>
  );
};

export default Popover;
