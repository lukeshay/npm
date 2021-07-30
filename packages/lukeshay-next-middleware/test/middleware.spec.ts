import { NextApiRequest, NextApiResponse } from 'next';
import { Context, HttpMethods, Middleware } from '../src/index';

interface MyContext extends Context {
  name: string;
}

function handlerArgs(method: HttpMethods): [NextApiRequest, NextApiResponse] {
  return [{ method } as unknown as NextApiRequest, {} as NextApiResponse];
}

describe('middleware', () => {
  it('should construct', () => {
    const middleware = new Middleware<MyContext>();

    middleware.wrapper(async (req, res, handler) => {
      await handler({ req, res, name: 'chicken' });
    });
  });

  it('should call connect', async () => {
    const handler = jest.fn();

    await new Middleware().connect(handler).handler()(...handlerArgs(HttpMethods.CONNECT));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call delete', async () => {
    const handler = jest.fn();

    await new Middleware().delete(handler).handler()(...handlerArgs(HttpMethods.DELETE));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call get', async () => {
    const handler = jest.fn();

    await new Middleware().get(handler).handler()(...handlerArgs(HttpMethods.GET));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call head', async () => {
    const handler = jest.fn();

    await new Middleware().head(handler).handler()(...handlerArgs(HttpMethods.HEAD));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call options', async () => {
    const handler = jest.fn();

    await new Middleware().options(handler).handler()(...handlerArgs(HttpMethods.OPTIONS));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call patch', async () => {
    const handler = jest.fn();

    await new Middleware().patch(handler).handler()(...handlerArgs(HttpMethods.PATCH));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call post', async () => {
    const handler = jest.fn();

    await new Middleware().post(handler).handler()(...handlerArgs(HttpMethods.POST));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call put', async () => {
    const handler = jest.fn();

    await new Middleware().put(handler).handler()(...handlerArgs(HttpMethods.PUT));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call trace', async () => {
    const handler = jest.fn();

    await new Middleware().trace(handler).handler()(...handlerArgs(HttpMethods.TRACE));

    expect(handler).toBeCalledTimes(1);
  });

  it('should call notFound', async () => {
    const handler = jest.fn();

    await new Middleware().notFound(handler).handler()(...handlerArgs(HttpMethods.TRACE));

    expect(handler).toBeCalledTimes(1);
  });
});
