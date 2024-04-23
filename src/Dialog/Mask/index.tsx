import React from "react";
import styles from "./index.module.less";
const Mask = ({
  onClick,
  children,
}: {
  onClick?(): void;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={styles.mask}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClick?.();
        }
        //e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default Mask;
