import { NextApiRequest, NextApiResponse } from 'next';
import { Context, HttpMethod, HttpMethods, router, StatusCodes } from '../src/index';
import chance from './chance';

interface MyContext extends Context {
  name: string;
}

function handlerArgs(method: HttpMethod): [NextApiRequest, NextApiResponse] {
  return [
    { method, body: { [chance.string()]: chance.sentence() } } as NextApiRequest,
    {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as NextApiResponse,
  ];
}

describe('middleware', () => {
  test('should construct', () => {
    const mid = router<MyContext>();

    mid.wrapper(async (req, res, handler) => {
      await handler({ req, res, name: 'chicken' });
    });
  });

  Object.values(HttpMethods).forEach((method) => {
    test(`should handle ${method}`, async () => {
      const handler = jest.fn();

      const [req, res] = handlerArgs(method);

      await (router<MyContext>() as any)[method.toLowerCase()](handler).handler()(req, res);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ req, res });
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
