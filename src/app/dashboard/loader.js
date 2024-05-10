// src/app/dashboard/loader.js
import { withAuth } from '@auth0/nextjs-auth0';

export async function loader({ request }) {
    const { user } = await withAuth()(request);
    
    if (!user) {
        // Redirects unauthenticated users
        return new Response(null, { status: 302, headers: { Location: '/api/auth/login' } });
    }

    // Ensure the data is properly formatted as JSON
    const data = { title: "Welcome to OneClick" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
