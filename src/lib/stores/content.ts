import { writable } from 'svelte/store';
import { Content, type ResponseData } from '$models';

const initialData: ResponseData = {
  countries: {},
  csv_data: '',
  indicator_metadata: {},
  languages: {},
  results: []
};
const initialContent = new Content(initialData);

export const contentStore = writable<Content>(initialContent);
