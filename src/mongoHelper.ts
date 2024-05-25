import {MongoClient} from 'mongodb';
import {type Openid} from './types';
import {vars} from './vars';

export const mongoHelper = {
  client: null as unknown as MongoClient,
  async connect() {
    const url = [
      `${vars.mongo.protocol}://`,
      `${vars.mongo.username}:`,
      `${vars.mongo.password}@`,
      `${vars.mongo.hostname}:`,
      `${vars.mongo.port}/`,
      `${vars.mongo.database}?authSource=admin`,
    ].join('');
    mongoHelper.client = await MongoClient.connect(url);
  },
  async getOpenidByOrganization(organization: string): Promise<Openid | null> {
    const collection = mongoHelper.client.db(organization).collection('config');
    const openid = await collection.findOne({_id: 'openid' as any});
    return openid as Openid;
  },
};
