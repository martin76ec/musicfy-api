import { logger } from "@providers/logs/logger";
import { HTTPCode, safeGenericResponse, SafeResponse } from "@src/domain/http/response";

export abstract class BaseUseCase<P, R = undefined> {
  protected resSuccess: SafeResponse = { message: "successful", status: HTTPCode.OK };
  protected resError: SafeResponse = { message: "internal server error", status: HTTPCode.INTERNAL_SERVER_ERROR };

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async process(_p: P): Promise<SafeResponse<R> | void> {
    throw new Error("process function not implemented");
  }

  public async run(p: P): Promise<SafeResponse<R>> {
    try {
      const response = await this.process(p);
      return response || safeGenericResponse(this.resSuccess);
    } catch (error) {
      logger.error(error, "RUN PROCESS UNHANDLED ERROR:");
      return safeGenericResponse(this.resError);
    }
  }
}
