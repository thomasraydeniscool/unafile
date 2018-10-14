import * as dotenv from 'dotenv';
dotenv.config();

import { App } from './config/app';
import env from './config/environment';

import apiRouter from './api/api.router';

const unafile = new App([
  {
    path: '/api',
    router: apiRouter.routes
  }
]);

unafile.setup();

unafile.start(env.PORT);

export default unafile;
