import { API_URL } from '$config';
import type { ApiResponse } from '$models';

export async function queryApi<T>(endpoint: string, data: FormData): Promise<ApiResponse<T>> {
  try {
    const query = API_URL.concat(endpoint);
    const response = await fetch(query, {
      method: 'POST',
      body: data
    });
    if (response.ok) {
      const responseData: T = await response.json();
      return { data: responseData, status: response.status };
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch data:', response.statusText);
      return { error: errorText, status: response.status };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Network error', status: 500 };
  }
}

export async function parseUrl(data: FormData): Promise<ApiResponse<any>> {
  return queryApi<any>('parse-url', data);
}

//export async parseUrl: async ({ request }) => {
//    const data = await request.formData();
//    const responseData = await queryApi('parse-url', data);
//    if(responseData) {
//      return { props: { data: responseData }};
//    } else {
//      return { props: { }};
//    }
//  }
//} satisfies Actions;
