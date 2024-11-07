import { PubSub, Topic } from '@google-cloud/pubsub';

type RequestDataType =
  // Not using exported types from backend-handlers because of circular dependecy
  (
    | {
        marketInbox: string;
        hostName?: string;
        emailBody: string;
      }
    | {
        type: string;
        data: {
          email: string;
          mailingList?: Array<number>;
          redirectUrl?: string;
          attributes: any;
          locale?: string;
        };
      }
  ) & {
    Email?: string;
    MailingListIds?: string;
  };

export class PubSubService {
  private static instance: PubSubService;
  private topic: Topic | null;

  private constructor() {
    const pubsub = new PubSub({
      projectId: process.env.GCP_PUBSUB_PROJECTID,
    });
    this.topic = process.env.GCP_PUBSUB_TOPIC
      ? pubsub.topic(process.env.GCP_PUBSUB_TOPIC)
      : null;
  }

  // Needed method for tests
  public static resetInstance(): void {
    (PubSubService.instance as any) = null;
  }

  public static getInstance(): PubSubService {
    if (!PubSubService.instance) {
      PubSubService.instance = new PubSubService();
    }

    return PubSubService.instance;
  }
  async enqueueToPubSub(requestData: RequestDataType) {
    if (this.topic) {
      try {
        const { Email, MailingListIds } = requestData;
        return await this.topic.publishMessage({
          attributes: {
            ...(Email && { email: Email }),
            ...(MailingListIds && { mailingListIds: MailingListIds }),
          },
          data: Buffer.from(JSON.stringify(requestData)),
        });
      } catch (err) {
        const isError = err instanceof Error && 'message' in err;
        console.error(
          `Error enqueuing message to PubSub: ${
            isError ? (err as Error).message : err
          }`,
        );
        throw err;
      }
    } else {
      console.error(`Error: Topic not found`);
    }
  }
}
