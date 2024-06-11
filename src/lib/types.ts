/* 
  global types
*/

export type LabeledValue = {
  label: string;
  value: any;
};

export enum QueryType {
  Post = 'POST',
  Get = 'GET'
}

export enum SortDirection {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none'
}

export type DomainAssociation = {
  label: string;
  value: string;
  glyph: string;
};
