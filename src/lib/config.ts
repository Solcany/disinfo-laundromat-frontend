import type { TableHeaderItemData, NavItemData, LabeledValue, InputConfig } from '$models';
import { RemoteConfigFlag, Endpoint, QueryType } from '$models';

import { InputType, TableHeaderItemType } from '$models';

export const APP_TITLE: string = 'The Information Laundromat';
export const API_URL: string = 'https://www.disinfo.id/api/'; //'http://20.55.107.60/api/';

export const TABLE_CONTENT_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain',  type: TableHeaderItemType.String },
  { label: 'Similarity Score', key: 'score', type: TableHeaderItemType.Number },
  { label: 'Similar Content', key: 'snippet', tooltip: 'test', type: TableHeaderItemType.String}
];

export const TABLE_METADATA_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain', type: TableHeaderItemType.String },
  { label: 'Indicators',
    key: 'indicators_summary',
    type: TableHeaderItemType.IndicatorsSummary
  }
];

export const UI_NAV: NavItemData[] = [
  { label: 'Workspace', path: '/search/content' },
  { label: 'About', path: '/about' },
  { label: 'Log in | Sign up', path: '/login' }
];

export const UI_SEARCH_NAV: NavItemData[] = [
  //{ label: 'Url', path: '/search/url' },
  { label: 'Content Similarity', path: '/search/content' },
  { label: 'Technical Similarity', path: '/search/metadata' }
];

// WIP this should be hardcoded in the Combine component
export const operator_data: LabeledValue[] = [
  { label: 'AND', value: 'AND' },
  { label: 'OR', value: 'OR' }
];

export const CONTENT_SIMILARITY_BASIC_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.TextArea,
    name: 'contentToSearch',
    label: 'Content',
    placeholder: 'Enter an article URL or snippet of text]',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Content
    }
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label:'Language of search results',
    placeholder: 'Select Language',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Languages
  },
  {
    type: InputType.CheckboxGroup,
    name: 'search_engines',
    label: 'Search engines',
    placeholder: 'Select search engines',
    variant: 'horizontal',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Engines
  },
  {
    type: InputType.Hidden,
    name: 'country',
    value: undefined,
    requiresRemoteData: RemoteConfigFlag.Countries
  },
  {
    type: InputType.Hidden,
    name: 'isApi',
    value: true, 
  },
];

export const CONTENT_SIMILARITY_ADVANCED_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.TextArea,
    name: 'contentToSearch',
    label: 'Content',
    placeholder: 'Enter a website URL or snippet of text',
    required: false,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Content }
  },
 // {
 //   type: InputType.Text,
 //   name: 'titleQuery',
 //   label: 'Title',
 //   placeholder: 'Add title',
 //   required: false
 // },
 // {
 //   type: InputType.Checkbox,
 //   name: 'combineOperator',
 //   value: 'AND',
 //   label: 'Results must contain both paragraph and title',
 //   required: true,
 //   checked: false
 // },
  {
    type: InputType.Dropdown,
    name: 'country',
    label: 'Region of search engines',
    placeholder: 'Select region',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Countries
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label:'Language of search results',
    placeholder: 'Select Language',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Languages
  },
  {
    type: InputType.CheckboxGroup,
    name: 'search_engines',
    label: 'Search engines',
    placeholder: 'Select search engines',
    variant: 'horizontal',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Engines
  },
  {
    type: InputType.Hidden,
    name: 'isApi',
    value: true, 
  },
];



//export const CONTENT_PAGE_FORM_CONFIG: InputConfig[] = [
//  {
//    type: InputType.Text,
//    name: 'titleQuery',
//    label: 'Title',
//    placeholder: 'Add title',
//    required: true
//  },
//  {
//    type: InputType.Text,
//    name: 'contentQuery',
//    label: 'Content',
//    placeholder: 'Add content',
//    required: true,
//    submitQuery: {
//      type: QueryType.Post,
//      endpoint: Endpoint.Content
//    }
//  },
//  {
//    type: InputType.Checkbox,
//    name: 'combineOperator',
//    value: 'AND',
//    label: 'Results must contain both paragraph and title',
//    required: true,
//    checked: false
//  },
//  {
//    type: InputType.Dropdown,
//    name: 'country',
//    label: 'Country',
//    placeholder: 'Select region',
//    required: true,
//    data: undefined,
//    requiresRemoteData: RemoteConfigFlag.Countries
//  },
//  {
//    type: InputType.Dropdown,
//    name: 'language',
//    label: 'Language',
//    placeholder: 'Select Language',
//    required: true,
//    data: undefined,
//    requiresRemoteData: RemoteConfigFlag.Languages
//  },
//  {
//    type: InputType.CheckboxGroup,
//    name: 'search_engines',
//    label: 'Search engines',
//    placeholder: 'Select search engines',
//    required: true,
//    data: undefined,
//    requiresRemoteData: RemoteConfigFlag.Engines
//  },
//
//];

export const METADATA_SIMILARITY_BASIC_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'URL',
    placeholder: 'Add url',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Fingerprint
    }
  },
  {
    type: InputType.Hidden,
    name: 'run_urlscan',
    value: false, 
  },
];


export const METADATA_SIMILARITY_ADVANCED_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'URL',
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
   value: '1',
   required: true,
   checked: false,
   tooltip: 'what is rulscan',
 }
];
