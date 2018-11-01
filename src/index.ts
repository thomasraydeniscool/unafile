import * as dotenv from 'dotenv';
dotenv.config();

import * as bodyParser from 'body-parser';

import { App } from './config/app';
import env from './config/environment';

import apiRouter from './api/api.router';

const unafile = new App([
  {
    path: '/api',
    router: apiRouter.routes
  }
]);

unafile.setup(app => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
});

unafile.start(env.PORT);

export default unafile;
