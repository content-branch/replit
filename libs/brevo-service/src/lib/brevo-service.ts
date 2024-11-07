import {
  ApiClient,
  ContactsApi,
  CreateContact,
  CreateDoiContact,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '@getbrevo/brevo';
import type { BrevoServiceResponseError } from '../types';
import { getAttributes, getPrefixFromLocale } from './brevo-mapping-helpers';

const getTemplateId = async (locale: string): Promise<number> => {

  const localePrefix = getPrefixFromLocale([locale]);

  let brevoTemplateIdNumber = -1; // magic number, but it's ok since it's a fallback
  try {
    brevoTemplateIdNumber = parseInt(process.env[`${localePrefix}_BREVO_TEMPLATE_ID`] as string, 10);
  } catch (err) {
    // we do nothing
  }

  if (brevoTemplateIdNumber !== -1 && !isNaN(brevoTemplateIdNumber)) {
    return brevoTemplateIdNumber;
  }

  if (isNaN(brevoTemplateIdNumber)) {
    console.error('Template ID Conversion failed!');
    return 0;
  }

  return brevoTemplateIdNumber;
};

const getApiKey = async () => {
  return process.env.BREVO_API_KEY || '';
};

export class BrevoService {
  private apiKey: Promise<string>;
  private contactApi: any;

  constructor() {
    this.apiKey = getApiKey();
    this.contactApi = this.initBrevoContactsApiClient();
  }

  async initBrevoContactsApiClient() {
    const defaultClient = ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = await this.apiKey;

    // Assuming axios instance is created for Contacts API
    return new ContactsApi();
  }

  async createContactViaDoubleOptIn({
    email,
    redirectUrl = 'https://westfieldrise.com',
    mailingList,
    attributes = {},
    locale
  }: {
    email: string;
    mailingList?: Array<number>;
    redirectUrl?: string;
    attributes: unknown;
    locale: string;
  }) {

    let parsedMailingList = mailingList;
    if (
      !mailingList ||
      (Array.isArray(mailingList) && mailingList.length === 0)
    ) {
      parsedMailingList = [2];
    }
    const createDoubleOptInContact = new CreateDoiContact();
    createDoubleOptInContact.attributes = getAttributes(attributes);
    createDoubleOptInContact.email = email;
    createDoubleOptInContact.includeListIds = parsedMailingList;
    createDoubleOptInContact.templateId = await getTemplateId(locale);
    createDoubleOptInContact.redirectionUrl = redirectUrl;

    try {
      const instance = await this.contactApi;
      
      await instance.createDoiContact(createDoubleOptInContact);

      return { status: 201, message: 'Contact created successfully' };
    } catch (err) {
      const error = err as BrevoServiceResponseError;
      console.error(`Error calling the Brevo ContactApi: ${error.message}`);
      throw err;
    }
  }

  async createContactViaApi({
    email,
    mailingList,
    attributes,
  }: {
    email: string;
    mailingList?: Array<number>;
    attributes: any;
  }) {
    const createContact = new CreateContact();
    createContact.email = email;
    let parsedMailingList = mailingList;
    if (
      !mailingList ||
      (Array.isArray(mailingList) && mailingList.length === 0)
    ) {
      parsedMailingList = [2];
    }

    createContact.includeListIds = parsedMailingList;
    createContact.attributes = attributes;

    try {
      const instance = await this.contactApi;
      const response = await instance.createContact(createContact);
      return response;
    } catch (err) {
      const error = err as BrevoServiceResponseError;
      console.error(
        `Error calling the Brevo ContactApi: ${error?.message} ${error?.response?._body?.message} ${error?.response?._body?.code}`,
      );
      throw err;
    }
  }
}
