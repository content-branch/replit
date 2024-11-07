import {
  BrevoService,
  BrevoServiceResponseError,
} from '@westfield-rise/brevo-service';
import { PubSubService } from '@westfield-rise/pubsub-service';
import { delay, getBackoffTime } from '../lib/utils';

const maxRetries = 3;
// Create an instance of the BrevoClientService
const brevoClientService = new BrevoService();
const pubsubService = PubSubService.getInstance();

export type CreateDoubleOptInContactHandlerProps = {
  type: string;
  data: {
    email: string;
    mailingList?: Array<number>;
    redirectUrl?: string;
    attributes: any;
    locale: string;
  };
};

export const createDoubleOptInContactHandler = async (
  command: CreateDoubleOptInContactHandlerProps,
) => {
  const {
    data: { email, mailingList, redirectUrl, attributes, locale },
  } = command;
  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      const result = await brevoClientService.createContactViaDoubleOptIn({
        email,
        mailingList,
        redirectUrl,
        attributes,
        locale,
      });

      return result;
    } catch (ex) {
      const err = ex as BrevoServiceResponseError;
      if (err.response?._body?.code === 'duplicate_parameter') throw ex;

      if (err.response?._body?.code === 'invalid_parameter') throw ex;

      console.error(
        `API call attempt ${retry + 1} failed: ${err.message} ${JSON.stringify(
          err.response,
          null,
          2,
        )}`,
      );

      await delay(getBackoffTime(retry));
    }
  }

  // All retries failed, enqueue data to AWS SQS for further processing
  const queueResponse = await pubsubService.enqueueToPubSub(command);
  return queueResponse;
};
