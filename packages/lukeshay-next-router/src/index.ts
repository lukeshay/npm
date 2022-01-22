import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

const HttpMethods = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE',
} as const;

type HttpMethod = typeof HttpMethods[keyof typeof HttpMethods];

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

type ContextApiHandler<T extends Context> = (ctx: T) => Promise<void> | void;

type ContextApiWrapper<T extends Context> = (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: ContextApiHandler<T>,
) => Promise<void> | void;

class Router<T extends Context> {
  private _notFound?: ContextApiHandler<T>;

  private _wrapper: ContextApiWrapper<T> = async (req, res, handler) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    await handler({
      req,
      res,
    } as T);
  };

  private handlers: Record<HttpMethod, ContextApiHandler<T> | undefined> = {
    CONNECT: undefined,
    DELETE: undefined,
    GET: undefined,
    HEAD: undefined,
    OPTIONS: undefined,
    PATCH: undefined,
    POST: undefined,
    PUT: undefined,
    TRACE: undefined,
  };

  /* Adds a handler wrapper. */
  public wrapper(wrapper: ContextApiWrapper<T>): this {
    this._wrapper = wrapper;

    return this;
  }

  /* Adds the connect request handler. */
  public connect(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.CONNECT] = handler;

    return this;
  }

  /* Adds the delete request handler. */
  public delete(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.DELETE] = handler;

    return this;
  }

  /* Adds the get request handler. */
  public get(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.GET] = handler;

    return this;
  }

  /* Adds the head request handler. */
  public head(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.HEAD] = handler;

    return this;
  }

  /* Adds the not found request handler. */
  public notFound(handler: ContextApiHandler<T>): this {
    this._notFound = handler;

    return this;
  }

  /* Adds the options request handler. */
  public options(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.OPTIONS] = handler;

    return this;
  }

  /* Adds the patch request handler. */
  public patch(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.PATCH] = handler;

    return this;
  }

  /* Adds the post request handler. */
  public post(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.POST] = handler;

    return this;
  }

  /* Adds the put request handler. */
  public put(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.PUT] = handler;

    return this;
  }

  /* Adds the trace request handler. */
  public trace(handler: ContextApiHandler<T>): this {
    this.handlers[HttpMethods.TRACE] = handler;

    return this;
  }

  /* Returns the Next.js API handler with the routes. */
  public handler(): NextApiHandler {
    return async (req, res) => {
      const handler = this.handlers[req.method?.toUpperCase() as HttpMethod] ?? this._notFound;

      if (!handler) {
        return;
      }

      await this._wrapper(req, res, handler);
    };
  }
}

const router = <T extends Context>(): Router<T> => new Router<T>();

export { StatusCodes, HttpMethods, Router, router };
export type { Context, ContextApiWrapper, ContextApiHandler, HttpMethod };
export default router;
