import React, { useState, useEffect } from 'react';
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, title, showModal, onModalClosed }) => {
  const [isOpen, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (showModal) {
      setIsModalOpened(true);
    }
  }, [showModal]);

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
