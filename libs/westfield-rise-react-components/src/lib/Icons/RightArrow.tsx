import { IconProps } from './types';

type RightArrowProps = IconProps & Record<string, never>;
export const RightArrow = ({
  className,
  width = '20',
  height = '15',
}: RightArrowProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width}
      height={height} 
      viewBox="0 0 20 15" 
      className={className}
      fill="none">
      <polygon fill="#3D3836" points="12.6,14.5 11.5,13.5 16.6,8.4 0,8.4 0,6.9 16.6,6.9 11.5,1.8 12.6,0.8 19.4,7.6 "/>
    </svg>
  );
};
