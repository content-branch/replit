import { Entry } from 'contentful';

export const contentTypeFromEntry = (entry: Entry<any>) =>
  entry?.sys?.contentType?.sys?.id ?? '';
