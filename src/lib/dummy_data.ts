import type { LabeledValue, ContentApiInput } from '$models';

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


export const content_api_input: ContentApiInput = {
  region: region_data[0],
  language: language_data[0],
  browser: browser_data[0],
  operator: operator_data[0],
  content: ''
};

export enum InputType  {
  Dropdown,
  Text,
}

type InputTextConfig = {
  type: InputType.Text;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  value?: string;
}

type InputDropdownConfig = {
  type: InputType.Dropdown;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  data: LabeledValue[];
  value?: LabeledValue;
}

type InputConfig = InputTextConfig | InputDropdownConfig;



export const CONTENT_SEARCH_FORM_CONFIG : InputConfig[] = [
  {
   type: InputType.Text,
   name: "url",
   label: "Url",
   placeholder: "Add url",
   required: true
  },
  {
   type: InputType.Dropdown,
   name: "region",
   label: "Region",
   value: region_data[0],
   placeholder: "Select region",
   required: true,
   data: region_data
  },
  {
   type: InputType.Dropdown,
   name: "language",
   label: "Language",
   value: language_data[0],
   placeholder: "Select Language",
   required: true,
   data: language_data
  },
  {
   type: InputType.Dropdown,
   name: "combineOperator",
   label: "Operator",
   placeholder: "Select Language",
   required: true,
   data: operator_data}

]
