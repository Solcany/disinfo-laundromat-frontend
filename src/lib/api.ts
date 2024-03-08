import { API_URL } from '$config';
import type { ApiResponse } from '$models';

export async function PostApi<T>(
  endpoint: string,
  data: FormData,
  headers?: { [key: string]: string }
): Promise<ApiResponse<T>> {
  try {
    const url = new URL(endpoint, API_URL);
    const finalHeaders = headers || {};

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: finalHeaders,
      body: data
    });

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
        console.error('Failed to fetch data:', response.statusText);
        return { error: errorText, status };
      }
    }

    const responseData: T = await response.json();
    return { data: responseData, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Network error', status: 500 };
  }
}

export async function GetApi<T>(
  endpoint: string,
  headers?: { [key: string]: string }
): Promise<ApiResponse<T>> {
  try {
    const url = new URL(endpoint, API_URL);
    const finalHeaders = headers || {};
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: finalHeaders
    });

    if (!response.ok) {
      const errorText = await response.text();
      const status = response.status;

      if (status === 401) {
        return { error: 'Unauthorized access', status };
      } else if (status === 404) {
        return { error: 'Resource not found', status };
      } else {
        console.error('Failed to fetch data:', response.statusText);
        return { error: errorText, status };
      }
    }

    const responseData: T = await response.json();

    return { data: responseData, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Network error', status: 500 };
  }
}

export async function parseUrl(data: FormData): Promise<ApiResponse<any>> {
  return PostApi<any>('parse-url', data);
}

export async function getAppConfig(): Promise<ApiResponse<any>> {
  return GetApi<any>('');
}
