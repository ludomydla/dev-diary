import React from "react";
import styles from '../styles/Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader_background}>
      <div className={styles.loader_spinner}></div>
    </div>
  );
}
