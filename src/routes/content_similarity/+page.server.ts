import type { Actions } from './$types';
import { queryApi } from '$api';

export const actions = {
  parse_url: async ({ request }) => {
    const data = await request.formData();
    const responseData = await queryApi('parse-url', data);
    return { success: true, data: responseData };
  }
} satisfies Actions;
