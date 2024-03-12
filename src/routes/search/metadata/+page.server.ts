//import type { Actions } from './$types';
//import { queryParseUrl } from '$api';
//
//export const actions = {
//  parse_url: async ({ request }) => {
//    const data = await request.formData();
//    const responseData = await queryParseUrl(data);
//    if (responseData) {
//      return { props: { data: responseData } };
//    } else {
//      return { props: {} };
//    }
//  }
//} satisfies Actions;
