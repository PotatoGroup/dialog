import styles from "./index.module.less";
import Icon from "../../Icon";
import { useState } from "react";
const Collapse = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  return (
    <div className={`${styles.collapse} ${className ?? ""}`}>
      <div className={styles.icon}>
        <Icon
          name="up"
          style={{ transform: collapse ? "rotate(180deg)" : "rotate(0)" }}
          onClick={() => setCollapse((pre) => !pre)}
        />
      </div>
      <div className={collapse ? styles.collapsed : ""}>{children}</div>
    </div>
  );
};
export default Collapse;
