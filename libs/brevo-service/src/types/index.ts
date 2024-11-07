export type BrevoServiceResponseError = Error & {
  response: { _body: { message: string; code: string } };
};

export type BrevoAttributes = {
  PRENOM?: string;
  NOM?: string;
  COMPANY_Name?: string;
  JOB_TITLE?: string;
  DESCRIPTION?: string;
  SERVICES?: any; // TODO:Replace 'any' with the actual type
  SMS?: string;
};