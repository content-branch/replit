import { IconProps } from './types';
import classNames from 'classnames';

type DropDownArrowIconNavProps = IconProps & {
  transform?: string;
};
export const DropDownArrowIconNav = ({
  width = '15',
  height = '10',
  className,
  transform,
}: DropDownArrowIconNavProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 6"
      fill="none"
      className={classNames(className)}
      transform={transform}
    >
      <path d="M8.66675 1.3335L5.00008 4.66683L1.33341 1.3335" stroke="#3D3836" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
};
