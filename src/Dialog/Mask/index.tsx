import styles from "./index.module.less";
const Mask = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.mask}>{children}</div>;
};

export default Mask
