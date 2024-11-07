import { IconProps } from './types';
import classnames from 'classnames';

type CheckBoxIconProps = IconProps;
export const CheckBoxIcon = ({
  width = '14',
  height = '14',
  className,
}: CheckBoxIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(className)}
    >
      <path
        d="M18 5.5L8.375 15.125L4 10.75"
        stroke="url(#ultraviolet-gradient)"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <defs>
        <linearGradient
          id="ultraviolet-gradient"
          x1="3.99962"
          y1="10.3125"
          x2="18.0004"
          y2="10.3125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA5E99" />
          <stop offset="1" stopColor="#7A8CF0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
