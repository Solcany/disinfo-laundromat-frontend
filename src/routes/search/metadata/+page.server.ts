import type { Actions } from './$types';
import { parseUrl } from '$api';

export const actions = {
  parse_url: async ({ request }) => {
    const data = await request.formData();
    const responseData = await parseUrl(data);
    if (responseData) {
      return { props: { data: responseData } };
    } else {
      return { props: {} };
    }
  }
} satisfies Actions;
