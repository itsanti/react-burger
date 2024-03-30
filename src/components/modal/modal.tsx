import React, { FC, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { ModalProps } from '../../utils/types/prop-types';
import { useParams } from 'react-router-dom';

const Modal: FC<ModalProps> = ({ children, title, setIsModalOpened }) => {
  const { orderNumber } = useParams();

  const escHandler = useCallback<EventListener>(
    (ev: Event | KeyboardEvent) => {
      if ('key' in ev && ev.key === 'Escape') {
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

  const modalTitle = orderNumber ? `#${orderNumber}` : title;

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.title}>
          {modalTitle}
          <button className={styles.closeBtn} onClick={() => setIsModalOpened(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
      <ModalOverlay onModalClosed={setIsModalOpened} />
    </>,
    document.querySelector('#modal-overlay') as Element,
  );
};

export default Modal;
