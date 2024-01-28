import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onModalClosed }) => {
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

ModalOverlay.propTypes = {
  onModalClosed: PropTypes.func.isRequired,
};

export default ModalOverlay;
