import { ContactUsForm } from '@westfield-rise/westfield-rise-react-components';
import { ReactComponent as GradientBckg } from '../../../libs/westfield-rise-react-components/src/lib/assets/svg/gradient-page-background.svg';

import styles from './ContactUsFlow.module.scss';
import { api } from '../utils/api';
import { useMemo, useState } from 'react';

type ContactUsFlowProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  locale?: string;
};

export const ContactUsFlow = ({
  title,
  children,
  locale = 'en-US',
}: ContactUsFlowProps) => {
  const { data: formElementsJSON } = api.pages.globalSettings.useQuery({
    key: 'contact-us-form-elements',
    locale,
  });

  const formElements = useMemo(() => {
    let parsed = undefined;
    try {
      parsed = JSON.parse(formElementsJSON as string);
    } catch (err) {
      // do nothing
    }
    return parsed;
  }, [formElementsJSON]);

  const [showChildren, setShowChildren] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);

  const { mutate } = api.backend.contactUs.useMutation({
    onSuccess: data => {
      console.log('ContactUsFlow.tsx: data: ', data);
      setShowChildren(true);
    },
  });

  const headerVariables = {
    '--fill-color-1': '#7a8cf0',
    '--fill-color-3': '#1ce19f',
    '--fill-color-2': '#fcdb57',
  };

  return (
    <>
      <div key={'contact-us-flow'} className={styles.contact_us_wrapper}>
        <GradientBckg
          className={styles['gradient-svg']}
          style={headerVariables as React.CSSProperties}
        />
        <div className={styles.contact_us_inner}>
          {!hideTitle && <h1 className={styles.contact_us_heading}>{title}</h1>}
          <ContactUsForm
            formElements={formElements}
            setHideTitle={setHideTitle}
            locale={locale}
            onSubmit={data => {
              const hostName = typeof window !== 'undefined' ? window.location.hostname : '';
              mutate({ ...data, hostName });
            }}
          />
        </div>
      </div>
      {showChildren && children}
    </>
  );
};

export default ContactUsFlow;
