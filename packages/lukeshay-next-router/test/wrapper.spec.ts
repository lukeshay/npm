import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";

import type { HttpMethod } from "../src/enums/http-methods";
import { HttpMethods } from "../src/enums/http-methods";
import { router } from "../src/wrapper";
import type { Router } from "../src/wrapper";

import chance from "./chance";

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

type Handler = (ctx: Context) => Promise<void> | void;

const handlerArgs = (method: HttpMethod): [NextApiRequest, NextApiResponse] => [
  {
    body: { [chance.string()]: chance.sentence() },
    method,
  } as unknown as NextApiRequest,
  {
    end: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  } as unknown as NextApiResponse,
];

describe("wrapper", () => {
  let baseRouter: Router<Handler>;

  beforeEach(() => {
    baseRouter = router<Handler>(async (req, res, handler) => {
      await handler({
        req,
        res,
      });
    });
  });

  test("should construct", () => {
    expect(baseRouter).toBeDefined();
  });

  Object.values(HttpMethods).forEach((method) => {
    test(`should handle ${method}`, async () => {
      const handler = jest.fn();

      const [req, res] = handlerArgs(method);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      await (baseRouter as any)[method.toLowerCase()](handler).handler()(
        req,
        res
      );

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({
        req,
        res,
      });
    });
  });

  test("should export StatusCodes", () => {
    expect(StatusCodes).toBeDefined();
  });

  test("should call notFound", async () => {
    const handler = jest.fn();

    await baseRouter.notFound(handler).handler()(
      ...handlerArgs(HttpMethods.TRACE)
    );

    expect(handler).toBeCalledTimes(1);
  });

  test("should return early if there is no handler", async () => {
    const wrapper = jest.fn();

    const [req, res] = handlerArgs(HttpMethods.TRACE);

    req.method = undefined;

    await router<Handler>(wrapper).handler()(req, res);

    expect(wrapper).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
    expect(res.end).toHaveBeenCalledTimes(1);
  });
});
