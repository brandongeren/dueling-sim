// config should be imported before importing any other file
import * as config from './config/config';
import app from './config/express';
// this line is necessary to run the mongo backend
require('./config/mongoose');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
