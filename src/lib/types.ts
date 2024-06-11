export interface LabeledValue {
  label: string;
  value: any;
}

//export interface ContentApiInput {
//  region: LabeledValue;
//  language: LabeledValue;
//  browser: LabeledValue;
//  operator: LabeledValue;
//  content: string;
//  [index: string]: string | LabeledValue;
//}
export type IndicatorDataItem = {
  domain_name: string;
  indicator_content: string | string[];
  indicator_type: string;
};

export type MatchDataItem = {
  domain_name_y: string;
  match_type: string;
  match_value: string;
};

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


//export interface ApiAppConfigData {
//  [key: string]: {
//    countries: Record<string, string>;
//    defaults: {
//      [key: string]: {
//        country: string,
//        language: string,
//        search_engines: Array<string>
//        };
//      };
//    engines: Record<string, string>;
//    indicator_metadata: {
//      [key: string]: {
//        description: string;
//        interpretation: string;
//        name: string;
//      }
//    };
//    languages: Record<string, string>;
//  }
//}

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

export enum TableHeaderItemType {
  Number = 'number',
  String = 'string',
  NumberArray = 'numberArray',
  StringArray = 'stringArray',
  IndicatorsSummary = 'IndicatorsSummary',
  MatchScore = 'MatchScore',
  Url = 'url',
  Empty = 'empty'
}

export interface TableHeaderItemData {
  label: string;
  key: string;
  type: TableHeaderItemType;
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

export interface DomainAssociation extends LabeledValue {
  glyph: string;
}

