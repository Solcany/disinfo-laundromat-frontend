import { writable } from 'svelte/store';
import{ ContentData, type ContentResponse } from '$models';

const initialResult: ContentResponse = {
    countries: {},
    csv_data: '',
    indicator_metadata: {},
    languages: {},
    results: [],
}
const initialContent: ContentData = new ContentData(initialResult);

export const contentStore = writable<ContentData>(initialContent);

