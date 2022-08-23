import { router } from "@lukeshay/next-router";
import type { Router } from "@lukeshay/next-router";
import type { NextApiRequest, NextApiResponse } from "next";

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

const wrapper = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: Handler
): Promise<void> => {
  await handler(req, res);
};

const myRouter = <BODY = undefined, QUERY = undefined>(): Router<Handler> =>
  router<Handler>(wrapper);

export type { Router, Handler };
export default myRouter;
