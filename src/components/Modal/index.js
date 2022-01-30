import React from 'react';
import ReactDom from 'react-dom';

import styles from './styles.module.scss';

const portalRoot = document.getElementById('portal-root');

export function Modal({ children, isOpen, onClickClose }) {
    if(!isOpen) {
        return null;
    }

  return ReactDom.createPortal(
      <div className={styles.modalOverlay}>
          <div className={styles.modal}>
              <button type="button" className={styles.buttonCloseModal} onClick={onClickClose}>X</button>
              {children}
          </div>
      </div>,
    portalRoot,
  );
}
