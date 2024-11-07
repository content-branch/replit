import { memo } from 'react';
import { isEqual } from 'lodash';
import Button, { ButtonProps } from '../Button/Button';

import MotionTheoryHeader from '../MotionTheoryHeader/MotionTheoryHeader';
import { THEMES } from '../constants';

import styles from './Hero.module.scss';

import { HeroVideo } from '../HeroVideo/HeroVideo';

/* eslint-disable-next-line */
export interface HeroProps {
  theme?: THEMES;
  shortVideo: {
    url: string;
  };
  vimeoId: string;
  title: string;
  text: string;
  contactUsCta: ButtonProps;
  exploreBookCta: ButtonProps;
  prefix?: string;
  thumbnailUrl?: string;
}

export const Hero = memo((props: HeroProps) => {
  const { theme, shortVideo, title, text, vimeoId, 
    contactUsCta, exploreBookCta, thumbnailUrl } = props;

  return (
    <div className={`${styles['container']}`}>
      <div className={styles['content']}>
        <div className={styles['content--inner']}>
          <div className={styles['text-container']}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.text}>{text}</p>
          </div>
          <div className={styles['buttons']}>
            {contactUsCta && (<Button
              type='button'
              {... { variant: 'default', style: 'primary', isExternal: false, href: contactUsCta.href, prefix: props.prefix }}
              label={contactUsCta.label}
            />
            )}
            {exploreBookCta && (<Button
              type='button'
              {... { variant: 'default', style: 'secondary', isExternal: false }}
              label={exploreBookCta.label}
              isPopup={exploreBookCta.isPopup}
              popupContent={exploreBookCta.popupContent}
              popupClass={'modal_accordion_wrapper'}
            />
            )}
          </div>
        </div>
      </div>
      <div className={styles['container__gradient']}>
        <MotionTheoryHeader {...props} />
      </div>
      <HeroVideo theme={theme} shortVideoUrl={shortVideo.url} vimeoId={vimeoId} thumbnailUrl={thumbnailUrl} />
    </div>
  );
}, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});

export default Hero;
