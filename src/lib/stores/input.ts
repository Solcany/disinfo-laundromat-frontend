import { writable } from 'svelte/store';


export const contentFormDataStore = writable<FormData>(new FormData());
