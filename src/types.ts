import {type ObjectId} from 'mongodb';

export type Openid = {
  _id: ObjectId;
  provider: string;
  clientId: string;
  clientSecret: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
};
