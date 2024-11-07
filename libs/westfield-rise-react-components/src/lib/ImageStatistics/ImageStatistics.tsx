import Button from '../Button/Button';
import { StatisticProps } from '../Statistic/Statistic';
import StatisticList from '../StatisticList/StatisticList'; // StatisticListProps,
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { CustomImage } from '../CustomImage/CustomImage';
import { THEMES } from '../constants';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import backgroundStyles from '../styles/background-colours.module.scss';
import styles from './ImageStatistics.module.scss';

import classnames from 'classnames';

/* eslint-disable-next-line */
export interface ImageStatisticsProps {
  theme?: THEMES,
  title?: string;
  caseStudyList: {
    image: {
      src: string;
      alt: string;
    };
    statisticsList?: StatisticProps[];
    brandName: string;
    text: string;
    ctaProps?: {
      label: string;
      href: string;
      isExternal?: boolean;
    };
  }[];
  prefix?: string;
}

export function ImageStatistics(props: ImageStatisticsProps) {
  const { theme, title, caseStudyList } = props;

  return (
    <div className={classnames(styles['container'], backgroundStyles[`bckg-gradient--${theme}`])}>
      {title && <h3 className={styles['title']}>{title}</h3>}
      <Swiper
        direction={'horizontal'}
        slidesPerView={1}
        spaceBetween={0}
        freeMode={true}
        centeredSlides={true}
        mousewheel={{ releaseOnEdges: true }}
        modules={[FreeMode, Mousewheel]}
        className="horizontalSwiper"
      >
        {caseStudyList.map((caseStudyCard, index) => (
          <SwiperSlide key={index}>
            <div className={classnames(styles['slide-wrapper'], 'swiper-slide-container')}>
              <div className={styles['image-text']}>
                <div className={styles['image_container']}>
                  <CustomImage
                    alt={caseStudyCard.image?.alt || 'Default image'}
                    src={caseStudyCard.image?.src || 'https://placehold.co/630x430'}
                    className={styles['image']}
                    width={765}
                    height={522}
                  />
                  {caseStudyCard.brandName && (
                    <div className={styles['brand_wrapper']}>
                      <span className={styles['brand']}>{caseStudyCard.brandName}</span>
                    </div>
                  )}
                </div>
                <div className={styles['text-container']}>
                  <div className={styles['text-container--inner']}>
                    {caseStudyCard.statisticsList ? (
                      <StatisticList
                        statisticsList={caseStudyCard.statisticsList}
                        withAnimation={false}
                      ></StatisticList>
                    ) : null}
                  </div>
                </div>
              </div><div className={styles['cta-block']}>
                <p className={styles.text}>{caseStudyCard.text}</p>
                {caseStudyCard.ctaProps && (
                  <div className={styles.link}>
                    <Button
                      label={caseStudyCard.ctaProps.label}
                      href={caseStudyCard.ctaProps.href}
                      {...{
                        variant: 'default',
                        style: 'secondary',
                        isExternal: caseStudyCard.ctaProps.isExternal,
                        prefix: props.prefix? `${props.prefix}/case-study` : 'case-study'
                      }} />
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageStatistics;
