export interface LabeledValue {
  label: string;
  value: any;
}

export interface ContentApiInput {
  region: LabeledValue;
  language: LabeledValue;
  browser: LabeledValue;
  operator: LabeledValue;
  content: string;
  [index: string]: string | LabeledValue;
}

export interface ContentResult {
  domain: string;
  domain_count: number;
  engines: string[];
  link_count: number;
  score: number;
  snippet: string;
  source: string[];
  title: string;
  url: string;
}

export interface ContentResponse {
  countries: {
    [key: string]: string;
  };
  csv_data: string;
  indicator_metadata: {
    [key: string]: {
      description: string;
      interpretation: string;
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  results: ContentResult[];
}

export interface TableRowData {
  data:[string, (string | number)][];
  dataComplementary: [string, (string | number)][];
  domainAssociations?: string[];
}

export interface TableHeaderItemData {
  label: string,
  key: string,
  tooltip?: string
}

export interface NavItemData {
  label: string,
  path: string
}

export enum SortDirection {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none'
}

export class ContentData {
  private content: ContentResponse;

  constructor(content: ContentResponse) {
    this.content = content;
  }



  getResults() {
    return this.content.results;
  }

  isEmpty() {
    const { countries, csv_data, indicator_metadata, languages, results } = this.content;
    return (
      Object.keys(countries).length === 0 &&
      csv_data === '' &&
      Object.keys(indicator_metadata).length === 0 &&
      Object.keys(languages).length === 0 &&
      Object.keys(results).length === 0
    );
  }
}

