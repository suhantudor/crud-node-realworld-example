// Core
import * as express from 'express';

/**
 * @function withCatchException
 * @param {Function} callback
 * @param {Object} app
 * @return Function
 */
export const withCatchException =
  <P, ResBody, ReqBody, ReqQuery>(
    callback: (req: express.Request<P, ResBody, ReqBody, ReqQuery>, res: express.Response<ResBody>) => ResBody,
    sendResponse = true,
  ): ((
    req: express.Request<P, ResBody, ReqBody, ReqQuery>,
    res: express.Response<ResBody>,
    next: express.NextFunction,
  ) => Promise<void>) =>
  async (
    req: express.Request<P, ResBody, ReqBody, ReqQuery>,
    res: express.Response<ResBody>,
    next: express.NextFunction,
  ) => {
    try {
      const data = await callback(req, res);
      if (sendResponse) {
        res.send(data);
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
