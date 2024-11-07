import { ReactNode, useEffect } from 'react';

import Button from '../Button/Button';
import { ReactComponent as IonCloseModal } from '../assets/svg/icon-close-modal.svg';

import classnames from 'classnames';

import styles from './Modal.module.scss';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export function Modal(props: ModalProps) {
  const { children, isOpen, toggle, className } = props;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={classnames(
        styles['modal_overlay'],
        styles[`${className}`],
        className,
        styles['fade-in'],
      )}
      onClick={() => toggle()}
    >
      <div onClick={e => e.stopPropagation()} className={styles['modal_box']}>
        <Button
          variant="icon"
          icon={<IonCloseModal />}
          onClick={() => toggle()}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
