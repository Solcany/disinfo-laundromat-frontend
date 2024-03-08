import { type LabeledValue, type InputConfig, InputType } from '$models';

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

export const CONTENT_PAGE_FORM_CONFIG: InputConfig[] = [
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
