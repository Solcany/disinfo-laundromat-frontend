import type { LabeledValue } from '$models';

export const APP_TITLE: string = 'Disinformation Laundromat';
export const API_URL: string = 'https://www.disinfo.id/api/';
export const UI_CONTENT_HEADER: LabeledValue[] = [
  { label: 'Content Domain', value: 'domain' },
  { label: 'Similar Content', value: 'snippet' },
  { label: 'Similarity Score', value: 'score' }
];
