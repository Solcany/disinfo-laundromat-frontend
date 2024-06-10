import { writable } from 'svelte/store';
import { 
  type ApiContentData, 
  type ApiFingerprintResponseData, 
} from '$api';

export const contentStore = writable<ApiContentData | undefined>(undefined);
export const metadataStore = writable<ApiFingerprintResponseData | undefined>(undefined);
