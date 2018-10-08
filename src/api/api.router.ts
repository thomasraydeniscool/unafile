import { Router, IRoutePost, RequestType } from 'express-mate';

import { convert } from './api.controller';

const POST: IRoutePost[] = [
  {
    type: RequestType.POST,
    path: '/convert',
    steps: [convert]
  }
];

const router = new Router([], [], POST);

export default router;
