/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useContext } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Document } from '@contentful/rich-text-types';
import { EnvironmentContext } from '../contexts/EnvironmentContext';
import { CheckBoxIcon } from '../Icons/CheckBoxIcon';

import textStyles from '../styles/text-styles.module.scss';
import styles from './RichTextRenderer.module.scss';

import classnames from 'classnames';

/* eslint-disable-next-line */
export interface RichTextRendererProps {
  document: Document;
  style?: string;
}

interface IChildren {
  children: ReactNode;
}

const renderDocument = (document: Document) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { Link } = useContext(EnvironmentContext);

  const Heading1 = ({ children }: IChildren) => (
    <h1 className={textStyles['heading-1']}>{children}</h1>
  );
  const Heading2 = ({ children }: IChildren) => (
    <h2 className={textStyles['heading-2']}>{children}</h2>
  );
  const Heading3 = ({ children }: IChildren) => (
    <h3 className={textStyles['heading-3']}>{children}</h3>
  );
  const Heading4 = ({ children }: IChildren) => (
    <h4 className={textStyles['heading-4']}>{children}</h4>
  );
  const Heading5 = ({ children }: IChildren) => (
    <h5 className={textStyles['heading-5']}>{children}</h5>
  );
  const Heading6 = ({ children }: IChildren) => (
    <h6 className={textStyles['heading-6']}>{children}</h6>
  );
  const Bold = ({ children }: IChildren) => (
    <span className={styles['bold']}>{children}</span>
  );

  const Text = ({ children }: IChildren) => (
    <p className={styles['text']}>{children}</p>
  );

  const List = ({ children }: IChildren) => (
    <ul className={styles['list']}>{children}</ul>
  );

  const TickList = ({ tickList }: { tickList: string[] }) => (
    <ul className={`${styles['list']} ${styles['list--tick']}`}>
      {tickList?.map((listValue, index) => (
        <li key={index}>
          <span className={styles['tick--icon']}>
            <CheckBoxIcon />
          </span>
          {listValue}
        </li>
      ))}
    </ul>
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (_node: any, children: any) => (
        <Heading1>{children}</Heading1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: any) => (
        <Heading2>{children}</Heading2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: any) => (
        <Heading3>{children}</Heading3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: any) => (
        <Heading4>{children}</Heading4>
      ),
      [BLOCKS.HEADING_5]: (_node: any, children: any) => (
        <Heading5>{children}</Heading5>
      ),
      [BLOCKS.HEADING_6]: (_node: any, children: any) => (
        <Heading6>{children}</Heading6>
      ),
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => {
        return children[0] && (
        <Text>
          {children}
          <br />
        </Text>)
    },
      [BLOCKS.UL_LIST]: (_node: any, children: any) => <List>{children}</List>,
      [BLOCKS.EMBEDDED_ENTRY]: (node: {
        data: { target: { fields: { entryName: string; listItem: string[] } } };
      }) => {
        const { listItem } = node.data.target.fields;
        return <TickList tickList={listItem} />;
      },
      [INLINES.HYPERLINK]: ({ data }: any, children: any) => (
        <Link prefetch={false}
          href={data.uri}
          isExternal={!data.uri.startsWith('/')}
          rel="noopener noreferrer"
          className={styles['link']}
        >
          {children}
        </Link>
      ),
    },
  };
  return documentToReactComponents(document, options as any);
};

export function RichTextRenderer(props: RichTextRendererProps) {
  const { document, style } = props;
  return (
    <div className={classnames(styles['container'], style && style)}>
      {renderDocument(document)}
    </div>
  );
}

export default RichTextRenderer;
