import type { TableHeaderItemData, NavItemData } from '$models';
export const APP_TITLE: string = 'Disinformation Laundromat';
export const API_URL: string = 'https://www.disinfo.id/api/';

export const UI_CONTENT_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain' },
  { label: 'Similar Content', key: 'snippet', tooltip: 'test'},
  { label: 'Similarity Score', key: 'score' }
];

export const UI_NAV: NavItemData[] = [
  {label: 'Search', path: '/search/url'},
  {label: 'About', path: '/about'},
  {label: 'Log in | Sign up', path: '/login'},
]

export const UI_SEARCH_NAV: NavItemData[]= [
  {label: 'Url', path: '/search/url'},
  {label: 'Content', path: '/search/content'},
  {label: 'Metadata', path: '/search/content'},
];
