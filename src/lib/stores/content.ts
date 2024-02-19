import { writable } from 'svelte/store';
import type { ContentData, ContentResult } from '$models';

const initialResult: ContentResult = {
    countries: {},
    csv_data: '',
    indicator_metadata: {},
    languages: {},
    results: {},
}
const initialContent: ContentData = {
  form: new FormData(),
  content: initialResult,
}

export const contentStore = writable<ContentData>(initialContent);

