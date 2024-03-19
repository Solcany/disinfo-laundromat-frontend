import type { TableHeaderItemData, NavItemData, LabeledValue, InputConfig } from '$models';
import { RemoteConfigDataFlag, Endpoint, QueryType } from '$models';

import { InputType, TableHeaderItemType } from '$models';

export const APP_TITLE: string = 'Disinformation Laundromat';
export const API_URL: string = 'https://www.disinfo.id/api/'; //'http://20.55.107.60/api/';

export const TABLE_CONTENT_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain' },
  { label: 'Similarity Score', key: 'score' },
  { label: 'Similar Content', key: 'snippet', tooltip: 'test' }
];

export const TABLE_METADATA_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', 
    key: 'domain', 
    type: TableHeaderItemType.String
  },
  { 
    label: 'Indicators', 
    key: 'indicators_summary', 
    type: TableHeaderItemType.BarGraph
  },
];

export const UI_NAV: NavItemData[] = [
  { label: 'Search', path: '/search/url' },
  { label: 'About', path: '/about' },
  { label: 'Log in | Sign up', path: '/login' }
];

export const UI_SEARCH_NAV: NavItemData[] = [
  { label: 'Url', path: '/search/url' },
  { label: 'Content', path: '/search/content' },
  { label: 'Metadata', path: '/search/metadata' }
];

// WIP this should be loaded from API with the rest of config
export const browser_data: LabeledValue[] = [
  { label: 'all browsers', value: 'all' },
  { label: 'Google', value: 'Google' },
  { label: 'Bing', value: 'Bing' }
];

// WIP this should be hardcoded in the Combine component
export const operator_data: LabeledValue[] = [
  { label: 'AND', value: 'AND' },
  { label: 'OR', value: 'OR' }
];

export const URL_PAGE_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'Url',
    placeholder: 'Add url',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.ParseUrl
    }
  },
  {
    type: InputType.Dropdown,
    name: 'country',
    label: 'Country',
    placeholder: 'Select region',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigDataFlag.Countries
  },
  {
    type: InputType.Dropdown,
    name: 'search_engines',
    label: 'Search Engines',
    placeholder: 'Select search engines',
    required: true,
    data: browser_data
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label: 'Language',
    placeholder: 'Select Language',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigDataFlag.Languages
  }
];

export const CONTENT_PAGE_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'titleQuery',
    label: 'Title',
    placeholder: 'Add title',
    required: true
  },
  {
    type: InputType.Text,
    name: 'contentQuery',
    label: 'Content',
    placeholder: 'Add content',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Content
    }
  },
  {
    type: InputType.Dropdown,
    name: 'country',
    label: 'Country',
    placeholder: 'Select region',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigDataFlag.Countries
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label: 'Language',
    placeholder: 'Select Language',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigDataFlag.Languages
  },
  {
    type: InputType.Dropdown,
    name: 'search_engines',
    label: 'Search Engines',
    placeholder: 'Select search engines',
    required: true,
    data: browser_data
  },
  {
    type: InputType.Checkbox,
    name: 'combineOperator',
    label: 'Results must contain both paragraph and title',
    required: true,
    checked: false
  }
];

export const METADATA_PAGE_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'Url',
    placeholder: 'Add url',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Fingerprint
    }
  },
  {
    type: InputType.Checkbox,
    name: 'run_urlscan',
    label: 'Run Url scan',
    required: true,
    checked: false
  }
];
