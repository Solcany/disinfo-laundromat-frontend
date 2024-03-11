export interface LabeledValue {
  label: string;
  value: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
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

export interface ResponseData {
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
  data: [string, string | number][];
  dataComplementary: [string, string | number][];
  domainAssociations?: string[];
}

export interface TableHeaderItemData {
  label: string;
  key: string;
  tooltip?: string;
}

export interface NavItemData {
  label: string;
  path: string;
}

export enum SortDirection {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none'
}

export class Content {
  private content: ResponseData;

  constructor(content: ResponseData) {
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

export enum InputType {
  Dropdown,
  Text
}

export enum RemoteConfigDataFlag {
  // api config data that needs to be fetched from the api
  Countries = "countries",
  Languages = "languages",
  Indicators = "indicators",
}

interface InputTextConfig {
  type: InputType.Text;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  value?: string;
}

interface InputDropdownConfig {
  type: InputType.Dropdown;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  data: RemoteConfigDataFlag | LabeledValue[];
  value?: LabeledValue;
}

export type InputTypeWithData = InputDropdownConfig; 

export type InputConfig = InputTextConfig | InputDropdownConfig;
