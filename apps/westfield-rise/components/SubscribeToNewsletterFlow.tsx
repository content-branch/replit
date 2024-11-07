import {
  ECRMForm,
  Modal,
  NewsletterForm,
} from '@westfield-rise/westfield-rise-react-components';
import { useMemo, useState } from 'react';
import { api } from '../utils/api';

export const SubscribeToNewsletterFlow = ({
  locale = 'en-US',
}: {
  locale?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { data: formElementsJSON } = api.pages.globalSettings.useQuery({
    key: 'ecrm-form-elements',
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
  const { data: newsletterFformElementsJSON } =
    api.pages.globalSettings.useQuery({
      key: 'newsletter-form-elements',
      locale,
    });
  const newsletterFformElements = useMemo(() => {
    let parsed = undefined;
    try {
      parsed = JSON.parse(newsletterFformElementsJSON as string);
    } catch (err) {
      // do nothing
    }
    return parsed;
  }, [newsletterFformElementsJSON]);
  const { mutate } = api.backend.createDoubleOptInContact.useMutation({
    onError: err => {
      console.error('SubscribeToNewsletterFlow.tsx: err: ', err);
    },
  });

  return (
    <>
      <NewsletterForm
        formElements={newsletterFformElements}
        key={'subscribe'}
        onSubmit={data => {
          setEmail(data.email);
          setIsOpen(true);
        }}
      />
      <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
        <ECRMForm
          formElements={formElements}
          key={'ecrm'}
          onSubmit={data => {
            mutate({ ...data, email });
          }}
          locale={locale}
        />
      </Modal>
    </>
  );
};

export default SubscribeToNewsletterFlow;
