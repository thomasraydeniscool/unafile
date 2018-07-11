import { NextFunction, Request, Response } from 'express';

/**
 * Resolve an async function
 * @param controller
 */
export const asyncProcess = (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  controller(req, res, next)
    .then()
    .catch(next);

/**
 * Resolve an array of async functions
 * @param controllers
 */
export const asyncSeries = (
  ...controllers: Array<
    (req: Request, res: Response, next: NextFunction) => Promise<any>
  >
) => controllers.map(controller => asyncProcess(controller));
