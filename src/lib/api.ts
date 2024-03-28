import { API_URL } from '$config';
import { type ApiResponse, Endpoint, QueryType } from '$models';

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
