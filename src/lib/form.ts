  import { QueryType, Endpoint, type ApiQuery, type ApiContentData, type ApiFingerprintData, type ApiResponse } from '$models';
  import { queryApi } from '$api';
  import { loadingStore } from '$stores/loading.ts';
  import { metadataStore, contentStore } from '$stores/apiData.ts';
  import { contentFormDataStore, metadataFormDataStore } from '$stores/input.ts';
  import {goto} from '$app/navigation';


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
          contentStore.set(response.data as ApiContentData);
          loadingStore.set(false);
          if (query.route) goto(query.route);
        } else if (query.endpoint === Endpoint.Fingerprint) {
          metadataFormDataStore.set(formData);
          metadataStore.set(response.data as ApiFingerprintData);
          loadingStore.set(false);
          if (query.route) goto(query.route);
        } else {
          loadingStore.set(false);
        }
      } else {
        loadingStore.set(false);
      }
    }
  }
