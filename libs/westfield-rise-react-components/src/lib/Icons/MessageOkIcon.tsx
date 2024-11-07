import { IconProps } from './types';

type MessageOkIconProps = IconProps;

export const MessageOkIcon = ({
  className,
  width = '70',
  height = '70',
}: MessageOkIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M51.3332 23.75L28.8748 46.2083L18.6665 36"
        stroke="url(#paint0_linear_485_371203)"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <rect
        x="2"
        y="2"
        width="66"
        height="66"
        rx="33"
        stroke="url(#paint1_linear_485_371203)"
        strokeWidth="4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_485_371203"
          x1="18.6656"
          y1="34.9792"
          x2="51.3341"
          y2="34.9792"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA5E99" />
          <stop offset="1" stopColor="#7A8CF0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_485_371203"
          x1="-0.00188364"
          y1="35"
          x2="70.002"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA5E99" />
          <stop offset="1" stopColor="#7A8CF0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
