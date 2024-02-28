import type { TableHeaderItemData } from '$models';
export const APP_TITLE: string = 'Disinformation Laundromat';
export const API_URL: string = 'https://www.disinfo.id/api/';
export const UI_CONTENT_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain' },
  { label: 'Similar Content', key: 'snippet', tooltip: 'test'},
  { label: 'Similarity Score', key: 'score' }
];

export const UI_SEARCH_NAV = [
  {label: 'Url', path: '/search/url'},
  {label: 'Content', path: '/search/content'},
  {label: 'Metadata', path: '/search/content'},
];
