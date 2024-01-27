import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import PropTypes from 'prop-types';

const Modal = ({ children, title, isOpen, setIsModalOpened }) => {
  return (
    <div>
      {isOpen &&
        createPortal(
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
        )}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  setIsModalOpened: PropTypes.func.isRequired,
};

export default Modal;