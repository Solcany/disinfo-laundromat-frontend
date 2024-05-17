import type { Cookies } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
    try {
        const formData = await request.formData();
        const consent = formData.get('consent')?.toString();
        if (consent !== 'accepted' && consent !== 'rejected') {
            console.error('Invalid GDPR consent value:', consent);
            return json({ status: 400, error: 'Invalid consent value' });
        }

        cookies.set('gdpr_consent', consent, {
            path: '/',
            httpOnly: true, 
            maxAge: 60 * 60 * 24 * 90 // 3 months 
        });
        return json({ status: 200 });
    } catch (error) {
        console.error('Error in POST:', error);
        return json({ status: 500, error: (error as Error).message });
    }
}

