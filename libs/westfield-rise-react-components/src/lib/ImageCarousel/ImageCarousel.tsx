import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from 'next/router';

import Button from "../Button/Button";

import 'swiper/css';

import styles from './ImageCarousel.module.scss';
import '../styles/swiper-custom-styling.scss';

import classnames from 'classnames';
import { CustomImage } from '../CustomImage/CustomImage';

type ImageListProps = {
  src: string,
  alt?: string,
  textContainer: {
    textLeft: string,
    textRight?: string
  },
  articleLink?: string
}

/* eslint-disable-next-line */
export interface ImageCarouselProps {
  type?: 'default' | 'people' | 'news-insights';
  title?: string;
  imageList: ImageListProps[];
  ctaProps?: {
    label: string,
    href: string,
    isExternal?: boolean,
  };
  prefix?: string;
}

const CarouselFactory = (props: {imageCarouselProps: ImageCarouselProps, setCtaHref: (ctaHref: string)=> void}) => {
  const router = useRouter();
  const { type, imageList, prefix } = props.imageCarouselProps;

  const images = useMemo(() => {
    return new Array(Math.round(9 / imageList.length)).fill(imageList, 0).flat();
    // return new Array(Math.round(5 / imageList.length)).fill(type === "news-insights" ? imageList.slice(0, 5) : imageList, 0).flat();
  }, [imageList]);


  switch (type) {
    case 'news-insights':
      return (
        <Swiper
          loop={true}
          pagination={false}
          navigation={false}
          slidesPerView={1.1}
          spaceBetween={0}
          onSlideChange={(swiper) => {props.setCtaHref(images[swiper.activeIndex].articleLink)}}
          centeredSlides={true}
          initialSlide={1}
          breakpoints={{
            768: {
              slidesPerView: 1.65,
            },
            1280: {
              slidesPerView: 1.7,
            },
            2100: {
              slidesPerView: 1.8,
            },
            2200: {
              slidesPerView: 2,
            },
            2560: {
              slidesPerView: 2.2,
            },
          }}
          className="newsInsightsCarousel"
        >
          {images?.map((imageItem, index: number) => (
            <SwiperSlide key={index}>
              <div className={classnames(styles['image-container'], styles['custom-cursor'])} onClick={() => router.push(prefix? `${prefix}/${imageItem.articleLink}`: imageItem.articleLink)}>
                <CustomImage
                  src={imageItem.src}
                  alt={imageItem.alt || ''}
                  className={styles['image']}
                  width={100}
                  height={100}
                  sizes='100vw'
                />
                {(imageItem.textContainer.textLeft || imageItem.textContainer.textRight) && (
                  <div className={`${styles['text-container']}`}>
                    {imageItem.textContainer.textLeft &&
                      <div className={styles['text-left']}>
                        {imageItem.textContainer.textLeft.split(",").map((substring: any, index: number) => (
                          <span key={index} className={styles['text-left__substring']}>{substring}</span>
                        ))}
                      </div>
                    }
                    {imageItem.textContainer.textRight && (
                      <div className={styles['text-right']}>
                        {imageItem.textContainer.textRight}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case 'default' || 'people':
    default:
      if (props.imageCarouselProps.ctaProps) {
        props.setCtaHref(props.imageCarouselProps.ctaProps.href)
      }
      return (
        <Swiper
          pagination={false}
          navigation={false}
          slidesPerView={1.1}
          spaceBetween={0}
          centeredSlides={true}
          initialSlide={(Math.round(imageList.length / 2)) - 1}
          breakpoints={{
            768: {
              slidesPerView: 1.4,
            }
          }}
          className={classnames('imageCarousel', imageList.length < 2 ? 'single' : '')}
        >
          {imageList?.map((imageItem, index: number) => (
            <SwiperSlide key={index}>
              <div className={classnames(styles['image-container'], styles['custom-cursor'])}>
                <CustomImage
                  src={imageItem.src}
                  alt={imageItem.alt || ''}
                  className={styles['image']}
                  width={100}
                  height={100}
                  sizes='100vw'
                />
                {(imageItem.textContainer.textLeft || imageItem.textContainer.textRight) && (
                  <div className={`${styles['text-container']}`}>
                    {imageItem.textContainer.textLeft &&
                      <div className={styles['text-left']}>
                        {imageItem.textContainer.textLeft.split(",").map((substring, index) => (
                          <span key={index} className={styles['text-left__substring']}>{substring}</span>
                        ))}
                      </div>
                    }
                    {imageItem.textContainer.textRight && (
                      <div className={styles['text-right']}>
                        {imageItem.textContainer.textRight}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )
  }
}

export function ImageCarousel(props: ImageCarouselProps) {
  const { type, title, ctaProps } = props;
  const [ctaHref, setCtaHref] = useState<string>('');

  return (
    <div className={classnames(styles['container'], styles[`container--${type}`])}>
      {title && (<h3 className={styles['title']}>{title}</h3>)}
      <CarouselFactory {...{imageCarouselProps: props, setCtaHref}} />
      {ctaProps && (
        <div className={styles.link}>
          <Button
            label={ctaProps.label}
            href={ctaHref}
            {... { variant: 'default', style: 'secondary', isExternal: ctaProps.isExternal, prefix: props.prefix }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
