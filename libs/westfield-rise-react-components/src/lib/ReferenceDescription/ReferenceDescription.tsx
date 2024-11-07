import styles from './ReferenceDescription.module.scss';

/* eslint-disable-next-line */
export interface ReferenceDescriptionProps {
  descriptionList: { referenceNumber: number, text: string }[];
}

export function ReferenceDescription(props: ReferenceDescriptionProps) {
  const { descriptionList } = props;
  return (
    <div className={styles['container']}>
      {descriptionList.sort((a, b) => a.referenceNumber - b.referenceNumber).map((description, index) => (
        <div key={index} className={styles['description']}>
          <sup>{description.referenceNumber}</sup>
          {description.text}
        </div>
      ))}
    </div>
  );
}

export default ReferenceDescription;
