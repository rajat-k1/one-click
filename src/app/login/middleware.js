// src/app/login/middleware.js
import { getToken } from '@auth0/nextjs-auth0';

export async function middleware(req) {
  const session = getToken(req);
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/app/dashboard',
      },
    });
  }
  return new Response(null, {
    status: 200,
  });
}
