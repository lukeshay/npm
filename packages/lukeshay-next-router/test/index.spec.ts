import type { NextApiRequest, NextApiResponse } from 'next';

import type { Context, HttpMethod } from '../src';
import { HttpMethods, router, StatusCodes } from '../src';

import chance from './chance';

type MyContext = Context & {
  name: string;
};

const handlerArgs = (method: HttpMethod): [NextApiRequest, NextApiResponse] => [
  {
    body: { [chance.string()]: chance.sentence() },
    method,
  } as unknown as NextApiRequest,
  {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as NextApiResponse,
];

describe('middleware', () => {
  test('should construct', () => {
    const mid = router<MyContext>();

    mid.wrapper(async (req, res, handler) => {
      await handler({
        name: 'chicken',
        req,
        res,
      });
    });
  });

  Object.values(HttpMethods).forEach((method) => {
    test(`should handle ${method}`, async () => {
      const handler = jest.fn();

      const [req, res] = handlerArgs(method);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      await (router<MyContext>() as any)[method.toLowerCase()](handler).handler()(req, res);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({
        req,
        res,
      });
    });
  });

  test('should export StatusCodes', () => {
    expect(StatusCodes).toBeDefined();
  });

  test('should call notFound', async () => {
    const handler = jest.fn();

    await router<MyContext>().notFound(handler).handler()(...handlerArgs(HttpMethods.TRACE));

    expect(handler).toBeCalledTimes(1);
  });

  test('should return early if there is no handler', async () => {
    const wrapper = jest.fn();

    const [req, res] = handlerArgs(HttpMethods.TRACE);

    req.method = undefined;

    await router<MyContext>().wrapper(wrapper).handler()(req, res);

    expect(wrapper).not.toHaveBeenCalled();
  });
});
