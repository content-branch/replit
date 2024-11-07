import { EmailService } from './email-service';
import Mailgun from 'mailgun.js';

jest.mock('mailgun.js');

describe('EmailService', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = {
      ...originalEnv,
      MAILGUN_API_KEY: 'test-api-key',
      MAILGUN_DOMAIN: 'test.domain.com',
      MAILGUN_CONTACT_EMAIL: 'contact',
      MAILGUN_SUBJECT_PREFIX: 'Test:',
    };

    // Simple mock for Mailgun
    (Mailgun as jest.MockedClass<typeof Mailgun>).mockImplementation(
      () =>
        ({
          client: jest.fn().mockReturnValue({
            messages: {
              create: jest.fn().mockResolvedValue({
                id: 'test-id',
                message: 'Queued. Thank you.',
              }),
            },
          }),
        } as unknown as Mailgun),
    );

    // Clear the EmailService instance
    (EmailService as any).instance = null;
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  it('should create a singleton instance', () => {
    const instance1 = EmailService.getInstance();
    const instance2 = EmailService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should initialize with environment variables', () => {
    const instance = EmailService.getInstance();
    expect(instance).toBeDefined();
  });

  it('should have a sendEmail method', () => {
    const instance = EmailService.getInstance();
    expect(instance.sendEmail).toBeDefined();
    expect(typeof instance.sendEmail).toBe('function');
  });
});
