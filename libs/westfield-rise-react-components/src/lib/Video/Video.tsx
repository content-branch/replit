import dynamic from 'next/dynamic';
import { memo } from 'react';
import { isEqual } from 'lodash';

import Modal from '../Modal/Modal';
import useModal from '../hooks/useModal';

import { THEMES } from '../constants';

import styles from './Video.module.scss';
import classnames from 'classnames';
import { CustomImage } from '../CustomImage/CustomImage';

const ReactPlayerVimeo = dynamic(() => import('react-player/vimeo'), {
  ssr: false,
});

export interface VideoProps {
  type?: string;
  theme?: THEMES;
  image?: {
    src: string;
    alt: string;
  };
  videoCode: string;
  fullWidth?: boolean;
}

export const Video = memo((props: VideoProps) => {
  const { theme, image, videoCode, fullWidth } = props;
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      <div
        className={classnames(
          styles['video_container'],
          styles[`video_container--${theme}`],
          styles['fade-in'],
          fullWidth ? styles['full_container'] : styles['partial_container']
        )}
        onClick={toggleModal}
      >
        {image ? (
          <CustomImage
            alt={image.alt}
            src={image.src}
            className={classnames(
              styles['placeholder_image'],
              styles['fade-in'],
              !fullWidth && styles['partial_placeholder']
            )}
            width={1395}
            height={784.5}
          />
        ) : (
          <div
            className={classnames(
              styles['placeholder_image'],
              !fullWidth && styles['partial_placeholder']
            )}
          >
            <ReactPlayerVimeo
              className={'aaa'}
              url={`https://vimeo.com/${videoCode}`}
              controls={false}
              width={'100%'}
              height={'100%'}
              playing={false}
              light={true}
              playIcon={<></>} />
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} toggle={toggleModal} className={'video'}>
        <ReactPlayerVimeo
          url={`https://vimeo.com/${videoCode}`}
          controls={true}
          width={'100%'}
          height={'100%'}
          playing={true} />
      </Modal>
    </>);
}, (prevProps, nextProps) => {
  const isSame = isEqual(prevProps, nextProps);
  return isSame;
});

export default Video;