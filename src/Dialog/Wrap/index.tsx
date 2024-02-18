import React from 'react'
import styles from "./index.module.less";
const Wrap = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.wrap}>{children}</div>;
};
export default Wrap;
