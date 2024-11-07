// Import Swiper React components
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import ListCard, { ConditionalListCardProps } from '../ListCard/ListCard';
import SwiperNavigation from "../SwiperNavigation/SwiperNavigation";

import classnames from 'classnames';

import { THEMES } from "../constants";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Cards.module.scss';

/* eslint-disable-next-line */
export interface CardsProps {
  theme?: THEMES,
  title?: string;
  withMotionBackground?: boolean,
  cardList: ConditionalListCardProps[],
  prefix?: string,
}

export function Cards(props: CardsProps) {
  const { theme, title, cardList, prefix } = props;

  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = (entries: any) => {
    const entry = entries[0];
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.25, // Trigger when 25% of the element is visible
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);


  return (
    <div 
      ref={targetRef} 
      className={classnames(
        styles['container'],
        props.withMotionBackground && styles[`bckg-motion--${theme}`],
        isVisible && styles['animate'],
      )}>
      {title && (<h3 className={styles['title']}>{title}</h3>)}
      <Swiper
        pagination={{
          el: '.swiper-pagination',
          type: 'progressbar',
        }}
        navigation={{
          nextEl: '.custom-swiper-button--next',
          prevEl: '.custom-swiper-button--prev',
        }}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="cardsCarousel"
      >
        {cardList && cardList.map((listCardItem: ConditionalListCardProps, index: number) => (
          <SwiperSlide key={index}><ListCard {...listCardItem} prefix={prefix}/></SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </div>
  );
}

export default Cards;
