import Button from '../Button/Button';
import { THEMES } from '../constants';

import styles from './HeaderLarge.module.scss';
import Video from '../Video/Video';

import classnames from 'classnames';
import { CustomImage } from '../CustomImage/CustomImage';

export interface HeaderLargeProps {
  theme: THEMES;
}

type HeaderTextProps = {
  type: 'text';
  title: string;
  text?: string;
  link?: {
    href: string;
    label: string;
    isExternal?: boolean;
    isPopup?: boolean;
    popupContent?: JSX.Element;
  };
};

type HeaderImageProps = {
  type: 'image';
  image: { src: string; alt: string };
};

type HeaderVideoProps = {
  type: 'video';
  image?: { src: string; alt: string };
  videoCode: string;
  fullWidth: boolean;
};

export type ConditionalHeaderLargeProps =
  | HeaderTextProps
  | HeaderImageProps
  | HeaderVideoProps;

const HeaderText = (props: HeaderTextProps) => {
  const { title, text, link } = props;

  return (
    <div className={classnames(styles['container'], styles['fade-in'])}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      {link && (
        <div className={styles.link}>
          <Button
            label={link.label}
            href={link.href}
            variant={'default'}
            style={'secondary'}
            isExternal={link.isExternal}
            isPopup={link.isPopup}
            popupContent={link.popupContent}
          />
        </div>
      )}
    </div>
  );
};

const HeaderImage = (props: HeaderImageProps) => {
  const { image } = props;
  return (
    <CustomImage
      alt={image?.alt || 'Default image'}
      src={image?.src || 'https://via.placeholder.com/1280x630'}
      className={`${styles['background_image']} ${styles['fade-in']}`}
      sizes="100vw"
      width={100}
      height={100}
      loading='eager'
    />
  );
};

export function HeaderLarge(
  props: HeaderLargeProps & ConditionalHeaderLargeProps,
) {
  const { theme, type } = props;

  return (
    <>
      {type === 'text' && (
        <HeaderText
          type={type}
          title={props.title}
          text={props.text}
          link={props.link}
        />
      )}
      {type === 'image' && <HeaderImage type={type} image={props.image} />}
      {type === 'video' && (
        <Video
          theme={theme}
          image={props.image}
          videoCode={props.videoCode}
          fullWidth
        />
      )}
    </>
  );
}

export default HeaderLarge;
