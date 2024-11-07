import { PubSubService } from './pubsub-service';
import { PubSub, Topic } from '@google-cloud/pubsub';
import { mockDeep } from 'jest-mock-extended';

jest.mock('@google-cloud/pubsub');

describe('PubSubService', () => {
  const mockTopic = mockDeep<Topic>();
  const mockPubSub = mockDeep<PubSub>();

  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv };
    process.env.GCP_PUBSUB_PROJECTID = 'test-project';
    process.env.GCP_PUBSUB_TOPIC = 'test-topic';

    mockTopic.publishMessage.mockImplementation(() =>
      Promise.resolve('message-id'),
    );

    mockPubSub.topic.mockReturnValue(mockTopic);

    (PubSub as jest.MockedClass<typeof PubSub>).mockImplementation(
      () => mockPubSub,
    );

    // Reset the PubSubService instance
  });

  afterEach(() => {
    process.env = originalEnv;
    PubSubService.resetInstance();
    jest.resetAllMocks();
  });

  it('should create a singleton instance', () => {
    const instance1 = PubSubService.getInstance();
    const instance2 = PubSubService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should initialize with correct project ID and topic', () => {
    PubSubService.getInstance();
    expect(PubSub).toHaveBeenCalledWith({ projectId: 'test-project' });
    expect(mockPubSub.topic).toHaveBeenCalledWith('test-topic');
  });

  describe('enqueueToPubSub', () => {
    it('should publish message successfully', async () => {
      const service = PubSubService.getInstance();
      const requestData = {
        Email: 'test@example.com',
        MailingListIds: '1,2,3',
      };

      const result = await service.enqueueToPubSub(requestData);

      expect(result).toBe('message-id');
      expect(mockTopic.publishMessage).toHaveBeenCalledWith({
        attributes: {
          email: 'test@example.com',
          mailingListIds: '1,2,3',
        },
        data: Buffer.from(JSON.stringify(requestData)),
      });
    });

    it('should throw error if publishing fails', async () => {
      const service = PubSubService.getInstance();
      const requestData = {
        Email: 'test@example.com',
        MailingListIds: 'mailingList ids',
      };
      const error = new Error('Publish failed');
      mockTopic.publishMessage.mockImplementation(() => Promise.reject(error));
      await expect(service.enqueueToPubSub(requestData)).rejects.toThrow(
        'Publish failed',
      );
    });

    it('should log error if topic is not found', async () => {
      process.env.GCP_PUBSUB_TOPIC = '';
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const service = PubSubService.getInstance();
      const requestData = {
        Email: 'test@example.com',
        MailingListIds: 'mailingList ids',
      };

      await service.enqueueToPubSub(requestData);

      expect(consoleSpy).toHaveBeenCalledWith('Error: Topic not found');
      consoleSpy.mockRestore();
    });
  });
});
