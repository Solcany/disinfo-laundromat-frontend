import { writable } from 'svelte/store';
import type { ApiIndicatorsData, ApiContentData, ApiFingerprintData } from '$models';

export const contentStore = writable<ApiContentData | undefined>(undefined);
export const urlContentStore = writable<ApiContentData | undefined>(undefined);
export const metadataStore = writable<ApiFingerprintData | undefined>(undefined);
export const indicatorsStore = writable<ApiIndicatorsData | undefined>(undefined);
