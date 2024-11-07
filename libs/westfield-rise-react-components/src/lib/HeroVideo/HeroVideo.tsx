import { memo, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { isEqual } from 'lodash';

import Modal from '../Modal/Modal';
import useModal from '../hooks/useModal';
import classnames from 'classnames';
import styles from './HeroVideo.module.scss';
import Player from '@vimeo/player';


const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
});


interface HeroVideoProps {
  theme?: string;
  shortVideoUrl: string;
  vimeoId: string;
  thumbnailUrl?: string | undefined;
}

export const HeroVideo = memo((props: HeroVideoProps) => {
  const { theme, shortVideoUrl, vimeoId, thumbnailUrl } = props;
  const { isOpen, toggleModal } = useModal();
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: Player;

    if (isOpen) {
      const container = videoRef.current;
      const width = container?.offsetWidth || 0;
      const height = container?.offsetHeight || 0;

      player = new Player(videoRef.current as any, {
        id: vimeoId as any,
        width: width,
        height: height,
      });
      player.play();
    }
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [isOpen, vimeoId]);

  return (
    <>
      <div className={classnames(styles['container__video'], styles[`container__video--${theme}`])}>
        <ReactPlayer
          light={thumbnailUrl}
          url={shortVideoUrl}
          playing={!thumbnailUrl}
          volume={0}
          muted={true}
          loop={true}
          playsinline={true}
          width={'100%'}
          height={'100%'}
          onClick={toggleModal}
        />
        <div className={styles['video_overlay']} onClick={toggleModal}></div>
      </div>
      <Modal isOpen={isOpen} toggle={toggleModal} className='video'>
        <div ref={videoRef} style={{ width: '100%', height: '100%' }}></div>
      </Modal>
    </>
  );
}, (prevProps, nextProps) => {
  const isSame = isEqual(prevProps, nextProps);
  return isSame;
});
