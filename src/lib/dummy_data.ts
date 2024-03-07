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

interface InputConfig {
  name: string;
  label: string;
  placeholder: string;
  type: InputType;
  required: boolean;
  data?: LabeledValue[];
  value?: LabeledValue;


}

export const dum = [


]

export const CONTENT_SEARCH_FORM_CONFIG : InputConfig[] = [
  {name: "url",
   label: "Url",
   value: undefined,
   placeholder: "Add url",
   type: InputType.Text,
   required: true}
  ,
  {name: "region",
   label: "Region",
   value: region_data[0],
   placeholder: "Select region",
   type: InputType.Dropdown,
   required: true,
   data: region_data},

  {name: "language",
   label: "Language",
   value: language_data[0],
   placeholder: "Select Language",
   type: InputType.Dropdown,
   required: true,
   data: language_data},

  {name: "combineOperator",
   label: "Operator",
   value: operator_data[0],
   placeholder: "Select Language",
   type: InputType.Dropdown,
   required: true,
   data: operator_data},

]
