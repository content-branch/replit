import {
  Accordion as AccordionWrapper,
  AccordionItem as Item,
} from '@szhsin/react-accordion';
import { Document } from '@contentful/rich-text-types';

import { ReactComponent as IconChevronDown } from '../assets/svg/icon-chevron-down-btn.svg';
import { THEMES } from '../constants';

import '../styles/accordionStyles.scss';
import styles from './Accordion.module.scss';
import RichTextRenderer from '../RichTextRenderer/RichTextRenderer';

import classnames from 'classnames';

interface AccordionHeaderProps {
  header: string;
  index: number;
  withNumber: boolean;
  indexOfOpened?: number;
  children: React.ReactNode;
}

/* eslint-disable-next-line */
export interface AccordionProps {
  theme?: THEMES;
  withNumber: boolean;
  title?: string;
  accordionItems: {
    header: string;
    content: Document;
  }[];
  indexOfOpened?: number;
}

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
export const AccordionItem = (props: AccordionHeaderProps) => {
  const { header, index, withNumber, indexOfOpened, ...rest } = props;

  return (
    <Item
      {...rest}
      header={
        <>
          <div className="text_container">
            {withNumber && <span className="number">{index + 1}</span>}
            <span className="text">{header}</span>
          </div>
          <IconChevronDown className="chevron-down" />
        </>
      }
      initialEntered={
        indexOfOpened && indexOfOpened === index + 1 ? true : false
      }
    />
  );
};

export function Accordion(props: AccordionProps) {
  const { theme, withNumber, title, accordionItems, indexOfOpened } = props;
  return (
    <div className={classnames(styles['container'], 'accordion_container')}>
      {title && <h3 className={styles['title']}>{title}</h3>}
      <AccordionWrapper
        className={`wrapper--${theme || 'grey'}`}
        transition
        transitionTimeout={250}
      >
        {accordionItems?.map((accordionItem, i) => (
          <AccordionItem
            header={accordionItem.header}
            key={i}
            index={i}
            withNumber={withNumber}
            indexOfOpened={indexOfOpened}
          >
            <RichTextRenderer document={accordionItem.content} />
          </AccordionItem>
        ))}
      </AccordionWrapper>
    </div>
  );
}

export default Accordion;
