import { IconProps } from './types';
import classnames from 'classnames';

type CloseIconProps = IconProps;
export const CloseFiltersIcon = ({
  width = '48',
  height = '48',
  className,
}: CloseIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(className)}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M19.7678 18.5893L19.1785 18L18 19.1785L18.5893 19.7678L23 24.1785L18.5893 28.5893L18 29.1785L19.1785 30.357L19.7678 29.7678L24.1785 25.357L28.5893 29.7678L29.1785 30.357L30.357 29.1785L29.7678 28.5893L25.357 24.1785L29.7678 19.7678L30.357 19.1785L29.1785 18L28.5893 18.5893L24.1785 23L19.7678 18.5893Z" fill="#3D3836" />
    </svg>
  );
};
