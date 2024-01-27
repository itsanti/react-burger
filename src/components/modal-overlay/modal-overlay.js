import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, title, showModal, onModalClosed }) => {
  const [isOpen, setIsModalOpened] = useState(false);

  const escHandler = useCallback(
    (ev) => {
      if (ev.key === 'Escape') {
        setIsModalOpened(false);
        onModalClosed(false);
      }
    },
    [onModalClosed],
  );

  useEffect(() => {
    if (showModal) {
      setIsModalOpened(true);
    }
    document.addEventListener('keydown', escHandler, false);
    return () => {
      document.removeEventListener('keydown', escHandler, false);
    };
  }, [showModal, escHandler]);
  return isOpen ? (
    <div
      className={styles.root}
      onClick={(ev) => {
        if (ev.currentTarget === ev.target) {
          setIsModalOpened(false);
          onModalClosed(false);
        }
      }}
    >
      <Modal
        title={title}
        isOpen={isOpen}
        setIsModalOpened={() => {
          setIsModalOpened(false);
          onModalClosed(false);
        }}
      >
        {children}
      </Modal>
    </div>
  ) : null;
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  onModalClosed: PropTypes.func.isRequired,
};

export default ModalOverlay;
