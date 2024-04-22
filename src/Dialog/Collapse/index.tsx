import React from "react";
import styles from "./index.module.less";
import Icon from "../../Icon";
import { useState, forwardRef, useImperativeHandle } from "react";
const Collapse = forwardRef(
  (
    {
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
      toggle() {
        setCollapsed((pre) => !pre);
      },
    }));
    return (
      <div className={`${styles.collapse} ${className ?? ""}`}>
        <div className={styles.icon}>
          <Icon
            name="up"
            style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0)" }}
            onClick={() => setCollapsed((pre) => !pre)}
          />
        </div>
        <div className={collapsed ? styles.collapsed : ""}>{children}</div>
      </div>
    );
  }
);
export default Collapse;
