import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import PropTypes from 'prop-types';

const Modal = ({ children, title, isOpen, setIsModalOpened }) => {
  const escHandler = useCallback(
    (ev) => {
      if (ev.key === 'Escape') {
        setIsModalOpened(false);
      }
    },
    [setIsModalOpened],
  );

  useEffect(() => {
    document.addEventListener('keydown', escHandler, false);
    return () => {
      document.removeEventListener('keydown', escHandler, false);
    };
  }, [escHandler]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.title}>
        {title}
        <button className={styles.closeBtn} onClick={() => setIsModalOpened(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </div>,
    document.querySelector('#modal-overlay'),
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  setIsModalOpened: PropTypes.func.isRequired,
};

export default Modal;
