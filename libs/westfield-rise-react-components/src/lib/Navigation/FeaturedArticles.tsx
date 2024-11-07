import { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { ConditionalListCardProps } from '../ListCard/ListCard';
import { EnvironmentContext } from '../contexts/EnvironmentContext';

import styles from './Navigation.module.scss';
import { CustomImage } from '../CustomImage/CustomImage';

interface FeaturedArticlesProps {
  articleList: ConditionalListCardProps[];
  handleClose: any;
  prefix?: string;
}

function FeaturedArticles(props: FeaturedArticlesProps) {
  const { articleList, handleClose, prefix } = props;
  const { Link } = useContext(EnvironmentContext);

  return (
    <div className={styles['featured-container']}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        direction='horizontal'
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 40,
            direction: 'vertical'
          }
        }}
        className="featuredCarousel"
      >
        {articleList.map((item, index) => (
          <SwiperSlide key={index} onClick={() => handleClose()}>
            <Link prefetch={false} href={item.slug || ''} prefix={prefix} isExternal={item.slug?.includes('http')}>
              <div className={styles['featured-container__article']}>
                <CustomImage width={460.5} height={259.5} alt={item.image.alt || ''} src={`https://${item.image.src}`} />
                <div className={styles['featured-container__title']}>
                  {item.longTitle || item.title}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default FeaturedArticles