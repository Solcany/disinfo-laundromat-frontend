import { writable } from 'svelte/store';

const initialInputData: FormData = new FormData(); 

export const inputStore = writable<FormData>(initialInputData);
