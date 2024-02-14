import type {  Actions } from './$types';

export const actions = {
	parse_url: async ({ request }) => {
		const data = await request.formData();
    console.log(data);
		return { success: true };
	},
} satisfies Actions;
