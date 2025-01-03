import { logger } from "@providers/logs/logger";

function rArrayLog(message: string, values: string[], key: string, idx: number) {
  let msg = message;

  if (idx < values.length) {
    msg = message.replace(key, values[idx] ?? "undefined");
  } else {
    logger.warn(`Warning: No more values left in the array for key ${key}.`);
  }

  return msg;
}

function rObjLog(message: string, values: Record<string, string>, key: string) {
  let msg = message;
  const cleanKey = key.substring(1);

  if (cleanKey in values) {
    msg = message.replace(key, values[cleanKey] ?? "undefined");
  } else {
    logger.warn(`Warning: Key ${cleanKey} does not exist in the provided values object.`);
  }

  return msg;
}

export function xlog(message: string, values: Record<string, string> | string[]) {
  const regex = /:\w+/g;
  const keys = message.match(regex);
  if (!keys) return message;

  keys.forEach((key, idx) => {
    if (Array.isArray(values)) {
      message = rArrayLog(message, values, key, idx);
      return;
    }

    message = rObjLog(message, values, key);
  });

  return message;
}
