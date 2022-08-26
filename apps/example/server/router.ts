import { router } from "@lshay/next-router";
import type { Router } from "@lshay/next-router";
import type { NextApiRequest, NextApiResponse } from "next";

export type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export const wrapper = async (req: NextApiRequest, res: NextApiResponse, handler: Handler) => {
  await handler(req, res);
};

export default () => router<Handler>(wrapper);

export type { Router };
