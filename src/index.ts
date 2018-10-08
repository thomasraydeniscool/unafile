import { App } from './lib/app';

import apiRouter from './api/api.router';

const unafile = new App([
  {
    path: '/api',
    router: apiRouter.routes
  }
]);

unafile.setup();

unafile.start();

export default unafile;
