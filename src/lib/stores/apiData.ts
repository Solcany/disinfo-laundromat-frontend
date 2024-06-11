import { writable } from 'svelte/store';
import { type ApiContentSearchResponseData, type ApiFingerprintResponseData } from '$api';

export const contentSimilarityStore = writable<ApiContentSearchResponseData | undefined>(undefined);
export const technicalSimilarityStore = writable<ApiFingerprintResponseData | undefined>(undefined);
