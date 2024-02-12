import { writable } from 'svelte/store';
import type { FormData } from '$types';
import { region_data, language_data, browser_data } from '$dummy_data';

let data: FormData = {
  region: region_data[0],
  language: language_data[0],
  browser: browser_data[0],
  content: ''
};

export const formDataStore = writable(data);
