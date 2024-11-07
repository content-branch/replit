import { IPageFields } from '../../@types/generated/contentful';

export type LocalizedData<T> = {
  [K in keyof T]: { [k: string]: T[K] };
};
export type LocalizedPageFields = LocalizedData<IPageFields>;

export interface Filter {
  field: string;
  value?: string | number | boolean | null;
  exists?: boolean; // Optional exists parameter to include only when existing values
  isUnion?: boolean; 
}


export interface GetFilteredListInput {
  contentType: string;
  locale: string;
  skip: number | undefined;
  limit: number | undefined;
  orderField: string | undefined;
  sortDirection: string | undefined;
  include: number;
  filters?: Filter[]; // Optional array of filters
  preview: boolean;
}

export interface GetPaginatedFilteredListInput extends GetFilteredListInput{
  order: Array<string> | undefined;

}