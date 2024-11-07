import KeyFacts, { KeyFactsProps } from '../KeyFacts/KeyFacts';
import { THEMES } from '../constants';
import backgroundStyles from '../styles/background-colours.module.scss';
import styles from './PageKeyInformation.module.scss';
import Button from '../Button/Button';

import classnames from 'classnames';

/* eslint-disable-next-line */
export interface PageKeyInformationProps {
  theme?: THEMES;
  brandName?: string;
  title: string;
  text: string;
  infoList?: KeyFactsProps['keyFactList'];
  rowVariation?: boolean;
  ctaProps?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  prefix?: string;
}

export function PageKeyInformation(props: PageKeyInformationProps) {
  const { theme, brandName, title, text, infoList, rowVariation, ctaProps } =
    props;
  return (
    <div
      className={classnames(
        styles['container'],
        backgroundStyles[`bckg-solid--${theme}`],
      )}
    >
      <div
        className={classnames(
          styles['container_inner'],
          styles[`container_inner--${rowVariation ? 'row' : 'column'}`],
        )}
      >
        <div>
          {brandName && (
            <div className={styles['brand_wrapper']}>
              <span className={styles['brand']}>{brandName}</span>
            </div>
          )}
          <div className={styles['title']}>{title}</div>
        </div>
        <div className={styles['text']}>{text}</div>
        {ctaProps && (
          <div className={styles.link}>
            <Button
              label={ctaProps.label}
              href={ctaProps.href}
              {...{
                variant: 'default',
                style: 'secondary',
                isExternal: ctaProps.isExternal,
                prefix: props.prefix
              }}
            />
          </div>
        )}
        {infoList && <KeyFacts keyFactList={infoList} className='page_key_info' />}
      </div>
    </div>
  );
}

export default PageKeyInformation;
