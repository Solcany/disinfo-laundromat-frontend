import { writable } from 'svelte/store';
import type { ContentQueryData } from '$types';
import { region_data, language_data, browser_data } from '$dummy_data';

let data: ContentQueryData = {
  region: region_data[0],
  language: language_data[0],
  browser: browser_data[0],
  content: ''
};

// export const formDataStore = writable(data);
