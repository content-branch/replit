import { FormElementOption } from '../../Form/Form.types';

import contactUsDefaultFormElementsFromJSON from './contactUsDefaultFormElements.json';

export const contactUsDefaultFormElements =
  contactUsDefaultFormElementsFromJSON;

export const defaultOptIntoMarketingOptions: FormElementOption[] = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
];

export const contactUsFormSteps = ['Contact', 'Services', 'Market', 'Detail'];
