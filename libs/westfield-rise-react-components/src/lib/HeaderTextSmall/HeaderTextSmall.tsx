import classnames from 'classnames';

import { THEMES } from '../constants';

import styles from './HeaderTextSmall.module.scss';
import { CustomImage } from '../CustomImage/CustomImage';

/* eslint-disable-next-line */
export interface HeaderTextSmallProps {
  theme?: THEMES;
  title: string;
  image?: { src: string; alt: string };
}

export function HeaderTextSmall(props: HeaderTextSmallProps) {
  const { theme, title, image } = props;

  return (
    <div
      className={classnames(
        styles['container'],
        styles['fade-in'],
        styles[`container--${theme}`],
      )}
    >
      {image && (
        <CustomImage alt={image.alt} src={image.src} className={styles.background}
          sizes='100vw'
          fill
        />
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

export default HeaderTextSmall;
