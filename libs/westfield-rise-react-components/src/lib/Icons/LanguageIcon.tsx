import { IconProps } from './types';
import classnames from 'classnames';

type LanguageIconProps = IconProps;
export const LanguageIcon = ({
  width = '32',
  height = '32',
  className,
}: LanguageIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(className)}
    >
      <circle cx="16" cy="16" r="14.875" stroke="#3D3836" strokeWidth="2.25" />
      <path d="M21.8749 16C21.8749 20.3006 21.11 24.1403 19.919 26.8628C19.3227 28.2257 18.6418 29.258 17.9427 29.9338C17.249 30.6044 16.5942 30.875 15.9999 30.875C15.4056 30.875 14.7508 30.6044 14.0571 29.9338C13.3581 29.258 12.6771 28.2257 12.0808 26.8628C10.8898 24.1403 10.1249 20.3006 10.1249 16C10.1249 11.6994 10.8898 7.85965 12.0808 5.13721C12.6771 3.77432 13.3581 2.74203 14.0571 2.06618C14.7508 1.39556 15.4056 1.125 15.9999 1.125C16.5942 1.125 17.249 1.39556 17.9427 2.06618C18.6418 2.74203 19.3227 3.77432 19.919 5.13721C21.11 7.85965 21.8749 11.6994 21.8749 16Z" stroke="#3D3836" strokeWidth="2.25" />
      <line x1="1.99988" y1="10.875" x2="29.9999" y2="10.875" stroke="#3D3836" strokeWidth="2.25" />
      <line x1="1.99988" y1="20.875" x2="29.9999" y2="20.875" stroke="#3D3836" strokeWidth="2.25" />
    </svg>
  );
};
