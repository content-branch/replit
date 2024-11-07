import { THEMES } from '../constants';

import classnames from 'classnames';

import styles from './MotionTheoryHeader.module.scss';

export interface MotionTheoryHeaderProps {
  theme?: THEMES;
}

export function MotionTheoryHeader(props: MotionTheoryHeaderProps) {
  const { theme  } = props;

  return (
    <div
      className={styles['bg-animation']}
    >
        <div className={classnames(styles['color'], styles[`color_1--${theme}`])}></div>
        <div className={classnames(styles['color'], styles[`color_2--${theme}`])}></div>
        <div className={classnames(styles['color'], styles[`color_3--${theme}`])}></div>
    </div>
  );
}

export default MotionTheoryHeader;
