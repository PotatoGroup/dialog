import React, { useMemo, useRef } from "react";
import Mask from "./Mask";
import Wrap from "./Wrap";
import Icon from "../Icon";
import Draggable from "../Draggable";
import Collapse from "./Collapse";
import styles from "./index.module.less";

type CalStyle = number | string;

export interface DialogProps {
  title?: React.ReactNode | string;
  width?: CalStyle;
  open?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  inside?: boolean;
  draggable?: boolean;
  maskClosable?: boolean;
  contentClassName?: string;
  collapseControl?: boolean;
  onClose?: () => void;
}

const Dialog = ({
  open,
  title = "Dialog",
  width = 1024,
  children,
  footer,
  draggable,
  inside,
  maskClosable,
  contentClassName,
  collapseControl,
  onClose,
}: DialogProps) => {
  const collapse = useRef<any>();
  const modal = useMemo(() => {
    const modal = (
      <div className={styles.dialog} style={{ width }}>
        <div data-handler className={styles["dialog-header"]}>
          <span>{title}</span>
          {collapseControl && (
            <span
              className={styles.extra}
              onClick={() => {
                collapse.current!.toggle();
              }}
            >
              文档
            </span>
          )}
        </div>
        <div
          className={`${styles["dialog-content"]} ${contentClassName ?? ""}`}
        >
          {children}
        </div>
        <Icon name="close" className={styles.close} onClick={onClose} />
        {footer && <Collapse ref={collapse}>{footer}</Collapse>}
      </div>
    );
    return draggable ? <Draggable inside={inside}>{modal}</Draggable> : modal;
  }, [draggable, inside]);

  return open ? (
    <Mask onClick={maskClosable ? onClose : () => {}}>
      <Wrap>{modal}</Wrap>
    </Mask>
  ) : null;
};

Dialog.Icon = Icon;

export default Dialog;
