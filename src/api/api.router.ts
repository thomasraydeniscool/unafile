import { Router, RequestType } from 'express-mate';

import { convert } from './api.controller';

const GET = Router.createRoutes(RequestType.GET, [
  {
    path: '/',
    steps: [
      async (req, res) => {
        res.end('hello world!');
      }
    ]
  }
]);

const POST = Router.createRoutes(RequestType.POST, [
  {
    path: '/convert',
    steps: [convert]
  }
]);

const router = new Router(GET, POST);

export default router;
