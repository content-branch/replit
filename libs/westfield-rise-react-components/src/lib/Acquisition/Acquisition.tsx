import { CustomImage } from '../CustomImage/CustomImage';
import Button, { ButtonProps } from '../Button/Button';
import { THEMES } from '../constants';
import styles from './Acquisition.module.scss';

import classnames from 'classnames';

/* eslint-disable-next-line */
export interface AcquisitionProps {
  theme?: THEMES;
  variant: 'book' | 'quote';
  logo: {
    src: string;
    alt: string;
  };
  title: string;
  text: string;
  author?: string;
  jobTitle?: string;
  contactUsCta?: ButtonProps;
  exploreBookCta?: ButtonProps;
  prefix?: string;
}

export function Acquisition(props: AcquisitionProps) {
  const {
    theme,
    variant,
    logo,
    title,
    text,
    author,
    jobTitle,
    contactUsCta,
    exploreBookCta,
  } = props;
  return (
    <div
      className={classnames(styles['container'], styles[`container--${theme}`])}
    >
      <div className={styles['animation']}></div>
      <div className={styles['container_inner']}>
        <div className={styles['card']}>
          <CustomImage
            alt={logo?.alt || 'Default image'}
            src={logo?.src || 'https://via.placeholder.com/138x78'}
            width={138}
            height={78}
            className={styles['logo']}
          />
          <div className={styles['content']}>
            <div className={styles['text-container']}>
              <div className={styles['title']}>{title}</div>
              <div className={styles['text']}>
                <p className={variant === 'quote' ? styles['quote'] : ''}>
                  {text}
                </p>
                {variant === 'quote' && (author || jobTitle) && (
                  <div className={styles['info']}>
                    {author && (
                      <span className={styles['info__text']}>{author}</span>
                    )}
                    {jobTitle && (
                      <span className={styles['info__text']}>{jobTitle}</span>
                    )}
                  </div>
                )}
              </div>
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
                    prefix: props.prefix,
                  }}
                  label={contactUsCta.label}
                />
              )}
              {exploreBookCta && (
                <Button
                  type="button"
                  {...{
                    variant: 'default',
                    style: 'secondary',
                    isExternal: false,
                  }}
                  label={exploreBookCta.label}
                  isPopup={exploreBookCta.isPopup}
                  popupContent={exploreBookCta.popupContent}
                  popupClass={'modal_accordion_wrapper'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acquisition;
