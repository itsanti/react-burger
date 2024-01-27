import React, { useState, useEffect } from 'react';
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ children }) => {
  const [isOpen, setIsModalOpened] = useState(true);
  const escHandler = (ev) => {
    if (ev.key === 'Escape') {
      setIsModalOpened(false);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', escHandler, false);
    return () => {
      document.removeEventListener('keydown', escHandler, false);
    };
  }, []);
  return isOpen ? (
    <div
      className={styles.root}
      onClick={() => {
        setIsModalOpened(false);
      }}
    >
      <Modal title="Add review" isOpen={isOpen} setIsModalOpened={setIsModalOpened}>
        {children}
      </Modal>
    </div>
  ) : null;
};
