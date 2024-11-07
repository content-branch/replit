import { MessageCard } from 'libs/westfield-rise-react-components/src/lib/MessageCard';
import { api } from '../utils/api';

type ThankYouMessageProps = {
  locale: string;
};

export function ThankYouMeassge(props: ThankYouMessageProps) {
  const { locale } = props;

  const { data: result } = api.pages.globalSettings.useQuery({
    key: 'thank-you-subscribe',
    locale,
  });

  let thankYouMessage;
  if (result) {
    thankYouMessage = JSON.parse(result);
  }

  return (
    <>
      {thankYouMessage && (
        <MessageCard
          title={thankYouMessage?.title}
          message={thankYouMessage?.message}
        />
      )}
    </>
  );
}

export default ThankYouMeassge;
