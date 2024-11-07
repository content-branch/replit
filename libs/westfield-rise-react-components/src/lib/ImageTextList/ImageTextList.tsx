import ImageText, {
  ImageTextProps,
  ImageTextConditionalProps,
} from '../ImageText/ImageText';
import styles from './ImageTextList.module.scss';

type ImageTextListType = ImageTextProps & ImageTextConditionalProps;

/* eslint-disable-next-line */
export interface ImageTextListProps {
  title?: string;
  imageTextList: ImageTextListType[];
  prefix?: string;
}

export function ImageTextList(props: ImageTextListProps) {
  const { title, imageTextList, prefix } = props;
  return (
    <div className={styles['container']}>
      {title && <h3 className={styles['title']}>{title}</h3>}
      <div className={styles['container--inner']}>
        {imageTextList &&
          imageTextList.map(
            (ImageTextItem: ImageTextListType, index: number) => (
              <ImageText key={index} prefix={prefix} {...ImageTextItem} />
            ),
          )}
      </div>
    </div>
  );
}

export default ImageTextList;
