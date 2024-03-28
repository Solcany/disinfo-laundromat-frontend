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

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export type IndicatorMetadata = {
  [key: string]: {
    description: string;
    interpretation: string;
    name: string;
  };
};

export interface ApiFingerprintData {
  countries: Record<string, string>;
  indicator_metadata: IndicatorMetadata;
  indicator_summary: Record<string, number>;
  indicators: Array<{
    domain_name: string;
    indicator_content: string | string[];
    indicator_type: string;
  }>;
  languages: Record<string, string>;
  matches: Array<{
    domain_name_x: string;
    domain_name_y: string;
    match_type: string;
    match_value: string;
  }>;
  matches_summary: Record<string, number>;
}

export type TableFingerprintData = Pick<
  ApiFingerprintData,
  'indicators' | 'matches' | 'indicator_metadata'
>;

export interface ContentDataResult {
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

export interface ApiContentData {
  countries: Record<string, string>;
  csv_data: string;
  indicator_metadata: {
    [key: string]: {
      description: string;
      interpretation: string;
      name: string;
    };
  };
  languages: Record<string, string>;
  results: ContentDataResult[];
}

export type TableContentData = Pick<ApiContentData, 'results'>;

export interface ApiIndicatorsData {
  data: Array<any>;
  indicator_metadata: {
    [key: string]: {
      description: string;
      interpretation: string;
      name: string;
    };
  };
  unique_types: Array<string>;
}

export interface TableRowData {
  data: [string, string | number][];
  dataComplementary: [string, string | number | Array<number> | Array<string>][];
  domainAssociations?: string[];
}

export type IndicatorData = {
  type: string;
  value: string[];
};

export type TieredIndicator = {
  tier: number;
  data: IndicatorData[];
};

export type IndicatorsSummary = {
  [tier: string]: number;
};

export enum TableHeaderItemType {
  Number = 'number',
  String = 'string',
  IndicatorsSummary = 'IndicatorsSummary',
  Empty = 'empty',
}

export interface TableMetaRowData {
  domain: string;
  indicators: TieredIndicator[];
  indicators_summary?: IndicatorsSummary;
  domainAssociations?: string[];
  [key: string]: string | TieredIndicator[] | IndicatorsSummary | string[] | undefined;
}

export interface TableHeaderItemData {
  label: string;
  key: string;
  type?: TableHeaderItemType;
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

export enum InputType {
  Dropdown,
  Text,
  TextArea,
  Checkbox,
  CheckboxGroup,
  Hidden
}

export enum RemoteConfigFlag {
  // input config data that needs to be fetched from the api
  Countries = 'countries',
  Languages = 'languages',
  Indicators = 'indicators',
  Engines = 'engines'
}
export const RemoteConfigFlagData = {
  [RemoteConfigFlag.Countries]: { key: 'countries', defaultKey: 'country' },
  [RemoteConfigFlag.Languages]: { key: 'languages', defaultKey: 'language' },
  [RemoteConfigFlag.Indicators]: { key: 'Indicators', defaultKey: 'indicator' },
  [RemoteConfigFlag.Engines]: { key: 'engines', defaultKey: 'engine' }
} as const;

export enum QueryType {
  Post = 'POST',
  Get = 'GET'
}
export enum Endpoint {
  AppConfig = '',
  Indicators = 'indicators',
  ParseUrl = 'parse-url',
  Fingerprint = 'fingerprint',
  Content = 'content-search'
}

interface InputTextConfig {
  type: InputType.Text;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  value?: string;
  submitQuery?: {
    type: QueryType;
    endpoint: Endpoint;
  };
  tooltip?: string;
}

interface InputTextAreaConfig {
  type: InputType.TextArea;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  value?: string;
  submitQuery?: {
    type: QueryType;
    endpoint: Endpoint;
  };
  tooltip?: string;
}

interface InputDropdownConfig {
  type: InputType.Dropdown;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  data: undefined | LabeledValue[];
  requiresRemoteData?: RemoteConfigFlag;
  value?: LabeledValue;
  submitQuery?: {
    type: QueryType;
    endpoint: Endpoint;
  };
  tooltip?: string;
}

interface InputCheckboxConfig {
  type: InputType.Checkbox;
  name: string;
  label: string;
  required: boolean;
  checked: boolean;
  value: string;
  submitQuery?: {
    type: QueryType;
    endpoint: Endpoint;
  };
  tooltip?: string;
}

interface InputCheckboxGroupConfig {
  type: InputType.CheckboxGroup;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  data: undefined | LabeledValue[];
  checked?: string[] | LabeledValue[];
  requiresRemoteData?: RemoteConfigFlag;
  variant?: 'horizontal' | 'vertical';
  value?: LabeledValue;
  submitQuery?: {
    type: QueryType;
    endpoint: Endpoint;
  };
  tooltip?: string;
}

interface InputHiddenConfig {
  type: InputType.Hidden;
  name: string;
  requiresRemoteData?: RemoteConfigFlag;
  value?: string | number | boolean;
  submitQuery?: {
    // WIP this should be removed for the hidden config
    // but for some reason TS complains about its absence in the Form comp
    type: QueryType;
    endpoint: Endpoint;
  };
}

export type InputConfig =
  | InputTextConfig
  | InputTextAreaConfig
  | InputDropdownConfig
  | InputCheckboxConfig
  | InputCheckboxGroupConfig
  | InputHiddenConfig;

export type InputTypeWithData = InputDropdownConfig | InputHiddenConfig;

export enum FormOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}
