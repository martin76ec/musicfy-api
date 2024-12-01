import { logger } from "@providers/logs/logger";
import { HTTPCode, SafeParams, SafeResponse } from "@src/domain/http/response";
import { Context } from "elysia";

export abstract class BaseUseCase<P, R = undefined> {
  protected resSuccess: SafeResponse<R> = { message: "successful", status: HTTPCode.OK };
  protected resError: SafeResponse = { message: "internal server error", status: HTTPCode.INTERNAL_SERVER_ERROR };
  protected abstract validate(c: Context<any>): Promise<SafeParams<P>>;
  protected abstract process(p: P): Promise<SafeResponse<R> | void>;

  public async run(params: Record<string, any>, body: Record<string, any>) {
    const validator = await this.validate({ ...params, ...body });
    logger.info(validator, "VALIDATOR");

    if (validator.errors && !validator.data) return { errors: validator.errors.data, status: errors.status };
    if (!validator.data) throw new Error("no data provided");
    logger.info(validator.data, "DATA");

    try {
      const response = await this.process(validator.data);
      if (!response) return safeJSON(this.resSuccess, this.resError.status, c);

      return safeJSON(response, response.status, c);
    } catch (error) {
      logger.error(error, "RUN PROCESS UNHANDLED ERROR:");
      return safeJSON(this.resError, this.resError.status, c);
    }
  }
}
