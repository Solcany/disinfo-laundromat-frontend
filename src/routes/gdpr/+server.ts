import type { RequestHandler, Cookies } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
    try {
        const formData = await request.formData();
        const consent = formData.get('consent')?.toString();

        cookies.set('gdpr_consent', consent || 'n/a', {
            path: '/',
            httpOnly: true, // Security measure to prevent client-side script access
            maxAge: 60 * 60 * 24 * 30 // Expires in a months
        });
        return new Response('GDPR consent saved', { status: 200 });
    } catch (error) {
        console.error('Error in POST:', error);
        return new Response('Error processing GDPR consent', { status: 500 });
    }
}
