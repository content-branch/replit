import { IconProps } from './types';
import classNames from 'classnames';

type DropDownArrowIconProps = IconProps & {
  transform?: string;
};
export const DropDownArrowIcon = ({
  width = '49',
  height = '48',
  className,
  transform,
}: DropDownArrowIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className)}
      transform={transform}
    >
      <path
        d="M19.5 22L24.5 27L29.5 22"
        stroke="#3D3836"
        strokeWidth="1.66667"
        strokeLinecap="square"
      />
    </svg>
  );
};
