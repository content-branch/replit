import { PubSubService } from '@westfield-rise/pubsub-service';
import { EmailService } from '@westfield-rise/email-service';

const emailService = EmailService.getInstance();
const pubsubService = PubSubService.getInstance();

export type SendEmailHandlerProps = {
  marketInbox: string;
  hostName?: string;
  emailBody: string;
};

export const sendEmailHandler = async (command: SendEmailHandlerProps) => {
  try {
    await emailService.sendEmail({
      to: command.marketInbox,
      hostName: command.hostName ?? '',
      emailBody: command.emailBody,
    });
  } catch (ex) {
    console.error(`Email service: sendEmail call attempt failed: ${ex}`);
    // All retries failed, enqueue data to AWS SQS for further processing
    return await pubsubService.enqueueToPubSub(command);
  }
};
