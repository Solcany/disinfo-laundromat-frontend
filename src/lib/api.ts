import { goto } from '$app/navigation';
import { API_URL } from '$config';
import { setLoading, unsetLoading } from '$stores/loading.ts';
import { metadataStore, contentStore } from '$stores/apiData.ts';
import { contentFormDataStore, metadataFormDataStore } from '$stores/input.ts';

export enum QueryType {
  Post = 'POST',
  Get = 'GET'
}

export enum Endpoint {
  AppConfig = '',
  Indicators = 'indicators',
  ParseUrl = 'parse-url',
  Fingerprint = 'fingerprint',
  Content = 'content-search'
}

export type ApiQuery = {
  type: QueryType;
  endpoint: Endpoint;
  route?: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};
export type IndicatorMetadata = {
  [key: string]: {
    description: string;
    interpretation: string;
    name: string;
  };
};
export type ApiFingerprintResponseData = {
  countries: Record<string, string>;
  indicator_metadata: IndicatorMetadata;
  indicator_summary: Record<string, number>;
  indicators: Array<{
    domain_name: string;
    indicator_content: string | string[];
    indicator_type: string;
  }>;
  languages: Record<string, string>;
  matches: Array<{
    domain_name_x: string;
    domain_name_y: string;
    match_type: string;
    match_value: string;
  }>;
  matches_summary: Record<string, number>;
};
export type ApiContentSearchResponseData = {
  countries: Record<string, string>;
  csv_data: string;
  indicator_metadata: {
    [key: string]: {
      description: string;
      interpretation: string;
      name: string;
    };
  };
  languages: Record<string, string>;
  results: ContentSearchResult[];
};
export type ContentSearchResult = {
  [key: string]: number | string | string[] | number[];
  domain: string;
  domain_count: number;
  engines: string[];
  link_count: number;
  score: number;
  snippet: string;
  source: string[];
  title: string;
  url: string;
};

export async function handleApiSubmit(event: Event, query: ApiQuery) {
  event.preventDefault();
  setLoading();
  const target = event.target as HTMLFormElement;
  let formData = new FormData(target);

  if (query.endpoint === Endpoint.ParseUrl || query.endpoint === Endpoint.Content) {
    formData.set('combineOperator', 'OR');
  } else if (query.endpoint === Endpoint.Fingerprint && !formData.has('run_urlscan')) {
    formData.set('run_urlscan', '0');
  }
  const response: ApiResponse<ApiContentSearchResponseData | ApiFingerprintResponseData> =
    await queryApi(query.type, query.endpoint, formData);
  if (response.error) {
    // wip handle error
  } else {
    if (response.data) {
      if (query.endpoint === Endpoint.Content) {
        contentFormDataStore.set(formData);
        unsetLoading();
        contentStore.set(response.data as ApiContentSearchResponseData);
        if (query.route) goto(query.route);
      } else if (query.endpoint === Endpoint.Fingerprint) {
        metadataFormDataStore.set(formData);
        unsetLoading();
        metadataStore.set(response.data as ApiFingerprintResponseData);
        if (query.route) goto(query.route);
      } else {
        unsetLoading();
      }
    } else {
      unsetLoading();
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
