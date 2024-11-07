/* eslint-disable react-hooks/rules-of-hooks */
import { Document } from '@contentful/rich-text-types';

import styles from './BodyCopy.module.scss';
import RichTextRenderer from '../RichTextRenderer/RichTextRenderer';

import classnames from 'classnames';

/* eslint-disable-next-line */
export interface BodyCopyProps {
  title?: string;
  bodyCopyText?: Document;
  forStorybook?: boolean;
}

export function BodyCopy(props: BodyCopyProps) {
  const { title, bodyCopyText, forStorybook } = props;

  const bodyCopyId = title ? title.toLowerCase().replace(/\s+/g, '-') : '';

  return (
    <div
      className={classnames(styles['container'], title && styles['legal-notice'])}
      id={bodyCopyId}
    >
      {title && <span className={styles['title']}>{title}</span>}
      {forStorybook && (
        <RichTextRenderer
          document={bodyCopyText ?? { nodeType: 'document', content: [] } as any} // ignored TS error as it's for Storybook only
          style={title && styles['legal-notice-text']}
        />
      )}
      {!forStorybook && bodyCopyText && (
        <RichTextRenderer
          document={bodyCopyText}
          style={title && styles['legal-notice-text']}
        />
      )}
    </div>
  );
}

export default BodyCopy;
