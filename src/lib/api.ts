import { API_URL } from '$config';

export async function queryApi(query: string, data: FormData) {
  try {
    const q = API_URL.concat(query);
    const response = await fetch(q, {
      method: 'POST',
      body: data
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
