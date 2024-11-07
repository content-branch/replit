import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';
const mailgun = new Mailgun(FormData);
interface SendEmailParams {
  to: string;
  hostName: string;
  emailBody: string;
}

export class EmailService {
  private static instance: EmailService;

  private processEnv = process.env as Record<string, string>;

  private mg?: IMailgunClient;

  constructor() {
    this.mg = mailgun.client({
      username: 'api',
      key: this.processEnv['MAILGUN_API_KEY'],
      url: 'https://api.eu.mailgun.net', // This is needed for eu environments, sandboxes may not need it
    });
  }

  public static getInstance(): EmailService {
    if (process.env['NEXT_PHASE'] !== 'phase-production-build') {
      if (!EmailService.instance) {
        EmailService.instance = new EmailService();
      }
    }
    return EmailService.instance;
  }

  async sendEmail(data: SendEmailParams): Promise<void> {
    try {
      if (this.mg) {
        await this.mg.messages.create(this.processEnv['MAILGUN_DOMAIN'], {
          from: this.processEnv['MAILGUN_CONTACT_EMAIL'],
          to: [data.to], // The "to" addresses must be verified in Mailgun
          subject:
            this.processEnv['MAILGUN_SUBJECT_PREFIX'] + ' ' + data.hostName,
          html: data.emailBody,
        });
      }
    } catch (error) {
      throw new Error(`Failed to send email: ${(error as any).message}`);
    }
  }
}
