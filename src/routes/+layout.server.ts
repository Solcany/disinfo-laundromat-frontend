import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const gdpr_consent = cookies.get('gdpr_consent');

	return {
		gdpr_consent: gdpr_consent,
	};
};
