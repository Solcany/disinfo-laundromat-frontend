//import { json } from '@sveltejs/kit';
//import { Response } from '@sveltejs/kit';
import type { RequestHandler, Cookies } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
    try {
        const formData = await request.formData();
        const consent = formData.get('consent');

        // Setting a cookie
        console.log("setting cookie!");
        cookies.set('myCookieName', 'defaultValue', {
            path: '/',
            //httpOnly: true, // Security measure to prevent client-side script access
            //maxAge: 60 * 60 * 24 * 7 // Expires in one week
        });
        // Send a simple OK response
        return new Response('GDPR consent saved', { status: 200 });
    } catch (error) {
        console.error('Error in POST:', error);
        return new Response('Error processing GDPR consent', { status: 500 });
    }
}
