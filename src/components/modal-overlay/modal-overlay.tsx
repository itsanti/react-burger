import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import { ModalOverlayProps } from '../../utils/types/prop-types';

const ModalOverlay: FC<ModalOverlayProps> = ({ onModalClosed }) => {
  return (
    <div
      className={styles.root}
      onClick={(ev) => {
        if (ev.currentTarget === ev.target) {
          onModalClosed(false);
        }
      }}
    />
  );
};

export default ModalOverlay;
