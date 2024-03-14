import React, { FC } from 'react';
import styles from './preloader.module.css';

const Preloader: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles['lds-spinner']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
