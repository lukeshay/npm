import { createLogger, format, LoggerOptions, transports } from 'winston';

let logger = createLogger();

export function configureVercel() {
  logger = createLogger({
    level: 'silly',
    exitOnError: false,
    format: format.json(),
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
    ],
    defaultMeta: {
      environment: process.env.VERCEL_ENV || 'local',
      commit: process.env.VERCEL_GIT_COMMIT_SHA,
      region: process.env.VERCEL_REGION,
    },
  });
}

export function configureCustom(opts: LoggerOptions) {
  logger = createLogger(opts);
}

export { LoggerOptions };

export default logger;
