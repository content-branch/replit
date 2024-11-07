import styles from './Quote.module.scss';

/* eslint-disable-next-line */
export interface QuoteProps {
  quote: string,
  author: string,
  jobTitle: string,
}

export function Quote(props: QuoteProps) {
  const { quote, author, jobTitle } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['inner_container']}>
        <span className={styles['quote_text']}>{quote}</span>
        <div className={styles['info']}>
          <span className={styles['info__text']}>{author}</span>
          <span className={styles['info__text']}>{jobTitle}</span>
        </div>
      </div>
    </div>
  );
}

export default Quote;
