import { createLogger, format, transports } from 'winston';
import type { LoggerOptions } from 'winston';

// eslint-disable-next-line import/no-mutable-exports
let logger = createLogger();

const configureCustom = (opts: LoggerOptions): void => {
  logger = createLogger(opts);
};

const configureVercel = (): void => {
  configureCustom({
    defaultMeta: {
      commit: process.env.VERCEL_GIT_COMMIT_SHA,
      environment: process.env.VERCEL_ENV,
      region: process.env.VERCEL_REGION,
    },
    exitOnError: false,
    format: format.json(),
    level: 'silly',
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
    ],
  });
};

export type { LoggerOptions };

export { configureCustom, configureVercel, createLogger, format, transports };

export default logger;
