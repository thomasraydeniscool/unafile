import * as e from 'express';

import { App } from './lib/app';

import apiRouter from './api/api.router';

const filety = new App([
  {
    path: '/api',
    router: apiRouter.routes
  }
]);

filety.setup();

filety.start();

export default filety;
