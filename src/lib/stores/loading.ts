import { writable } from 'svelte/store';

export const loadingStore = writable(false);

export function setLoading(): void {
  loadingStore.set(true);
}

export function unsetLoading(): void {
  loadingStore.set(false);
}
