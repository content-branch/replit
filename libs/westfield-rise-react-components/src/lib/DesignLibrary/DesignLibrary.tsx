import textStyles from '../styles/text-styles.module.scss';
import styles from './DesignLibrary.module.scss';

/* eslint-disable-next-line */
export interface DesignLibraryProps {
  headingText: string;
  headingClass: string;
  paragraphText: string;
  paragraphClass: string;
}

export function DesignLibrary(props: DesignLibraryProps) {
  const { headingText, headingClass, paragraphText, paragraphClass } = props;
  return (
    <div className={styles['container']}>
      <h1 className={textStyles['heading-1']}>Typography</h1>
      <div className={styles['inner_container']}>
        <h2 className={textStyles['heading-4']}>Headings</h2>
        <span className={textStyles[`${headingClass}`]}>{headingText}</span>
      </div>
      <div className={styles['inner_container']}>
        <h2 className={textStyles['heading-4']}>Paragraphs</h2>
        <span className={textStyles[`${paragraphClass}`]}>{paragraphText}</span>
      </div>
    </div>
  );
}

export default DesignLibrary;
