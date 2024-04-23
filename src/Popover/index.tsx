import React, {
  useState,
  useMemo,
  CSSProperties,
  type ReactElement,
  JSXElementConstructor,
  useRef,
  cloneElement,
  useEffect,
} from "react";
import styles from "./index.module.less";

export interface PopoverProps {
  width?: CSSProperties["width"];
  className?: string;
  trigger?: "hover" | "click";
  content: React.ReactNode;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

const Popover = ({
  width = 600,
  content,
  children,
  className,
}: PopoverProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const triggerElement = cloneElement(children, {
    onClick() {
      setVisible((pre) => !pre);
    },
  });
  const position = useMemo(() => {
    const triggerElement = ref.current?.firstChild;
    if (!triggerElement) return {};
    const { top, left } = (
      triggerElement as HTMLElement
    ).getBoundingClientRect();
    return { top: top + 25, left: left - parseFloat(width.toString()) / 2 };
  }, [width, visible]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      //@ts-ignore
      if (ref.current?.contains(e.target)) return;
      setVisible(false)
    });
  }, []);

  return (
    <div ref={ref}>
      {triggerElement}
      <div
        style={{ width, display: visible ? "block" : "none", ...position }}
        className={`${styles.popover} ${className ?? ""}`}
      >
        <div className={styles.arrow} />
        {content}
      </div>
    </div>
  );
};

export default Popover;
