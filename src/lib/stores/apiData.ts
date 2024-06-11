import { writable } from 'svelte/store';
import { type ApiContentSearchResponseData, type ApiFingerprintResponseData } from '$api';

export const contentStore = writable<ApiContentSearchResponseData | undefined>(undefined);
export const metadataStore = writable<ApiFingerprintResponseData | undefined>(undefined);
