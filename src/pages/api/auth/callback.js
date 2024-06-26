// pages/api/auth/callback.js
import auth0 from '../../../../src/utils/auth0';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/psdfff' });
    console.log('routed')
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
