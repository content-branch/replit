import {
  globalSettingsBySlug
} from '@westfield-rise/westfield-rise-contentful-client';
import { fallbackLocale } from '@westfield-rise/westfield-rise-contentful-client';


export async function getMarketInbox(countries: string[]): Promise<string> {
  const mailingListGlobalSettings = await globalSettingsBySlug('mailing-list-global-config');

  const parsedMailingListGlobalSettings = JSON.parse(mailingListGlobalSettings as string);
  const mailingList = getMailingList(countries);

  if (mailingList.length === 0 || mailingList.length > 2) {
    return parsedMailingListGlobalSettings.find((obj: any) => obj.country === "General").email;
  }
  else {
    return parsedMailingListGlobalSettings.find((countryObj: any) => {
      if (mailingList.includes(countryObj.external) || mailingList.includes(countryObj.internal)) {
        return true;
      }
      return false;
    })?.email;
  }
}

export function getMailingList(countries: string[]) {
  const mailingList: number[] = [];
  if (countries) {
    for (const countryFormValue of countries) {
      // the form value has this template 'UK:1,2' where 1,2 are the mailing list ids
      const [_countryCode, allMailingLists] = countryFormValue.split(':');
      const mailingListStrings = allMailingLists.split(',');
      for (const mailingListString of mailingListStrings) {
        const mailingListId = parseInt(mailingListString);
        mailingList.push(mailingListId);
      }
    }
  }
  return mailingList;
}

export function createHtmlEmailBody(input: any): string {

  let emailBody = '<h1 style="font-weight: bold;">Form Submission Details:</h1><br>';

  emailBody += '<table style="width: 100%; border-collapse: collapse;">';

  // Function to generate table rows
  const addRow = (title: string, value: string, isHighlighted: boolean) => {
    const backgroundColor = isHighlighted ? '#f2f2f2' : '#ffffff';
    return `
      <tr style="background-color: ${backgroundColor};">
        <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">${title}</td>
        <td style="border: 1px solid #000; padding: 8px;">${value}</td>
      </tr>`;
  };

  // Basic Fields
  emailBody += addRow('First Name', input.firstName, true);
  emailBody += addRow('Last Name', input.lastName, false);
  emailBody += addRow('Job Title', input.jobTitle, true);
  emailBody += addRow('Company Name', input.companyName, false);
  emailBody += addRow('Email', input.email, true);
  emailBody += addRow('Phone', input.phone, false);

  // Services
  const services = input.services.filter((service:any) => Object.values(service)[0] === true)
  .map((service:any) => Object.keys(service)[0]);
  emailBody += addRow('Services', services, true);

  // Marketing Opt-In
  emailBody += addRow('Marketing Opt-In', input.marketingOptIn, false);

  // Countries
  const countries = input.countries.join(", ");
  emailBody += addRow('Countries', countries, true);

  // Description
  emailBody += addRow('Description', input.description, false);

  emailBody += '</table>';

  return emailBody;
}

function addLocaleToURL(url: string, locale: string): string {
  const parsedURL = new URL(url);
  parsedURL.pathname = `${locale}${parsedURL.pathname}`;
  return parsedURL.toString();
}

export async function getRedirectUrl(locale: string): Promise<string> {
  
  const redirectUrl = await globalSettingsBySlug('contact-us-redirect-url');

  if (locale !== fallbackLocale) {
    return addLocaleToURL(redirectUrl, locale);
  }
  
  return redirectUrl;
}