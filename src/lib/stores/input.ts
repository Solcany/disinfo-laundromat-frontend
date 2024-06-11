import { writable } from 'svelte/store';

export const contentSimilarityFormDataStore = writable<FormData>(new FormData());
export const technicalSimilarityFormDataStore = writable<FormData>(new FormData());
