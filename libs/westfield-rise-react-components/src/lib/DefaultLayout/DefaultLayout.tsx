import React from 'react';

import AppFooter from '../AppFooter/AppFooter';

import MotionTheoryHeader from '../MotionTheoryHeader/MotionTheoryHeader';

import { FOOTER_VALUES, THEMES } from '../constants';

import classnames from 'classnames';

import styles from './DefaultLayout.module.scss';
import AppHeader from '../AppHeader/AppHeader';

/* eslint-disable-next-line */
export interface DefaultLayoutProps {
  header?: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode[] | React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  theme?: THEMES;
  hasGradient?: boolean;
  headerProps: any;
  whiteNav?: boolean;
  definedLocales: any;
  locale: string;
  prefix: string;
}

export function DefaultLayout(props: DefaultLayoutProps) {
  const { headerProps, footer, locale, prefix, definedLocales } = props;

  const footerProps = React.isValidElement(footer)
    ? footer.props
    : FOOTER_VALUES;

  return (
    <>
      <main
        className={classnames(
          styles['main'],
          props.hasGradient && !props.whiteNav ? 'has-gradient' : '',
        )}
      >
        {props.hasGradient && (
          <MotionTheoryHeader {...props} />
        )}
        <AppHeader headerProps={...headerProps} locale={locale} prefix={prefix} definedLocales={definedLocales} />
        {props.children}
      </main>
      <AppFooter {...footerProps} prefix={prefix} />
    </>
  );
}

export default DefaultLayout;
