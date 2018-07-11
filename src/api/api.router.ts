import * as express from 'express';
import { asyncSeries } from './shared/controller';

import { convert } from './api.controller';

const router = express.Router();

router.post('/convert', ...asyncSeries(convert));

export default router;
