import winston, { format, LoggerOptions, transports } from 'winston';

export const configureVercel = () => {
  configureCustom({
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
};

export const configureCustom = (opts: LoggerOptions) => {
  winston.configure(opts);
};

export default winston;
