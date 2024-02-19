import React from "react";
import styles from "./index.module.less";
const Mask = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className={styles.mask}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default Mask;
