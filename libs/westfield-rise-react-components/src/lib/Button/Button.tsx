import {
  MouseEventHandler,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import ConditionalLinkWrapper from '../contexts/ConditionalLinkWrapper';

import { ReactComponent as IconFilter } from '../assets/svg/icon-filter.svg';
import { ReactComponent as IconExternalArrow } from '../assets/svg/icon-external-arrow.svg';

import styles from './Button.module.scss';
import Modal from '../Modal/Modal';
import classnames from 'classnames';

export interface ButtonProps {
  ['data-testid']?: string;
  type?: HTMLButtonElement['type'];
  href?: string;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isExternal?: boolean;
  isPopup?: boolean;
  popupContent?: ReactElement;
  popupClass?: string;
  prefix?: string;
  disabled?: boolean;
}

type ButtonDefaultProps = {
  variant: 'default';
  style: 'primary' | 'secondary';
  colourWhite?: boolean;
};

type ButtonFilterProps = {
  variant: 'filter';
  colourWhite?: boolean;
};

type ButtonIconProps = {
  variant: 'icon';
  icon: React.ReactNode;
};

type ButtonLinkProps = {
  variant: 'link';
  isExternal?: boolean;
};

export type ConditionalButtonProps =
  | ButtonDefaultProps
  | ButtonFilterProps
  | ButtonIconProps
  | ButtonLinkProps;

const ButtonDefault = (props: ButtonProps & ButtonDefaultProps) => {
  const {
    'data-testid': dataTestId,
    type,
    onClick,
    style,
    label,
    colourWhite,
    isExternal,
    disabled,
  } = props;
  const handleClick = onClick ? onClick : () => undefined;

  return (
    <button
      className={classnames(
        styles.button,
        styles['button--default'],
        styles[`button--${style}`],
        colourWhite ? styles['button--white'] : '',
        isExternal ? styles['button--external'] : '',
        disabled ? styles['button--disabled'] : '',
      )}
      onClick={e => handleClick(e)}
      type={type}
      data-testid={dataTestId}
    >
      <span className={styles[`button__text`]}>{label}</span>
      {isExternal && <IconExternalArrow className={styles.icon} />}
    </button>
  );
};

const ButtonFilter = (props: ButtonProps & ButtonFilterProps) => {
  const {
    'data-testid': dataTestid,
    type,
    onClick,
    variant,
    label,
    colourWhite,
  } = props;
  const handleClick = onClick ? onClick : () => undefined;
  return (
    <button
      className={classnames(
        styles.button,
        styles['button--secondary'],
        colourWhite ? styles['button--white'] : '',
      )}
      onClick={e => handleClick(e)}
      type={type}
      data-testid={dataTestid}
    >
      <span className={styles[`button__text`]}>{label}</span>
      {variant === 'filter' && <IconFilter className={styles.icon} />}
    </button>
  );
};

const ButtonIcon = (props: ButtonProps & ButtonIconProps) => {
  const { 'data-testid': dataTestid, type, onClick, icon } = props;
  const handleClick = onClick ? onClick : () => undefined;

  return (
    <button
      type={type}
      className={classnames(styles.button, styles['button--icon'])}
      onClick={e => handleClick(e)}
      data-testid={dataTestid}
    >
      {icon}
    </button>
  );
};

const ButtonLink = (props: ButtonProps & ButtonLinkProps) => {
  const { 'data-testid': dataTestId, label, onClick } = props;
  const handleClick = onClick ? onClick : () => undefined;

  return (
    <button
      className={styles.link}
      onClick={e => handleClick(e)}
      data-testid={dataTestId}
    >
      {label}
    </button>
  );
};

const ButtonFactory = (props: ButtonProps & ConditionalButtonProps) => {
  const { variant } = props;
  switch (variant) {
    case 'default':
      return (
        <ButtonDefault
          data-testid={props['data-testid']}
          type={props.type}
          variant={variant}
          style={props.style}
          label={props.label}
          colourWhite={props.colourWhite}
          onClick={props.onClick}
          isExternal={props.isExternal}
          disabled={props.disabled}
        />
      );
    case 'link':
      return (
        <ButtonLink
          data-testid={props['data-testid']}
          variant={variant}
          label={props.label}
          href={props.href}
          onClick={props.onClick}
          isExternal={props.isExternal}
        />
      );
    case 'icon':
      return (
        <ButtonIcon
          data-testid={props['data-testid']}
          type={props.type}
          variant={variant}
          icon={props.icon}
          onClick={props.onClick}
        />
      );
    case 'filter':
    default:
      return (
        <ButtonFilter
          data-testid={props['data-testid']}
          type={props.type}
          variant={variant}
          label={props.label}
          colourWhite={props.colourWhite}
          onClick={props.onClick}
        />
      );
  }
};

export function Button(props: ButtonProps & ConditionalButtonProps) {
  const {
    'data-testid': dataTestid,
    onClick,
    href,
    isPopup = false,
    popupContent,
    popupClass,
    isExternal,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const buttonOnclick = useMemo(() => {
    if (isPopup) {
      return () => {
        setIsOpen(true);
      };
    }
    return onClick;
  }, [isPopup, onClick]);

  return (
    <ConditionalLinkWrapper
      href={href || ''}
      isExternal={isExternal}
      prefix={props.prefix}
    >
      <>
        <ButtonFactory
          {...props}
          onClick={buttonOnclick}
          data-testid={dataTestid}
        />
        {isPopup && isOpen && (
          <Modal
            isOpen={isOpen}
            toggle={() => setIsOpen(false)}
            key={'button-popup-content-modal'}
            className={popupClass}
          >
            <div className={styles.button__popup_content_wrapper}>
              {popupContent}
            </div>
          </Modal>
        )}
      </>
    </ConditionalLinkWrapper>
  );
}

export default Button;
Button.defaultProps = {
  type: 'button' as HTMLButtonElement['type'],
};
