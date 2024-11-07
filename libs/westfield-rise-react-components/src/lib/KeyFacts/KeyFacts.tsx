import RichTextRenderer from '../RichTextRenderer/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';

import classnames from 'classnames';

import styles from './KeyFacts.module.scss';

/* eslint-disable-next-line */
export interface KeyFactsProps extends React.HTMLAttributes<HTMLDivElement> {
  keyFactList: {
    key: string;
    fact: Document
  }[]
}

export function KeyFacts(props: KeyFactsProps) {
  return (
    <div className={classnames(styles['container'], styles[`${props.className}`])}>
      {props.keyFactList.map((keyFactItem, index) => (
        <div key={index} className={styles['row']}>
          <div className={styles['key']}>{keyFactItem.key}</div>
          <RichTextRenderer document={keyFactItem.fact} />
        </div>
      ))}
    </div>
  );
}

export default KeyFacts;
