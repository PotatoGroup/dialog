import { useMemo } from "react";
import Mask from "./Mask";
import Wrap from "./Wrap";
import Icon from "../Icon";
import Draggable from "../Draggable";
import styles from "./index.module.less";

type CalStyle = number | string;

export interface ModalProps {
  title?: React.ReactNode | string;
  width?: CalStyle;
  open?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  draggable?: boolean;
  onClose?: () => void;
}

const Modal = ({
  open,
  title = "Dialog",
  width = 1024,
  children,
  footer,
  draggable,
  onClose,
}: ModalProps) => {
  const modal = useMemo(() => {
    const modal = (
      <div className={styles.modal} style={{ width }}>
        <div data-handler className={styles["modal-header"]}>
          {title}
        </div>
        <div className={styles["modal-content"]}>{children}</div>
        <Icon name="close" className={styles.close} onClick={onClose} />
        {footer && <div className={styles["modal-footer"]}>{footer}</div>}
      </div>
    );
    return draggable ? <Draggable>{modal}</Draggable> : modal;
  }, [draggable]);

  return open ? (
    <Mask>
      <Wrap>{modal}</Wrap>
    </Mask>
  ) : null;
};

export default Modal;
