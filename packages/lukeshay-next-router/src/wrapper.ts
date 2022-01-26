import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { HttpMethods } from './enums/http-methods';
import type { HttpMethod } from './enums/http-methods';

type Wrapper<HANDLER> = (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: HANDLER,
) => Promise<void> | void;

class Router<HANDLER> {
  private readonly _wrapper: Wrapper<HANDLER>;

  private _notFound?: HANDLER;

  private handlers: Record<HttpMethod, HANDLER | undefined> = {
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

  public constructor(wrapper: Wrapper<HANDLER>) {
    this._wrapper = wrapper;
  }

  /* Adds the connect request handler. */
  public connect(handler: HANDLER): this {
    this.handlers[HttpMethods.CONNECT] = handler;

    return this;
  }

  /* Adds the delete request handler. */
  public delete(handler: HANDLER): this {
    this.handlers[HttpMethods.DELETE] = handler;

    return this;
  }

  /* Adds the get request handler. */
  public get(handler: HANDLER): this {
    this.handlers[HttpMethods.GET] = handler;

    return this;
  }

  /* Adds the head request handler. */
  public head(handler: HANDLER): this {
    this.handlers[HttpMethods.HEAD] = handler;

    return this;
  }

  /* Adds the not found request handler. */
  public notFound(handler: HANDLER): this {
    this._notFound = handler;

    return this;
  }

  /* Adds the options request handler. */
  public options(handler: HANDLER): this {
    this.handlers[HttpMethods.OPTIONS] = handler;

    return this;
  }

  /* Adds the patch request handler. */
  public patch(handler: HANDLER): this {
    this.handlers[HttpMethods.PATCH] = handler;

    return this;
  }

  /* Adds the post request handler. */
  public post(handler: HANDLER): this {
    this.handlers[HttpMethods.POST] = handler;

    return this;
  }

  /* Adds the put request handler. */
  public put(handler: HANDLER): this {
    this.handlers[HttpMethods.PUT] = handler;

    return this;
  }

  /* Adds the trace request handler. */
  public trace(handler: HANDLER): this {
    this.handlers[HttpMethods.TRACE] = handler;

    return this;
  }

  /* Returns the Next.js API handler with the routes. */
  public handler(): NextApiHandler {
    return async (req, res) => {
      const handler = this.handlers[req.method?.toUpperCase() as HttpMethod] ?? this._notFound;

      if (!handler) {
        res.status(StatusCodes.METHOD_NOT_ALLOWED).end();

        return;
      }

      await this._wrapper(req, res, handler);
    };
  }
}

const router = <HANDLER>(wrapper: Wrapper<HANDLER>): Router<HANDLER> =>
  new Router<HANDLER>(wrapper);

export { Router, router };
export type { Wrapper };
