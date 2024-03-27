import { writable } from 'svelte/store';

export const contentFormDataStore = writable<FormData>(new FormData());
export const metadataFormDataStore = writable<FormData>(new FormData());
