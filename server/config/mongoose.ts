import * as mongoose from 'mongoose';
import * as util from 'util';
import * as libdebug from 'debug';
const debug = libdebug('express-mongoose-es6-rest-api:index');

import * as config from './config';

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

