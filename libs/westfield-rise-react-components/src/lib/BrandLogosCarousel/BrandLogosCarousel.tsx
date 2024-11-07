import React, { useContext, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from 'swiper/modules';

import { EnvironmentContext } from '../contexts/EnvironmentContext';

import 'swiper/css';
import '../styles/swiper-custom-styling.scss';
import styles from './BrandLogosCarousel.module.scss';
import { CustomImage } from "../CustomImage/CustomImage";

/* eslint-disable-next-line */
export interface BrandLogosCarouselProps {
  logoList: { src: string, alt: string }[];
}

export function BrandLogosCarousel(props: BrandLogosCarouselProps) {
  const { logoList } = props;
  const { Image } = useContext(EnvironmentContext);

  const logos = useMemo(() => {
    return new Array(Math.round(14 / logoList.length)).fill(logoList, 0).flat();
  }, [logoList]);

  return (
    <div className={styles['container']}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false
        }}
        slidesPerView={2.5}
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
          1920: {
            slidesPerView: 6,
          }
        }}
        spaceBetween={50}
        centeredSlides={true}
        speed={3000}
        allowTouchMove={false}
        pagination={false}
        navigation={false}
        modules={[Autoplay]}
        className="logoCarousel"
      >
        {logos?.map((logo, index) => (
          <SwiperSlide key={index} className={styles['logo']}>
            <CustomImage width={100} height={50} src={`${logo.src}`} alt={logo.alt} priority={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BrandLogosCarousel;
