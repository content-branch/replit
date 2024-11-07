import Button from '../Button/Button';

import classnames from 'classnames';

import styles from './ImageText.module.scss';
import { CustomImage } from '../CustomImage/CustomImage';

/* eslint-disable-next-line */
export interface ImageTextProps {
  subtitle?: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
  ctaProps?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  prefix?: string;
}

export type ImageTextConditionalProps =
  | {
      type: 'default';
      title: string;
    }
  | {
      type: 'people';
      name: string;
      role: string;
    };

export function ImageText(props: ImageTextProps & ImageTextConditionalProps) {
  const { subtitle, text, image, ctaProps, prefix } = props;
  return (
    <div
      className={classnames(
        styles['container'],
        styles[`container--${props.type}`],
      )}
    >
      <CustomImage
        alt={image?.alt || 'Default image'}
        src={image?.src || 'https://via.placeholder.com/630x430'}
        className={styles['image']}
        width={945}
        height={645}
      />
      <div className={styles['text-container']}>
        <div className={styles['text-container--inner']}>
          {props.type === 'default' ? (
            <div className={styles['title']}>{props.title}</div>
          ) : props.type === 'people' ? (
            <div className={styles['info']}>
              <span>{props.name}</span>
              <span>{props.role}</span>
            </div>
          ) : null}

          {subtitle && <div className={styles['subtitle']}>{subtitle}</div>}
          <p className={styles['text']}>{text}</p>
        </div>
        {ctaProps && (
          <div className={styles.link}>
            <Button
              label={ctaProps.label}
              href={ctaProps.href}
              {...{
                variant: 'default',
                style: 'secondary',
                isExternal: ctaProps.isExternal,
                prefix: prefix,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageText;
