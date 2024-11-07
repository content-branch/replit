import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import classnames from 'classnames';

import Button, { ButtonProps } from '../Button/Button';
import AreaContainer from './AreaContainer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { ReactComponent as IconRight } from '../assets/svg/icon-carousel-right.svg';
import { THEMES } from '../constants';

import '../styles/swiper-custom-styling.scss';
import backgroundStyles from '../styles/background-colours.module.scss';
import styles from './Map.module.scss';
import { CustomImage } from '../CustomImage/CustomImage';
import { Swiper as TSwiper} from 'swiper/types';

export type LocationProps = {
  locationName: string;
  centerAddress: string;
  href: string;
};

export type AreaProps = {
  areaName: string;
  locationsList: LocationProps[];
};

export type Coord ={
  x: number;
  y: number;
  radius: number;
  regionName: string;
  index: number;
}

export type MapRegionProps = {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  imageMobile: {
    src: string;
    alt: string;
  };
  imageTablet: {
    src: string;
    alt: string;
  };
  coordList: Coord[]; 
  areasList: AreaProps[];
};

export interface MapProps {
  theme?: THEMES;
  regionsList: MapRegionProps[];
  contactUsCta: ButtonProps;
  exploreBookCta: ButtonProps;
  prefix?: string;
}

export function Map(props: MapProps) {  
  const { theme, regionsList, contactUsCta, exploreBookCta } = props;
  const [activeArea, setActiveArea] = useState<AreaProps[]>(
    regionsList[0].areasList,
  );
  const [hasMounted, setHasMounted] = useState(false);
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const [swiper, setSwiper] = useState<TSwiper>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleAreaClick = (index: number) => {
    swiper?.slideTo(index, 0, false);
  }

  const headerVariables = {
    '--fill-color': '#3d3836',
    '--stroke-color': '#fff',
  };

  return (
    <div
      className={classnames(
        styles['container'],
        backgroundStyles[`bckg-gradient--${theme}`],
      )}
    >
      <div className={styles['container_inner']}>
        <Swiper
          modules={[Navigation, EffectFade]}
          navigation={{
            nextEl: '.custom-swiper-button--next',
            prevEl: '.custom-swiper-button--prev',
          }}
          onSlideChange={swiper =>
            setActiveArea(regionsList[swiper.activeIndex].areasList)
          }
          onSwiper={swiper => {
            setSwiper(swiper)
            setActiveArea(regionsList[swiper.activeIndex].areasList)
          }
          }
          effect={'fade'}
          slidesPerView={1}
          allowTouchMove={false}
          className="myMapSwiper"
        >
          {regionsList.map((region, index) => (
            <SwiperSlide key={index}>
              <div className={styles['image-wrapper']}>
                {hasMounted &&
                  (isMobile && isRetina ? (
                    <CustomImage
                      alt={region.imageMobile.alt}
                      className={styles['image']}
                      src={region.imageMobile.src}
                      fill={true}
                    />
                  ) : isTablet ? (
                    <CustomImage
                      alt={region.imageTablet.alt}
                      className={styles['image']}
                      src={region.imageTablet.src}
                      fill={true}
                    />
                  ) : (
                      <CustomImage
                        alt={region.image.alt}
                        id={region.image.alt}
                        className={styles['image']}
                        src={region.image.src}
                        fill={true}
                        coords={region.coordList}
                        useMap={`${region.name}Map`}
                        handleAreaClick={handleAreaClick}
                      />
                  ))}
                <div className={styles['region-name']}>{region.name}</div>
              </div>
            </SwiperSlide>
          ))}
          <div
            className={styles['swiper-navigation']}
            style={headerVariables as React.CSSProperties}
          >
            <IconRight className="custom-swiper-button custom-swiper-button--prev" />
            <IconRight className="custom-swiper-button custom-swiper-button--next" />
          </div>
        </Swiper>
        <AreaContainer areasList={activeArea} />
      </div>
      <div className={styles['buttons']}>
        {contactUsCta && (
          <Button
            type="button"
            {...{
              variant: 'default',
              style: 'primary',
              isExternal: false,
              href: contactUsCta.href,
              prefix: props.prefix
            }}
            label={contactUsCta.label}
          />
        )}
        {exploreBookCta && (
          <Button
            type="button"
            {...{ variant: 'default', style: 'secondary', isExternal: false }}
            label={exploreBookCta.label}
            isPopup={exploreBookCta.isPopup}
            popupContent={exploreBookCta.popupContent}
            popupClass={'modal_accordion_wrapper'}
          />
        )}
      </div>
    </div>
  );
}

export default Map;
