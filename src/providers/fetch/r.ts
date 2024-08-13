import { logger } from "@providers/logs/logger";
import { z } from "zod";

function urlTemplate(url: string, params: Record<string, string | number>) {
  let _url = url;
  const matched = url.match(/:[a-z_]+/g);
  if (!matched) throw new Error("No query parameters found.");
  const keys = matched.map((k) => k.substring(1));
  const paramKeys = Object.keys(params);
  const missingParams = keys.filter((k) => !paramKeys.includes(k));
  if (missingParams.length > 0) throw new Error(`Missing parameters: ${missingParams.join(", ")}`);

  keys.forEach((k) => {
    if (params[k] === undefined) throw new Error(`Parameter for key ${k} is undefined.`);
    _url = url.replace(`:${k}`, encodeURIComponent(params[k]));
  });

  return _url;
}

/**
 * To avoid failures for empty objects, define the provided schema with **DEFAULT VALUES**
 * */
async function safeJSON<T>(rs: Response, schema: z.ZodType<T>): Promise<T> {
  const json = await rs.json();
  const validator = schema.safeParse(json);
  if (!validator.success) {
    logger.error(validator.error);
    return {} as T;
  }

  return validator.data;
}

export abstract class R {
  static _url = "";
  static _schema: z.ZodType<unknown> | undefined = undefined;
  static config: {
    method?: string;
    headers?: {
      Authorization: string;
      connection: string;
    };
  } = {};

  static url(url: string, params?: Record<string, string | number>) {
    this._url = params ? urlTemplate(url, params) : url;
    return this;
  }

  static schema<T>(schema: z.ZodType<T>) {
    this._schema = schema;
    return this;
  }

  static withBearerToken(token: string) {
    this.config.headers = {
      Authorization: `Bearer ${token}`,
      connection: "keepalive",
    };
    return this;
  }

  static async get() {
    if (!this._url) throw Error("no url defined, please define one with .url()");
    if (!this._schema) throw Error("no schema defined, please define one with .schema()");
    const rs = await fetch(this._url, this.config);
    const response = safeJSON<z.infer<typeof this._schema>>(rs, this._schema);

    return { req: rs, res: response };
  }

  static async post(body?: string | object | FormData) {
    if (!this._url) throw Error("no url defined, please define one with .url()");
    if (!this._schema) throw Error("no schema defined, please define one with .schema()");

    let rs;

    if (typeof body === "string") {
      rs = await fetch(this._url, { ...this.config, body: JSON.parse(body), method: "POST" }); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    } else if (body instanceof FormData) {
      rs = await fetch(this._url, { ...this.config, body, method: "POST" });
    } else if (typeof body === "object") {
      rs = await fetch(this._url, { ...this.config, body: JSON.stringify(body), method: "POST" });
    } else {
      throw Error("incorrect type of body");
    }

    const response = await safeJSON<z.infer<typeof this._schema>>(rs, this._schema);
    return { req: rs, res: response };
  }

  static async put(body?: string | object | FormData) {
    if (!this._url) throw Error("no url defined, please define one with .url()");
    if (!this._schema) throw Error("no schema defined, please define one with .schema()");

    let rs;

    if (typeof body === "string") {
      rs = await fetch(this._url, { ...this.config, body, method: "PUT" }); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    } else if (body instanceof FormData) {
      rs = await fetch(this._url, { ...this.config, body, method: "PUT" });
    } else if (typeof body === "object") {
      rs = await fetch(this._url, { ...this.config, body: JSON.stringify(body), method: "PUT" });
    } else {
      throw Error("incorrect type of body");
    }

    const response = await safeJSON<z.infer<typeof this._schema>>(rs, this._schema);
    return { req: rs, res: response };
  }

  static async delete() {
    const rs = await fetch(this._url, { ...this.config, method: "DELETE" });
    return { req: rs };
  }
}
