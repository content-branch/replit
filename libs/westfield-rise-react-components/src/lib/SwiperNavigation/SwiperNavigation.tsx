import { ReactComponent as IconRight } from '../assets/svg/icon-carousel-right.svg';

import styles from './SwiperNavigation.module.scss';
import '../styles/swiper-custom-styling.scss';

/* eslint-disable-next-line */
export interface SwiperNavigationProps { }

export function SwiperNavigation() {

  return (
    <div className={styles['swiper-navigation']}>
      <div className="swiper-pagination"></div>
      <div className={styles['buttons']}>
        <IconRight className="custom-swiper-button custom-swiper-button--prev" />
        <IconRight className="custom-swiper-button custom-swiper-button--next" />
      </div>
    </div>
  );
}

export default SwiperNavigation;
