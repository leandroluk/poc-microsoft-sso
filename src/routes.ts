import {Router} from 'express';
import path from 'path';
import {microsoftOpenidHelper} from './microsoftOpenidHelper';
import {authMiddleware} from './middlewares';
import {mongoHelper} from './mongoHelper';
import {vars} from './vars';

const routes = Router();

routes.get('/login/openid/microsoft/callback', async (req, res) => {
  if (!Object.keys(req.query).length) {
    res.sendFile(path.resolve(vars.path, 'src', 'static', 'callback.html'));
    return;
  }
  try {
    const state = JSON.parse(Buffer.from(req.query.state as string, 'base64url').toString('utf8'));
    const openid = await mongoHelper.getOpenidByOrganization(state.organization);
    if (!openid) {
      throw new Error('unknown organization');
    }
    const code = req.query.code as string;
    const callbackUri = req.completeUrl;
    const token = await microsoftOpenidHelper.getTokenByCode({code, callbackUri, openid});
    res.cookie('access_token', token.access_token, {httpOnly: true});
    res.cookie('refresh_token', token.refresh_token, {httpOnly: true});
    res.redirect('/');
    return;
  } catch (error) {
    console.log(error);
    res.redirect('/login?error=invalid_credentials');
  }
});

routes.get('/login/openid/microsoft', async (req, res) => {
  const callbackUri = `${req.completeUrl}/callback`;
  const organization = req.query.organization as string;
  const openid = await mongoHelper.getOpenidByOrganization(organization);
  if (!openid || openid.provider !== 'microsoft') {
    res.redirect('/login?error=missing_microsoft_integration');
    return;
  }
  const authorizationUrl = await microsoftOpenidHelper.makeAuthUrl({callbackUri, openid, organization});
  res.redirect(authorizationUrl);
});

routes.get('/login', (_req, res) => {
  res.sendFile(path.resolve(vars.path, 'src', 'static', 'login.html'));
});

routes.get('/', authMiddleware(), (_req, res) => {
  res.sendFile(path.resolve(vars.path, 'src', 'static', 'index.html'));
});

export {routes};
