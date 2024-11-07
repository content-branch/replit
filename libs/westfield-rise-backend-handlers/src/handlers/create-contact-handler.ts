import { BrevoService } from '@westfield-rise/brevo-service';
import type { BrevoServiceResponseError } from '@westfield-rise/brevo-service';
import { PubSubService } from '@westfield-rise/pubsub-service';
import { delay, getBackoffTime } from '../lib/utils';

const maxRetries = 3;

// Create an instance of the BrevoClientService
const brevoClientService = new BrevoService();
const pubsubService = PubSubService.getInstance();

export type CreateContactHandlerProps = {
  type: string;
  data: {
    email: string;
    mailingList?: Array<number>;
    redirectUrl?: string;
    attributes: any;
  };
};
export const createContactHandler = async (
  command: CreateContactHandlerProps,
) => {
  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      const result = await brevoClientService.createContactViaApi({
        email: command.data.email,
        mailingList: command.data.mailingList,
        attributes: command.data.attributes,
      });

      return result;
    } catch (ex) {
      const err = ex as BrevoServiceResponseError;
      console.error(`API call attempt ${retry + 1} failed: ${err.message}`);

      if (err.response?._body?.code === 'duplicate_parameter') throw ex;

      await delay(getBackoffTime(retry));
    }
  }

  // All retries failed, enqueue data to AWS SQS for further processing
  const queueResponse = await pubsubService.enqueueToPubSub(command);
  return queueResponse;
};
