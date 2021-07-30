import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import * as HttpStatusCodes from 'http-status-codes';

export { HttpStatusCodes };

export enum HttpMethods {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface ContextApiHandler<T extends Context> {
  (ctx: T): Promise<void> | void;
}

export interface ContextApiWrapper<T extends Context> {
  (req: NextApiRequest, res: NextApiResponse, handler: ContextApiHandler<T>): Promise<void> | void;
}

export class Middleware<T extends Context> {
  private _connect?: ContextApiHandler<T>;
  private _delete?: ContextApiHandler<T>;
  private _get?: ContextApiHandler<T>;
  private _head?: ContextApiHandler<T>;
  private _notFound?: ContextApiHandler<T>;
  private _options?: ContextApiHandler<T>;
  private _patch?: ContextApiHandler<T>;
  private _post?: ContextApiHandler<T>;
  private _put?: ContextApiHandler<T>;
  private _trace?: ContextApiHandler<T>;
  private _wrapper: ContextApiWrapper<T> = async (req, res, handler) => {
    await handler({ req, res } as T);
  };

  wrapper(wrapper: ContextApiWrapper<T>) {
    this._wrapper = wrapper;
    return this;
  }

  connect(handler: ContextApiHandler<T>) {
    this._connect = handler;
    return this;
  }

  delete(handler: ContextApiHandler<T>) {
    this._delete = handler;
    return this;
  }

  get(handler: ContextApiHandler<T>) {
    this._get = handler;
    return this;
  }

  head(handler: ContextApiHandler<T>) {
    this._head = handler;
    return this;
  }

  notFound(handler: ContextApiHandler<T>) {
    this._notFound = handler;
    return this;
  }

  options(handler: ContextApiHandler<T>) {
    this._options = handler;
    return this;
  }

  patch(handler: ContextApiHandler<T>) {
    this._patch = handler;
    return this;
  }

  post(handler: ContextApiHandler<T>) {
    this._post = handler;
    return this;
  }

  put(handler: ContextApiHandler<T>) {
    this._put = handler;
    return this;
  }

  trace(handler: ContextApiHandler<T>) {
    this._trace = handler;
    return this;
  }

  handler(): NextApiHandler {
    return (req, res) => {
      if (req.method === HttpMethods.CONNECT && this._connect) {
        return this._wrapper(req, res, this._connect);
      } else if (req.method === HttpMethods.DELETE && this._delete) {
        return this._wrapper(req, res, this._delete);
      } else if (req.method === HttpMethods.GET && this._get) {
        return this._wrapper(req, res, this._get);
      } else if (req.method === HttpMethods.HEAD && this._head) {
        return this._wrapper(req, res, this._head);
      } else if (req.method === HttpMethods.OPTIONS && this._options) {
        return this._wrapper(req, res, this._options);
      } else if (req.method === HttpMethods.PATCH && this._patch) {
        return this._wrapper(req, res, this._patch);
      } else if (req.method === HttpMethods.POST && this._post) {
        return this._wrapper(req, res, this._post);
      } else if (req.method === HttpMethods.PUT && this._put) {
        return this._wrapper(req, res, this._put);
      } else if (req.method === HttpMethods.TRACE && this._trace) {
        return this._wrapper(req, res, this._trace);
      } else if (this._notFound) {
        return this._wrapper(req, res, this._notFound);
      }
    };
  }
}
