import { API_URL } from '$config';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const endpoint = new URL('parse-url', API_URL);
  console.log(endpoint);
  const response = await fetch(endpoint.href, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    const errorText = await response.text();
    const status = response.status;

    if (status === 400) {
      error(400, errorText);
    } else if (status === 401) {
      error(401, errorText);
    } else if (status === 403) {
      error(403, errorText);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  }
  let data = await response.json();
  return json(data);
};
