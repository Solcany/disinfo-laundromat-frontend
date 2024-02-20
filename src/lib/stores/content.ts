import { writable } from 'svelte/store';
import{ ContentData, type ContentResult } from '$models';

const initialResult: ContentResult = {
    countries: {},
    csv_data: '',
    indicator_metadata: {},
    languages: {},
    results: {},
}
const initialContent: ContentData = new ContentData(initialResult);

export const contentStore = writable<ContentData>(initialContent);

