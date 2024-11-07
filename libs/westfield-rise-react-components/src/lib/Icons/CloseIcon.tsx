import { IconProps } from './types';
import classnames from 'classnames';

type CloseIconProps = IconProps & Record<string, never>;
export const CloseIcon = ({
  width = '15',
  height = '16',
  className,
}: CloseIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(className)}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M1.84099 1.33221L1.31066 0.80188L0.25 1.86254L0.78033 2.39287L6.38771 8.00025L0.780726 13.6072L0.250396 14.1376L1.31106 15.1982L1.84139 14.6679L7.44837 9.06091L13.0554 14.6679L13.5857 15.1982L14.6463 14.1376L14.116 13.6072L8.50863 7.99985L14.1156 2.39287L14.6459 1.86254L13.5853 0.80188L13.055 1.33221L7.44797 6.93919L1.84099 1.33221Z" fill="#3D3836"/>
    </svg>
  );
};
