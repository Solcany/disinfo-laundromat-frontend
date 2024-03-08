import type { TableHeaderItemData, NavItemData, LabeledValue, InputConfig } from '$models';

import { InputType } from '$models';

export const APP_TITLE: string = 'Disinformation Laundromat';
export const API_URL: string = 'https://www.disinfo.id/api/';

export const UI_CONTENT_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain' },
  { label: 'Similar Content', key: 'snippet', tooltip: 'test' },
  { label: 'Similarity Score', key: 'score' }
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
export const region_data: LabeledValue[] = [
  { label: 'US', value: 'US' },
  { label: 'NL', value: 'NL' }
];

export const language_data: LabeledValue[] = [
  { label: 'english', value: 'english' },
  { label: 'dutch', value: 'dutch' }
];

export const browser_data: LabeledValue[] = [
  { label: 'all browsers', value: 'all' },
  { label: 'Google', value: 'Google' },
  { label: 'Bing', value: 'Bing' }
];

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
    required: true
  },
  {
    type: InputType.Dropdown,
    name: 'region',
    label: 'Region',
    value: region_data[0],
    placeholder: 'Select region',
    required: true,
    data: region_data
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label: 'Language',
    value: language_data[0],
    placeholder: 'Select Language',
    required: true,
    data: language_data
  },
  {
    type: InputType.Dropdown,
    name: 'combineOperator',
    label: 'Operator',
    placeholder: 'Select Language',
    required: true,
    data: operator_data
  }
];


export const CONTENT_PAGE_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'title',
    label: 'Title',
    placeholder: 'Add title',
    required: true
  },
  {
    type: InputType.Text,
    name: 'content',
    label: 'title',
    placeholder: 'Add content',
    required: true
  },
  {
    type: InputType.Dropdown,
    name: 'region',
    label: 'Region',
    value: region_data[0],
    placeholder: 'Select region',
    required: true,
    data: region_data
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label: 'Language',
    value: language_data[0],
    placeholder: 'Select Language',
    required: true,
    data: language_data
  },
  {
    type: InputType.Dropdown,
    name: 'combineOperator',
    label: 'Operator',
    placeholder: 'Select operator',
    required: true,
    data: operator_data 
  },
];

export const METADATA_PAGE_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'Url',
    placeholder: 'Add url',
    required: true
  },
];
