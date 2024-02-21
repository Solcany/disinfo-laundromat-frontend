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

export const content_api_input: ContentApiInput = {
  region: region_data[0],
  language: language_data[0],
  browser: browser_data[0],
  content: ''
};

