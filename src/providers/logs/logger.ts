import { LOG_LEVEL } from "@constants/env";
import { xlog } from "@providers/logs/logs-utils";
import pino, { LoggerOptions } from "pino";

const config: LoggerOptions = {
  level: LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

export const logger = pino(config);

export const xlogger = {
  info: (msg: string, values: Record<string, string> | string[]) => logger.info(xlog(msg, values)),
  error: (msg: string, values: Record<string, string> | string[]) => logger.error(xlog(msg, values)),
  warn: (msg: string, values: Record<string, string> | string[]) => logger.warn(xlog(msg, values)),
  silent: (msg: string, values: Record<string, string> | string[]) => logger.silent(xlog(msg, values)),
};
