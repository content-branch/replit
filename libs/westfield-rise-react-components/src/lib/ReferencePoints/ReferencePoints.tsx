import styles from './ReferencePoints.module.scss';

interface ReferencePointsProps {
  referenceList: string[];
  onClick: (reference: string) => void;
  id: string;
}

export function ReferencePoints(props: ReferencePointsProps) {
  const { referenceList, onClick, id } = props;

  return (
    <div className={styles['container']} id={id}>
      <ul className={styles['list-container']}>
        {referenceList.map((reference, index) => (
          <li
            key={index}
            className={styles['link']}
            onClick={() => onClick(reference)}
          >
            {reference}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReferencePoints;
