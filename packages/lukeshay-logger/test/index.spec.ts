import { createLogger, transports, format } from 'winston';

import logger from '../src/index';
import * as loggerExports from '../src/index';

import chance from './chance';

jest.mock('winston', () => {
  const winston = jest.requireActual('winston');

  return {
    ...winston,
    createLogger: jest.fn().mockReturnValue({
      alert: jest.fn(),
      crit: jest.fn(),
      data: jest.fn(),
      debug: jest.fn(),
      emerg: jest.fn(),
      error: jest.fn(),
      help: jest.fn(),
      http: jest.fn(),
      info: jest.fn(),
      input: jest.fn(),
      notice: jest.fn(),
      prompt: jest.fn(),
      silly: jest.fn(),
      verbose: jest.fn(),
      warn: jest.fn(),
      warning: jest.fn(),
      _destroy: jest.fn(),
      _flush: jest.fn(),
      _transform: jest.fn(),
      _final: jest.fn(),
      _write: jest.fn(),
      _read: jest.fn(),
    }),
  };
});

describe('logger', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('exports', () => {
    test('should export logger', () => {
      expect(logger).toBeDefined();
    });

    test('should export configureCustom', () => {
      expect(loggerExports.configureCustom).toBeDefined();
    });

    test('should export configureVercel', () => {
      expect(loggerExports.configureVercel).toBeDefined();
    });

    test('should export createLogger', () => {
      expect(loggerExports.createLogger).toBeDefined();
    });

    test('should export format', () => {
      expect(loggerExports.format).toBeDefined();
    });

    test('should export transports', () => {
      expect(loggerExports.transports).toBeDefined();
    });
  });

  describe('logger', () => {
    test('should be defined', () => {
      expect(logger).toBeDefined();
    });
  });

  describe('configureCustom', () => {
    let expectedOptions: loggerExports.LoggerOptions;

    beforeEach(() => {
      expectedOptions = {
        defaultMeta: {
          [chance.string()]: chance.string(),
        },
        exitOnError: chance.bool(),
      };
    });

    test('should call winston createLogger', () => {
      loggerExports.configureCustom(expectedOptions);

      expect(createLogger).toHaveBeenCalledTimes(1);
      expect(createLogger).toHaveBeenCalledWith(expectedOptions);
    });
  });

  describe('configureVercel', () => {
    let expectedOptions: loggerExports.LoggerOptions,
      vercelGitCommitSha: string,
      vercelEnv: string,
      vercelRegion: string;

    beforeEach(() => {
      vercelGitCommitSha = chance.string();
      vercelEnv = chance.string();
      vercelRegion = chance.string();

      process.env.VERCEL_GIT_COMMIT_SHA = vercelGitCommitSha;
      process.env.VERCEL_ENV = vercelEnv;
      process.env.VERCEL_REGION = vercelRegion;

      expectedOptions = {
        defaultMeta: {
          commit: vercelGitCommitSha,
          environment: vercelEnv,
          region: vercelRegion,
        },
        exitOnError: false,
        level: 'silly',
        format: format.json(),
      };
    });

    test('should call winston createLogger', () => {
      loggerExports.configureVercel();

      expect(createLogger).toHaveBeenCalledTimes(1);
      expect(createLogger).toHaveBeenCalledWith({
        ...expectedOptions,
        transports: [expect.any(transports.Console)],
      });
    });
  });
});
