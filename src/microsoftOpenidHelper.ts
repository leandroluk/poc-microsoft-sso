import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';
import {type Openid} from './types';

type OpenidToken = {
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
  id_token: string;
};

const scope = 'offline_access openid profile email';

export const microsoftOpenidHelper = {
  async makeAuthUrl(props: {callbackUri: string; openid: Openid; organization: string}): Promise<string> {
    const nonce = crypto.randomUUID();
    const query = querystring.stringify({
      client_id: props.openid.clientId,
      redirect_uri: props.callbackUri,
      nonce,
      state: Buffer.from(JSON.stringify({organization: props.organization}), 'utf8').toString('base64url'),
      response_type: 'code',
      scope,
    });
    return `${props.openid.authorizationEndpoint}?${query}`;
  },
  async getTokenByCode(props: {code: string; callbackUri: string; openid: Openid}): Promise<OpenidToken> {
    const query = querystring.stringify({
      grant_type: 'authorization_code',
      code: props.code,
      client_id: props.openid.clientId,
      client_secret: props.openid.clientSecret,
      redirect_uri: props.callbackUri,
      scope,
    });
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    const {data} = await axios.post(props.openid.tokenEndpoint, query, {headers});
    return data;
  },
  async getUserInfo(props: {accessToken: string}): Promise<any> {
    const url = 'https://graph.microsoft.com/oidc/userinfo';
    const headers = {
      Authorization: `Bearer ${props.accessToken}`,
    };
    const {data} = await axios.post(url, null, {headers});
    return data;
  },
};
