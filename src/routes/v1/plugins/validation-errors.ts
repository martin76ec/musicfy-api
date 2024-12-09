import { logger } from "@providers/logs/logger";
import { Elysia } from "elysia";

interface ValidationError {
  path?: string;
  message: string;
}

interface ValidationOutput {
  errors?: ValidationError[];
  property?: string;
  message: string;
}

interface SafeResponse {
  status: number;
  data: {
    errors: string[];
  };
}

function formatValidationError(validationOutput: ValidationOutput): SafeResponse {
  const errors = validationOutput.errors?.map((error) => {
    const field = error.path ? error.path.replace(/^\//, "") : "unknown field";
    return `${field}: ${error.message}`;
  }) || [`${validationOutput.property?.replace(/^\//, "") || "unknown field"}: ${validationOutput.message}`];

  return {
    status: 422,
    data: {
      errors,
    },
  };
}

const validationErrorHandler = (app: Elysia): Elysia =>
  app.onError(({ code, error }) => {
    logger.error(code);
    if (code === "VALIDATION") {
      logger.error(error, "VALIDATION:");
    }

    return formatValidationError(JSON.parse(error.message) as ValidationOutput);
  });

export { validationErrorHandler };
