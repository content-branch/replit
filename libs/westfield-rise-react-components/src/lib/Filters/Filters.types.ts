export type FilterOption = {
  id: string;
  label: string;
  value: string;
};

export type SortingOption = FilterOption & {
  order?: 'asc' | 'desc';
};

export type FilterSorting = {
  title: string;
  fields: SortingOption[];
}

export type FilterGroup = {
  title: string;
  options: FilterOption[];
};
