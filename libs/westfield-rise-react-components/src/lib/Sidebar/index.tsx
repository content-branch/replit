import { ReactNode, useEffect, useId, useState } from 'react';

import styles from './Sidebar.module.scss';
import classnames from 'classnames';
import Button from '../Button/Button';
import { CloseFiltersIcon } from 'libs/westfield-rise-react-components/src/lib/Icons/CloseFiltersIcon';

type SidebarProps = {
  id?: string;
  children?: ReactNode;
  isOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen?: (showSidebar: boolean) => void;
  position?: 'left' | 'right';
  className?: string;
  withOverlay?: boolean;
};

export const Sidebar = (props: SidebarProps) => {
  const { position, setIsOpen, children, isOpen, withOverlay } = props;
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);
  const id = useId();
  let sidebarId = props.id;
  if (!props.id) {
    sidebarId = `${id}-sidebar`;
  }

  useEffect(() => {
    // showing overlay so we hide the body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    setLocalIsOpen(isOpen);
    return () => {
      // removing overlay so we show the body scroll
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    if (setIsOpen) {
      setIsOpen(!localIsOpen);
    } else {
      setLocalIsOpen(isOpen => !isOpen);
    }
  };

  return (
    <>
      <div
        id={sidebarId}
        tabIndex={-1}
        className={classnames(
          styles.sidebar,
          localIsOpen ? styles.open : styles.close,
          position && styles[position]
        )}
        aria-hidden={isOpen ? 'false' : 'true'}
      >
        <div className={classnames(styles.sidebarContent)}>
          <div className={classnames(styles.sidebarHeader)}>
            <Button
              variant="icon"
              icon={<CloseFiltersIcon className={styles.close_btn} />}
              onClick={toggleSidebar} />
          </div>
          {children}
        </div>
      </div>
      {withOverlay && (
        <div className={classnames(styles['sidebar_overlay'], localIsOpen && styles.open)}></div>
      )}
    </>
  );
};

Sidebar.defaultProps = {
  position: 'left',
  isOpen: false,
  withOverlay: true,
};
export default Sidebar;
