import { API_URL } from '$config';
import {
  QueryType,
  Endpoint,
  type ApiQuery,
  type ApiContentData,
  type ApiFingerprintData,
  type ApiResponse
} from '$models';
import { loadingStore } from '$stores/loading.ts';
import { metadataStore, contentStore } from '$stores/apiData.ts';
import { contentFormDataStore, metadataFormDataStore } from '$stores/input.ts';
import { goto } from '$app/navigation';

export async function handleApiSubmit(event: Event, query: ApiQuery) {
  event.preventDefault();
  loadingStore.set(true);
  const target = event.target as HTMLFormElement;
  let formData = new FormData(target);

  if (query.endpoint === Endpoint.ParseUrl || query.endpoint === Endpoint.Content) {
    formData.set('combineOperator', 'OR');
  } else if (query.endpoint === Endpoint.Fingerprint && !formData.has('run_urlscan')) {
    formData.set('run_urlscan', '0');
  }
  const response: ApiResponse<ApiContentData | ApiFingerprintData> = await queryApi(
    query.type,
    query.endpoint,
    formData
  );
  if (response.error) {

  } else {
    if (response.data) {
      if (query.endpoint === Endpoint.Content) {
        contentFormDataStore.set(formData);
        loadingStore.set(false);
        contentStore.set(response.data as ApiContentData);
        if (query.route) goto(query.route);
      } else if (query.endpoint === Endpoint.Fingerprint) {
        metadataFormDataStore.set(formData);
        loadingStore.set(false);
        metadataStore.set(response.data as ApiFingerprintData);
        if (query.route) goto(query.route);
      } else {
        loadingStore.set(false);
      }
    } else {
      loadingStore.set(false);
    }
  }
}

export async function queryApi<T>(
  type: QueryType,
  endpoint: Endpoint,
  body?: FormData,
  headers?: { [key: string]: string }
): Promise<ApiResponse<T>> {
  try {
    const url = new URL(endpoint, API_URL);
    const finalHeaders = headers || {};
    const finalBody = body || new FormData();

    let response;
    if (type === QueryType.Post) {
      response = await fetch(url.toString(), {
        method: type,
        body: finalBody,
        headers: finalHeaders
      });
    } else {
      response = await fetch(url.toString(), {
        method: type,
        headers: finalHeaders
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      const status = response.status;
      if (status === 400) {
        return { error: 'Bad request', status };
      } else if (status === 401) {
        return { error: 'Unauthorized', status };
      } else if (status === 403) {
        return { error: 'Forbidden', status };
      } else {
        console.error('Failed to fetch data', response.statusText);
        return { error: errorText, status };
      }
    }
    const responseData = await response.json();

    return { data: responseData, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Network error', status: 500 };
  }
}
